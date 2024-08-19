"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"
import { Container, Card, CardActionArea,
     CardContent,Box, Typography, Grid, Button } from "@mui/material"



export default function Flashcard(){
    const {isLoaded, isSignedIn, user}= useUser()
    const [flashcards, setFlashcards]= useState([])
    const [flipped, setFlipped] = useState(false)
    const oneCardAtATime= []

    const searchParams= useSearchParams()
    const search = searchParams.get('id')
    

    useEffect(()=>{
        console.log('useEffect for flashcards up and running');
        async function getFlashCard() {
            if(!search || !user){
                console.log('returning user due to no data');
                return
            }

            const docCollection= collection(doc(collection(db,'users'),user.id), search)
            console.log('data after conncting to database user');
            
            const docs = await getDocs(docCollection)
            console.log("Fetched docs:", docs);

            docs.forEach((doc)=>{
                console.log("Doc data:", doc.id, doc.data());
                oneCardAtATime.push({id:doc.id,...doc.data()})
            })
            
            setFlashcards(oneCardAtATime)
            
         
        }
        getFlashCard()
    },[user,search])

    const handleCardClick=(id)=>{
        setFlipped((prev)=>({
            ...prev,
            [id]:!prev[id]
        }))
   }



    if(!isSignedIn || !isLoaded){
        return<>USER NOT FOUND</>
    }

    return(
        <Container maxWidth='md' sx={{py:2}}>
            
                {flashcards.length>0 && <Box>
        <Typography py={2} variant='h3' 
        fontWeight={'bold'} 
        textTransform='capitalize'
        sx={{WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
          background:'linear-gradient(to right, #ADD8E6, #B0E0E6, #87CEFA, #FFB6C1, #FF69B4)',
          backgroundClip: 'text',
          display: 'inline' }}
        
        >
          Flashcard:{` ${search}`}
          </Typography>
        <Grid container spacing={2}>
           {flashcards.map((card,index)=>(
            <Grid item sm={6} md={4} xs={12}  key={index} >
            <Card sx={{bgcolor:'#D0D0D0', color:'#020618'}}>
              <CardActionArea onClick={()=>handleCardClick(index)}>
                <CardContent>
              <Box  sx={{
                  perspective:'1000px', 
                  position:'relative',
                  width:'100%',
                  height:'250px',
                  
                  }}>

                <Box sx={{
                  position:'absolute',
                  transition:'transform 0.6s',
                  transformStyle:'preserve-3d',
                  boxShadow:'0 4px 8px 0px rgba(0,0,0,0.4)',
                  width: '100%',
                height: '100%',
            bgcolor:'#E8E8E8',
            transform:flipped[index]?'rotateY(180deg)':'rotateY(0deg)'
      
        

                }}>

                  {/* front of card */}
                  <Box sx={{
                    backfaceVisibility:'hidden',
                    position:'absolute',
                    width: '100%',
                height: '100%',
                    
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    p:2,
                    textAlign:'center',
                    borderRadius:1,
                    
                    boxSizing:'border-box'
                  }}>
                  
                      <Typography variant='h6'>{card.front}</Typography>
                    
                  </Box>

                  {/* back of card  */}

                  <Box sx={{
                     transform:'rotateY(180deg)',
                     backfaceVisibility: 'hidden', 
                    position:'absolute' ,
                    width: '100%',
                height: '100%',
                    
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    p:2,
                    textAlign:'center',
                    borderRadius:1,
                   
                  }}>
                    <Box sx={{width:150, height:50,display:'flex',alignItems:'center',justifyContent:'center',
                    color:'white', 
                    position:'absolute',top: 0, // Position at the top
                    left: 0,
                  transition:'transform 0.5s ease',
                  transform:'rotate(-15deg)',
                  background: 'rgba(76, 175, 80, 0.7)' ,
                 ':hover':{
                    transform:'rotate(0deg)',
                    background: 'rgba(76, 175, 80, 0.7)' 
                    ,color:'white', 
                 } }} >
                  <Typography variant="h6" textTransform='capitalize'>Answer</Typography>
                </Box>
                  
                      <Typography variant='h6' >{card.back}</Typography>
                    
                  </Box>
                </Box>
              </Box>
              </CardContent>
              </CardActionArea>
           </Card>
           </Grid>
           ))}
        </Grid>
        </Box>}
            
            
        </Container>
    )

}
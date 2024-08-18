"use client"
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { doc,collection, getDoc,setDoc, writeBatch } from 'firebase/firestore';
import { Container, Box, Typography, Grid, Button, TextField, Paper, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
 export default function Generate() {
    
   const {isLoaded, isSignedIn, user}= useUser()
   const [flipped, setFlipped]=  useState([])
   const [flashcards, setFlashcards]= useState([])
   const [text, setText]= useState('')
   const [name, setName]= useState('')
   const [open, setOpen]= useState(false)
   const router= useRouter()
   
   const handleSubmit= async ()=>{
    console.log(text)
        fetch('/api/generate',
        {
        method:'POST',
        body:text  
        })
        .then((res)=>res.json())
        .then((data)=>setFlashcards(data))

   }

   const handleCardClick=(id)=>{
        setFlipped((prev)=>({
            ...prev,
            [id]:!prev[id]
        }))
   }


   const handleOpen=()=>{
        setOpen(true)
   }
   const handleClose=()=>{
        setOpen(false)
   }

   const saveFlashCards= async ()=>{
      if(!name){
        alert('please enter a name')
        return
      }
      if (!isLoaded || !isSignedIn || !user || !user.id) {
        alert('User not authenticated or user ID is missing.');
        return;
      }
  
      
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db,'users'),user.id);
      const docSnap = await getDoc(userDocRef)

      if(docSnap.exists()){
        const collections = docSnap.collection.flashcards || []
        if(collections.find(f => f.name === name)){
          alert('Flashcards with this name already exist')
          return  
        }else{
          collections.push(name)
          batch.set(userDocRef,{flashcards:collections}, {merge:true})
        }
      }else{
          batch.set(userDocRef,{flashcards:[{name}]})
      }
      
      const colRef = collection(userDocRef, name)
      flashcards.forEach(flashcard=>{
        const cardDocRef= doc(colRef)
        batch.set(cardDocRef, flashcard)
      }) 
      await batch.commit();
      handleClose()
      router.push('/flashcards')

   }
  return (
    <Container maxWidth='md'>
      <Box display='flex' flexDirection='column' sx={{
        mt:4, mb:6, alignItems:'center'
      }}>
      <Typography variant='h3'>
        Generate Flashcards
      </Typography>

      <Paper sx={{
        p:4, width:"100%",
        background:' rgb(187,233,255,0.5)',
        // bgcolor:'#BBE9FF',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter:' blur(5px)'

      }}>
        <TextField value={text} onChange={(e)=>setText(e.target.value)} 
        label="enter text" rows={4} fullWidth multiline variant='outlined' 
        sx={{mb:2,color:'white',
          '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)', // Change label color here
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.8)', // Border color
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.8)', // Border color on hover
          },
          
          '& .MuiInputBase-input':{
            color: 'white',
          }
        },
        }}/>
        
        <Box display='flex' justifyContent='space-between'>
        <Button onClick={()=>handleSubmit()} variant='contained'>Submit</Button>
        <Button variant='contained' onClick={handleOpen}>Save</Button>
        </Box>
      </Paper>
      </Box>

      {flashcards.length>0 && <Box>
        <Typography>Flashcards preview</Typography>
        <Grid container spacing={2}>
           {flashcards.map((card,index)=>(
            <Grid item sm={6} md={4} key={index} >
            <Card>
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
                    <Box width='20' height='10' bgcolor='green'>
                      Answer
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Cards</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Enter a name for your flashcards
            </DialogContentText>
          <TextField autoFocus margin='dense' value={name} 
          onChange={(e)=>setName(e.target.value)} rows={2} 
          label='collection name' fullWidth variant='outlined'/>
          </DialogContent>
          
            <DialogActions>
              <Button onClick={handleClose}>cancel</Button>
              <Button onClick={saveFlashCards}>Save</Button>
            </DialogActions>
        </Dialog>

    </Container>
  )
}

"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { getDoc, setDoc,collection, doc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"

export default function Flashcards(){


    const {isLoaded, isSignedIn, user}= useUser()
    const [flashcards, setFlashcards]= useState([])
    const router= useRouter()
    
    
    
    useEffect(()=>{
        console.log('useEffect up and running');
        async function getFlashCards() {
            if(!user){
                console.log('returning user due to no data');
                return
            }
            const docRef= doc(collection(db,'users'),user.id)
            console.log('data after conncting to database user');
            
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                console.log('setting data in docSnap');
                const collections= docSnap.data().flashcards || []
                console.log(collections);
                setFlashcards(collections)
                    
                
            }else{
                console.log('setting data with empty array due to no data');
                await setDoc(docRef,{flashcards:[]})
            }
            
            
         
        }
        getFlashCards()
    },[user])

    if(!isSignedIn || !isLoaded){
        return<>USER NOT FOUND</>
    }

    const handleCardClick=(id)=>{
     router.push(`/flashcard?id=${id}`)
    }


    return (
        <Container maxWidth='md'>
            <Typography variant="h3">testing</Typography>
            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.map((card, index)=>(
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <CardActionArea onClick={()=>{handleCardClick(card.name)}}>
                            <CardContent>
                                <Typography variant="h6">
                                    {card.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
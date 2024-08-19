"use client"

import { Button, Container, Box, Typography, Grid,Stack } from "@mui/material";
import Head from 'next/head'
import {FeatureContainer, PriceContainer} from './components/GridContainer'
import Link from "next/link";
import { useUser} from "@clerk/nextjs";
import { color, motion } from "framer-motion";
import { LampContainer } from "./components/ui/lamp";
import CardAnimation from "./components/CardAnimation";
export default function Home() {

  const {isSignedIn, isLoaded, user} = useUser() 


  return (
   
     
    <Box width='100%' sx={{bgcolor:'#020618'}} >
      <Head>
        <title>SaaS FlashCards</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>
      

      {/* pricing and features container */}
      <LampContainer >
    <motion.h1
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="mt-8 bg-gradient-to-br flex flex-col justify-center from-slate-100 to-slate-300 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    >
        <Stack sx={{
        dipltextAlign:'center',gap:2, alignItems:"center"
      }
      }>
        {/* FFA500
        00BFFF   */}

        <Typography variant="h3">Welcome to Cradle FlashCard </Typography>
        <Typography variant="h6">Turn notes into flashcards with a click!</Typography>
        <Link href={isSignedIn?'/generate':'/sign-in'} passHref>
        <Button variant="contained"
        sx={{bgcolor:'#F5004F',
          ':hover':{
            bgcolor:'#F54C6F'
          }
        }}
        >get started</Button></Link>
        
        </Stack>

        
        </motion.h1>
       <CardAnimation/>
       </LampContainer>
       


      <Container sx={{color:'white',
      
        // background: 'linear-gradient(108deg, rgba(2,6,23,1) 0%, rgba(4,54,76,1) 50%, rgba(2,6,23,1) 100%)'
      }}>
        <FeatureContainer title='Features'/>
        <PriceContainer title="Pricing"/>

      </Container>
      
    </Box>
    
   
  );
}

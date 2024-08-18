"use client"

import Image from "next/image";

import { Button, Container, Box, Typography, Grid,Stack } from "@mui/material";
import Head from 'next/head'
import {FeatureContainer, PriceContainer} from './components/GridContainer'
import Link from "next/link";
import { useUser} from "@clerk/nextjs";
import { color, motion } from "framer-motion";
import { LampContainer } from "./components/ui/lamp";

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
      className="mt-8 bg-gradient-to-br flex flex-col justify-center from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    >
        <Stack sx={{
        dipltextAlign:'center',gap:2, alignItems:"center"
      }
      }>
        

        <Typography variant="h3">Welcome to FlashCard SaaS</Typography>
        <Typography variant="h6">The easiest way to make flashcards from your text</Typography>
        <Link href={isSignedIn?'/generate':'/sign-in'} passHref><Button variant="contained">get started</Button></Link>
        

        
        </Stack>
        </motion.h1>
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

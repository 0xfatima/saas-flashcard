import React from 'react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, AppBar, Button,Typography, Box } from '@mui/material';
import Link from 'next/link'; 
import Image from 'next/image';
const Navbar = () => {

  return (
    <AppBar position="static">
         <Toolbar sx={{background: 'radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(2,6,24,1) 50%, rgba(2,6,24,1) 100%)', pt:1}}>
          
          
            
            <Box sx={{flexGrow:1}}>
            <Link href='/' style={{textDecoration:'none', color:'inherit'}}>
            <Image
                  src="/logo.png" // Path to your image file in the public directory
                  alt="Logo"      // Descriptive alt text
                  width={45}      // Specify the width of the image
                  height={0.5}  // Specify the height of the image
                />
                </Link>
                </Box>
                   

          <SignedOut>
            <Link href='/sign-in' passHref>
            <Button sx={{color:'white'}}>
            Login
            </Button>
            </Link>

            <Link href='/sign-up' passHref>
            <Button sx={{color:'white'}}>
            Sign up
            </Button>
            </Link>
          </SignedOut>

          <SignedIn>
          <Box>
          <Link href='/flashcards'>
          <Button sx={{borderRadius:'50%', color:'white'}}>
                My cards
            </Button>
            </Link>
          </Box>
          
            <Box sx={{zIndex:1000}}>
            <UserButton/>
            </Box>
            
          </SignedIn>

         </Toolbar>
      </AppBar>
  )
}

export default Navbar
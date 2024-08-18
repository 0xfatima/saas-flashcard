import React from 'react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, AppBar, Button,Typography } from '@mui/material';
import Link from 'next/link'; 

const Navbar = () => {

  return (
    <AppBar position="static">
         <Toolbar >
          
          <Typography variant="h3" sx={{flexGrow:1}}>
            <Link href='/' style={{textDecoration:'none', color:'inherit'}}>FlashCards</Link>
            </Typography>
          

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
          <Link href='/flashcards'>
          <Button sx={{borderRadius:'50%', color:'white'}}>
                My cards
            </Button>
            </Link>
            <UserButton/>
            
          </SignedIn>

         </Toolbar>
      </AppBar>
  )
}

export default Navbar
import React from 'react'

import { FeatureCard,PriceCard } from './GridCard'
import { Grid, Box, Typography } from '@mui/material'

export const FeatureContainer = (props) => {
    return (
        <Box pb={6} pt={15}>
        <Typography variant="h4" fontWeight='bold'>
            {props.title}
            </Typography>

        <Grid container spacing={4} my={0.5}>

          <FeatureCard heading = 'Easy text input'
          content='Simply enter your text and let 
          our software do the rest. Creating cards
           has never been this easier'/>

           <FeatureCard heading = 'Smart Flashcards'
          content='Our AI intelligently breaks down
           your text into concuse flashcards, perfect
           for studying'/>

           <FeatureCard heading = 'Accessible from anywhere'
          content='Access your flashcards form any device,
           at any time. Study on the go with ease'/>

        </Grid>

      </Box>
    )
  }
  
  
  export const PriceContainer = (props) => {
    return (
      <Box textAlign="center" py={6} display='flex' 
      flexDirection='column' alignItems='center' justifyContent='center' gap={4}
      >
          <Typography variant="h4" fontWeight='bold'>
              {props.title}
          </Typography>
            <Box  my={0.5}display='flex' gap={4}
       alignItems='center' justifyContent='center' sx={{flexDirection:{lg:'row',md:'row', sm:'column', xs:'column'}}}>
  
              <PriceCard type="Basic" pricing="$5 / Month" 
              content="Access to basic flashcard features and limited storage" color='#E8E8E8'/>

              <PriceCard type="Pro" pricing="$10 / Month" 
              content="Access to Pro flashcard features and unlimited storage" color='#87CEFA' />
            </Box>
          </Box>
    )
  }
  
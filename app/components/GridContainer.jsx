import React from 'react'

import { FeatureCard,PriceCard } from './GridCard'
import { Grid, Box, Typography } from '@mui/material'

export const FeatureContainer = (props) => {
    return (
        <Box pb={6}>
        <Typography variant="h4">
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
      <Box textAlign="center" py={6}>
          <Typography variant="h4">
              {props.title}
          </Typography>
            <Grid container spacing={4} my={0.5}>
  
              <PriceCard type="Basic" pricing="$5 / Month" 
              content="Access to basic flashcard features and limited storage" />
              <PriceCard type="Basic" pricing="$5 / Month" 
              content="Access to basic flashcard features and limited storage" />
            </Grid>
          </Box>
    )
  }
  
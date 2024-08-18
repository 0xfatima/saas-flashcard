import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'


export const FeatureCard = (props) => {
  return (
    <Grid item xs={12} md={4} >
              <Box sx={{borderTopLeftRadius:'20px', 
       p:4, borderBottomRightRadius:'20px', height:200,
       background: 'rgba(255, 255, 255, 0.08)',
      
       backdropFilter: 'blur(5px)',
       webkitBackdropFilter: "blur(5px)",
      
       zIndex: -1000,
       boxShadow: `0 0 10px rgba(22, 197, 226, 0.8), 
                    0 0 15px rgba(22, 197, 226, 0.6), 
                    0 0 20px rgba(22, 197, 226, 0.4)`,
       border: '2px solid transparent',
                            
    }}>
              <Typography variant="h6">
                  {props.heading} 
              </Typography>
              <Typography>
              {props.content}
              </Typography>
              </Box>
            </Grid>
  )
}

export const PriceCard = (props) => {
  return (
    <Grid item xs={12} md={6}  >
              <Box p={3} border="1px solid grey" borderRadius={2}>
              <Typography variant="h5" gutterBottom>
                  {props.type} 
              </Typography>
              <Typography variant="h6" gutterBottom>
                  {props.pricing} 
              </Typography>
              <Typography gutterBottom>
              {props.content}
              </Typography>
              <Button variant='contained' color='primary'>
                choose {props.type}
              </Button>
              </Box>
            </Grid>
  )
}
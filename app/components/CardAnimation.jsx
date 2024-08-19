import React from 'react'
import { Box } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
const CardAnimation = () => {

    const [hovered, setHovered]= useState(false)
  return (
    <Box position='absolute' top='130%' display={"flex"} flexDirection={"row"}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    sx={{
      ':hover':{
        cursor:'pointer'
      }
    }}
    >


      <Box height={200} width={150} 
      position='relative' left='10%' sx={{
        transition:'transform 0.5s ease',
        transform:hovered?'rotate(-10deg)':'rotate(0deg)',
        boxShadow: `0 0 5px rgba(255, 0, 0, 0.8), 
                    0 0 10px rgba(255, 0, 0, 0.6), 
                    0 0 15px rgba(255, 0, 0, 0.4)`,
        borderRadius:1
}}
      > 
      <Image
      src='/computerScience.png'
      layout='fill' 
      alt='Fatima Azeemi'
      style={{objectFit:'cover'}}
      />
      </Box>


      <Box height={200} width={150}  zIndex={1000}
      sx={{transition:'transform 0.5s ease',
        transform:hovered?'scale(1.2)':'scale(1.1)',
        
        boxShadow: `0 0 5px rgba(22, 197, 226, 0.8), 
                    0 0 10px rgba(22, 197, 226, 0.6), 
                    0 0 15px rgba(22, 197, 226, 0.4)`,
        borderRadius:1}}
      > 
      <Image
      src='/planets.png'
      layout='fill' 
      alt='Fatima Azeemi'
      style={{objectFit:'cover'}}
      />
      </Box>


      <Box height={200} width={150} 
      position='relative' right='10%' sx={{
        transition:'transform 0.5s ease',
        transform:hovered?'rotate(10deg)':'rotate(0deg)',
        boxShadow: `0 0 5px rgba(0, 255, 0, 0.8), 
                    0 0 10px rgba(0, 255, 0, 0.6), 
                    0 0 15px rgba(0, 255, 0, 0.4)`,
        borderRadius:1}}
      > 
      <Image
      src='/physics.png'
      layout='fill' 
      alt='Fatima Azeemi'
      style={{objectFit:'cover'}}
      />
      </Box>


    </Box>
  )
}

export default CardAnimation
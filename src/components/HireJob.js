import React from 'react'
import {CircularText} from './Icon'
import Link from 'next/link'
import {motion} from "framer-motion"


const MotionLink = motion(Link);
const HireJob = () => {
  const backgroundColors = ["#121212", "rgba(131,58,180,1)","rgba(253,29,29,1)","rgba(252,176,69,1)","rgba(131,58,180,1)", "#121212"];

  return (
    <div className='fixed left-4 bottom-4 
    flex items-center justify-center overflow-hidden'>
        
        <div className='w-48 h-auto flex items-center justify-center relative '>
        <CircularText className="fill-dark animate-spin-slow" />
        </div>
        <MotionLink href="mailto:gksachdev46@gmail.com"
          className="flex items-center justify-center 
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark
          text-light shadow-md border-solid border-dark  w-20 h-20 rounded-full font-semibold
           hover:
          "
          whileHover={{
            backgroundColor:  ["#121212", "rgba(131,58,180,1)","rgba(253,29,29,1)","rgba(252,176,69,1)", "#121212"],
            transition:{duration:1 ,repeat:Infinity }
          
            
          }}
        >
        
        Hire Me  </MotionLink>
        </div> 
  )
}

export default HireJob
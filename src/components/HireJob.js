import React from 'react'
import {CircularText} from './Icon'
import Link from 'next/link'
import {motion} from "framer-motion"


const MotionLink = motion(Link);
const HireJob = () => {
  const backgroundColors = ["#121212", "rgba(131,58,180,1)","rgba(253,29,29,1)","rgba(252,176,69,1)","rgba(131,58,180,1)", "#121212"];

  return (
    <div className='fixed left-2 sm:left-4 bottom-2 sm:bottom-4 
    flex items-center justify-center overflow-hidden
    md:left-4 md:bottom-4
    lg:left-6 lg:bottom-6'>
        
        <div className='w-32 h-auto flex items-center justify-center relative
        sm:w-36
        md:w-40
        lg:w-48'>
        <CircularText className="fill-dark animate-spin-slow dark:fill-light dark:text-dark dark:bg-dark dark:border-2 dark:border-solid dark:border-dark 
        sm:w-36
        md:w-40
        lg:w-48" />
        </div>
        <MotionLink href="mailto:gksachdev46@gmail.com"
          className="flex items-center justify-center 
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark
          text-light shadow-md border-solid border-dark w-16 h-16 rounded-full font-semibold text-sm
          sm:w-18 sm:h-18 sm:text-base
          md:w-20 md:h-20 md:text-lg
          hover:bg-light hover:text-dark hover:border-light hover:border-2
          dark:bg-light dark:text-dark dark:border-dark dark:hover:bg-dark dark:hover:text-light dark:hover:border-dark"
          whileHover={{
            backgroundColor:  ["#121212", "rgba(131,58,180,1)","rgba(253,29,29,1)","rgba(252,176,69,1)", "#121212"],
            transition:{duration:1 ,repeat:Infinity }
          }}
        >
        Hire Me
        </MotionLink>
        </div> 
  )
}

export default HireJob
import React from 'react'
import { CircularText } from './Icon'
import Link from 'next/link'
import { motion } from "framer-motion"
import { useRouter } from 'next/router'

const MotionLink = motion(Link);

const HireJob = () => {
  const router = useRouter()
  // Redundant with the contact form, so never render it there.
  if (router.asPath.startsWith('/contact')) return null

  return (
    <div className='fixed left-2 sm:left-4 bottom-2 sm:bottom-4 z-30
    flex items-center justify-center overflow-hidden
    md:left-4 md:bottom-4
    lg:left-6 lg:bottom-6'>

      <div className='w-32 h-auto flex items-center justify-center relative
        sm:w-36
        md:w-40
        lg:w-48'>
        <CircularText className="fill-dark motion-safe:animate-spin-slow dark:fill-light
        sm:w-36
        md:w-40
        lg:w-48" />
      </div>
      <MotionLink
        href="mailto:ai.goutamsachdev@gmail.com"
        aria-label="Hire me — send an email"
        className="flex items-center justify-center
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-dark text-light shadow-card border-2 border-solid border-dark
          w-16 h-16 rounded-full font-semibold text-sm
          sm:w-18 sm:h-18 sm:text-base
          md:w-20 md:h-20 md:text-lg
          dark:bg-dark dark:text-light dark:border-light"
        whileHover={{
          backgroundColor: ["#121212", "rgba(131,58,180,1)", "rgba(253,29,29,1)", "rgba(252,176,69,1)", "rgba(131,58,180,1)", "#121212"],
          transition: { duration: 1, repeat: Infinity }
        }}
      >
        Hire Me
      </MotionLink>
    </div>
  )
}

export default HireJob
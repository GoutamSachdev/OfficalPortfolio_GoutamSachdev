import Link from 'next/link'
import React from 'react'
import Layout from './Layout'
import SocialButton from './SocialButton'
import { GithubIcon, LinkedInIcon } from './Icon'

const Footer = () => {
  return (
    <footer className='w-full border-t border-solid border-line
    font-medium text-base dark:text-light dark:border-lineDark
    '>
      <Layout className='py-8 flex flex-col sm:flex-row items-center justify-between flex-wrap gap-6'>
        <span> {new Date().getFullYear()}
          &copy; Goutam Sachdev. All Rights Reserved
        </span>

        <nav aria-label='Footer' className='flex items-center gap-4 sm:gap-6'>
          <Link href='/' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Home</Link>
          <Link href='/about' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>About</Link>
          <Link href='/projects' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Projects</Link>
          <Link href='/contact' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Contact</Link>
        </nav>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            <SocialButton href='https://github.com/GoutamSachdev' label='GitHub'>
              <GithubIcon />
            </SocialButton>
            <SocialButton href='https://www.linkedin.com/in/goutam-sachdev-978435190' label='LinkedIn'>
              <LinkedInIcon />
            </SocialButton>
          </div>
          <a className='underline hover:text-primary dark:hover:text-primaryDark transition-colors' href="mailto:ai.goutamsachdev@gmail.com">
            Let&rsquo;s talk
          </a>
        </div>
      </Layout>
    </footer>
  )
}

export default Footer
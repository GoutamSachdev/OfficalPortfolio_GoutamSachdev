import Link from 'next/link'
import React from 'react'
import Layout from './Layout'
import SocialButton from './SocialButton'
import { GithubIcon, LinkedInIcon, DownloadIcon } from './Icon'

const Footer = () => {
  return (
    <footer className='w-full border-t border-solid border-line
    font-medium text-base dark:text-light dark:border-lineDark
    '>
      <Layout className='py-8 flex flex-col sm:flex-row items-center justify-between flex-wrap gap-6'>
        <span> {new Date().getFullYear()}
          &copy; Goutam Sachdev. All Rights Reserved
        </span>

        <nav aria-label='Footer' className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
          <Link href='/' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Home</Link>
          <Link href='/about' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>About</Link>
          <Link href='/projects' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Projects</Link>
          <Link href='/skills' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Skills</Link>
          <Link href='/articles' className='hover:text-primary dark:hover:text-primaryDark transition-colors'>Articles</Link>
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
          <a
            className='inline-flex items-center gap-1.5 underline hover:text-primary dark:hover:text-primaryDark transition-colors'
            href="/Goutam-Sachdev.pdf"
            target='_blank'
            rel='noopener noreferrer'
            download
          >
            <DownloadIcon className='w-4' />
            Résumé
          </a>
          <a className='underline hover:text-primary dark:hover:text-primaryDark transition-colors' href="mailto:ai.goutamsachdev@gmail.com">
            Let&rsquo;s talk
          </a>
        </div>
      </Layout>

      {/* Extra bottom room on phones so the fixed HireJob button never sits on
          top of this row. */}
      <Layout className='pb-24 pt-0 sm:pb-8'>
        <p className='text-sm text-center sm:text-left text-dark/60 dark:text-light/60'>
          <span className='inline-flex items-center gap-2'>
            <span className='relative flex h-2 w-2' aria-hidden='true'>
              <span className='absolute inline-flex h-full w-full rounded-full bg-primary/60 motion-safe:animate-ping' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-primary' />
            </span>
            Based in Karachi, Pakistan (PKT) · open to remote roles worldwide and to relocation
          </span>
        </p>
      </Layout>
    </footer>
  )
}

export default Footer
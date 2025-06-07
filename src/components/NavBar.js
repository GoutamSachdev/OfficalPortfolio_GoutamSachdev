import Link from 'next/link'
import React from 'react'
import {useRouter} from 'next/router'
import Logo from '@/components/Logo'
import  { TwitterIcon,LinkedInIcon,DribbbleIcon,PinterestIcon, GithubIcon, SunIcon, MoonIcon } from './Icon'
import {motion} from "framer-motion"
import useSwitcherTheme from './hooks/useSwitcherTheme'

const CustomLink =({href,title,className=""})=>{
    const router = useRouter();
    return(
        <Link href={href} className={`${className} relative group`}>
         {title}
         <span className={`h-[1px] inline-block w-0 bg-dark 
         absolute left-0 -bottom-0.5
         group-hover:w-full  
         transition-[width] ease duration-300  ${router.asPath === href ? 'w-full':'w:0'} dark:bg-light`}>
                &nbsp;
         </span>
         </Link>
    );
}

const NavBar = () => {
    const [mode,setMode]=useSwitcherTheme();

    return (
        <header
            className='w-full px-4 sm:px-8 md:px-16 lg:px-32 py-8 font-medium flex items-center justify-between dark:text-light'
        >
            <nav className='flex items-center justify-center flex-wrap'>
                <CustomLink href='/' title="Home" className='mr-4'/>
                <CustomLink href='/about' title="About" className='mx-4'/>
                <CustomLink href='/projects' title="Project" className='mx-4'/>
                <CustomLink href='/articles' title="Articles" className='ml-4'/>
            </nav>

            <nav className='flex items-center justify-center flex-wrap'>
                <motion.a href='https://github.com/GoutamSachdev' target={'_blank'}
                    whileHover={{y:-2}}
                    whileTap={{scale:0.9}}
                    className='w-6 mx-3'>
                    <GithubIcon />
                </motion.a>
                <motion.a href='https://www.linkedin.com/in/goutam-sachdev-978435190/' target={'_blank'}
                    whileHover={{y:-2}}
                    whileTap={{scale:0.9}}
                    className='w-6 mx-3'>
                    <LinkedInIcon/>
                </motion.a>
                <button onClick={()=>setMode(mode==="dark" ? "light" : "dark")}
                    className='ml-3 flex items-center justify-center rounded-full p-1
                    ${mode==="light" ? "bg-dark text-light" : "bg-light text-dark"}'>
                    {
                        mode==="dark" ? <SunIcon className={`fill-yellow-500`}/> : <MoonIcon className={`fill-dark`}/>
                    }
                </button>
            </nav>

            <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
                <Logo />
            </div>
        </header>
    )
}

export default NavBar
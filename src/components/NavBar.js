import Link from 'next/link'
import React from 'react'
import {useRouter} from 'next/router'
import Logo from '@/components/Logo'
import  { TwitterIcon,LinkedInIcon,DribbbleIcon,PinterestIcon, GithubIcon } from './Icon'
import {motion} from "framer-motion"


const CustomLink =({href,title,className=""})=>{
    const router = useRouter();
    console.log(router);
        return(
            <Link href={href} className={`${className} relative group`}>
             {title}
             <span className={`h-[1px] inline-block w-0 bg-dark 
             absolute left-0 -bottom-0.5
             group-hover:w-full  
             transition-[width] ease duration-300  ${router.asPath === href ? 'w-full':'w:0'}`}>

                    &nbsp;
             </span>
                 </Link>
        );
}

const NavBar = () => {
    return (
        <header
            className='w-full px-32 py-8 font-medium flex items-center justify-between'
        >
            <nav>
                <CustomLink href='/' title="Home" className='mr-4'/>
                <CustomLink href='/about' title="About" className='mx-4'/>
                <CustomLink href='/projects'title="Project" className='mx-4'/>
                <CustomLink href='/articles' title="Articles" className='ml-4'/>
            </nav>

          
           <nav className='flex  items-center justify-center flex-wrap'>
          { /*   <motion.a href='/' target={'_blank'} 
            whileHover={{y:-2}}
            whileTap={{scale:0.9}}
            className='w-6 mx-3 ' >
                <TwitterIcon />
            </motion.a> */}
            <motion.a href='https://github.com/GoutamSachdev' target={'_blank'}
             whileHover={{y:-2}}
             whileTap={{scale:0.9}}
             className='w-6 mx-3 ' >
                <GithubIcon />
            </motion.a>
            <motion.a href='https://www.linkedin.com/in/goutam-sachdev-978435190/' target={'_blank'}
             whileHover={{y:-2}}
             whileTap={{scale:0.9}}
             className='w-6 mx-3 ' >
                <LinkedInIcon/>
            </motion.a>
            { /* <motion.a href='/' target={'_blank'}
             whileHover={{y:-2}}
             whileTap={{scale:0.9}}
             className='w-6 mx-3 ' >
            <PinterestIcon/>
            </motion.a>*/}
            { /* <motion.a href='/' target={'_blank'}
             whileHover={{y:-2}}
             whileTap={{scale:0.9}}
             className='w-6 mx-3 ' >
            <DribbbleIcon />
            </motion.a>*/}
            <motion.a href='/' target={'_blank'} >
            
            </motion.a>
           </nav>

           <div className='absolute  left-[50%] top-2 translate-x-[-50%]'>
           <Logo />
           </div>
        </header>
    )
}

export default NavBar
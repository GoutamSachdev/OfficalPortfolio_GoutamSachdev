import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

const Footer = () => {
  return (
   <footer className='w-full border-t-2 border-solid border-primary 
   font-medium text-lg  
   '> 
    <Layout className='py-8  flex items-center justify-between '>
        <span> {new Date().getFullYear()}
            &copy;  All Right Reserved 
            
        </span>
        <div className='flex items-center  '>
        
          <span  className='text-primary text-2xl hover:text-primaryDark '> &#64;</span>
          <Link className='underline' href={""}>
          GoutamSachdev
        </Link>
       
        </div>
        <Link href={""}>
         HeLLo
        </Link>
    </Layout>
   </footer>
  )
}

export default Footer
import React, { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Lilcon from '../components/Lilcon'
const Detail=({position, company , companyLink,time, address,work})=>{
    const ref = useRef(null)
   return<li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between'> 
        <Lilcon reference={ref} />
        <motion.div initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type: "spring"}}>
            <h3 className=' capitalize font-bold text-2xl'>{position } &nbsp; 
            <a href={companyLink} target='_blank ' className=' text-primary capitalize'>
                @{company}</a></h3>
            <span className='cap font-medium text-dark/75  '>
                {time} | {address}
            </span>
            <p className='font-medium w-full'>
                {work}
            </p>
        </motion.div>
    </li>
}

const Experience = () => {
    const ref = useRef(null)
    const {scrollYProgress}=useScroll({
        target: ref,
        offset:['start end ',"center start"]
    })
  return (
    <div className=' my-64 '>
        <h2 className='font-bold text-8xl mb-32 w-full text-center'>
            Experience
        </h2>
        <div ref={ref} className='w-[75%] mx-auto relative '>
        <motion.div className=' absolute left-9 top-0 w-[4px] h-full bg-dark origin-top'
                    style={{scaleY:scrollYProgress}}
        />
            <ul className='w-full flex flex-col items-start jsutify-between ml-4 '>
                <Detail position={"Python Developer | Software Engineer"} company={'BitsWits'}  companyLink='https://www.bitswits.com/' time={'2025-Present'} address={'Karachi, Pakistan'} work={"Collaborated with clients to develop new features, enhance the accuracy and relevance of project outcomes, and create innovative tools for data analysis and visualization."} />
             </ul>
             
        </div>
    </div>
  )
}

export default Experience
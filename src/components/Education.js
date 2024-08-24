import React, { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Lilcon from '../components/Lilcon'
const Detail=({type,time,place,info})=>{
    const ref = useRef(null)
   return<li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between'> 
        <Lilcon reference={ref} />
        <motion.div initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type: "spring"}}>
            <h3 className=' capitalize font-bold text-2xl'>{type }</h3>
            <span className='cap font-medium text-dark/75  '>
                {time} | {place}
            </span>
            <p className='font-medium w-full'>
                {info}
            </p>
        </motion.div>
    </li>
}

const Education = () => {
    const ref = useRef(null)
    const {scrollYProgress}=useScroll({
        target: ref,
        offset:['start end ',"center start"]
    })
  return (
    <div className=' my-64 '>
        <h2 className='font-bold text-8xl mb-32 w-full text-center'>
            Education
        </h2>
        <div ref={ref} className='w-[75%] mx-auto relative '>
        <motion.div className=' absolute left-9 top-0 w-[4px] h-full bg-dark origin-top'
                    style={{scaleY:scrollYProgress}}
        />
            <ul className='w-full flex flex-col items-start jsutify-between ml-4 '>
                <Detail type={" Bachelor of Science In Computer Science "}
                 time={'2020-2024 | 3.10 / 4.00  '}  
                 place={"SUKKUR IBA UNIVERSITY"}
                  info={'Relevant courses included Data Structures and Algorithms, Computer Architecture and Assembly, Computer Vision and Artificial Intelligence.'} 
                  />
               
             </ul>
             
        </div>
    </div>
  )
}

export default Education
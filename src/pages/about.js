import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import  Head  from 'next/head'
import Image from 'next/image'
import  Skill from '@/components/Skill'
import React, { useEffect, useRef } from 'react'
import profilepic from '../../public/images/profile/Profile.jpg'
import {  animated } from 'react-spring';
import { useInView, useMotionValue,useSpring } from 'framer-motion'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
const AnimateNo=({value})=>{
  const ref= useRef(null)
  const motionValue= useMotionValue(0)
  const spring= useSpring(motionValue,{duration:3000})
  const inVeiw=  useInView(ref,{once: true})


  useEffect(()=>{
     if(inVeiw){
       motionValue.set(value);
       
     }

  }, [inVeiw,value,motionValue])
  useEffect(()=>{
   spring.on("change",(latest)=>{

      if(ref.current && latest.toFixed(0)   <=value){
       ref.current.textContent =latest.toFixed(0); 
      }

      
     })
  },[spring,value])
   return <span ref={ref}></span>
   
 }
const About = () => {

 


  return (
    <>
      <Head>
        <title> Goutam Sachdev | About Page </title>
        <meta
          name="description "
          content="@GoutamSachdev Portfolio Computer Science  "
        />
      </Head>
      <main className="flex w-full flex-col items-center jsutify-center ">
        <Layout className="pt-10">
          <AnimatedText
            className="!text-5xl m-16"
            text={"Enthusiasm drives a meaningful purpose!"}
          />
          <div  className="grid w-full grid-cols-8 gap-16 ">
            <div className="col-span-3 flex flex-col items-start  justify-normal">
              <h2 className="mb-5 text-lg font-bold uppercase text-dark/75">
                Personal narrative
              </h2>
              <p className='text-xs my-4 font-bold'>
                Hey there, I'm Goutam, your go-to Python Developer and Software Engineer embarking on an exhilarating tech journey. With an unwavering zest for innovation, I've navigated the realms of coding and design throughout my academic and professional ventures. Armed with a strong foundation in Computer Science from Sukkur IBA University, I've honed my skills in languages like Java and Python, fueling my passion for crafting digital masterpieces.
                </p>
                <p className='text-xs my-4 font-bold'>
                It's about solving problems and creating intuitive, enjoyable experiences for users. -I use Django-Flask and React-Javascript to create user-friendly digital experiences by merging functionality with aesthetics.
                </p>
               <p className='text-xs my-4 font-bold '>
               Whether it's a website, a mobile app, or any digital project, my commitment to design excellence and user-centered thinking shines through in every endeavor. I eagerly anticipate the chance to contribute my skills and passion to your upcoming project.
               </p>
            </div>
           <div className='  col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8  '>
            <div className=' absolute top-0 -right-3 -z-10 w-[104%] h-[104%] rounded-2xl bg-dark '/>
            <Image src= {profilepic} alt="@goutamsachdev" className="w-full h-full rounded-2xl "/> 
           </div>


           <div className='col-span-2 flex flex-col items-end justify-between'>
            <div className='flex flex-col items-end justify-center '>
              <span className=' inline-block text-5xl font-bold text-dark/75 '> 
                <AnimateNo value={50} />+
              </span>
              <h2 className='text-lg  font-medium capitalize' >
                Project 
              </h2>
              <h2 className='text-lg  font-medium capitalize text-dark /75 ' >
                 Satisfied Completed
              </h2>
              
            </div>
            <div className='flex flex-col items-end justify-center '>
              <span className=' inline-block text-5xl font-bold tex-dark/75 '> 
              <AnimateNo value={20} />+
              </span>
              <h2 className=' text-lg font-medium capitalize text-dark/75' >
                Satisfied Clients
              </h2>
              
              
            </div>
            <div className='flex flex-col items-end justify-center '>
              <span className=' inline-block text-5xl font-bold text-dark/75 '> 
              <AnimateNo value={1} />+
              </span>
              <h2 className='text-lg font-medium capitalize text-dark'>
                Year Experienced 
              </h2>
               </div>
           </div>
          </div>

          <Skill />
          <Experience />
          <Education />
        </Layout>
      </main> 




    </>
  );
}

export default About
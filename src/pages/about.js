import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import Image from 'next/image'
import Skill from '@/components/Skill'
import React, { useEffect, useRef } from 'react'
import profilepic from '../../public/images/profile/Profile.jpg'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'

const AnimateNo = ({ value }) => {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 3000 })
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue])

  useEffect(() => {
    spring.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    })
  }, [spring, value])

  return <span ref={ref}></span>
}

const About = () => {
  return (
    <>
      <Seo
        title="About"
        description="About Goutam Sachdev — an AI Software Engineer with 2 years building production AI: LLM chatbots, agentic automation, RAG systems, and computer-vision apps in Python, FastAPI, Django, LangChain, and Next.js."
        path="/about"
      />
      <main id="content" className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-10">
          <AnimatedText
            className="!text-3xl sm:!text-5xl md:!text-6xl my-6 sm:my-12"
            text={"Enthusiasm drives a meaningful purpose!"}
          />
          <div className="grid w-full grid-cols-1 md:grid-cols-8 gap-8 md:gap-12">
            <div className="md:col-span-3 flex flex-col items-start justify-normal order-2 md:order-1">
              <h2 className="mb-5 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Personal narrative
              </h2>
              <p className="text-sm my-4 font-medium">
                I&apos;m Goutam Sachdev, an AI Software Engineer with 2 years building production AI — LLM-powered chatbots, agentic automation, RAG systems, and computer-vision apps. With a strong foundation in Computer Science from Sukkur IBA University, I work across the stack in Python, FastAPI, Django, LangChain, LangGraph, and Next.js to ship systems that cut support workload, speed up workflows, and reduce operational cost.
              </p>
              <p className="text-sm my-4 font-medium">
                It&apos;s about solving real problems and creating intuitive, enjoyable experiences. I blend AI with solid backend engineering and a frontend built in React and Next.js, merging functionality with aesthetics.
              </p>
              <p className="text-sm my-4 font-medium">
                Whether it&apos;s a voice agent, a retrieval system, or a full AI web app, my commitment to design excellence and user-centered thinking shows in every project. I&apos;m always up for the next ambitious build.
              </p>
            </div>
            <div className="md:col-span-3 relative h-max rounded-2xl border border-solid border-line bg-light p-2 shadow-card hover:shadow-cardHover transition-shadow duration-300 dark:bg-dark dark:border-lineDark order-1 md:order-2">
              <Image src={profilepic} alt="Goutam Sachdev working on AI development" className="w-full h-full rounded-xl" />
            </div>

            <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between gap-8 md:gap-0 order-3">
              <div className="flex flex-col items-start md:items-end justify-center" aria-label="2+ years of experience">
                <span className="inline-block text-4xl sm:text-5xl font-bold text-dark/75 dark:text-light/75">
                  <AnimateNo value={2} />+
                </span>
                <h2 className="text-lg font-medium capitalize text-dark/75 dark:text-light/75">
                  Years Experience
                </h2>
              </div>
              <div className="flex flex-col items-start md:items-end justify-center" aria-label="10+ AI projects shipped">
                <span className="inline-block text-4xl sm:text-5xl font-bold text-dark/75 dark:text-light/75">
                  <AnimateNo value={10} />+
                </span>
                <h2 className="text-lg font-medium capitalize text-dark/75 dark:text-light/75">
                  AI Projects
                </h2>
              </div>
              <div className="flex flex-col items-start md:items-end justify-center" aria-label="7+ certifications earned">
                <span className="inline-block text-4xl sm:text-5xl font-bold text-dark dark:text-light">
                  <AnimateNo value={7} />+
                </span>
                <h2 className="text-lg font-medium capitalize text-dark dark:text-light">
                  Certifications
                </h2>
              </div>
            </div>
          </div>

          <Skill />
          <Experience />
          <Education />
          <Certifications />
        </Layout>
      </main>
    </>
  );
}

export default About

import React, { useRef } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import { LinkedInIcon } from "@/components/Icon";
import project1 from "../../public/images/projects/python.png"
import project2 from "../../public/images/projects/hanker.png"
import { motion, useMotionValue } from "framer-motion";
import goti from "../../public/images/projects/Got.png";
import Link from "next/link";
import Image from "next/image";

const FramerImage=motion(Image);
const  MovingImg=({title, img, link})=>{
  const x= useMotionValue(0);
  const y= useMotionValue(0);
  const imgRef= useRef(null);


  function handleMouse(event){
    imgRef.current.style.display="inline-block"
    x.set(event.pageX)
    y.set(-10)

  }
  function handleMouseLeave(event) {
    imgRef.current.style.display="none"
    x.set(0)
    y.set(0)
    
  }

  return(
    <>
    <Link href={link} target="_blank" onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
  <h2 className="captilize text-xl font-semibold hover:underline">
    {title}
  </h2>
  <FramerImage style={{x:x,y:y}}
  initial={{opacity:0}}
  whileInView={{opacity:1, transition: {duration:0.2}}}
   ref={imgRef} src={img} alt={title} className="w-96 h-auto hidden absolute rounded-lg  "/>
  </Link>

    </>
  )
}
const Article = ({img, title , date , link})=>{
 return(
  <>
  <motion.li initial={{y:200}}
  whileInView={{y:0,transition:{duration:0.2 ,ease:"easeInOut"}}}
  viewport={{once:true}}
   className="relative w-full p-4  py-6 my-6 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4">
  <MovingImg title={title} img={img} link={link} />
  <span className="text-primary font-semibold pl-4">{date}
  </span>
  </motion.li>
  </>
 )
}
const FeaturedCerticate = ({ title, summary, img, link, github }) => {
  return (
    <article className="w-full flex flex-col item-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative">
      <Link
        href={link}
        target="_blank"
        className="w-full  cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage src={img} alt={title} className="w-full h-auto"
        whileHover={{scale:1.05}}
        transition={{duration:0.2}} />
      </Link>
      <div className="w-full  flex flex-col items-start justify-between mt-4">
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2 "
        >
          <h2 className="my-2 w-full text-left text-3xl  font-bold  ">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark ">{summary}</p>
        <div className=" w-full mt-2 flex  items-center justify-between ">
          <Link href={github} target="_blank" className="w-10">
            <LinkedInIcon />{" "}
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg  bg-primaryDark text-mixColr-0 p-2   px-6 text-lg font-semibold "
          >
            Go to
          </Link>
        </div>

        <span></span>
      </div>
    </article>
  );
};

const FeaturedArticle=({img, title, time, summary, link})=>{
    
    return(
      <li className="col-span-1 w-full p-4 bg-light border border-solid  border-dark rounded-2xl ">
        <Link href={link} target="_blank" className="w-full inline-block cursor-pointer overflow-hidden rounded-lg">

        <FramerImage src={img} alt={title} className="w-full h-auto"/>
        </Link>

        <Link href={link} target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underlines">{title}</h2>
        </Link>
        <p className="text-sm mb-2 ">
              {summary}
        </p>
        <span className="text-primary font-semibold">{time}</span>
      </li>
    )
}

const articles = () => {
  return (
    <>
      <Head>
        <title> Goutam Sachdev | Articles Page </title>
        <meta
          name="description "
          content="@GoutamSachdev Portfolio Computer Science  "
        />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText text={"Everything will be here "} className="mb-16 " />
          <ul className="grid grid-cols-2 gap-16">
            <li>
            <FeaturedCerticate
                title={"Intermediate Python"}
                summary={
                  "DataCamp |  Credential ID #30,476,652"
                }
                img={project1}
                link={"https://www.linkedin.com/in/goutam-sachdev-978435190/details/certifications/"}
                github={
                  "https://www.datacamp.com/statement-of-accomplishment/course/7df9722485989a6d328a7be6f700053257ea5c32?raw=1"
                }
              />
            </li>
            <li>
            <FeaturedCerticate
                title={"Problem Solving Certificate"}
                summary={
                  "HackerRank |  Credential ID : De583633d481"
                }
                img={project2}
                link={"https://www.linkedin.com/in/goutam-sachdev-978435190/details/certifications/"}
                github={
                  "https://www.hackerrank.com/certificates/iframe/de583633d481"
                }
              />
            </li>
          </ul>
          <h2 className=" font-bold text-4xl w-full text-center my-16 mt-32 ">All Articles</h2>
          <ul>
          <Article 
  img={goti}
  title="COMING SOON" 
  date="" 
  link={"/"}
/>
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default articles;

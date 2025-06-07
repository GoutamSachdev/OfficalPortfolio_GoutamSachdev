import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import goti from "../../public/images/projects/Got.png"; 
import project1 from "../../public/images/projects/Scrollsmart_assistant-ai.png";
import { GithubIcon } from "@/components/Icon";
import Image from "next/image";
import docker from "../../public/images/projects/docker.png";
import mob from "../../public/images/projects/Mob Application.png";
import imgpro from "../../public/images/projects/Screenshot (73).png";
import cvmh from "../../public/images/projects/Screenshot (95).png";
import finalYear from "../../public/images/projects/FInal Year.jpeg";
import { motion } from "framer-motion";
const FramerImage=motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article className="w-full flex flex-col lg:flex-row items-center justify-between rounded-3xl border border-solid relative border-dark bg-light shadow-2xl p-6 lg:p-12">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light" />
      <Link
        href={link}
        target="_blank"
        className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg"
      >
       <FramerImage src={img} alt={title} className="w-full h-auto"
        whileHover={{scale:1.05}}
        transition={{duration:0.2}} />
      </Link>
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between lg:pl-6 mt-6 lg:mt-0">
        <span className="text-primary font-medium text-xl">{type}</span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-2xl lg:text-4xl font-bold">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light">{summary}</p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light dark:bg-light dark:text-dark p-2 px-6 text-lg font-semibold"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, summary, img, link, github }) => {
  return (
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light">
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
       <FramerImage src={img} alt={title} className="w-full h-auto"
        whileHover={{scale:1.05}}
        transition={{duration:0.2}} />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-4">
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-2xl lg:text-3xl font-bold dark:text-light">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light">{summary}</p>
        <div className="w-full mt-2 flex items-center justify-between">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light dark:bg-light dark:text-dark p-2 px-6 text-lg font-semibold"
          >
            Go to
          </Link>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  return (
    <>
      <Head>
        <title>Goutam Sachdev | Project Page</title>
        <meta
          name="description"
          content="@GoutamSachdev Portfolio Computer Science"
        />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge"
            className="mb-16"
          />
          <div className="grid grid-cols-12 gap-6 lg:gap-24">
            <div className="col-span-12">
              <FeaturedProject
                title={"Goti: Next-Gen Voice Assistant with LLaMA 3"}
                summary={
                  "Goti is an advanced voice assistant powered by the LLaMA 3 model, featuring real-time voice-to-text conversion and custom fine-tuning. Built with Python and cutting-edge speech recognition technology, Goti blends trendy and professional tones to offer engaging and precise interactions."
                }
                img={goti}
                link={"https://www.linkedin.com/feed/update/urn:li:activity:7232670254324174849/"}
                github={
                  "https://github.com/GoutamSachdev/Voice-Assistant-LAMA-3.git"
                }
                type="Feature Project"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Project
                title={"Scrollsmart_assistant-ai"}
                summary={
                  "ScrollAssistant is an innovative website that enhances news reading by enabling users to control scrolling, opening, and closing of news articles through voice commands. Built with React.js and powered by Alan AI, it also features an integrated chatbot for an interactive user experience"
                }
                img={project1}
                link={"/"}
                github={
                  "https://github.com/GoutamSachdev/Scrollsmart_assistant-ai.git"
                }
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Project
                title={"FastAPI with Hugging Face Transformers on Docker"}
                summary={
                  "deploys a FastAPI app using Hugging Face Transformers for text generation within a Docker container. This setup simplifies deployment on platforms like Hugging Face Spaces, with key files including app.py for the application code, Dockerfile for the image, and requirements.txt for dependencies."
                }
                img={docker}
                link={"https://www.linkedin.com/posts/goutam-sachdev-978435190_fastapi-huggingface-transformers-activity-7226956075768397824-3Jp2?utm_source=share&utm_medium=member_desktop"}
                github={
                  "https://github.com/GoutamSachdev/Docker-GENAI.git"
                }
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title={"Chat_Live Application with Status Feature"}
                summary={
                  "This project is a real-time chat app built with Jetpack Compose for the UI and Firebase for backend services. Features include real-time messaging, user authentication (email/password and Google Sign-In), status image sharing, profile management, password reset, and push notifications."
                }
                img={mob}
                link={"https://www.linkedin.com/posts/goutam-sachdev-978435190_appdevelopment-jetpackcompose-firebase-activity-7212093527697027072-R_3Y?utm_source=share&utm_medium=member_desktop"}
                github={
                  "https://github.com/GoutamSachdev/Chat_live-.git"
                }
                type="Feature Project"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Project
                title={"Image_Processing_Application (CV)"}
                summary={
                  "This Image Processing Application allows users to apply various filters and transformations to grayscale images. It is built using Streamlit, a popular Python framework for creating interactive web applications. Users can upload a subject image, choose from several filters, and view the results directly in the application interface."
                }
                img={imgpro}
                link={"/"}
                github={
                  "https://github.com/GoutamSachdev/Image_Processing_Application.git"
                }
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Project
                title={"CV- HandGestureVolume & AI Virtual Mouse"}
                summary={
                  "This computer vision project uses AI to enable virtual mouse control and hand gesture-based volume adjustment. It translates hand movements into mouse actions and adjusts volume based on specific gestures, providing an intuitive and hands-free interface."
                }
                img={cvmh}
                link={"/"}
                github={
                  "https://github.com/GoutamSachdev/Image_Processing_Application.git"
                }
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title={"Wristminder-Pro-Automated-Radiological-Report-Generation-"}
                summary={
                  "Led the development of WristMinder Pro, an automated radiological report generation tool focused on pediatric wrist anomalies. Utilized the GRAZPEDWRI-DX dataset and the IDEFICS visual language model, achieving strong evaluation metrics like ROUGE and BLEU. Collaborated with radiologists and experts, contributing to a robust dataset and creating an Android app for streamlined X-ray uploads"
                }
                img={finalYear}
                link={"https://www.linkedin.com/posts/goutam-sachdev-978435190_wristminderproinjuryreportgeneration-finalyearproject-activity-7212075540466327552-jB42?utm_source=share&utm_medium=member_desktop"}
                github={
                  "https://github.com/GoutamSachdev/Wristminder-Pro-Automated-Radiological-Report-Generation-.git"
                }
                type="Feature Project"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;

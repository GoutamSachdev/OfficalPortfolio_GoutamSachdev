import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import proPic from "../../public/images/profile/developer-pic-1.png";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";
import { AnimatedArrow } from "@/components/Icon";
import HireJob from "@/components/HireJob";
import PathGame from "@/components/PathGame";
import lightBulb from '../../public/images/svgs/miscellaneous_icons_1.svg'

// components/TypewriterComponent.js
import { useState, useEffect } from 'react';

const phrases = [
  'Goutam Sachdev',
  'Gen-AI Enthusiast',
  'ML Expert',
  'Python Developer',
  'AI Developer'
];

const MARQUEE = [
  "Python", "LangChain", "LangGraph", "CrewAI", "RAG", "Graph RAG", "LlamaIndex",
  "FastAPI", "Django", "Next.js", "React", "PostgreSQL", "pgvector", "Redis",
  "Celery", "LiveKit", "OpenAI SDK", "PyTorch", "TensorFlow", "Docker", "MongoDB",
  "Pinecone", "ChromaDB", "n8n", "Computer Vision", "Agentic AI"
];

const TypewriterComponent = ({ className }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const timeout = setTimeout(() => {
      setText(currentPhrase.substring(0, charIndex + (isDeleting ? -1 : 1)));
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
      }
      if (charIndex === currentPhrase.length) {
        setIsDeleting(true);
      } else if (charIndex === 0 && isDeleting) {
        setIsDeleting(false);
        setIndex((index + 1) % phrases.length);
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <div className={`font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl flex flex-wrap items-center justify-center space-x-3 ${className}`}>
      <span>I am</span>
      <strong className="bg-primary text-light px-2 rounded-md">
        <span aria-live="polite">{text}</span>
      </strong>
    </div>
  );
};



export default function Home() {
  return (
    <>
      <Seo
        title="Goutam Sachdev | AI Engineer — LLM, RAG & Voice AI"
        description="Goutam Sachdev — AI Software Engineer building production AI: LLM chatbots, agentic automation, RAG systems, voice agents, and full-stack AI web apps in Python, FastAPI, Django, LangChain, LangGraph, and Next.js. Open to remote roles worldwide."
        path="/"
      />
      <main id="content" className="flex items-center text-dark w-full min-h-screen dark:text-light relative overflow-hidden">
        {/* aurora background */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -right-24 w-[36vw] h-[36vw] rounded-full bg-primaryDark/20 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <Layout className="pt-0 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">
            <div className="w-full lg:w-1/2">
              <Image
                src={proPic}
                alt="Portrait of Goutam Sachdev, AI software engineer"
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start self-center">
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-solid border-line
                bg-light/70 px-3 py-1.5 text-xs sm:text-sm font-semibold text-dark/80
                shadow-soft dark:border-lineDark dark:bg-dark/60 dark:text-light/80"
              >
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                Open to remote roles worldwide · open to relocation
              </div>
              <div className="container mx-auto p-4 lg:pl-10">
                <TypewriterComponent className="text-center lg:text-left" />
              </div>
              <div className="text-center lg:text-left">
                <AnimatedText
                  text="Unveiling innovation through code and algorithms"
                  as="h1"
                  className="!text-3xl sm:!text-4xl md:!text-5xl"
                />
                <AnimatedText
                  text="shaping tomorrow&apos;s reality, today and beyond"
                  as="h2"
                  className="!text-sm sm:!text-base font-medium text-dark/70 dark:text-light/70 mt-2"
                />
              </div>

              <motion.p
                className="my-2 text-sm font-light text-center lg:text-left"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                AI Software Engineer shipping production LLM, RAG, and voice-AI systems.
                Based in Karachi, I work remotely with teams worldwide and I&apos;m open
                to relocation.
              </motion.p>
              <div className="flex items-center self-center lg:self-start mt-2 gap-4">
                <Link
                  href="/Goutam-Sachdev.pdf"
                  target={"_blank"}
                  className="group flex items-center bg-dark text-light p-2 px-4 sm:p-2.5 sm:px-6
                  rounded-lg text-base sm:text-lg font-semibold shadow-soft hover:shadow-cardHover
                  transition-all duration-300 hover:-translate-y-0.5 active:scale-95
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark dark:hover:border-light"
                  download={true}
                >
                  Resume <AnimatedArrow className={"w-5 sm:w-6 ml-1"} />
                </Link>
                <Link
                  className="text-base sm:text-lg font-medium capitalize text-dark underline
                  underline-offset-4 decoration-primary decoration-2 hover:text-primary transition-colors
                  dark:text-light dark:hover:text-primaryDark"
                  href="mailto:ai.goutamsachdev@gmail.com"
                  target={"_blank"}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Trace the road — the one interactive thing on the page. */}
          <section className="mt-20 lg:mt-28 w-full" aria-labelledby="path-heading">
            <h2
              id="path-heading"
              className="text-center text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-dark via-primary to-primaryDark dark:from-light dark:via-primary dark:to-primaryDark bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x"
            >
              Find the path
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-sm font-medium text-dark/60 dark:text-light/60">
              A road, drawn by hand. Move your cursor along it and the pen follows —
              no clicking, and no way to go wrong.
            </p>
            <PathGame />
          </section>

          {/* What I do — keyword-rich services strip */}
          <section className="mt-20 lg:mt-28 w-full">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 bg-gradient-to-r from-dark via-primary to-primaryDark dark:from-light dark:via-primary dark:to-primaryDark bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              What I build
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "AI Chatbots & Agents", d: "LLM-powered support & sales chatbots with LangChain, LangGraph, and CrewAI — RAG-backed, <2s latency, AI-to-human escalation." },
                { t: "RAG & Knowledge Systems", d: "Hybrid retrieval with LlamaIndex, Graph RAG, Deep Lake, and vector stores for accurate, source-grounded answers." },
                { t: "Voice AI", d: "Real-time voice agents with LiveKit, Twilio, Whisper STT, and Cartesia TTS — natural, low-latency conversations." },
                { t: "Full-stack AI Web Apps", d: "End-to-end products with Next.js, FastAPI, Django, and PostgreSQL — from frontend to ML backend." },
              ].map((s) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-solid border-line bg-light/70 p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 dark:bg-dark/60 dark:border-lineDark"
                >
                  <h3 className="text-lg font-bold mb-2 dark:text-light">{s.t}</h3>
                  <p className="text-sm font-medium text-dark/70 dark:text-light/70">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tech marquee */}
          <section className="mt-20 w-full overflow-hidden" aria-hidden>
            <div className="flex w-max animate-marquee gap-4 py-2">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span
                  key={t + i}
                  className="text-lg sm:text-xl font-semibold text-dark/40 dark:text-light/40 whitespace-nowrap"
                >
                  {t} <span className="text-primary">•</span>
                </span>
              ))}
            </div>
          </section>
        </Layout>
        <HireJob />

        {/* Decoration only: held back below `sm`, where it would sit on top of
            the tech marquee. */}
        <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 hidden sm:inline-block w-24" aria-hidden="true">
          <Image src={lightBulb} alt="" className="w-full h-auto" />
        </div>
      </main>
    </>
  );
}

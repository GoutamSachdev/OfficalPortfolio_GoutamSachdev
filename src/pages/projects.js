import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Tilt from "@/components/Tilt";
import Link from "next/link";
import goti from "../../public/images/projects/Got.png";
import finalYear from "../../public/images/projects/FInal Year.jpeg";
import cvmh from "../../public/images/projects/Screenshot (95).png";
import imgpro from "../../public/images/projects/Screenshot (73).png";
import blackjack from "../../public/images/projects/python.png";
import { GithubIcon, AnimatedArrow } from "@/components/Icon";
import SocialButton from "@/components/SocialButton";
import Image from "next/image";
import { motion } from "framer-motion";

const FramerImage = motion(Image);

const TechChips = ({ tech }) => (
  <div className="flex flex-wrap gap-1.5 my-3">
    {tech.map((t) => (
      <span
        key={t}
        className="text-xs font-medium px-2.5 py-1 rounded-full bg-dark/5 text-dark border border-line dark:bg-light/10 dark:text-light dark:border-lineDark"
      >
        {t}
      </span>
    ))}
  </div>
);

const MetricBadge = ({ metric }) =>
  metric ? (
    <span className="inline-block my-2 text-sm font-semibold px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
      {metric}
    </span>
  ) : null;

// Cover art. Some résumé work has no screenshot to hand, so instead of leaving a
// hole (or guessing at the wrong image) those cards get a generated panel: a
// gradient, a slowly rotating dashed ring, and the project's initials. Looks
// deliberate in both themes rather than like a missing asset.
const Artwork = ({ img, title, sizes = "(max-width: 1024px) 100vw, 50vw" }) => {
  if (img) {
    return (
      <FramerImage
        src={img}
        alt={title}
        sizes={sizes}
        className="w-full h-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
    );
  }

  const initials = title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-dark dark:bg-light">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primaryDark/40 to-primary/30 dark:from-primary/60 dark:via-primaryDark/30 dark:to-primary/20" />
      <div className="absolute -inset-8 motion-safe:animate-orbit">
        <svg viewBox="0 0 100 100" className="h-full w-full text-light/30 dark:text-dark/30" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.4 3" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.6 2.2" />
        </svg>
      </div>
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="font-mono text-5xl lg:text-6xl font-bold tracking-tight text-light/90 dark:text-dark/90">
          {initials}
        </span>
      </div>
      <span className="absolute bottom-3 left-3 rounded-full bg-dark/40 px-2.5 py-0.5 text-xs font-semibold text-light backdrop-blur-sm dark:bg-light/40 dark:text-dark">
        Production work
      </span>
    </div>
  );
};

// If only `github` (no live `link`), the visit button points to the repo.
const ProjectLinks = ({ link, github }) => {
  const isLinkedIn = (link || "").includes("linkedin.com");
  const label = isLinkedIn ? "View on LinkedIn" : github && !link ? "View code" : "Visit project";
  return (
  <div className="mt-2 flex items-center gap-4">
    {github && (
      <SocialButton href={github} label="GitHub repository" size="sm">
        <GithubIcon />
      </SocialButton>
    )}
    <Link
      href={link || github}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center rounded-lg bg-dark text-light dark:bg-light dark:text-dark p-2 px-5 text-base font-semibold shadow-soft hover:shadow-cardHover transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
    >
      {label}
      <AnimatedArrow className="w-4 ml-2" />
    </Link>
  </div>
  );
};

const FeaturedProject = ({ type, title, summary, img, link, github, tech, metric }) => (
  <Tilt className="w-full">
    <article className="w-full flex flex-col lg:flex-row items-center justify-between rounded-3xl border border-solid relative border-line bg-light shadow-card hover:shadow-cardHover transition-shadow duration-300 p-6 lg:p-12 dark:bg-dark dark:border-lineDark">
      {link || github ? (
        <Link href={link || github} target="_blank" rel="noopener noreferrer" className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg">
          <Artwork img={img} title={title} />
        </Link>
      ) : (
        <div className="w-full lg:w-1/2 overflow-hidden rounded-lg">
          <Artwork img={img} title={title} />
        </div>
      )}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between lg:pl-6 mt-6 lg:mt-0">
        <span className="text-primary font-medium text-xl">{type}</span>
        {link || github ? (
          <Link href={link || github} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-2xl lg:text-4xl font-bold dark:text-light">{title}</h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-2xl lg:text-4xl font-bold dark:text-light">{title}</h2>
        )}
        <p className="my-2 font-medium text-dark dark:text-light">{summary}</p>
        <TechChips tech={tech} />
        <MetricBadge metric={metric} />
        {(link || github) && <ProjectLinks link={link} github={github} />}
      </div>
    </article>
  </Tilt>
);

const Project = ({ type, title, summary, img, link, github, tech, metric }) => (
  <Tilt className="w-full h-full">
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-line bg-light p-6 relative shadow-soft hover:shadow-cardHover transition-shadow duration-300 dark:bg-dark dark:border-lineDark">
      {link || github ? (
        <Link href={link || github} target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer overflow-hidden rounded-lg">
          <Artwork img={img} title={title} sizes="(max-width: 1024px) 100vw, 50vw" />
        </Link>
      ) : (
        <div className="w-full overflow-hidden rounded-lg">
          <Artwork img={img} title={title} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      )}
      <div className="w-full flex flex-col items-start justify-between mt-4">
        {type && <span className="text-primary font-medium text-lg">{type}</span>}
        {link || github ? (
          <Link href={link || github} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-2xl lg:text-3xl font-bold dark:text-light">{title}</h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-2xl lg:text-3xl font-bold dark:text-light">{title}</h2>
        )}
        <p className="my-2 font-medium text-dark dark:text-light">{summary}</p>
        <TechChips tech={tech} />
        <MetricBadge metric={metric} />
        {(link || github) && <ProjectLinks link={link} github={github} />}
      </div>
    </article>
  </Tilt>
);

const Projects = () => {
  return (
    <>
      <Seo
        title="Projects"
        description="AI projects by Goutam Sachdev — a multi-tenant AI assistant platform, hybrid Graph RAG with multimodal document understanding, a laundry pickup and delivery backend, an e-commerce AI shopping assistant, and real-time voice support systems, plus a real-time voice AI agent for restaurant reservations, the Goti voice assistant, an automated pediatric wrist radiology report generator, a YOLOv8 computer-vision blackjack assistant, and an AI scheduling assistant."
        path="/projects"
      />
      <main id="content" className="w-full mb-16 flex flex-col items-center justify-center overflow-x-clip">
        <Layout className="pt-16">
          <AnimatedText text="Imagination Trumps Knowledge" className="mb-16" />
          <div className="grid grid-cols-12 gap-6 lg:gap-24">

            {/* ---- Production work from the résumé, shown first ---- */}

            <div className="col-span-12">
              <FeaturedProject
                type="Featured · Platform Engineering"
                title="SHIFU — Multi-tenant AI Assistant Platform"
                summary="A multi-tenant AI assistant platform in Python and FastAPI serving multiple customer workspaces — workspaces, bots, source ingestion, and bot deployment. RAG ingests customer documents into PostgreSQL/pgvector and answers with source citations; a model catalog behind an internal gateway routes by plan entitlement with per-plan credit metering, cutting inference cost by serving eligible requests through lower-cost models. Tenant isolation, role-based access control, and an append-only audit log record actor, target, and timestamp for every workspace action."
                tech={["Python", "FastAPI", "pgvector", "RAG", "Celery", "Redis", "Multi-tenancy", "RBAC"]}
                metric="Multi-tenant · cost-optimized inference"
              />
            </div>

            <div className="col-span-12">
              <FeaturedProject
                type="Featured · RAG & Retrieval"
                title="Hybrid Graph RAG with Multimodal Document Understanding"
                summary="A hybrid retrieval system built on LlamaIndex that combines Graph RAG with vector retrieval over Deep Lake for improved multi-hop reasoning. A Docling pipeline extracts structured context — text, tables, and charts — with advanced chunking and embedding strategies, and NVIDIA Nemotron Nano VLM adds multimodal understanding of graph images. Delivers sub-2s response latency with markedly better retrieval accuracy and answer relevance."
                tech={["LlamaIndex", "Graph RAG", "Deep Lake", "Docling", "NVIDIA Nemotron Nano VLM", "Vector Search"]}
                metric="Sub-2s latency · stronger multi-hop reasoning"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="Backend · Logistics"
                title="Washery — Laundry Pickup & Delivery Platform"
                summary="A scalable Django backend behind a washery mobile app, with customer and driver modules, JWT authentication, RESTful APIs, and an optimized cloth pickup and delivery order lifecycle. Kept API responses under 200ms with efficient PostgreSQL database operations."
                tech={["Django", "JWT Auth", "REST API", "PostgreSQL"]}
                metric="API responses under 200ms"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="Generative AI · E-commerce"
                title="E-commerce AI Shopping Assistant"
                summary="A generative AI assistant for Shopify and WordPress stores built with LangGraph and FastAPI. Handles natural-language product search, cart management, and in-chat product image rendering with AI-generated product descriptions through an embedded chatbot interface — improving product discovery speed by 80% with real-time inventory synchronisation via PostgreSQL."
                tech={["LangGraph", "FastAPI", "Shopify", "WordPress", "PostgreSQL"]}
                metric="+80% product discovery speed"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="Realtime · Customer Support"
                title="Real-time Voice Support Chatbot"
                summary="A real-time customer support chatbot on LiveKit (WebRTC) with a RAG backend powered by Sentence Transformers, LlamaIndex, and ChromaDB. FastAPI services handle knowledge retrieval and keep responses low-latency across live voice and text channels."
                tech={["LiveKit", "WebRTC", "Sentence Transformers", "LlamaIndex", "ChromaDB", "FastAPI"]}
                metric="Live voice + text support"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="NLP · Conversational"
                title="Customer Support Chatbot with AI-to-Human Escalation"
                summary="A customer support chatbot built on the OpenAI SDK with ChatKit — a RAG-based architecture with integrated appointment scheduling, consistent responses under 2 seconds average latency, and seamless escalation to a human agent. Zendesk CRM integration handles ticket creation, updates, and agent assignment while preserving conversation context through the handoff."
                tech={["OpenAI SDK", "ChatKit", "RAG", "Zendesk", "Next.js"]}
                metric="Under 2s latency · AI-to-human handoff"
              />
            </div>

            {/* ---- Earlier portfolio projects ---- */}

            <div className="col-span-12">
              <FeaturedProject
                type="Featured · Voice AI"
                title="AI Voice Agent — Restaurant Reservation"
                summary="A real-time voice AI agent that calls and converses with humans to handle restaurant reservations end-to-end. Built on a dual-agent architecture with LiveKit, Twilio, Groq, and Cartesia TTS, using Whisper-based STT, voice activity detection (VAD), and interruption handling for natural, low-latency interactions."
                img={cvmh}
                link="https://www.linkedin.com/posts/goutam-sachdev-978435190_ai-voiceai-llm-activity-7373068341373997056-mhhs"
                tech={["LiveKit", "Twilio", "Groq", "Cartesia TTS", "Whisper STT", "VAD"]}
                metric="Real-time outbound voice AI"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                title="Schedule Assistant"
                summary="An automated scheduling tool that integrates the Groq API, Gmail API, and Google Calendar. Uses LangGraph to resolve scheduling conflicts and coordinate meetings, cutting scheduling time by 60%."
                img={imgpro}
                github="https://github.com/GoutamSachdev/Schedule-Assistant-Groq-API"
                tech={["Groq API", "Gmail API", "Google Calendar", "LangGraph"]}
                metric="−60% scheduling time"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                title="AutoBlackjack"
                summary="A computer-vision blackjack assistant using YOLOv8 for real-time card detection, OpenCV for the pipeline, and the Hi-Lo counting algorithm to provide live betting recommendations. Achieved 95% card-detection accuracy. Built for educational purposes."
                img={blackjack}
                link="https://www.linkedin.com/posts/goutam-sachdev-978435190_autoblackjack-yolov8-opencv-activity-7365073017644679168-yMAh"
                tech={["YOLOv8", "OpenCV", "Hi-Lo"]}
                metric="95% card detection"
              />
            </div>

            <div className="col-span-12">
              <FeaturedProject
                type="Featured · Voice Assistant"
                title="Goti — Advanced Voice Assistant"
                summary="Goti is an advanced voice assistant powered by the LLaMA 3 model, featuring real-time voice-to-text conversion and a custom deep-learning transcription layer. Built with Python and modern speech recognition, it blends trendy and professional tones for engaging, precise interactions."
                img={goti}
                link="https://www.linkedin.com/feed/update/urn:li:activity:7232670254324174849/"
                github="https://github.com/GoutamSachdev/Voice-Assistant-LAMA-3"
                tech={["LLaMA 3", "Python", "Speech Recognition", "Deep Learning"]}
                metric="Real-time voice → text"
              />
            </div>

            <div className="col-span-12">
              <FeaturedProject
                type="Featured · Healthcare AI"
                title="Pediatric Wrist Report Generation — SSD Hospital Sukkur"
                summary="An AI-powered application that auto-generates 90% of pediatric wrist radiology reports. Trained generative models on 1,200+ custom hospital reports using the GRAZPEDWRI-DX dataset and the IDEFICS visual language model, with a frontend interface for radiologists to review and edit dynamically populated reports."
                img={finalYear}
                link="https://www.linkedin.com/posts/goutam-sachdev-978435190_wristminderproinjuryreportgeneration-finalyearproject-activity-7212075540466327552-jB42"
                github="https://github.com/GoutamSachdev/Wristminder-Pro-Automated-Radiological-Report-Generation-"
                tech={["IDEFICS VLM", "Generative Models", "GRAZPEDWRI-DX", "Radiology"]}
                metric="Auto-generates 90% of reports"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;

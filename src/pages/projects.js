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

// ---- Cover art -----------------------------------------------------------
// Three tiers, best first:
//   1. a real screenshot (`img`), where one exists;
//   2. a drawn motif (`motif`), for the résumé work we have no screenshot of —
//      each a small diagram of what that system actually does;
//   3. the initials panel, for anything added with neither.
//
// Tiers 2 and 3 are static SVG: no request, nothing that can 404, and they
// paint with `currentColor` so they flip with the theme. Drawing a diagram of a
// project we have no picture of is honest; guessing at the wrong screenshot
// would not be.

// A map pin — semicircular head, pointed foot. `cy` is the head's centre.
const pin = (cx, cy, r) =>
  `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} L ${cx} ${cy + r * 1.7} Z`;

// Shared by the retrieval graph's edges and its nodes, so the two cannot drift
// apart the way two hand-copied lists would.
const RAG_NODES = [
  [66, 58], [136, 40], [208, 62], [252, 116], [186, 150], [100, 130], [160, 92],
];
const RAG_EDGES = [[0, 6], [1, 6], [2, 6], [3, 4], [4, 5], [5, 6], [0, 5], [2, 3]];

// Waveform heights, tallest in the middle. Fixed numbers, not random: the art
// has to render identically on the server and after hydration.
const WAVE = [26, 48, 74, 38, 96, 58, 82, 34, 62, 28];

// Each motif is geometry only — the stroke, fill and cap style live on the
// <svg> that wraps it, so all six stay visually consistent by construction.
const MOTIFS = {
  // Multi-tenant platform: one agent sitting on stacked workspace planes.
  platform: (
    <>
      <rect x="88" y="62" width="144" height="26" rx="8" opacity="0.45" />
      <rect x="74" y="94" width="172" height="30" rx="8" opacity="0.7" />
      <rect x="60" y="130" width="200" height="34" rx="8" />
      <path d="M160 22v6" />
      <rect x="134" y="28" width="52" height="30" rx="11" />
      <path d="M160 58v4" />
      <circle cx="150" cy="43" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="170" cy="43" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="160" cy="16" r="4" fill="currentColor" stroke="none" />
    </>
  ),

  // Hybrid Graph RAG: a node graph with the retrieval core at its centre.
  graph: (
    <>
      {RAG_EDGES.map(([a, b], i) => (
        <path
          key={`e${i}`}
          d={`M ${RAG_NODES[a][0]} ${RAG_NODES[a][1]} L ${RAG_NODES[b][0]} ${RAG_NODES[b][1]}`}
          opacity={i % 2 ? 0.5 : 0.85}
        />
      ))}
      {RAG_NODES.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r={i === 6 ? 17 : 9} opacity={i === 6 ? 1 : 0.85} />
      ))}
      <circle cx={RAG_NODES[6][0]} cy={RAG_NODES[6][1]} r="5" fill="currentColor" stroke="none" />
    </>
  ),

  // Laundry pickup and delivery: a dashed route from one pin to the other.
  route: (
    <>
      <path d={pin(72, 58, 22)} />
      <circle cx="72" cy="58" r="7.5" fill="currentColor" stroke="none" />
      <path d="M100 88c34 26 70 6 104 32" strokeDasharray="8 10" opacity="0.75" />
      <path d={pin(228, 122, 22)} />
      <circle cx="228" cy="122" r="7.5" fill="currentColor" stroke="none" />
    </>
  ),

  // E-commerce assistant: the cart, and the chat that sells from it. The cart
  // stops at x=172 so it clears the bubble, which spans 187-283.
  commerce: (
    <>
      <path d="M40 52h20l16 60h80l16-43H66" />
      <circle cx="96" cy="120" r="8" />
      <circle cx="148" cy="120" r="8" />
      <path d="M198 44h74a11 11 0 0 1 11 11v38a11 11 0 0 1-11 11h-36l-20 17v-17h-18a11 11 0 0 1-11-11V55a11 11 0 0 1 11-11Z" />
      <path d="M235 56l5 12 12 5-12 5-5 12-5-12-12-5 12-5Z" fill="currentColor" stroke="none" />
    </>
  ),

  // Voice support: the microphone, and the waveform it carries.
  voice: (
    <>
      <rect x="34" y="46" width="22" height="38" rx="11" />
      <path d="M26 78a19 19 0 0 0 38 0" />
      <path d="M45 97v14M35 111h20" />
      {WAVE.map((h, i) => (
        <path
          key={i}
          d={`M ${120 + i * 17} ${100 - h / 2} V ${100 + h / 2}`}
          strokeWidth="7"
          opacity="0.9"
        />
      ))}
    </>
  ),

  // Support chatbot escalating to a human: bot bubble, handoff arrow, person.
  escalation: (
    <>
      <path d="M40 42h96a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14H80L56 124v-20H40a14 14 0 0 1-14-14V56a14 14 0 0 1 14-14Z" />
      <circle cx="66" cy="76" r="4" fill="currentColor" stroke="none" />
      <circle cx="98" cy="76" r="4" fill="currentColor" stroke="none" />
      <path d="M150 90h42" strokeDasharray="7 9" opacity="0.8" />
      <path d="M184 82l9 8-9 8" />
      <circle cx="236" cy="58" r="18" />
      <path d="M206 116a30 30 0 0 1 60 0" />
    </>
  ),
};

const Artwork = ({ img, title, motif, sizes = "(max-width: 1024px) 100vw, 50vw" }) => {
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

      {motif && MOTIFS[motif] ? (
        // Padded so no motif runs into the panel edge, with extra room at the
        // bottom for the label. Scaled down on phones: the panel is only ~170px
        // tall there, and the desktop padding would leave the motif too small to
        // read. The motif is drawn to a 320x200 viewBox and centred, so whatever
        // room is left over simply becomes margin.
        <div className="absolute inset-0 px-4 pt-4 pb-9 sm:px-6 sm:pt-6 sm:pb-14">
          <svg
            viewBox="0 0 320 200"
            className="h-full w-full text-light/90 dark:text-dark/90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {MOTIFS[motif]}
          </svg>
        </div>
      ) : (
        <>
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
        </>
      )}

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

const FeaturedProject = ({ type, title, summary, img, motif, link, github, tech, metric }) => (
  <Tilt className="w-full">
    <article className="w-full flex flex-col lg:flex-row items-center justify-between rounded-3xl border border-solid relative border-line bg-light shadow-card hover:shadow-cardHover transition-shadow duration-300 p-6 lg:p-12 dark:bg-dark dark:border-lineDark">
      {link || github ? (
        <Link href={link || github} target="_blank" rel="noopener noreferrer" className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg">
          <Artwork img={img} title={title} motif={motif} />
        </Link>
      ) : (
        <div className="w-full lg:w-1/2 overflow-hidden rounded-lg">
          <Artwork img={img} title={title} motif={motif} />
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

const Project = ({ type, title, summary, img, motif, link, github, tech, metric }) => (
  <Tilt className="w-full h-full">
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-line bg-light p-6 relative shadow-soft hover:shadow-cardHover transition-shadow duration-300 dark:bg-dark dark:border-lineDark">
      {link || github ? (
        <Link href={link || github} target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer overflow-hidden rounded-lg">
          <Artwork img={img} title={title} motif={motif} sizes="(max-width: 1024px) 100vw, 50vw" />
        </Link>
      ) : (
        <div className="w-full overflow-hidden rounded-lg">
          <Artwork img={img} title={title} motif={motif} sizes="(max-width: 1024px) 100vw, 50vw" />
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
                motif="platform"
                tech={["Python", "FastAPI", "pgvector", "RAG", "Celery", "Redis", "Multi-tenancy", "RBAC"]}
                metric="Multi-tenant · cost-optimized inference"
              />
            </div>

            <div className="col-span-12">
              <FeaturedProject
                type="Featured · RAG & Retrieval"
                title="Hybrid Graph RAG with Multimodal Document Understanding"
                summary="A hybrid retrieval system built on LlamaIndex that combines Graph RAG with vector retrieval over Deep Lake for improved multi-hop reasoning. A Docling pipeline extracts structured context — text, tables, and charts — with advanced chunking and embedding strategies, and NVIDIA Nemotron Nano VLM adds multimodal understanding of graph images. Delivers sub-2s response latency with markedly better retrieval accuracy and answer relevance."
                motif="graph"
                tech={["LlamaIndex", "Graph RAG", "Deep Lake", "Docling", "NVIDIA Nemotron Nano VLM", "Vector Search"]}
                metric="Sub-2s latency · stronger multi-hop reasoning"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="Backend · Logistics"
                title="Washery — Laundry Pickup & Delivery Platform"
                summary="A scalable Django backend behind a washery mobile app, with customer and driver modules, JWT authentication, RESTful APIs, and an optimized cloth pickup and delivery order lifecycle. Kept API responses under 200ms with efficient PostgreSQL database operations."
                motif="route"
                tech={["Django", "JWT Auth", "REST API", "PostgreSQL"]}
                metric="API responses under 200ms"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="Generative AI · E-commerce"
                title="E-commerce AI Shopping Assistant"
                summary="A generative AI assistant for Shopify and WordPress stores built with LangGraph and FastAPI. Handles natural-language product search, cart management, and in-chat product image rendering with AI-generated product descriptions through an embedded chatbot interface — improving product discovery speed by 80% with real-time inventory synchronisation via PostgreSQL."
                motif="commerce"
                tech={["LangGraph", "FastAPI", "Shopify", "WordPress", "PostgreSQL"]}
                metric="+80% product discovery speed"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="Realtime · Customer Support"
                title="Real-time Voice Support Chatbot"
                summary="A real-time customer support chatbot on LiveKit (WebRTC) with a RAG backend powered by Sentence Transformers, LlamaIndex, and ChromaDB. FastAPI services handle knowledge retrieval and keep responses low-latency across live voice and text channels."
                motif="voice"
                tech={["LiveKit", "WebRTC", "Sentence Transformers", "LlamaIndex", "ChromaDB", "FastAPI"]}
                metric="Live voice + text support"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Project
                type="NLP · Conversational"
                title="Customer Support Chatbot with AI-to-Human Escalation"
                summary="A customer support chatbot built on the OpenAI SDK with ChatKit — a RAG-based architecture with integrated appointment scheduling, consistent responses under 2 seconds average latency, and seamless escalation to a human agent. Zendesk CRM integration handles ticket creation, updates, and agent assignment while preserving conversation context through the handoff."
                motif="escalation"
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

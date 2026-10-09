import React, { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Lilcon from '../components/Lilcon'

const Detail = ({ position, company, companyLink, time, address, work, skills, current }) => {
    const ref = useRef(null)
    const CompanyTag = companyLink ? 'a' : 'span'
    return (
        <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-full sm:w-[60%] mx-auto flex flex-col items-start sm:items-center justify-between'>
            <Lilcon reference={ref} />
            <motion.div initial={{ y: 50 }} className='pl-20 sm:pl-0'
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}>
                <h3 className='capitalize font-bold text-2xl dark:text-light flex flex-wrap items-center gap-x-2'>
                    {position} &nbsp;
                    <CompanyTag
                        href={companyLink}
                        target={companyLink ? '_blank' : undefined}
                        rel={companyLink ? 'noopener noreferrer' : undefined}
                        className='text-primary capitalize underline-offset-4 hover:underline'
                    >
                        @{company}
                    </CompanyTag>
                    {current && (
                        <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            Present
                        </span>
                    )}
                </h3>
                <span className='capitalize font-medium text-dark/75 dark:text-light/75'>
                    {time} | {address}
                </span>
                <ul className='font-medium w-full mt-2 list-disc pl-5 space-y-1 dark:text-light/90'>
                    {work.map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
                {skills && skills.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-3'>
                        {skills.map((s) => (
                            <span key={s} className='text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-dark/5 text-dark border border-line dark:bg-light/10 dark:text-light dark:border-lineDark'>
                                {s}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        </li>
    )
}

const Experience = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end ', "center start"]
    })
    return (
        <div className='my-24 sm:my-32'>
            <h2 className='font-bold text-4xl sm:text-6xl md:text-8xl mb-12 sm:mb-24 w-full text-center dark:text-light'>
                Experience
            </h2>
            <div ref={ref} className='w-[90%] sm:w-[75%] mx-auto relative'>
                <motion.div className='absolute left-9 top-0 w-[4px] h-full bg-dark dark:bg-light origin-top'
                    style={{ scaleY: scrollYProgress }}
                />
                <ul className='w-full flex flex-col items-start justify-between ml-4'>
                    <Detail
                        current
                        position={"AI Engineer"}
                        company={'Techno Channels'}
                        time={'April 2026 - Present'}
                        address={'Karachi, Pakistan (Hybrid) · Remote-friendly'}
                        work={[
                            "Own the backend of SHIFU, a multi-tenant AI assistant platform in Python and FastAPI serving multiple customer workspaces — workspaces, bots, source ingestion, and bot deployment.",
                            "Shipped the RAG pipeline end to end: chunking and embedding customer documents into PostgreSQL/pgvector, retrieving over the customer's own corpus, and generating grounded answers with source citations.",
                            "Designed the model layer — a logical model catalog mapped to provider deployments behind an internal gateway, with tier-based routing driven by plan entitlements and per-plan credit metering via atomic reserve-before-work deduction, cutting inference costs by serving eligible requests through lower-cost models.",
                            "Implemented tenant isolation, role-based access control, and an append-only audit log recording actor, target, and timestamp for every workspace action, giving complete workspace activity tracking and traceability.",
                            "Automated document ingestion and bot retraining as a background pipeline on Celery and Redis, so uploaded content becomes searchable without blocking live query traffic."
                        ]}
                        skills={['Python', 'FastAPI', 'RAG', 'pgvector', 'Celery', 'Redis', 'Multi-tenancy', 'RBAC']}
                    />
                    <Detail
                        position={"AI Python Developer"}
                        company={'Quentis'}
                        time={'May 2025 - April 2026'}
                        address={'Karachi, Pakistan (On-site)'}
                        work={[
                            "Developed the real-time conversational frontend with Next.js and the LiveKit React framework — microphone access, real-time audio streaming, participant state handling, and responsive UI for live AI conversations.",
                            "Built a modern chat interface with Next.js, React Hooks, and Tailwind CSS, delivering real-time message updates, session persistence, and a smooth experience across voice and text.",
                            "Implemented an AI-driven appointment scheduling system inside the chatbot workflow, letting users book and manage appointments while preserving conversational context.",
                            "Built a customer support chatbot on the OpenAI SDK with ChatKit — a RAG architecture plus appointment scheduling, consistent responses under 2s average latency, and seamless AI-to-human escalation.",
                            "Integrated Zendesk CRM for ticket creation, updates, and agent assignment, keeping conversation context intact through the AI-to-human handoff.",
                            "Optimized backend services, frontend state management, and system performance for low latency and stable conversational flows across both fully automated and hybrid (AI + human) support workflows.",
                            "Managed a scalable Django backend for a washery mobile app — customer and driver modules, JWT authentication, RESTful APIs, and an optimized cloth pickup and delivery order lifecycle, with API responses under 200ms on PostgreSQL.",
                            "Worked on a hybrid RAG system with LlamaIndex, combining Graph RAG and vector retrieval (Deep Lake) for multi-hop reasoning; built a Docling document pipeline for structured context (text, tables, charts), applied advanced chunking and embedding, and integrated NVIDIA Nemotron Nano VLM for multimodal graph-image understanding — sub-2s latency and markedly better retrieval accuracy."
                        ]}
                        skills={['Next.js', 'LiveKit', 'OpenAI SDK', 'RAG', 'LlamaIndex', 'Graph RAG', 'Deep Lake', 'Django', 'PostgreSQL', 'Zendesk']}
                    />
                    <Detail
                        position={"AI Python Developer Internship"}
                        company={'BitsWits'}
                        companyLink='https://www.bitswits.com/'
                        time={'Feb 2025 - May 2025'}
                        address={'Karachi, Pakistan (On-site)'}
                        work={[
                            "Built and deployed AI-powered chatbots with Django, LangChain, CrewAI, and LangGraph — cutting manual support workload by 35% and handling 500+ daily queries under 2s.",
                            "Developed a generative AI assistant for Shopify and WordPress e-commerce stores with LangGraph + FastAPI — natural language product search, cart management, and in-chat product image rendering with AI-generated descriptions, improving product discovery speed by 80% with real-time inventory sync via PostgreSQL.",
                            "Built a real-time customer support chatbot on LiveKit (WebRTC) with a RAG backend powered by Sentence Transformers, LlamaIndex, and ChromaDB, plus FastAPI services for efficient knowledge retrieval and low-latency responses."
                        ]}
                        skills={['Django', 'LangChain', 'CrewAI', 'LangGraph', 'FastAPI', 'LiveKit', 'ChromaDB', 'Sentence Transformers']}
                    />
                </ul>
            </div>
        </div>
    )
}

export default Experience

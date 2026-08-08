import React, { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Lilcon from '../components/Lilcon'

const Detail = ({ position, company, companyLink, time, address, work, skills, current }) => {
    const ref = useRef(null)
    const CompanyTag = companyLink ? 'a' : 'span'
    return (
        <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-full sm:w-[60%] mx-auto flex flex-col items-center justify-between'>
            <Lilcon reference={ref} />
            <motion.div initial={{ y: 50 }}
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
                        position={"AI Python Developer"}
                        company={'Quentis'}
                        time={'May 2025 - Present · 1 yr 4 mos'}
                        address={'Karachi, Pakistan (On-site)'}
                        work={[
                            "Built a chat interface for AI agents using Next.js, React Hooks, and Tailwind CSS to deliver a responsive, real-time conversational experience.",
                            "Developed an AI appointment-scheduling system that automates booking flows and reduces manual coordination overhead.",
                            "Engineered a customer-support chatbot with the OpenAI SDK, ChatKit, and RAG that answers queries in under 2 seconds and escalates to a human agent when needed.",
                            "Implemented the chatbot frontend with streaming responses and optimistic UI updates for a fluid, low-latency user experience.",
                            "Integrated Zendesk CRM to synchronize tickets, conversations, and customer context across support channels.",
                            "Contributed to a washery mobile app using Django, JWT auth, and PostgreSQL, managing the full order lifecycle from placement to delivery.",
                            "Implemented a hybrid RAG pipeline combining LlamaIndex, Graph RAG, Deep Lake, and Docling, with NVIDIA Nemotron Nano VLM for multimodal document understanding."
                        ]}
                        skills={['RAG', 'Generative AI Development', 'Next.js', 'Django', 'PostgreSQL', 'OpenAI SDK', 'LlamaIndex']}
                    />
                    <Detail
                        position={"AI Python Developer"}
                        company={'BitsWits'}
                        companyLink='https://www.bitswits.com/'
                        time={'Feb 2025 - May 2025 · 4 mos'}
                        address={'Karachi, Pakistan (On-site)'}
                        work={[
                            "Built AI chatbots with Django, LangChain, CrewAI, and LangGraph that cut manual workload by ~35% and handled 500+ daily queries under 2s.",
                            "Developed a generative-AI e-commerce assistant using LangGraph + FastAPI for Shopify and WordPress stores, speeding product discovery by ~80% with PostgreSQL-backed history.",
                            "Created a real-time support chatbot with LiveKit WebRTC, Sentence Transformers, LlamaIndex, ChromaDB, and FastAPI for live voice and text assistance."
                        ]}
                        skills={['LangGraph', 'SQL', 'Django', 'LangChain', 'CrewAI', 'FastAPI', 'LiveKit']}
                    />
                </ul>
            </div>
        </div>
    )
}

export default Experience
import React, { useMemo } from 'react'
import { motion } from "framer-motion"

const Skills = ({ name, left, top, delay }) => (
    <div className="absolute" style={{ left, top, transform: 'translate(-50%, -50%)' }}>
        <motion.div
            className='flex items-center justify-center rounded-full font-semibold bg-dark text-light
            py-1.5 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm
            shadow-soft hover:shadow-cardHover cursor-default absolute
            dark:bg-light dark:text-dark transition-shadow duration-300 whitespace-nowrap'
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            {name}
        </motion.div>
    </div>
)

// Hero skills evenly spaced on a circle around the "Developer" core.
const HERO_SKILLS = [
    'Python', 'Django', 'FastAPI', 'Flask',
    'RAG', 'LangChain', 'LangGraph', 'CrewAI',
    'Next.js', 'React', 'Tailwind CSS', 'PostgreSQL',
    'Machine Learning', 'Deep Learning', 'Generative AI', 'Agentic AI',
    'Prompt Engineering', 'LLM'
]

const TOOLING_SKILLS = [
    'LlamaIndex', 'ChromaDB', 'Deep Lake', 'Graph RAG', 'Docling',
    'NVIDIA Nemotron', 'Sentence Transformers', 'OpenAI SDK', 'ChatKit',
    'LiveKit', 'WebRTC', 'Zendesk', 'JWT', 'SQL', 'MongoDB',
    'NumPy', 'Pandas', 'Algorithms', 'GitHub', 'Java'
]

const Skill = () => {
    // Position pills as percentages of the container so the orbit reflows
    // on resize instead of being locked to one viewport size.
    const orbit = useMemo(() => {
        const n = HERO_SKILLS.length
        const rx = 43, ry = 39
        return HERO_SKILLS.map((name, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2
            return {
                name,
                left: `${50 + Math.cos(angle) * rx}%`,
                top: `${50 + Math.sin(angle) * ry}%`,
                delay: (i % 6) * 0.05,
            }
        })
    }, [])

    return (
        <>
            <h2 className='font-bold text-4xl sm:text-6xl md:text-8xl mt-24 sm:mt-32 md:mt-44 mb-4 sm:mb-6 w-full text-center dark:text-light'>
                Skills
            </h2>
            <div className='w-full h-[62vh] sm:h-[72vh] md:h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark'>
                <motion.div
                    className='absolute flex items-center justify-center rounded-full font-semibold bg-dark text-light p-4 sm:p-5 md:p-6
                    shadow-card hover:shadow-cardHover cursor-default dark:bg-light dark:text-dark transition-shadow duration-300'
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Developer
                </motion.div>

                {orbit.map((s) => (
                    <Skills key={s.name} name={s.name} left={s.left} top={s.top} delay={s.delay} />
                ))}
            </div>

            {/* Full-stack & tooling chip cloud */}
            <div className='w-full max-w-4xl mx-auto px-4 mt-4 sm:-mt-8 md:-mt-24 mb-24 sm:mb-32'>
                <h3 className='text-center font-semibold text-xl sm:text-2xl mb-6 text-dark/70 dark:text-light/70'>
                    Full stack &amp; tooling
                </h3>
                <div className='flex flex-wrap justify-center gap-2.5 sm:gap-3'>
                    {TOOLING_SKILLS.map((name, i) => (
                        <motion.span
                            key={name}
                            className='text-sm sm:text-base font-medium px-4 py-2 rounded-full
                            bg-light text-dark border border-line shadow-soft hover:shadow-cardHover
                            dark:bg-dark dark:text-light dark:border-lineDark transition-shadow duration-300 cursor-default'
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: (i % 10) * 0.03 }}
                            viewport={{ once: true }}
                        >
                            {name}
                        </motion.span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Skill
import React, { useMemo } from 'react'
import { motion, useReducedMotion } from "framer-motion"
// The orbit and the /skills page both render the résumé's skill list, so it
// lives in one module rather than being duplicated per component.
import { HERO_SKILLS, SKILL_GROUPS } from '@/data/skills'

// Radius of the orbit, as a percentage of the (square) container. Kept below 40
// so the widest pills — "Generative AI", "Agentic AI" — clear the container
// edge instead of pushing a horizontal scrollbar onto the page.
const RADIUS = 38

// Count of ticks on the outer gauge ring. 60 ticks is 6° apart.
const TICKS = 60

// Ids are prefixed so they can't collide with any other inline SVG on the page.
const RING_ID = 'gs-skill-ring'
const CORE_ID = 'gs-skill-core'

const OrbitPill = ({ name, left, top, delay, float, secondary }) => (
    <div
        className={`absolute ${secondary ? 'hidden md:block' : ''}`}
        style={{ left, top }}
    >
        {/* Three nested elements, each owning exactly one transform, because two
            transforms on one node means the last writer wins:
              1. this wrapper centres the pill with a translate, which is layout
                 and therefore unaffected by anything animating above it;
              2. the motion div drifts the pill up and down on an endless loop;
              3. the motion pill runs the entrance reveal and the hover scale. */}
        <div className='w-max -translate-x-1/2 -translate-y-1/2'>
            <motion.div
                animate={float ? { y: [0, -6, 0] } : undefined}
                transition={
                    float
                        ? { duration: 4 + (delay * 10), repeat: Infinity, ease: 'easeInOut' }
                        : undefined
                }
            >
                <motion.div
                    className='flex items-center justify-center rounded-full font-semibold bg-dark text-light
                    py-1.5 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-default
                    shadow-soft hover:shadow-cardHover dark:bg-light dark:text-dark
                    ring-1 ring-inset ring-transparent hover:ring-primary/40
                    dark:hover:ring-primaryDark/40
                    transition-shadow duration-300'
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, delay }}
                    viewport={{ once: true }}
                >
                    {name}
                </motion.div>
            </motion.div>
        </div>
    </div>
)

// Variant staggering instead of one `whileInView` per chip: the card owns a
// single observer and cascades the reveal to its children, so a 7-chip group
// costs one observer rather than seven.
const groupVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, staggerChildren: 0.03 },
    },
}

const chipVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

const Skill = () => {
    // The floating drift is a JS animation, so `motion-safe:` can't gate it —
    // useReducedMotion is the equivalent check for framer-motion.
    const reduceMotion = useReducedMotion()

    const orbit = useMemo(() => {
        const n = HERO_SKILLS.length
        return HERO_SKILLS.map((name, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2
            return {
                name,
                left: `${50 + Math.cos(angle) * RADIUS}%`,
                top: `${50 + Math.sin(angle) * RADIUS}%`,
                delay: (i % 6) * 0.06,
                float: !reduceMotion,
                secondary: i % 2 === 1,
            }
        })
    }, [reduceMotion])

    // Outer gauge ticks. Static geometry — the rotation lives on the wrapper.
    const ticks = useMemo(
        () =>
            Array.from({ length: TICKS }, (_, i) => {
                const major = i % 5 === 0
                return (
                    <line
                        key={i}
                        x1='50'
                        y1='0.9'
                        x2='50'
                        y2={major ? '5.6' : '3.4'}
                        stroke='currentColor'
                        strokeWidth={major ? '0.35' : '0.18'}
                        strokeLinecap='round'
                        transform={`rotate(${(i * 360) / TICKS} 50 50)`}
                    />
                )
            }),
        []
    )

    return (
        <>
            <h2 className='font-bold text-4xl sm:text-6xl md:text-8xl mt-24 sm:mt-32 md:mt-44 mb-8 sm:mb-12 w-full text-center dark:text-light'>
                Skills
            </h2>

            {/* Orbit. Only decoration rotates — nothing carrying text is ever
                rotated, so no label can tilt or drift off-centre. Every layer
                below is pointer-events-none and aria-hidden. */}
            <div className='relative mx-auto w-full max-w-[680px] aspect-square flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark'>

                {/* Backdrop: gradient core wash + the two dashed orbit rings */}
                <svg viewBox='0 0 100 100' className='pointer-events-none absolute inset-0 h-full w-full' aria-hidden='true'>
                    <defs>
                        <linearGradient id={RING_ID} x1='0' y1='0' x2='1' y2='1'>
                            <stop offset='0%' stopColor='#B63E96' />
                            <stop offset='100%' stopColor='#58E6D9' />
                        </linearGradient>
                        <radialGradient id={CORE_ID}>
                            <stop offset='0%' stopColor='#B63E96' stopOpacity='0.28' />
                            <stop offset='70%' stopColor='#B63E96' stopOpacity='0.06' />
                            <stop offset='100%' stopColor='#B63E96' stopOpacity='0' />
                        </radialGradient>
                    </defs>
                    <circle cx='50' cy='50' r='50' fill={`url(#${CORE_ID})`} />
                    <circle cx='50' cy='50' r={RADIUS * 0.55} fill='none' stroke={`url(#${RING_ID})`} strokeWidth='0.2' strokeOpacity='0.45' />
                </svg>

                {/* Outer gauge: ticks sweeping the rim */}
                <div className='pointer-events-none absolute inset-0 motion-safe:animate-orbit-slower text-primary/40 dark:text-primaryDark/40' aria-hidden='true'>
                    <svg viewBox='0 0 100 100' className='h-full w-full'>{ticks}</svg>
                </div>

                {/* Counter-rotating dashed ring at the pill radius */}
                <div className='pointer-events-none absolute inset-0 motion-safe:animate-orbit-reverse' aria-hidden='true'>
                    <svg viewBox='0 0 100 100' className='h-full w-full text-primary/40'>
                        <circle cx='50' cy='50' r={RADIUS} fill='none' stroke='currentColor' strokeWidth='0.3' strokeDasharray='1.6 3.4' />
                        <circle cx='50' cy='50' r={RADIUS * 0.76} fill='none' stroke='currentColor' strokeWidth='0.25' strokeDasharray='0.6 2.4' />
                    </svg>
                </div>

                {/* A third ring at its own speed, so the layers visibly slide past
                    each other instead of looking locked together */}
                <div className='pointer-events-none absolute inset-0 motion-safe:animate-orbit' aria-hidden='true'>
                    <svg viewBox='0 0 100 100' className='h-full w-full text-primary/25 dark:text-primaryDark/25'>
                        <circle cx='50' cy='50' r={RADIUS * 0.88} fill='none' stroke='currentColor' strokeWidth='0.2' strokeDasharray='4 6' />
                    </svg>
                </div>

                {/* Comet: a conic gradient masked down to a thin rim, sweeping
                    fastest of all the layers */}
                <div
                    className='pointer-events-none absolute inset-[3%] rounded-full motion-safe:animate-orbit-fast'
                    aria-hidden='true'
                    style={{
                        background:
                            'conic-gradient(from 0deg, rgba(182,62,150,0) 0deg, rgba(182,62,150,0.75) 50deg, rgba(88,230,217,0.6) 92deg, rgba(182,62,150,0) 150deg)',
                        WebkitMaskImage:
                            'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
                        maskImage:
                            'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
                    }}
                />

                {/* Glowing particles riding the pill radius */}
                <div className='pointer-events-none absolute inset-0 motion-safe:animate-orbit' aria-hidden='true'>
                    {[0, 120, 240].map((a) => (
                        <div key={a} className='absolute inset-0' style={{ transform: `rotate(${a}deg)` }}>
                            <span className='absolute left-1/2 top-[12%] -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(182,62,150,0.55)] dark:bg-primaryDark dark:shadow-[0_0_8px_2px_rgba(88,230,217,0.5)]' />
                        </div>
                    ))}
                </div>

                {/* soft breathing glow behind the core */}
                <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' aria-hidden='true'>
                    <div className='w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl motion-safe:animate-breathe' />
                </div>

                {/* Core, with a gradient halo that pulses */}
                <div className='relative'>
                    <div
                        className='pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary to-primaryDark blur-[7px] motion-safe:animate-glow-pulse'
                        aria-hidden='true'
                    />
                    <motion.div
                        className='relative flex items-center justify-center rounded-full font-semibold bg-dark text-light p-4 sm:p-5 md:p-6
                        shadow-card hover:shadow-cardHover cursor-default dark:bg-light dark:text-dark transition-shadow duration-300'
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        AI Engineer
                    </motion.div>
                </div>

                {orbit.map((s) => (
                    <OrbitPill key={s.name} {...s} />
                ))}
            </div>

            {/* Full résumé skill breakdown */}
            <div className='w-full max-w-5xl mx-auto px-4 mt-16 sm:mt-20 mb-24 sm:mb-32'>
                <h3 className='text-center font-semibold text-xl sm:text-2xl mb-8 text-dark/70 dark:text-light/70'>
                    The full stack, by category
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                    {SKILL_GROUPS.map((group) => (
                        <motion.div
                            key={group.title}
                            variants={groupVariants}
                            initial='hidden'
                            whileInView='show'
                            whileHover={{ y: -4 }}
                            viewport={{ once: true }}
                            className='group relative h-full overflow-hidden rounded-2xl border border-solid border-line bg-light/70 p-5 sm:p-6
                            shadow-soft hover:shadow-card dark:bg-dark/60 dark:border-lineDark'
                        >
                            {/* Gradient rule that wipes in across the top on hover */}
                            <span
                                aria-hidden='true'
                                className='pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0
                                bg-gradient-to-r from-transparent via-primary to-transparent
                                transition-transform duration-500 ease-out group-hover:scale-x-100
                                dark:via-primaryDark'
                            />
                            <div className='flex items-center justify-between gap-3 mb-3'>
                                <h4 className='font-bold text-base sm:text-lg dark:text-light'>{group.title}</h4>
                                <span className='shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20'>
                                    {group.items.length}
                                </span>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {group.items.map((name) => (
                                    <motion.span
                                        key={name}
                                        variants={chipVariants}
                                        whileHover={{ y: -2, scale: 1.05 }}
                                        className='text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full cursor-default
                                        bg-dark/5 text-dark border border-line
                                        hover:border-primary/40
                                        dark:bg-light/10 dark:text-light dark:border-lineDark
                                        dark:hover:border-primaryDark/40'
                                    >
                                        {name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Skill

import React from 'react'
import {motion} from "framer-motion"

const Skills=({name,x,y})=>{
    return(
        <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6
        shadow-dark cursor-pointer absolute dark:bg-light dark:text-dark'
        whileHover={{scale:1.05}}
        initial={{x:0,y:0}}
        whileInView={{x:x,y:y}}
        transition={{duration:1.5}}
        viewport={{once:true}}
        >
            {name}
        </motion.div>
    )
}

const Skill = () => {
    return (
        <>
            <h2 className='font-bold text-8xl mt-52 mb-6 w-full text-center dark:text-light'>
                Skills
            </h2>
            <div className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark'>
                <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light p-6
                shadow-dark cursor-pointer dark:bg-light dark:text-dark'
                whileHover={{scale:1.05}}
                >
                    Developer
                </motion.div>

                <Skills name="Django" x='-22vw' y='-1vw' />
                <Skills name="Python" x='-5vw' y='-10vw' />
                <Skills name="Java" x='5vw' y='8.5vw' />
                <Skills name="Flask" x='20vw' y='6vw' />
                <Skills name="JavaScript" x='-8vw' y='13.5vw' />
                <Skills name="NumPy" x='19vw' y='-18vw' />
                <Skills name="Algorthims" x='32vw' y='-5vw' />
                
                <Skills name="Pandas" x='0vw' y='-20vw' />
                <Skills name="MangoDB" x='0vw' y='-20vw' />
                <Skills name="GitHUb" x='-19vw' y='-20vw' />
                <Skills name="Deep Learning" x='-25vw' y='18vw' />
                <Skills name="Machine Learning" x='19vw' y='20vw' />
                <Skills name="Agentic AI" x='30vw' y='10vw' />  
                <Skills name="Generative AI" x='-5vw' y='-15vw' /> 
                <Skills name="FineTuning" x='10vw' y='-10vw' /> 
                <Skills name="LLM" x='20vw' y='0vw' /> 
                <Skills name="RAG" x='15vw' y='10vw' /> 
                <Skills name="Prompt Engineering" x='-30vw' y='-10vw' />
                <Skills name="FastAPI" x='-30vw' y='10vw' /> 
            </div>
        </>
    )
}

export default Skill
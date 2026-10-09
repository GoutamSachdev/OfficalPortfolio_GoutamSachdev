import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Seo from "@/components/Seo";
import SkillsPlayground from "@/components/SkillsPlayground";
import { SKILL_GROUPS } from "@/data/skills";
import { sketchUnderline } from "@/lib/sketch";
import { motion, useReducedMotion } from "framer-motion";

// Hand-drawn stroke under a heading. Two overlapping passes, so it reads as
// pencilled rather than printed.
const SketchUnderline = ({ className = "" }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 320 26"
      className={`text-primary dark:text-primaryDark ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={sketchUnderline(14, 7, 292, 5)}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay: 0.35, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

const Skills = () => {
  return (
    <>
      <Seo
        title="Skills"
        description="Interactive skills map for Goutam Sachdev — an AI Engineer working across Python, FastAPI, Django, Next.js, LangChain, LangGraph, CrewAI, LlamaIndex, RAG, Graph RAG, pgvector, PostgreSQL, Redis, Celery, Docker, and LiveKit. Click any node to see what it connects to and which project it shipped in."
        path="/skills"
      />
      <main id="content" className="w-full mb-16 flex flex-col items-center justify-center overflow-x-clip">
        <Layout className="pt-16">
          <div className="flex flex-col items-center">
            <AnimatedText text="The Stack, Mapped" className="!text-4xl sm:!text-6xl" />
            <SketchUnderline className="mt-2 h-6 w-56 sm:w-72" />
            <p className="mt-6 max-w-2xl text-center text-sm font-medium text-dark/70 sm:text-base dark:text-light/70">
              Not a list of logos — a map of how the pieces actually fit together.
              Trace a line from{" "}
              <span className="font-semibold text-dark dark:text-light">Python</span> to{" "}
              <span className="font-semibold text-dark dark:text-light">pgvector</span>, see
              which skills are neighbours, and find out which project each one shipped in.
              Hover to preview, click to pin, and follow the connections.
            </p>
          </div>

          <div className="mt-14">
            <SkillsPlayground />
          </div>

          {/* The complete résumé list, for anyone who wants to read it straight */}
          <div className="mx-auto mt-20 w-full max-w-5xl">
            <h3 className="text-center text-xl font-bold dark:text-light sm:text-2xl">
              The complete résumé list
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-dark/60 dark:text-light/60">
              Everything on the CV, in the categories the résumé uses.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SKILL_GROUPS.map((group, i) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-solid border-line
                  bg-light/70 p-5 shadow-soft hover:shadow-card dark:border-lineDark dark:bg-dark/60"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0
                    bg-gradient-to-r from-transparent via-primary to-transparent
                    transition-transform duration-500 ease-out group-hover:scale-x-100
                    dark:via-primaryDark"
                  />
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="text-base font-bold dark:text-light">{group.title}</h4>
                    <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-solid border-line bg-dark/5 px-3 py-1.5 text-xs font-medium
                        text-dark transition-colors duration-300 hover:border-primary/40
                        dark:border-lineDark dark:bg-light/10 dark:text-light
                        dark:hover:border-primaryDark/40 sm:text-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Skills;

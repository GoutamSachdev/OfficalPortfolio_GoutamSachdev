import React from "react";
import { motion } from "framer-motion";
import { AnimatedArrow } from "./Icon";
import Tilt from "./Tilt";

// Certificates from the user's resume — each has an issuer and (where available)
// a public verification link.
const CERTS = [
  {
    title: "Claude 101 & Claude Code in Action",
    issuer: "Anthropic",
    link: "https://verify.skilljar.com/c/988cfsp8f67j",
    link2: "https://verify.skilljar.com/c/o2cash42iym3",
  },
  {
    title: "AI Agents Fundamentals & Hugging Face Agents Course",
    issuer: "Hugging Face",
    link: "https://cas-bridge.xethub.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/f5497c9c2d136e3c0ae4d6b8c2be50f4953426fe38fb82affa985100e01f279c",
  },
  {
    title: "Building AI Voice Agents for Production",
    issuer: "DeepLearning.AI",
    link: "https://learn.deeplearning.ai/accomplishments/f34beee1-fec3-490a-8668-85ccbafd7bd2",
  },
  {
    title: "Practical Multi AI Agents and Advanced Use Cases with CrewAI",
    issuer: "DeepLearning.AI",
    link: "https://learn.deeplearning.ai/accomplishments/4d32955d-75e3-472b-9829-b5ab425d1f5f",
  },
  {
    title: "Intermediate Python",
    issuer: "DataCamp",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/7df9722485989a6d328a7be6f700053257ea5c32",
  },
  {
    title: "Problem Solving Certificate",
    issuer: "HackerRank",
    link: "https://www.hackerrank.com/certificates/iframe/de583633d481",
  },
  {
    title: "Trek Venture 6.0 — Leadership & Experiential Learning",
    issuer: "Million Smiles",
  },
];

const Certifications = () => {
  return (
    <div className="my-24 sm:my-32">
      <h2 className="font-bold text-4xl sm:text-6xl md:text-8xl mb-12 sm:mb-16 w-full text-center dark:text-light">
        Certifications
      </h2>
      <div className="w-full sm:w-[90%] md:w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTS.map((c, i) => (
          <Tilt key={c.title} className="w-full">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="h-full flex flex-col justify-between rounded-2xl border border-solid border-line bg-light p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 dark:bg-dark dark:border-lineDark"
            >
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">
                  {c.issuer}
                </span>
                <h3 className="text-xl font-bold dark:text-light">{c.title}</h3>
              </div>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-dark hover:text-primary dark:text-light dark:hover:text-primaryDark transition-colors active:scale-95"
                >
                  View credential <AnimatedArrow className="w-4" />
                </a>
              )}
              {!c.link && (
                <span className="mt-4 text-sm font-medium text-dark/50 dark:text-light/50">
                  Credential available on request
                </span>
              )}
            </motion.article>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
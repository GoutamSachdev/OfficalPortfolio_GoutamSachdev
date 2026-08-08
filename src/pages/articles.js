import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Seo from "@/components/Seo";
import SocialButton from "@/components/SocialButton";
import { GithubIcon, LinkedInIcon } from "@/components/Icon";
import { motion } from "framer-motion";

const articles = () => {
  return (
    <>
      <Seo
        title="Articles"
        description="Articles and writing by Goutam Sachdev on AI, LLMs, RAG, agentic systems, and building production AI software. New articles coming soon."
        path="/articles"
      />
      <main id="content" className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText text="Articles & Writing" className="mb-12 sm:mb-16" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center rounded-2xl border border-solid border-line bg-light p-8 sm:p-12 shadow-soft dark:bg-dark dark:border-lineDark"
          >
            <span className="inline-block mb-5 text-4xl" aria-hidden="true">✍️</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 dark:text-light">
              Articles are coming soon
            </h2>
            <p className="text-dark/70 dark:text-light/70 mb-6">
              I&apos;m putting together write-ups on building LLM chatbots, RAG pipelines,
              agentic AI, and shipping AI to production. Check back shortly — or follow
              me on LinkedIn and GitHub for updates as they drop.
            </p>
            <div className="flex items-center justify-center gap-3">
              <SocialButton href="https://www.linkedin.com/in/goutam-sachdev-978435190" label="Follow on LinkedIn">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton href="https://github.com/GoutamSachdev" label="Follow on GitHub">
                <GithubIcon />
              </SocialButton>
            </div>
          </motion.div>
        </Layout>
      </main>
    </>
  );
};

export default articles;
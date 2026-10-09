import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Seo from "@/components/Seo";
import SocialButton from "@/components/SocialButton";
import { GithubIcon, LinkedInIcon, DownloadIcon, AnimatedArrow } from "@/components/Icon";
import { motion } from "framer-motion";
import Image from "next/image";
import Tilt from "@/components/Tilt";
import { CERTS } from "@/data/certifications";

// Credential links, one row per certificate. Same data the home page uses, but
// laid out for reading a detail at a time rather than as a card grid.
const CredentialRow = ({ issuer, title, credentials }) => (
  <Tilt className="w-full">
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-solid border-line
      bg-light p-6 shadow-soft transition-shadow duration-300 hover:shadow-card
      dark:bg-dark dark:border-lineDark
      before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b
      before:from-primary before:to-primaryDark before:opacity-60 before:transition-opacity
      before:duration-300 hover:before:opacity-100"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-primary/10 text-primary">
            {issuer}
          </span>
          <h3 className="mt-3 text-lg sm:text-xl font-bold dark:text-light">{title}</h3>

          {credentials.length === 0 && (
            <p className="mt-2 text-sm font-medium text-dark/50 dark:text-light/50">
              Credential available on request
            </p>
          )}

          <div className="mt-4 flex flex-col gap-3">
            {credentials.map((c) => (
              <div key={c.url} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-semibold text-dark dark:text-light">{c.label}</span>
                {c.meta && (
                  <span className="font-mono text-xs text-dark/50 dark:text-light/50">{c.meta}</span>
                )}
                <span className="flex items-center gap-4">
                  <a
                    href={c.file || c.url}
                    {...(c.file ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group/btn inline-flex items-center gap-2 rounded-lg border-2 border-solid
                    border-line px-3 py-1.5 text-sm font-semibold text-dark hover:border-primary
                    hover:text-primary transition-all duration-300 active:scale-95
                    dark:border-lineDark dark:text-light dark:hover:border-primaryDark dark:hover:text-primaryDark"
                  >
                    <DownloadIcon className="w-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                    {c.file ? "Download PDF" : "Download"}
                  </a>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold
                    text-dark/70 underline underline-offset-4 decoration-primary decoration-2
                    hover:text-primary transition-colors dark:text-light/70 dark:hover:text-primaryDark"
                  >
                    Verify
                    <AnimatedArrow className="w-3.5 shrink-0" />
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Issuer document preview, where the file is held locally */}
        {credentials[0]?.image && (
          <a
            href={credentials[0].file || credentials[0].url}
            {...(credentials[0].file
              ? { download: true }
              : { target: "_blank", rel: "noopener noreferrer" })}
            className="relative block w-full shrink-0 overflow-hidden rounded-lg border border-solid
            border-line shadow-soft transition-transform duration-300 hover:-translate-y-0.5
            dark:border-lineDark md:w-44"
            title="Open the official certificate"
          >
            <span className="relative block aspect-[4/3] w-full">
              <Image
                src={credentials[0].image}
                alt={`${credentials[0].label} certificate issued by ${issuer}`}
                fill
                sizes="(max-width: 768px) 100vw, 176px"
                className="object-cover object-top"
              />
            </span>
          </a>
        )}
      </div>
    </motion.article>
  </Tilt>
);

const totalCredentials = CERTS.reduce((n, c) => n + c.credentials.length, 0);

const articles = () => {
  return (
    <>
      <Seo
        title="Articles"
        description="Articles and writing by Goutam Sachdev on AI, LLMs, RAG, agentic systems, and building production AI software — plus verified certifications from Anthropic, Hugging Face, DeepLearning.AI, DataCamp, and HackerRank."
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

        {/* Certifications — appended below the article content */}
        <section aria-labelledby="credentials-heading" className="w-full mt-24 sm:mt-32">
          <Layout>
            <div className="text-center">
              <h2
                id="credentials-heading"
                className="font-bold text-3xl sm:text-5xl md:text-7xl dark:text-light"
              >
                Certifications
              </h2>
              <p className="mx-auto mt-6 max-w-2xl px-4 text-sm sm:text-base text-dark/60 dark:text-light/60">
                {totalCredentials} verified credentials from the issuers below. Each one
                links to its official copy — where the file is hosted here it downloads
                directly, otherwise the link opens the issuer&rsquo;s verification page
                where it can be viewed or saved.
              </p>
            </div>

            <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-5">
              {CERTS.map((c) => (
                <CredentialRow
                  key={c.title}
                  issuer={c.issuer}
                  title={c.title}
                  credentials={c.credentials}
                />
              ))}
            </div>
          </Layout>
        </section>
      </main>
    </>
  );
};

export default articles;

import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Seo from "@/components/Seo";
import SocialButton from "@/components/SocialButton";
import { GithubIcon, LinkedInIcon, DownloadIcon, AnimatedArrow } from "@/components/Icon";
import { motion } from "framer-motion";

const STATUS = { IDLE: "idle", SENDING: "sending", SENT: "sent", ERROR: "error" }

// AI/IT services offered — drives the subject dropdown so clients pick a topic.
const SERVICES = [
  "AI Chatbot Development",
  "RAG & Knowledge Base",
  "Generative AI / LLM Apps",
  "Machine Learning / Data",
  "Full-stack AI Web App",
  "AI Voice / Realtime Assistants",
  "Career / Hiring",
  "Other",
]

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState(STATUS.IDLE)
  const [error, setError] = useState("")

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(STATUS.SENDING)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.")
      }
      setStatus(STATUS.SENT)
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setStatus(STATUS.ERROR)
      setError(err.message)
    }
  }

  // No `focus:outline-none` here: it would out-specify the global
  // `:focus-visible` outline in globals.css and leave keyboard users with
  // only a border-colour change as their focus cue.
  const inputClass =
    "w-full rounded-lg bg-transparent border-2 border-solid border-line p-2.5 text-base " +
    "font-medium text-dark placeholder:text-muted/60 focus:border-primary " +
    "transition-colors dark:border-lineDark dark:text-light dark:placeholder:text-light/40 dark:focus:border-primaryDark"

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Goutam Sachdev — AI Software Engineer available for AI chatbot, RAG, voice-AI, and full-stack AI web app work. Open to remote roles worldwide and to relocation. Send a message via the form or reach out on LinkedIn and GitHub."
        path="/contact"
      />
      <main id="content" className="w-full min-h-screen flex items-center text-dark dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Let's talk!" className="!text-5xl md:!text-6xl lg:!text-7xl" />

          <div className="grid w-full grid-cols-1 lg:grid-cols-8 gap-10 mt-8">
            {/* Contact info */}
            <aside className="lg:col-span-3 flex flex-col gap-5">
              <p className="text-base text-dark/70 dark:text-light/70">
                Need an AI chatbot, a RAG system, a Gen-AI feature, or a full-stack AI web app built? Pick the service in the form, add your email, and tell me about it — I&apos;ll reply to your inbox.
              </p>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-solid border-line bg-light/70 px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-soft dark:border-lineDark dark:bg-dark/60">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                Available now · remote worldwide
              </div>
              <div className="flex flex-col gap-4 text-base font-medium">
                <div>
                  <span className="block text-xs uppercase tracking-wide text-dark/50 dark:text-light/50">Email</span>
                  <a href="mailto:ai.goutamsachdev@gmail.com" className="hover:text-primary dark:hover:text-primaryDark transition-colors">ai.goutamsachdev@gmail.com</a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide text-dark/50 dark:text-light/50">Phone</span>
                  <a href="tel:+923333996485" className="hover:text-primary dark:hover:text-primaryDark transition-colors">+92 333 3996485</a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide text-dark/50 dark:text-light/50">Location</span>
                  Karachi, Pakistan · PKT (UTC+5)
                  <span className="block text-sm text-dark/60 dark:text-light/60">
                    Open to remote worldwide and to relocation
                  </span>
                </div>
                <a
                  href="/Goutam-Sachdev.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group inline-flex items-center gap-2 self-start rounded-lg bg-dark text-light px-5 py-2.5
                  text-base font-semibold shadow-soft hover:shadow-cardHover transition-all duration-300
                  hover:-translate-y-0.5 active:scale-95 border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark dark:hover:border-light"
                >
                  <DownloadIcon className="w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download résumé
                  <AnimatedArrow className="w-5" />
                </a>
                <div className="flex items-center gap-3 mt-1">
                  <SocialButton href="https://www.linkedin.com/in/goutam-sachdev-978435190" label="LinkedIn">
                    <LinkedInIcon />
                  </SocialButton>
                  <SocialButton href="https://github.com/GoutamSachdev" label="GitHub">
                    <GithubIcon />
                  </SocialButton>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-5">

            {status === STATUS.SENT ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center rounded-2xl p-8 border-2 border-solid border-line bg-light shadow-soft dark:border-lineDark dark:bg-dark"
              >
                <p className="text-2xl font-bold text-primary mb-2">Thanks — your message is on its way!</p>
                <p className="text-dark/70 dark:text-light/70">I&apos;ll reply to your email shortly.</p>
                <button
                  onClick={() => setStatus(STATUS.IDLE)}
                  className="mt-6 inline-flex items-center bg-dark text-light px-5 py-2.5 rounded-lg font-semibold shadow-soft hover:shadow-cardHover transition-all hover:-translate-y-0.5 dark:bg-light dark:text-dark"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <label htmlFor="name" className="block mb-2 text-sm font-semibold">Name</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                      placeholder="Your name" className={inputClass} />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-semibold">Service / Subject</label>
                  <select id="subject" name="subject" required value={form.subject} onChange={handleChange}
                    className={`${inputClass} cursor-pointer bg-light dark:!bg-dark`}>
                    <option value="" disabled>What do you need help with?</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-semibold">Message</label>
                  <textarea id="message" name="message" rows={6} required value={form.message} onChange={handleChange}
                    placeholder="Write your message here..." className={`${inputClass} resize-none`} />
                </div>

                {status === STATUS.ERROR && (
                  <p role="alert" aria-live="assertive" className="text-sm font-medium text-red-500 dark:text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === STATUS.SENDING}
                  className="self-start inline-flex items-center justify-center gap-2 bg-dark text-light px-6 py-3 rounded-lg
                  text-base font-semibold shadow-soft hover:shadow-cardHover transition-all hover:-translate-y-0.5
                  border-2 border-solid border-transparent hover:border-dark
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                  dark:bg-light dark:text-dark dark:hover:border-light"
                >
                  {status === STATUS.SENDING && (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {status === STATUS.SENDING ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}
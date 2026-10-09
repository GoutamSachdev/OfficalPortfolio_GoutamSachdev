import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import ScrollProgress from '@/components/ScrollProgress'
import '@/styles/globals.css'
import { Montserrat } from "next/font/google"
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont"
})
export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Goutam Sachdev" />
        <meta name="theme-color" content="#0f0f10" />
        {/* The .ico comes first and the SVG second, which is the order that
            gets a browser to prefer the vector: anything without SVG support
            stops at the .ico, everything else keeps reading. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
       <a href="#content" className="skip-link">Skip to content</a>
       <ScrollProgress />
       <NavBar />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>

    </>
  )
}
import React from "react";
import { motion } from "framer-motion";
import { AnimatedArrow, DownloadIcon } from "./Icon";
import Tilt from "./Tilt";
import { CERTS } from "@/data/certifications";

// One credential's actions. When the official file is held locally (`file`) the
// card offers a true download plus a "Verify" link to the issuer; otherwise the
// issuer's verification page is the download target, which is where the
// certificate can be viewed or saved.
const CertActions = ({ issuer, credentials }) => {
  if (!credentials || credentials.length === 0) {
    return (
      <span className="mt-4 text-sm font-medium text-dark/50 dark:text-light/50">
        Credential available on request
      </span>
    );
  }

  const btn =
    "group inline-flex items-center gap-2 rounded-lg border-2 border-solid border-line px-3 py-1.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition-all duration-300 active:scale-95 dark:border-lineDark dark:text-light dark:hover:border-primaryDark dark:hover:text-primaryDark";

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
      {credentials.map((c) =>
        c.file ? (
          <React.Fragment key={c.url}>
            <a
              href={c.file}
              download
              title="Save the official certificate PDF"
              className={btn}
            >
              <DownloadIcon className="w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download PDF
            </a>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Verifies this credential on ${issuer}`}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-dark/70 underline underline-offset-4 decoration-primary decoration-2 hover:text-primary transition-colors dark:text-light/70 dark:hover:text-primaryDark"
            >
              Verify
              <AnimatedArrow className="w-3.5 shrink-0" />
            </a>
          </React.Fragment>
        ) : (
          <a
            key={c.url}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Opens the official ${issuer} verification page in a new tab`}
            className={btn}
          >
            <DownloadIcon className="w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download {credentials.length > 1 ? c.label : "certificate"}
            <AnimatedArrow className="w-3.5 shrink-0" />
          </a>
        )
      )}
    </div>
  );
};

const Certifications = () => {
  return (
    <div className="my-24 sm:my-32">
      <h2 className="font-bold text-4xl sm:text-6xl md:text-8xl mb-8 sm:mb-10 w-full text-center dark:text-light">
        Certifications
      </h2>
      <p className="max-w-2xl mx-auto px-4 mb-12 sm:mb-16 text-center text-sm sm:text-base text-dark/60 dark:text-light/60">
        Certificates verified by the issuer that awarded them. Where the official
        file is hosted here it downloads directly; otherwise the link opens the
        issuer&rsquo;s verification page, where the credential can be viewed or saved.
      </p>
      <div className="w-full sm:w-[90%] md:w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTS.map((c, i) => (
          <Tilt key={c.title} className="w-full">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="h-full flex flex-col justify-between rounded-2xl border border-solid border-line bg-light p-6 shadow-soft hover:shadow-card transition-shadow duration-300 dark:bg-dark dark:border-lineDark"
            >
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">
                  {c.issuer}
                </span>
                <h3 className="text-xl font-bold dark:text-light">{c.title}</h3>
              </div>
              <CertActions issuer={c.issuer} credentials={c.credentials} />
            </motion.article>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default Certifications;

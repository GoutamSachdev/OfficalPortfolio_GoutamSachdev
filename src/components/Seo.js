import Head from "next/head";

const SITE_URL = "https://goutam-sachdev.vercel.app";
const SITE_NAME = "Goutam Sachdev";
const DEFAULT_IMAGE = `${SITE_URL}/images/profile/developer-pic-1.png`;

// Identity schema shared across the site — the single biggest SEO win for a
// personal portfolio. Keeps Person + WebSite stable; adds a WebPage per path.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Goutam Sachdev",
  jobTitle: "AI Software Engineer",
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  email: "mailto:ai.goutamsachdev@gmail.com",
  telephone: "+92-333-3996485",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sukkur IBA University",
  },
  worksFor: {
    "@type": "Organization",
    name: "Techno Channels",
  },
  // Remote availability, expressed in schema.org's own vocabulary.
  seeks: {
    "@type": "Demand",
    name: "Remote AI engineering roles (worldwide), or on-site with relocation",
  },
  sameAs: [
    "https://www.linkedin.com/in/goutam-sachdev-978435190",
    "https://github.com/GoutamSachdev",
  ],
  knowsAbout: [
    "Generative AI",
    "Retrieval-Augmented Generation",
    "Graph RAG",
    "Large Language Models",
    "Agentic AI",
    "Multi-Agent Systems",
    "Prompt Engineering",
    "Python",
    "FastAPI",
    "Django",
    "Celery",
    "PostgreSQL",
    "pgvector",
    "Next.js",
    "React",
    "LangChain",
    "LangGraph",
    "CrewAI",
    "LlamaIndex",
    "LiveKit",
    "PyTorch",
    "Computer Vision",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: { "@type": "Person", name: "Goutam Sachdev" },
};

const Seo = ({ title, description, path = "/", image, type = "website" }) => {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;
  const fullTitle = title
    ? path === "/"
      ? title
      : `${title} | ${SITE_NAME}`
    : SITE_NAME;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: fullTitle,
    url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: { "@type": "Person", name: "Goutam Sachdev" },
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Goutam Sachdev" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema, webPageSchema]),
        }}
      />
    </Head>
  );
};

export default Seo;
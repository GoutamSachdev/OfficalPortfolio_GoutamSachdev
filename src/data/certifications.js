// Certificates from the résumé, in one place because two pages render them:
// the Certifications section on the home page, and the detailed list at the
// bottom of the Articles page.
//
// Each credential carries the issuer's public verification URL. Where the
// official file is also held locally under /public/certificates, `file` (and
// `image`) point at it so the card can offer a real download rather than a
// trip to the issuer's site.
export const CERTS = [
  {
    title: "Claude 101 & Claude Code in Action",
    issuer: "Anthropic",
    credentials: [
      { label: "Claude 101", url: "https://verify.skilljar.com/c/988cfsp8f67j" },
      { label: "Claude Code in Action", url: "https://verify.skilljar.com/c/o2cash42iym3" },
    ],
  },
  {
    title: "AI Agents Fundamentals & Hugging Face Agents Course",
    issuer: "Hugging Face",
    credentials: [
      {
        label: "Agents Course",
        url: "https://cas-bridge.xethub.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/f5497c9c2d136e3c0ae4d6b8c2be50f4953426fe38fb82affa985100e01f279c",
      },
    ],
  },
  {
    title: "Building AI Voice Agents for Production",
    issuer: "DeepLearning.AI",
    credentials: [
      {
        label: "Voice Agents",
        url: "https://learn.deeplearning.ai/accomplishments/f34beee1-fec3-490a-8668-85ccbafd7bd2",
      },
    ],
  },
  {
    title: "Practical Multi AI Agents and Advanced Use Cases with CrewAI",
    issuer: "DeepLearning.AI",
    credentials: [
      {
        label: "CrewAI Agents",
        url: "https://learn.deeplearning.ai/accomplishments/4d32955d-75e3-472b-9829-b5ab425d1f5f",
      },
    ],
  },
  {
    title: "Intermediate Python",
    issuer: "DataCamp",
    credentials: [
      {
        label: "Intermediate Python",
        url: "https://www.datacamp.com/statement-of-accomplishment/course/7df9722485989a6d328a7be6f700053257ea5c32",
      },
    ],
  },
  {
    title: "Problem Solving Certificate",
    issuer: "HackerRank",
    credentials: [
      {
        label: "Problem Solving",
        url: "https://www.hackerrank.com/certificates/iframe/de583633d481",
        // The official PDF and its preview image, both served from
        // /public/certificates so this one credential is a true direct download.
        file: "/certificates/hackerrank-problem-solving.pdf",
        image: "/certificates/hackerrank-problem-solving.png",
        meta: "Credential ID DE583633D481 · issued 28 Sep 2023",
      },
    ],
  },
  {
    title: "Trek Venture 6.0 — Leadership & Experiential Learning",
    issuer: "Million Smiles",
    credentials: [],
  },
];

export default CERTS;

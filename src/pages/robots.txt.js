const SITE_URL = "https://goutam-sachdev.vercel.app";

export const getServerSideProps = async ({ res }) => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  res.setHeader("Content-Type", "text/plain");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
const SITE_URL = "https://goutam-sachdev.vercel.app";

// Static routes for a personal portfolio. Add new top-level pages here.
const ROUTES = ["/", "/about", "/projects", "/skills", "/articles", "/contact"];

export const getServerSideProps = async ({ res }) => {
  const today = new Date().toISOString();
  const urls = ROUTES.map(
    (r) => `  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
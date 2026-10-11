
import { tools } from "@/data/tools";
import { categories, categoryToSlug } from "@/lib/categories";

const SITE_URL = "https://devkit.pars-paris1.workers.dev";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const now = new Date().toISOString();

  const pages = [
    {
      url: SITE_URL,
      frequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools`,
      frequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      frequency: "monthly",
      priority: 0.5,
    },
    ...categories.map((category) => ({
      url: `${SITE_URL}/tools/category/${categoryToSlug(category)}`,
      frequency: "weekly",
      priority: 0.7,
    })),
    ...tools.map((tool) => ({
      url: `${SITE_URL}${tool.href}`,
      frequency: "monthly",
      priority: 0.8,
    })),
  ];

  const entries = pages
    .map(
      (page) => `
  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.frequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

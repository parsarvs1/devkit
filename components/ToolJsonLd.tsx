import { tools } from "@/data/tools";

const SITE_URL = "https://devkit.pars-paris1.workers.dev";

export default function ToolJsonLd({ slug }: { slug: string }) {
  const tool = tools.find((t) => t.href === `/tools/${slug}`);
  if (!tool) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    url: `${SITE_URL}/tools/${slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
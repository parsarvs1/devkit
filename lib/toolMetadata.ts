import type { Metadata } from "next";

import { tools } from "@/data/tools";

const SITE_URL =
  "https://devkit.pars-paris1.workers.dev";

/**
 * Build SEO metadata for a single tool page.
 *
 * Tool routes are static (e.g. /tools/json-formatter), so
 * each tool gets its own layout.tsx that calls this helper.
 */
export function toolMetadata(slug: string): Metadata {
  const tool = tools.find((item) => item.href === `/tools/${slug}`);

  if (!tool) {
    return {
      title: "All Developer Tools",
      alternates: { canonical: "/tools" },
    };
  }

  const url = `${SITE_URL}/tools/${slug}`;

  const title = `${tool.name} — Free Online Tool`;

  const description = `${tool.description} Free, fast and privacy-friendly. No signup required.`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title,
      description: tool.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tool.description,
    },
  };
}

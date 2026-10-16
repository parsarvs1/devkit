import type { MetadataRoute } from "next";

import { tools } from "@/data/tools";
import { categories, categoryToSlug } from "@/lib/categories";

const SITE_URL =
  "https://devkit.pars-paris1.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${SITE_URL}/tools/category/${categoryToSlug(category)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const toolPages: MetadataRoute.Sitemap = tools
    .map((tool) =>
      tool
        ? {
            url: `${SITE_URL}${tool.href}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          }
        : null
    )
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return [...staticPages, ...categoryPages, ...toolPages];
}

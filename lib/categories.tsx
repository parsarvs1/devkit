import { tools } from "@/data/tools";

export type Tool = (typeof tools)[number];


export const categories = Array.from(
  new Set(tools.map((tool) => tool.category)),
);


const CATEGORY_SLUGS: Record<string, string> = {
  JSON: "json",
  Security: "security",
  Generators: "generators",
  Text: "text",
  Encoding: "encoding",
  Utilities: "utilities",
  "Code Generation": "code-generation",
  Networking: "networking",
  HTTP: "http",
  Automation: "automation",
};

export function categoryToSlug(category: string): string {
  return CATEGORY_SLUGS[category] ?? category.toLowerCase().replace(/\s+/g, "-");
}

export function slugToCategory(slug: string): string | undefined {
  return Object.entries(CATEGORY_SLUGS).find(
    ([, value]) => value === slug,
  )?.[0];
}

export function categoryHref(category: string): string {
  return `/tools/category/${categoryToSlug(category)}`;
}

export function toolsInCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function relatedTools(href: string, limit = 3): Tool[] {
  const current = tools.find((tool) => tool.href === href);

  if (!current) {
    return [];
  }

  const sameCategory = toolsInCategory(current.category).filter(
    (tool) => tool.href !== href,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const seen = new Set(sameCategory.map((tool) => tool.href));
  seen.add(href);

  const others = [...categories]
    .filter((category) => category !== current.category)
    .sort(
      (a, b) =>
        toolsInCategory(b).length - toolsInCategory(a).length,
    )
    .flatMap((category) => toolsInCategory(category))
    .filter((tool) => !seen.has(tool.href));

  return [...sameCategory, ...others].slice(0, limit);
}

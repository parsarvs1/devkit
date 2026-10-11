import type { Metadata } from "next";

import { categoryToSlug, categories, slugToCategory } from "@/lib/categories";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = slugToCategory(slug);

  if (!category) {
    return {
      title: "All Developer Tools",
      alternates: { canonical: "/tools" },
    };
  }

  const title = `${category} Tools — Free Online Developer Tools`;
  const url = `https://devkit.pars-paris1.workers.dev/tools/category/${slug}`;

  const description = `Browse every ${category.toLowerCase()} tool in DevKit — free, fast and privacy-friendly. No signup required.`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/category/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

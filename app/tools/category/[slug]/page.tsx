import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Sparkles } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolsExplorer from "@/components/ToolsExplorer";

import { tools } from "@/data/tools";

import {
  categoryToSlug,
  categories,
  slugToCategory,
} from "@/lib/categories";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = slugToCategory(slug);

  if (!category) {
    notFound();
  }

  const items = tools.filter((item) => item?.category === category);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 text-white">
      <Navbar />
      <main id="main-content" className="flex-1">

      {/* =========================
          HERO
      ========================== */}

      <section className="relative overflow-hidden border-b border-zinc-900">
        {/* Grid background with a radial fade */}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_10%,transparent_75%)]" />

        {/* Ambient gradient glow */}

        <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-600/30 bg-violet-600/10 px-3.5 py-1.5 text-xs font-medium text-violet-300 shadow-[0_0_20px_-8px_rgba(139,92,246,0.7)]">
              <Sparkles size={13} />
              {category} tools
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                {category}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {items.length}{" "}
              {items.length === 1 ? "tool" : "tools"} in the {category}{" "}
              category — all free, fast and privacy-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          TOOLS
      ========================== */}

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ToolsExplorer activeCategory={category} />

          {/* Back link */}

          <div className="mt-12 border-t border-zinc-900 pt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              <ArrowLeft size={16} />

              All tools
            </Link>
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}



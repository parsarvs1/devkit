"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRight } from "lucide-react";

import { relatedTools } from "@/lib/categories";

export default function RelatedTools() {
  const pathname = usePathname();

 
  const match = pathname?.match(/^\/tools\/([^/]+)$/);

  const slug = match?.[1];

  if (!slug) {
    return null;
  }

  const related = relatedTools(`/tools/${slug}`);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-lg font-bold sm:text-xl">Related tools</h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Other DevKit tools you might find useful.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {related.map((tool) => {
            const Icon = tool.icon;

            return (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/60 sm:p-5"
                >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition group-hover:border-zinc-700 group-hover:text-white">
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{tool.name}</h3>

                  <p className="mt-0.5 truncate text-xs leading-5 text-zinc-500">
                    {tool.description}
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-300"
                />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

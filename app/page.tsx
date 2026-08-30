import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import QuickActions from "@/components/QuickActions";

import { tools } from "@/data/tools";

import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const popularTools = tools.slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Free developer toolkit
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Developer tools.
            <br />
            <span className="text-zinc-500">
              All in one place.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Simple, fast and useful tools for developers.
            Format JSON, decode JWTs, generate hashes,
            create UUIDs and more.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Explore Tools
              <ArrowRight size={16} />
            </Link>

            <a
              href="https://github.com/parsarvs1/devkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              <Code2 size={16} />
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
          <span>{tools.length} developer tools</span>

          <span>Free to use</span>

          <span>Open source</span>

          <span>No signup required</span>
        </div>
      </section>
      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
                <Sparkles size={15} />
                Start here
              </div>

              <h2 className="text-2xl font-bold">
                Popular Tools
              </h2>
            </div>

            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-20 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-700">
            <Zap
              size={20}
              className="text-zinc-300"
            />

            <h3 className="mt-4 font-semibold">
              Fast
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Lightweight tools that work instantly in
              your browser.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-700">
            <ShieldCheck
              size={20}
              className="text-zinc-300"
            />

            <h3 className="mt-4 font-semibold">
              Private
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Your data stays in your browser whenever
              possible.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-700">
            <Code2
              size={20}
              className="text-zinc-300"
            />

            <h3 className="mt-4 font-semibold">
              Open Source
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Built in public and available for developers
              to use and improve.
            </p>
          </div>
        </div>
        
      </section>
      <section className="border-t border-zinc-900" >
        <div className="mx-auto max-w-6xl px-6">
          <QuickActions />
        </div>

      </section>
      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to build?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              Skip the unnecessary setup and use simple
              developer tools directly in your browser.
            </p>

            <Link
              href="/tools"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Explore all tools
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
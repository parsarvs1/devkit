import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ArrowRight,
  Code2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const technologies = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Lucide React",
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}

        <div className="max-w-3xl">
          <p className="mb-3 text-sm text-zinc-500">
            About DevKit
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Developer tools,
            <br />
            <span className="text-zinc-500">
              without the clutter.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            DevKit is an open-source collection of simple,
            fast and useful tools built for developers.
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
            The goal is simple: provide the tools developers
            use every day in one clean and accessible place.
          </p>
        </div>

        {/* Features */}

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <Zap
              size={20}
              className="text-zinc-300"
            />

            <h2 className="mt-4 font-semibold">
              Fast
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Lightweight tools designed to work instantly.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <ShieldCheck
              size={20}
              className="text-zinc-300"
            />

            <h2 className="mt-4 font-semibold">
              Private
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Most tools process your data directly in the
              browser.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <Code2
              size={20}
              className="text-zinc-300"
            />

            <h2 className="mt-4 font-semibold">
              Open Source
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              The project is public and open for developers
              to explore and improve.
            </p>
          </div>
        </div>

        {/* Built With */}

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-lg font-semibold">
            Built with
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            DevKit is built with modern web technologies.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Open Source */}

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold">
                Open Source
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                Want to explore the code, report an issue or
                contribute a new tool? The project is available
                on GitHub.
              </p>
            </div>

            <Code2
              size={22}
              className="shrink-0 text-zinc-500"
            />
          </div>

          <a
            href="https://github.com/parsarvs1/devkit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
          >
            <Code2 size={16} />
            View on GitHub
          </a>
        </div>


        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
          <h2 className="text-2xl font-bold">
            Ready to use DevKit?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-500">
            Explore the available tools and find what you
            need for your next project.
          </p>

          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Explore Tools
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Command,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Zap,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import { tools } from "@/data/tools";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevKit",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Free, fast and privacy-friendly developer tools. Format JSON, decode JWTs, generate hashes, generate UUIDs, test regex and more — right in your browser.",
    url: "https://devkit.pars-paris1.workers.dev",
    author: {
      "@type": "Person",
      name: "Parsa Ravasha",
      url: "https://github.com/parsarvs1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: tools.map((tool) => tool.name),
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Navbar />
      <section className="relative isolate overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-violet-500/5"
        />

        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-10 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              Free developer toolkit
               <span className="ml-1.5 rounded-full bg-zinc-700 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">v1.0</span>
            </div>

            {/* Heading */}
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Developer tools.
              <br />

              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                All in one place.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              A fast, simple and privacy-friendly toolkit for developers.
              Format JSON, decode JWTs, generate hashes, create UUIDs,
              test APIs and more.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 hover:shadow-violet-500/30 sm:w-auto"
              >
                Explore Tools

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="https://github.com/parsarvs1/devkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white sm:w-auto"
              >
                <GitBranch size={17} />
                View on GitHub
              </a>
            </div>

            {/* Trust line */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Privacy-friendly
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <Zap size={14} />
                Fast & lightweight
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <Code2 size={14} />
                Open source
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm sm:grid-cols-4">
            <div className="border-b border-zinc-800/80 p-5 text-center sm:border-b-0 sm:border-r">
              <div className="text-2xl font-bold text-white">
                {tools.length}
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                Developer tools
              </div>
            </div>

            <div className="border-b border-zinc-800/80 p-5 text-center sm:border-b-0 sm:border-r">
              <div className="text-2xl font-bold text-white">
                100%
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                Free to use
              </div>
            </div>

            <div className="border-r border-zinc-800/80 p-5 text-center">
              <div className="text-2xl font-bold text-white">
                Open
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                Source
              </div>
            </div>

            <div className="p-5 text-center">
              <div className="text-2xl font-bold text-white">
                Zero
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                Signup required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURES
          ========================================= */}

      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
              Built for developers
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple by design.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-500 sm:text-base">
              DevKit focuses on the tools you actually need without
              unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {/* Fast */}
            <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/10 bg-amber-400/5 text-amber-400">
                <Zap size={21} />
              </div>

              <h3 className="text-base font-semibold text-white">
                Fast
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Lightweight tools designed to give you results
                instantly without unnecessary waiting.
              </p>
            </div>

            {/* Private */}
            <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/5 text-emerald-400">
                <LockKeyhole size={21} />
              </div>

              <h3 className="text-base font-semibold text-white">
                Privacy-friendly
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Many tools run directly in your browser, keeping
                your data away from unnecessary servers.
              </p>
            </div>

            {/* Open Source */}
            <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-400/5 text-violet-400">
                <Code2 size={21} />
              </div>

              <h3 className="text-base font-semibold text-white">
                Open source
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Transparent, developer-focused and available for
                everyone to inspect and improve.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================
          COMMAND PALETTE
          ========================================= */}

      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-100px] top-[-120px] h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[90px]"
            />

            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                  <Command size={21} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Your tools, one shortcut away.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                  Use the Command Palette to quickly search for tools
                  and navigate around DevKit without leaving the keyboard.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
                <kbd className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-300">
                  Ctrl
                </kbd>

                <span>+</span>

                <kbd className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-300">
                  K
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FAQ
          ========================================= */}

      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
          <Faq />
        </div>
      </section>

      {/* =========================================
          FINAL CTA
          ========================================= */}

      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/10 bg-gradient-to-br from-violet-500/10 via-zinc-900/70 to-zinc-950 p-8 text-center sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]"
            />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <Code2 size={23} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to build?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                Stop switching between different websites.
                Keep your everyday developer tools in one place.
              </p>

              <Link
                href="/tools"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                Explore all tools

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
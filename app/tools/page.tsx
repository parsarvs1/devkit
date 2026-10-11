import { Wrench, Sparkles, LayoutGrid, Zap } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolsExplorer from "@/components/ToolsExplorer";
import { tools } from "@/data/tools";
import { categories } from "@/lib/categories";

export default function ToolsPage() {
  const stats = [
    {
      icon: Wrench,
      label: "Tools",
      value: tools.length,
    },
    {
      icon: LayoutGrid,
      label: "Categories",
      value: categories.length,
    },
    {
      icon: Zap,
      label: "Runs in browser",
      value: "100%",
    },
  ];

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
          <div className="pointer-events-none absolute -top-24 right-1/4 h-56 w-80 rounded-full bg-fuchsia-600/10 blur-[90px]" />
          <div className="pointer-events-none absolute -top-24 left-1/4 h-56 w-80 rounded-full bg-indigo-600/10 blur-[90px]" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-600/30 bg-violet-600/10 px-3.5 py-1.5 text-xs font-medium text-violet-300 shadow-[0_0_20px_-8px_rgba(139,92,246,0.7)]">
                <Sparkles size={13} />
                Developer toolkit
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Developer{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  Tools
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Simple, fast and useful tools for everyday
                development — no signups, no uploads, no
                nonsense.
              </p>

              {/* Stats */}

              <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition hover:border-zinc-700"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-violet-400">
                        <Icon size={16} />
                      </div>

                      <div>
                        <p className="text-lg font-bold leading-none">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            TOOLS
        ========================== */}

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <ToolsExplorer />
          </div>
        </section>

        {/* =========================
            CTA
        ========================== */}

        <section className="border-t border-zinc-900">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/60 via-zinc-900/40 to-zinc-900/60 px-5 py-10 text-center sm:px-12 sm:py-12">
              {/* Subtle glow inside the CTA */}

              <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[80px]" />

              <div className="relative">
                <h2 className="text-xl font-bold sm:text-2xl">
                  More tools coming soon
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                  DevKit is continuously growing with new
                  utilities and developer-focused tools.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

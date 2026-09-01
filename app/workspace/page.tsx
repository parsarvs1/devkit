
"use client";

import Link from "next/link";
import RecentlyUsedWidget from "@/components/RecentlyUsedWidget";
import {
  ArrowRight,
  Code2,
  Clock3,
  FileCode2,
  Wrench,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tools } from "@/data/tools";
import WorkspaceStats from "@/components/WorkspaceStats";
import PinnedToolsWidget from "@/components/PinnedToolsWidget";

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400">
              <Code2 size={14} />
              Your developer workspace
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Workspace
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
              Your personal space for tools, snippets and
              developer workflows.
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD STATS */}
      <WorkspaceStats />

      {/* PINNED TOOLS */}
      <PinnedToolsWidget />

      {/* RECENTLY USED */}
      <RecentlyUsedWidget />

      {/* SNIPPETS */}
      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
              <FileCode2 size={15} />
              Code library
            </div>

            <h2 className="text-2xl font-bold">
              Snippets
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
              <FileCode2
                size={20}
                className="text-zinc-500"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Your snippets
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Save reusable pieces of code and keep them
              organized inside your workspace.
            </p>

            <Link
              href="/tools/snippets"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              Open Snippets
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

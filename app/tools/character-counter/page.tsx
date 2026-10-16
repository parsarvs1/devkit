"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, FileText } from "lucide-react";

export default function CharacterCounterPage() {
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const lines = text ? text.split(/\n/).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(words / 200) || 0;

  const stats = [
    ["Characters", chars],
    ["Characters (no spaces)", charsNoSpace],
    ["Words", words],
    ["Sentences", sentences],
    ["Lines", lines],
    ["Paragraphs", paragraphs],
    ["Reading time (min)", readingTime],
  ];

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/tools" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <FileText size={20} />
            </div>
            <p className="text-sm text-zinc-500">DevKit Tool</p>
          </div>
          <h1 className="text-4xl font-bold">Character Counter</h1>
          <p className="mt-3 text-zinc-400">Count characters, words, sentences, lines and paragraphs.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="h-80 w-full rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setText("")}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-400 transition hover:text-white"
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
              {stats.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-zinc-800 py-2 last:border-0">
                  <span className="text-sm text-zinc-400">{k}</span>
                  <span className="font-mono text-sm text-zinc-200">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
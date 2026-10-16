"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Trash2, Check, GitBranch } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

import RecentToolTracker from "@/components/RecentToolTracker";
import TrackToolUsage from "@/components/TrackToolUsage";

const types = ["feature", "fix", "hotfix", "docs", "chore", "refactor", "test", "release"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function GitBranchNameGeneratorPage() {
  const [type, setType] = useState("feature");
  const [ticket, setTicket] = useState("");
  const [desc, setDesc] = useState("");
  const [separator, setSeparator] = useState("/");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const slug = slugify(desc);
  const ticketPart = ticket.trim() ? `${ticket.trim().replace(/\s+/g, "")}-` : "";
  const branch = desc.trim()
    ? `${type}${separator}${ticketPart}${slug}`.replace(/--+/g, "-")
    : "";

  async function copyOutput() {
    if (!branch) return;
    const ok = await copyToClipboard(branch, setError);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  function clearAll() {
    setType("feature");
    setTicket("");
    setDesc("");
    setSeparator("/");
    setError("");
    setCopied(false);
  }

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="Git Branch Name Generator"
        toolHref="/tools/git-branch-name-generator"
        category="Version Control"
      />
      <RecentToolTracker name="Git Branch Name Generator" href="/tools/git-branch-name-generator" />

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/tools" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-14">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <GitBranch size={20} />
            </div>
            <p className="text-sm text-zinc-500">DevKit Tool</p>
          </div>
          <h1 className="text-4xl font-bold">Git Branch Name Generator</h1>
          <p className="mt-3 text-zinc-400">
            Generate clean, consistent git branch names from your task description.
          </p>
        </div>

        <div className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Branch type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white focus:border-violet-600 focus:outline-none"
            >
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-500">Ticket / issue ID (optional)</label>
            <input
              type="text"
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
              placeholder="JIRA-123"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-500">Description</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Add user authentication"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-500">Separator</label>
            <div className="flex gap-2">
              {["/", "-"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeparator(s)}
                  className={`rounded-lg border px-4 py-2 text-sm font-mono transition ${
                    separator === s
                      ? "border-violet-600 bg-violet-600/20 text-violet-300"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {s === "/" ? "/" : "-"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-500">Generated branch name</label>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-zinc-200">
              {branch || <span className="text-zinc-600">type{separator}your-description</span>}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={copyOutput}
              disabled={!branch}
              className="flex-1 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2"><Check size={16} /> Copied!</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><Copy size={16} /> Copy</span>
              )}
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm text-zinc-400 transition hover:text-white"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
        </div>
      </section>
    </main>
  );
}
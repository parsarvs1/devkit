"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Trash2, FileCode2, CheckCircle2 } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { format } from "sql-formatter";

const SAMPLE_SQL =
  "select u.id, u.name, o.total from users u join orders o on o.user_id = u.id where u.active = 1 and o.total > 100 order by o.total desc;";

export default function SqlFormatterPage() {
  const [input, setInput] = useState(SAMPLE_SQL);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [uppercase, setUppercase] = useState(true);

  function handleFormat() {
    setError("");
    setCopied(false);
    if (!input.trim()) {
      setError("Input is empty.");
      setOutput("");
      return;
    }
    try {
      const formatted = format(input, {
        language: "sql",
        keywordCase: uppercase ? "upper" : "preserve",
      });
      setOutput(formatted);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting failed.");
      setOutput("");
    }
  }

  function loadSample() {
    setInput(SAMPLE_SQL);
    setOutput("");
    setError("");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">DevKit Tool</p>
          <h1 className="text-4xl font-bold">SQL Formatter</h1>
          <p className="mt-3 text-zinc-400">
            Format SQL queries for readability. Never executed or sent anywhere.
          </p>
        </div>

        {/* Actions */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button
            onClick={handleFormat}
            disabled={!input.trim()}
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Format
          </button>
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Copy size={15} />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
          >
            <Trash2 size={15} />
            Clear
          </button>
          <button
            onClick={loadSample}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
          >
            <FileCode2 size={15} />
            Load Example
          </button>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-950"
            />
            Uppercase keywords
          </label>
        </div>

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Editor + Output */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Input</h2>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="SQL input"
              placeholder="Paste your SQL query here..."
              spellCheck={false}
              className="h-96 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Formatted Output</h2>
              {output && (
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 size={13} />
                  Formatted
                </span>
              )}
            </div>
            <pre
              role="status"
              className="h-96 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300"
            >
              {output || "Formatted SQL will appear here..."}
            </pre>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="mb-2 text-sm font-medium">About</h2>
          <p className="text-sm leading-6 text-zinc-500">
            Uses sql-formatter. Supports standard SQL dialect. Formatting is
            purely presentational — queries are never executed or transmitted.
          </p>
        </div>
      </section>
    </main>
  );
}

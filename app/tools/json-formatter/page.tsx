"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import RecentToolTracker from "@/components/RecentToolTracker";
import ShareButton from "@/components/ShareButton";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  Minimize2,
} from "lucide-react";

import TrackToolUsage from "@/components/TrackToolUsage";

import { decodeShareState } from "@/lib/shareState";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  /*
   * Load shared state from URL
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedState = params.get("state");

    if (!sharedState) return;

    const state = decodeShareState(sharedState);

    if (!state) {
      setError("Invalid or corrupted share link.");
      return;
    }

    if (typeof state.input === "string") {
      setInput(state.input);
    }
  }, []);

  function formatJson() {
    try {
      const parsed = JSON.parse(input);

      const formatted = JSON.stringify(
        parsed,
        null,
        2
      );

      setOutput(formatted);
      setError("");
    } catch {
      setOutput("");
      setError(
        "Invalid JSON. Please check your syntax."
      );
    }
  }

  function minifyJson() {
    try {
      const parsed = JSON.parse(input);

      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setError("");
    } catch {
      setOutput("");
      setError(
        "Invalid JSON. Please check your syntax."
      );
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  function loadExample() {
    const example = JSON.stringify(
      {
        name: "Parsa",
        age: 20,
        developer: true,
        skills: [
          "Next.js",
          "React",
          "TypeScript",
        ],
      },
      null,
      2
    );

    setInput(example);
    setOutput("");
    setError("");
  }

  async function copyOutput() {
    if (!output) return;

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="JSON Formatter"
        toolHref="/tools/json-formatter"
        category="JSON"
      />

      <RecentToolTracker
        name="JSON Formatter"
        href="/tools/json-formatter"
      />

      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                JSON Formatter
              </h1>

              <p className="mt-3 text-zinc-400">
                Format, minify and validate your JSON data.
              </p>
            </div>

            <ShareButton
              path="/tools/json-formatter"
              state={{
                input,
              }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Input
              </h2>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={loadExample}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Sparkles size={15} />
                  Example
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Trash2 size={15} />
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder='{"name":"John","age":25}'
              spellCheck={false}
              className="h-96 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={formatJson}
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                <Sparkles size={16} />
                Format
              </button>

              <button
                type="button"
                onClick={minifyJson}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <Minimize2 size={16} />
                Minify
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          {/* Output */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Output
              </h2>

              {output && (
                <button
                  type="button"
                  onClick={copyOutput}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />

                  {copied
                    ? "Copied!"
                    : "Copy"}
                </button>
              )}
            </div>

            <pre className="h-96 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
              {output ||
                "Formatted JSON will appear here..."}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
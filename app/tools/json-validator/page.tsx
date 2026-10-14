"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import RecentToolTracker from "@/components/RecentToolTracker";
import ShareButton from "@/components/ShareButton";
import TrackToolUsage from "@/components/TrackToolUsage";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileJson,
} from "lucide-react";

import { decodeShareState } from "@/lib/shareState";
import { copyToClipboard } from "@/lib/clipboard";

import {
  getJsonValidatorExample,
  getInvalidJsonExample,
  validateJson,
} from "@/shared/jsonValidator";

export default function JsonValidatorPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  /*
   * Load shared state from URL
   */
  useEffect(() => {
    // Shared state is hydrated from the URL once on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = new URLSearchParams(window.location.search);
    const sharedState = params.get("state");

    if (!sharedState) return;

    const state = decodeShareState(sharedState);

    if (!state) return;

    if (typeof state.input === "string") {
      setInput(state.input);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /*
   * Validate on every keystroke so feedback is instant. The scan is
   * pure string work, so it stays cheap even for large documents.
   */
  const result = useMemo(() => {
    if (!input.trim()) return null;

    return validateJson(input);
  }, [input]);

  const stats = result?.valid ? result.stats : null;

  /*
   * Clear everything
   */
  function clearAll() {
    setInput("");
    setCopied(false);
  }

  /*
   * Load a valid example
   */
  function loadExample() {
    setInput(getJsonValidatorExample());
    setCopied(false);
  }

  /*
   * Load a broken example to demo the error reporting
   */
  function loadInvalidExample() {
    setInput(getInvalidJsonExample());
    setCopied(false);
  }

  /*
   * Copy the formatted output
   */
  async function copyOutput() {
    if (!result?.formatted) return;

    const ok = await copyToClipboard(result.formatted);

    if (ok) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="JSON Validator"
        toolHref="/tools/json-validator"
        category="JSON"
      />

      <RecentToolTracker
        name="JSON Validator"
        href="/tools/json-validator"
      />

      {/* Navigation */}
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

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                JSON Validator
              </h1>

              <p className="mt-3 text-zinc-400">
                Validate JSON and pinpoint syntax errors with exact
                line and column reporting.
              </p>
            </div>

            <ShareButton
              path="/tools/json-validator"
              state={{
                input,
              }}
            />
          </div>
        </div>

        {/* Editor */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 id="json-input-heading" className="text-sm font-medium">
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
                  onClick={loadInvalidExample}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <AlertTriangle size={15} />
                  Broken
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  disabled={!input.trim()}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Trash2 size={15} />
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-labelledby="json-input-heading"
              aria-invalid={result && !result.valid ? true : undefined}
              aria-describedby={
                result && !result.valid ? "json-error" : undefined
              }
              placeholder='{"name":"John","age":25}'
              spellCheck={false}
              className="h-[28rem] w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>

          {/* Result */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Result
              </h2>

              {result?.formatted && (
                <button
                  type="button"
                  onClick={copyOutput}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />

                  {copied ? "Copied!" : "Copy formatted"}
                </button>
              )}
            </div>

            {!result && (
              <div className="flex h-[28rem] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
                <FileJson size={32} className="text-zinc-700" />

                <p className="mt-4 max-w-xs text-sm text-zinc-600">
                  Paste JSON on the left and the validation result
                  appears here instantly.
                </p>
              </div>
            )}

            {result && !result.valid && (
              <div
                id="json-error"
                role="alert"
                className="overflow-hidden rounded-xl border border-red-900/60 bg-red-950/20"
              >
                <div className="flex items-start gap-3 border-b border-red-900/40 px-5 py-4">
                  <XCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-red-300">
                      Invalid JSON
                    </p>

                    <p className="mt-1 text-sm text-red-400/90">
                      {result.error}
                    </p>
                  </div>
                </div>

                {result.issues.map((issue, index) => (
                  <div
                    key={`${issue.line}-${issue.column}-${index}`}
                    className="border-t border-red-900/40 px-5 py-4"
                  >
                    <p className="text-xs text-red-400/70">
                      Line {issue.line}, column {issue.column}
                    </p>

                    <pre className="mt-2 overflow-x-auto font-mono text-xs leading-6 text-red-200/90">
                      {issue.excerpt}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {result && result.valid && (
              <div className="space-y-4">
                <div
                  role="status"
                  className="flex items-center gap-3 rounded-xl border border-emerald-900/60 bg-emerald-950/20 px-5 py-4"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-emerald-300">
                      Valid JSON
                    </p>

                    <p className="mt-0.5 text-sm text-emerald-400/80">
                      No syntax errors found.{" "}
                      {result.warnings.length > 0 &&
                        `${result.warnings.length} warning${
                          result.warnings.length === 1 ? "" : "s"
                        } to review.`}
                    </p>
                  </div>
                </div>

                {stats && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <StatCard label="Root type" value={stats.rootType} />

                    <StatCard
                      label="Size"
                      value={formatBytes(stats.bytes)}
                    />

                    <StatCard label="Keys" value={String(stats.keys)} />

                    <StatCard
                      label="Array items"
                      value={String(stats.arrayItems)}
                    />

                    <StatCard
                      label="Max depth"
                      value={String(stats.maxDepth)}
                    />

                    <StatCard
                      label="Warnings"
                      value={String(result.warnings.length)}
                    />
                  </div>
                )}

                {result.warnings.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-amber-900/50 bg-amber-950/15">
                    <div className="flex items-center gap-2 border-b border-amber-900/40 px-5 py-3">
                      <AlertTriangle
                        size={15}
                        className="shrink-0 text-amber-400"
                      />

                      <p className="text-sm font-medium text-amber-300">
                        Warnings
                      </p>
                    </div>

                    <ul className="divide-y divide-amber-900/30">
                      {result.warnings.map((warning, index) => (
                        <li
                          key={index}
                          className="px-5 py-3.5 text-sm leading-6 text-amber-200/80"
                        >
                          {warning.message}

                          <span className="mt-0.5 block font-mono text-xs text-amber-500/70">
                            {warning.path}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.formatted && (
                  <div>
                    <p className="mb-2 text-xs text-zinc-600">
                      Formatted output
                    </p>

                    <pre className="max-h-72 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
                      {result.formatted}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-1 font-mono text-sm font-medium text-zinc-200">
        {value}
      </p>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

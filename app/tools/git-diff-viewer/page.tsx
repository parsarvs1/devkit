"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  GitCompare,
  Check,
  ChevronDown,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

import RecentToolTracker from "@/components/RecentToolTracker";
import TrackToolUsage from "@/components/TrackToolUsage";
import ShareButton from "@/components/ShareButton";

import { parseDiff, getSampleDiff, getDiffStats, getDiffSummary, ParsedDiff, FileDiff, DiffHunk } from "@/shared/gitDiff";

export default function GitDiffViewerPage() {
  const [input, setInput] = useState("");
  const [parsedDiff, setParsedDiff] = useState<ParsedDiff | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});

  // Load example on mount
  useEffect(() => {
    setInput(getSampleDiff());
  }, []);

  // Parse diff when input changes
  useEffect(() => {
    if (!input.trim()) {
      setParsedDiff(null);
      setError("");
      return;
    }

    try {
      const result = parseDiff(input);
      setParsedDiff(result);
      setError("");
    } catch {
      setError("Invalid diff format. Please check your input.");
      setParsedDiff(null);
    }
  }, [input]);

  const stats = useMemo(() => {
    if (!parsedDiff) return null;
    return getDiffStats(input);
  }, [parsedDiff, input]);

  const summary = useMemo(() => {
    if (!parsedDiff) return "";
    return getDiffSummary(input);
  }, [parsedDiff, input]);

  function toggleExpandFile(filePath: string) {
    setExpandedFiles((prev) => ({
      ...prev,
      [filePath]: !prev[filePath],
    }));
  }

  function clearAll() {
    setInput("");
    setParsedDiff(null);
    setError("");
    setCopied(false);
    setExpandedFiles({});
  }

  function loadExample() {
    const example = getSampleDiff();
    setInput(example);
    setError("");
    setExpandedFiles({});
  }

  async function copyDiff() {
    if (!input) return;

    const ok = await copyToClipboard(input, setError);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  function expandAll() {
    if (!parsedDiff) return;
    const expanded: Record<string, boolean> = {};
    for (const file of parsedDiff.files) {
      expanded[file.newPath !== "unknown" ? file.newPath : file.oldPath] = true;
    }
    setExpandedFiles(expanded);
  }

  function collapseAll() {
    setExpandedFiles({});
  }

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="Git Diff Viewer"
        toolHref="/tools/git-diff-viewer"
        category="Version Control"
      />

      <RecentToolTracker
        name="Git Diff Viewer"
        href="/tools/git-diff-viewer"
      />

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
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <GitCompare size={20} />
            </div>
            <p className="text-sm text-zinc-500">DevKit Tool</p>
          </div>

          <h1 className="text-4xl font-bold">Git Diff Viewer</h1>

          <p className="mt-3 text-zinc-400">
            Paste a git diff to view and analyze changes in a beautiful, readable format.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadExample}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              <Sparkles size={16} />
              Load Example
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={!input}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white disabled:opacity-50"
            >
              <Trash2 size={16} />
              Clear
            </button>
          </div>

          <div className="flex items-center gap-3">
            {parsedDiff && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Expand all
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Collapse all
                </button>
              </div>
            )}
            <ShareButton
              path="/tools/git-diff-viewer"
              state={{
                diff: input,
              }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Input Section */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Input</h2>
              <span className="text-xs text-zinc-500">git diff output</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Git diff input"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "diff-error" : undefined}
              placeholder="Paste your git diff here..."
              spellCheck={false}
              className="h-80 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 font-mono text-xs leading-5 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />
            {error && (
              <p id="diff-error" role="alert" className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-zinc-500">{input.length} characters</p>
              <button
                type="button"
                onClick={copyDiff}
                disabled={!input}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:opacity-50"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy Diff"}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7">
            {!parsedDiff ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
                  <GitCompare size={32} className="text-zinc-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No diff to display</h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-500">
                  Paste a git diff on the left to see a beautiful breakdown of changes.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30">
                {/* Summary Header */}
                <div className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
                  <h2 className="text-sm font-medium">Diff Summary</h2>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs text-zinc-300">
                        +{stats?.totalAdditions ?? 0} additions
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-xs text-zinc-300">
                        -{stats?.totalDeletions ?? 0} deletions
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-zinc-300">
                        {stats?.totalFiles ?? 0} file{stats?.totalFiles !== 1 ? "s" : ""} changed
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-500">{summary}</p>
                </div>

                {/* Files List */}
                <div className="max-h-[600px] overflow-y-auto">
                  {parsedDiff.files.map((file, fileIndex) => {
                    const filePath = file.newPath !== "unknown" ? file.newPath : file.oldPath;
                    const isExpanded = expandedFiles[filePath] ?? true;

                    // Calculate changes for this file
                    let additions = 0;
                    let deletions = 0;
                    for (const hunk of file.hunks) {
                      for (const line of hunk.lines) {
                        if (line.type === "add") additions++;
                        if (line.type === "remove") deletions++;
                      }
                    }

                    return (
                      <div key={fileIndex} className="border-b border-zinc-800 last:border-0">
                        {/* File Header */}
                        <button
                          type="button"
                          onClick={() => toggleExpandFile(filePath)}
                          className="flex w-full items-center justify-between px-6 py-4 hover:bg-zinc-800/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
                              <GitCompare size={16} className="text-zinc-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-zinc-200">
                                {filePath}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-zinc-500">
                                {additions > 0 && (
                                  <span className="text-green-500">+{additions}</span>
                                )}
                                {deletions > 0 && (
                                  <span className="text-red-500">-{deletions}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`text-zinc-500 transition ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Hunks */}
                        {isExpanded && file.hunks.length > 0 && (
                          <div className="bg-zinc-950/30 px-6 pb-6">
                            {file.hunks.map((hunk, hunkIndex) => (
                              <div key={hunkIndex} className="mb-4 overflow-x-auto">
                                {/* Hunk Header */}
                                <div className="mb-2 flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-400">
                                  <span className="text-zinc-600">{'@@'}</span>
                                  <span className="font-mono">{hunk.header}</span>
                                </div>

                                {/* Hunk Lines */}
                                <div className="font-mono text-xs">
                                  {hunk.lines.map((line, lineIndex) => (
                                    <div
                                      key={lineIndex}
                                      className={`flex ${
                                        line.type === "add"
                                          ? "bg-green-950/30"
                                          : line.type === "remove"
                                          ? "bg-red-950/30"
                                          : ""
                                      }`}
                                    >
                                      <div className="flex h-8 w-12 shrink-0 items-start justify-end pt-1.5 pr-2 text-zinc-600">
                                        <span className="text-zinc-700">
                                          {line.type === "add"
                                            ? `+${line.newLine ?? ""}`
                                            : line.type === "remove"
                                            ? `-${line.oldLine ?? ""}`
                                            : " "}
                                        </span>
                                      </div>
                                      <div className="flex-1 whitespace-pre-wrap break-all pl-2">
                                        <span
                                          className={`${
                                            line.type === "add"
                                              ? "text-green-400"
                                              : line.type === "remove"
                                              ? "text-red-400"
                                              : "text-zinc-300"
                                          }`}
                                        >
                                          {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
                                          {line.content}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h3 className="text-sm font-medium">How to get a git diff</h3>
          <div className="mt-3 space-y-3">
            <InfoItem
              title="Show all unstaged changes"
              command="git diff"
              description="Compare working directory to staging area"
            />
            <InfoItem
              title="Show staged changes"
              command="git diff --staged"
              description="Compare staging area to last commit"
            />
            <InfoItem
              title="Show changes in last commit"
              command="git show"
              description="Show the last commit with its diff"
            />
            <InfoItem
              title="Show changes between commits"
              command="git diff <commit1> <commit2>"
              description="Compare any two commits"
            />
            <InfoItem
              title="Save diff to file"
              command="git diff > changes.patch"
              description="Export diff for sharing or review"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoItem({ title, command, description }: { title: string; command: string; description: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
      <div className="mb-1.5 font-mono text-xs text-zinc-400">
        <span className="text-violet-500">git</span> {command}
      </div>
      <div className="text-xs text-zinc-500">{description}</div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  FileCode,
  Check,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

import RecentToolTracker from "@/components/RecentToolTracker";
import TrackToolUsage from "@/components/TrackToolUsage";
import ShareButton from "@/components/ShareButton";

import {
  gitignoreTemplates,
  getGitignorePatterns,
  generateGitignore,
} from "@/shared/gitignore";

const templates = Object.entries(gitignoreTemplates).map(([key, _]) => ({
  id: key,
  name: key.charAt(0).toUpperCase() + key.slice(1),
}));

export default function GitignoreGeneratorPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  }

  function handleGenerate() {
    if (selectedTypes.length === 0) {
      setError("Select at least one project type");
      setOutput("");
      return;
    }

    try {
      const result = generateGitignore(selectedTypes);
      setOutput(result);
      setError("");
    } catch {
      setError("Failed to generate gitignore");
    }
  }

  function clearAll() {
    setSelectedTypes([]);
    setOutput("");
    setError("");
    setCopied(false);
    setShowPreview(false);
  }

  function loadExample() {
    const example = ["node", "python"];
    setSelectedTypes(example);
    const result = generateGitignore(example);
    setOutput(result);
    setError("");
    setShowPreview(true);
  }

  async function copyOutput() {
    if (!output) return;

    const ok = await copyToClipboard(output, setError);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  function getPreviewContent() {
    if (selectedTypes.length === 0) return "";
    const patterns = getGitignorePatterns();
    const allPatterns = selectedTypes.flatMap(
      (type) => patterns[type as keyof typeof patterns] || []
    );
    return [...new Set(allPatterns)].slice(0, 10);
  }

  const previewPatterns = getPreviewContent();

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName=".gitignore Generator"
        toolHref="/tools/gitignore-generator"
        category="Version Control"
      />

      <RecentToolTracker
        name=".gitignore Generator"
        href="/tools/gitignore-generator"
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

      <section className="mx-auto max-w-5xl px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <FileCode size={20} />
            </div>
            <p className="text-sm text-zinc-500">DevKit Tool</p>
          </div>

          <h1 className="text-4xl font-bold">.gitignore Generator</h1>

          <p className="mt-3 text-zinc-400">
            Create a .gitignore file for your project with pre-built templates.
          </p>
        </div>

        {/* Header actions */}
        <div className="mb-6 flex items-center gap-3">
          <ShareButton
            path="/tools/gitignore-generator"
            state={{
              types: selectedTypes,
              output,
            }}
          />
        </div>

        {/* Template Selection */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">Select project types</h2>

            <button
              onClick={clearAll}
              disabled={selectedTypes.length === 0 && !output}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Trash2 size={15} />
              Clear
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {templates.map((template) => {
              const isSelected = selectedTypes.includes(template.id);
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => toggleType(template.id)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-violet-600/50 bg-violet-600/10"
                      : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      isSelected
                        ? "border-violet-600 bg-violet-600"
                        : "border-zinc-600"
                    }`}
                  >
                    {isSelected && <Check size={11} />}
                  </div>
                  <span className="text-sm font-medium">{template.name}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={selectedTypes.length === 0}
              className="flex-1 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Generate
            </button>

            <button
              type="button"
              onClick={loadExample}
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              <Sparkles size={16} />
              Load Example
            </button>
          </div>

          {error && (
            <p
              id="gitignore-error"
              role="alert"
              className="mt-4 text-sm text-red-400"
            >
              {error}
            </p>
          )}
        </div>

        {/* Preview (optional) */}
        {showPreview && previewPatterns.length > 0 && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
            <h3 className="text-sm font-medium">Preview (first 10 patterns)</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {(previewPatterns as string[]).map((pattern, i) => (
                <span
                  key={i}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                >
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Output */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">Output</h2>

            <button
              onClick={copyOutput}
              disabled={!output}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Copy size={15} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <textarea
            value={output}
            readOnly
            aria-label="Generated .gitignore content"
            className="h-96 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            placeholder=".gitignore content will appear here..."
          />

          {output && (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/20 px-4 py-3">
              <p className="text-xs text-zinc-500">
                {selectedTypes.length} template
                {selectedTypes.length > 1 ? "s" : ""} selected:{" "}
                {selectedTypes.join(", ")}
              </p>
              <p className="text-xs text-zinc-500">
                {output.length} characters
              </p>
            </div>
          )}
        </div>

        {/* Help text */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h3 className="text-sm font-medium">How to use</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-500">
            <li>Select the project types you are working with</li>
            <li>Click "Generate" to create your .gitignore</li>
            <li>Copy the output and save it as .gitignore in your project root</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

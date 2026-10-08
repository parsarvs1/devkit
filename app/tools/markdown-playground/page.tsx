"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import RecentToolTracker from "@/components/RecentToolTracker";
import { copyToClipboard } from "@/lib/clipboard";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  Eye,
  Code2,
} from "lucide-react";

export default function MarkdownPlaygroundPage() {
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"preview" | "source">("preview");

  function loadExample() {
    setMarkdown(`# DevKit Markdown

Welcome to **DevKit Markdown Playground**.

## Features

- Live Markdown preview
- Headings
- **Bold text**
- *Italic text*
- \`inline code\`
- Code blocks
- Links
- Lists
- Blockquotes

### Code Example

\`\`\`typescript
const greeting = "Hello DevKit";

console.log(greeting);
\`\`\`

> Build faster. Write better code.

[Visit DevKit](https://devkit.pars-paris1.workers.dev/)
`);
  }

  function clearAll() {
    setMarkdown("");
    setCopied(false);
  }

  async function copyMarkdown() {
    if (!markdown) return;

    const ok = await copyToClipboard(markdown, setError);
    if (ok) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RecentToolTracker
        name="Markdown Playground"
        href="/tools/markdown-playground"
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

          <h1 className="text-4xl font-bold">
            Markdown Playground
          </h1>

          <p className="mt-3 text-zinc-400">
            Write Markdown and see the result instantly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Editor */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Markdown
              </h2>

              <div className="flex items-center gap-4">
                <button
                  onClick={loadExample}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Sparkles size={15} />
                  Example
                </button>

                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Trash2 size={15} />
                  Clear
                </button>

                {markdown && (
                  <button
                    onClick={copyMarkdown}
                    className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                  >
                    <Copy size={15} />

                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={markdown}
              onChange={(event) =>
                setMarkdown(event.target.value)
              }
              placeholder="# Hello DevKit

Write your Markdown here..."
              spellCheck={false}
              className="h-[520px] w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            {error && (
              <p
                className="mt-4 text-sm text-red-400"
                role="status"
                aria-live="polite"
              >
                {error}
              </p>
            )}
          </div>

          {/* Preview */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Preview
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("preview")}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                    view === "preview"
                      ? "border-zinc-600 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white"
                  }`}
                >
                  <Eye size={14} />
                  Preview
                </button>

                <button
                  onClick={() => setView("source")}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                    view === "source"
                      ? "border-zinc-600 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white"
                  }`}
                >
                  <Code2 size={14} />
                  Source
                </button>
              </div>
            </div>

            {view === "preview" ? (
              <div className="markdown-body h-[520px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-300">
                {markdown.trim() ? (
                  <ReactMarkdown
                    components={{
                      a: (props) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                ) : (
                  <p>Markdown preview will appear here...</p>
                )}
              </div>
            ) : (
              <pre className="h-[520px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
                {markdown ||
                  "Markdown source will appear here..."}
              </pre>
            )}
          </div>
        </div>

        {/* Markdown Help */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="font-semibold">
            Markdown Quick Reference
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-zinc-500">
                Heading
              </p>

              <code className="mt-2 block text-sm text-zinc-300">
                # Heading
              </code>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Bold
              </p>

              <code className="mt-2 block text-sm text-zinc-300">
                **bold**
              </code>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Italic
              </p>

              <code className="mt-2 block text-sm text-zinc-300">
                *italic*
              </code>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Code
              </p>

              <code className="mt-2 block text-sm text-zinc-300">
                `code`
              </code>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
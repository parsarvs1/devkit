"use client";

import { useState } from "react";
import Link from "next/link";

import RecentToolTracker from "@/components/RecentToolTracker";

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

    await navigator.clipboard.writeText(markdown);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function renderMarkdown(text: string) {
    let html = text;

    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (_, language, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
      }
    );

    html = html.replace(
      /^### (.*)$/gm,
      "<h3>$1</h3>"
    );

    html = html.replace(
      /^## (.*)$/gm,
      "<h2>$1</h2>"
    );

    html = html.replace(
      /^# (.*)$/gm,
      "<h1>$1</h1>"
    );

    html = html.replace(
      /^\> (.*)$/gm,
      "<blockquote>$1</blockquote>"
    );

    html = html.replace(
      /^\- (.*)$/gm,
      "<li>$1</li>"
    );

    html = html.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    html = html.replace(
      /\*(.*?)\*/g,
      "<em>$1</em>"
    );

    html = html.replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    );

    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    html = html.replace(
      /\n\n/g,
      "</p><p>"
    );

    html = html.replace(
      /\n/g,
      "<br />"
    );

    return `<p>${html}</p>`;
  }

  function escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const preview = renderMarkdown(markdown);

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
              <div
                className="markdown-preview h-[520px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-300"
                dangerouslySetInnerHTML={{
                  __html:
                    preview ||
                    "<p>Markdown preview will appear here...</p>",
                }}
              />
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
"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { ArrowLeft, Trash2 } from "lucide-react";

const defaultMarkdown = `# Welcome to DevKit

Write **Markdown** on the left and see the preview on the right.

## Features

- Live preview
- Headings
- **Bold** and *italic* text
- Lists
- Links
- Code blocks

> Simple Markdown previewing directly in your browser.
`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] =
    useState(defaultMarkdown);

  function clearAll() {
    setMarkdown("");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}

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

      {/* Header */}

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Markdown Previewer
          </h1>

          <p className="mt-3 text-zinc-400">
            Write Markdown and preview the rendered
            result instantly.
          </p>
        </div>

        {/* Editor */}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Markdown
              </h2>

              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Trash2 size={15} />
                Clear
              </button>
            </div>

            <textarea
              value={markdown}
              onChange={(e) =>
                setMarkdown(e.target.value)
              }
              placeholder="# Start writing..."
              className="h-[500px] w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-7 text-zinc-300 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>

          {/* Preview */}

          <div>
            <div className="mb-3">
              <h2 className="text-sm font-medium">
                Preview
              </h2>
            </div>

            <div className="h-[500px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              {markdown.trim() ? (
                <article className="markdown-body max-w-none">
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
                </article>
              ) : (
                <p className="text-sm text-zinc-600">
                  Markdown preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
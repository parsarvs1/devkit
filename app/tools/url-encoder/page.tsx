"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRightLeft,
  Copy,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function encodeUrl() {
    try {
      if (!input) {
        setOutput("");
        setError("Enter some text first.");
        return;
      }

      setOutput(encodeURIComponent(input));
      setError("");
      setCopied(false);
    } catch {
      setOutput("");
      setError("Unable to encode the input.");
    }
  }

  function decodeUrl() {
    try {
      if (!input) {
        setOutput("");
        setError("Enter some encoded text first.");
        return;
      }

      setOutput(decodeURIComponent(input));
      setError("");
      setCopied(false);
    } catch {
      setOutput("");
      setError("Invalid encoded URL.");
    }
  }

  async function copyOutput() {
    if (!output) return;

    setError("");

    const ok = await copyToClipboard(output, setError);
    if (ok) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
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

      <section className="mx-auto max-w-5xl px-6 py-14">
        {/* Header */}

        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <LinkIcon size={20} />
            </div>

            <p className="text-sm text-zinc-500">
              DevKit Tool
            </p>
          </div>

          <h1 className="text-4xl font-bold">
            URL Encoder / Decoder
          </h1>

          <p className="mt-3 text-zinc-400">
            Encode or decode URL components directly in your browser.
          </p>
        </div>

        {/* Input */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              Input
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com/search?q=hello world"
            className="h-52 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
          />

          {/* Actions */}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={encodeUrl}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Encode
              <ArrowRightLeft size={16} />
            </button>

            <button
              onClick={decodeUrl}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              Decode
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Output */}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              Output
            </h2>

            {output && (
              <button
                onClick={copyOutput}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Copy size={15} />

                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          <div className="min-h-40 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="break-all whitespace-pre-wrap font-mono text-sm leading-7 text-zinc-300">
              {output || "Encoded or decoded result will appear here..."}
            </p>
          </div>
        </div>

        {/* Info */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h2 className="text-sm font-medium">
            About URL Encoding
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            URL encoding converts characters that cannot safely
            appear inside a URL into percent-encoded values.
            This is commonly used when working with query
            parameters and web APIs.
          </p>
        </div>
      </section>
    </main>
  );
}
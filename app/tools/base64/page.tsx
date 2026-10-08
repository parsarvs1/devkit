"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Trash2, ArrowRight } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function encodeBase64() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));

      setOutput(encoded);
      setError("");
      setCopied(false);
    } catch {
      setOutput("");
      setError("Unable to encode the text.");
    }
  }

  function decodeBase64() {
    try {
      const decoded = decodeURIComponent(
        Array.from(atob(input))
          .map(
            (char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2),
          )
          .join(""),
      );

      setOutput(decoded);
      setError("");
      setCopied(false);
    } catch {
      setOutput("");
      setError("Invalid Base64 string.");
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  async function copyOutput() {
    if (!output) return;

    const ok = await copyToClipboard(output, setError);
    if (ok) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
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

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">DevKit Tool</p>

          <h1 className="text-4xl font-bold">Base64 Encoder / Decoder</h1>

          <p className="mt-3 text-zinc-400">
            Encode text to Base64 or decode Base64 strings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Input</h2>

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
              placeholder="Enter text or Base64..."
              spellCheck={false}
              className="h-80 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={encodeBase64}
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Encode
                <ArrowRight size={16} />
              </button>

              <button
                onClick={decodeBase64}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                Decode
              </button>
            </div>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </div>

          {/* Output */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Output</h2>

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

            <pre className="h-80 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
              {output || "Result will appear here..."}
            </pre>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h2 className="text-sm font-medium">About Base64</h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Base64 is an encoding format commonly used to represent binary or
            text data using ASCII characters. It is encoding, not encryption.
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Trash2,
  Hash,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

const algorithms = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
] as const;

type Algorithm = (typeof algorithms)[number];

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] =
    useState<Algorithm>("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateHash() {
    try {
      if (!input) {
        setOutput("");
        setError("Enter some text first.");
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const hashBuffer = await crypto.subtle.digest(
        algorithm,
        data
      );

      const hashArray = Array.from(
        new Uint8Array(hashBuffer)
      );

      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setOutput(hashHex);
      setError("");
      setCopied(false);
    } catch {
      setOutput("");
      setError("Unable to generate hash.");
    }
  }

  async function copyHash() {
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
              <Hash size={20} />
            </div>

            <p className="text-sm text-zinc-500">
              DevKit Tool
            </p>
          </div>

          <h1 className="text-4xl font-bold">
            Hash Generator
          </h1>

          <p className="mt-3 text-zinc-400">
            Generate SHA hashes from text directly in your
            browser.
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
            placeholder="Enter text to hash..."
            className="h-52 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
          />

          {/* Controls */}

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm text-zinc-500">
                Algorithm
              </label>

              <select
                value={algorithm}
                onChange={(e) =>
                  setAlgorithm(e.target.value as Algorithm)
                }
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-zinc-600"
              >
                {algorithms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateHash}
              className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Generate Hash
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
                onClick={copyHash}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Copy size={15} />

                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          <div className="min-h-32 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="break-all font-mono text-sm leading-7 text-zinc-300">
              {output || "Generated hash will appear here..."}
            </p>
          </div>
        </div>

        {/* Info */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h2 className="text-sm font-medium">
            About Hashing
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Hash functions convert input data into a fixed-length
            string. The same input always produces the same hash,
            while even a small change in the input produces a
            different result.
          </p>
        </div>
      </section>
    </main>
  );
}
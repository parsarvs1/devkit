
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

export default function UuidGeneratorPage() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function generateUuid() {
    try {
      const newUuid = crypto.randomUUID();

      setUuid(newUuid);
      setCopied(false);
    } catch {
      setError(
        "UUID generation is unavailable in this context (secure context required)."
      );
    }
  }

  async function copyUuid() {
    if (!uuid) return;

    setError("");

    const ok = await copyToClipboard(uuid, setError);
    if (ok) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }

  function clearUuid() {
    setUuid("");
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

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <h1 className="text-4xl font-bold">
            UUID Generator
          </h1>

          <p className="mt-3 text-zinc-400">
            Generate a random UUID instantly.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              Generated UUID
            </h2>

            {uuid && (
              <button
                onClick={clearUuid}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Trash2 size={15} />
                Clear
              </button>
            )}
          </div>

          <div className="flex min-h-28 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 px-6">
            <p className="break-all text-center font-mono text-lg text-zinc-300">
              {uuid || "Your UUID will appear here..."}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={generateUuid}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <RefreshCw size={16} />
              Generate UUID
            </button>

            {uuid && (
              <button
                onClick={copyUuid}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

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

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h2 className="text-sm font-medium">
            About UUID
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            UUIDs are commonly used to uniquely identify
            objects, records, users and resources in software
            applications.
          </p>
        </div>
      </section>
    </main>
  );
}

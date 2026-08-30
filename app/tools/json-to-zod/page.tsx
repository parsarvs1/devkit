"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Braces,
  Copy,
  Check,
  Trash2,
} from "lucide-react";

function getZodType(value: unknown): string {
  if (value === null) {
    return "z.null()";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "z.array(z.unknown())";
    }

    const types = [...new Set(value.map(getZodType))];

    if (types.length === 1) {
      return `z.array(${types[0]})`;
    }

    return `z.array(z.union([${types.join(", ")}]))`;
  }

  if (typeof value === "object") {
    return createZodObject(value);
  }

  if (typeof value === "string") {
    return "z.string()";
  }

  if (typeof value === "number") {
    return "z.number()";
  }

  if (typeof value === "boolean") {
    return "z.boolean()";
  }

  return "z.unknown()";
}

function createZodObject(value: unknown): string {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return "z.unknown()";
  }

  const object = value as Record<string, unknown>;

  const fields = Object.entries(object)
    .map(([key, item]) => {
      return `  ${formatKey(key)}: ${getZodType(item)},`;
    })
    .join("\n");

  return `z.object({\n${fields}\n})`;
}

function formatKey(key: string): string {
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
    return key;
  }

  return `"${key}"`;
}

function generateSchema(value: unknown): string {
  if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    const object = value as Record<string, unknown>;

    const fields = Object.entries(object)
      .map(([key, item]) => {
        return `  ${formatKey(key)}: ${getZodType(item)},`;
      })
      .join("\n");

    return `import { z } from "zod";

const RootSchema = z.object({
${fields}
});

export type Root = z.infer<typeof RootSchema>;`;
  }

  return `import { z } from "zod";

const RootSchema = ${getZodType(value)};

export type Root = z.infer<typeof RootSchema>;`;
}

export default function JsonToZodPage() {
  const [input, setInput] = useState(`{
  "name": "Parsa",
  "age": 20,
  "active": true,
  "skills": ["Next.js", "TypeScript"]
}`);

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function convert() {
    setError("");
    setCopied(false);

    try {
      const parsed = JSON.parse(input);

      const result = generateSchema(parsed);

      setOutput(result);
    } catch {
      setOutput("");
      setError("Invalid JSON. Please check your input.");
    }
  }

  async function copyOutput() {
    if (!output) return;

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <Link
          href="/tools"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Tools
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Braces size={21} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            JSON → Zod
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Convert JSON objects into Zod validation schemas instantly.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">

          {/* JSON */}

          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <span className="text-sm font-medium text-zinc-300">
                JSON Input
              </span>

              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs text-zinc-600 transition hover:text-red-400"
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              spellCheck={false}
              placeholder='{"name":"Parsa","age":20}'
              className="min-h-[420px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-zinc-300 outline-none placeholder:text-zinc-700"
            />
          </div>

          {/* ZOD */}

          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <span className="text-sm font-medium text-zinc-300">
                Zod Schema
              </span>

              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <pre className="min-h-[420px] overflow-auto p-5 font-mono text-sm leading-7 text-zinc-300">
              {output || (
                <span className="text-zinc-700">
                  Your Zod schema will appear here...
                </span>
              )}
            </pre>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={convert}
          className="mt-5 h-11 rounded-lg bg-white px-6 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Convert to Zod
        </button>

      </div>
    </main>
  );
}
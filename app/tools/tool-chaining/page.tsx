"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  Play,
  Copy,
  Trash2,
  Plus,
  GripVertical,
  Check,
  RotateCcw,
} from "lucide-react";

type ToolId =
  | "json-formatter"
  | "json-to-typescript"
  | "json-to-zod"
  | "base64"
  | "hash-generator"
  | "color-converter"
  | "timestamp"
  | "uuid-generator";

type ChainStep = {
  id: string;
  tool: ToolId;
};

const TOOLS: {
  id: ToolId;
  name: string;
  description: string;
}[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON",
  },
  {
    id: "json-to-typescript",
    name: "JSON → TypeScript",
    description: "Convert JSON into TypeScript types",
  },
  {
    id: "json-to-zod",
    name: "JSON → Zod",
    description: "Generate Zod schemas from JSON",
  },
  {
    id: "base64",
    name: "Base64",
    description: "Encode or decode Base64",
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate hashes from text",
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Convert color formats",
  },
  {
    id: "timestamp",
    name: "Timestamp",
    description: "Convert timestamps and dates",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUID values",
  },
];

const DEFAULT_CHAIN: ChainStep[] = [
  {
    id: crypto.randomUUID(),
    tool: "json-formatter",
  },
  {
    id: crypto.randomUUID(),
    tool: "json-to-typescript",
  },
];

function getTool(toolId: ToolId) {
  return TOOLS.find((tool) => tool.id === toolId)!;
}

function runTool(tool: ToolId, input: string): string {
  if (!input.trim()) {
    return "";
  }

  switch (tool) {
    case "json-formatter": {
      const parsed = JSON.parse(input);
      return JSON.stringify(parsed, null, 2);
    }

    case "json-to-typescript": {
      const parsed = JSON.parse(input);

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        throw new Error("JSON root must be an object.");
      }

      function getType(value: unknown): string {
        if (value === null) return "null";

        if (Array.isArray(value)) {
          if (value.length === 0) return "unknown[]";

          const types = [...new Set(value.map(getType))];

          return types.length === 1
            ? `${types[0]}[]`
            : `(${types.join(" | ")})[]`;
        }

        if (typeof value === "string") return "string";
        if (typeof value === "number") return "number";
        if (typeof value === "boolean") return "boolean";

        if (typeof value === "object") {
          return "object";
        }

        return "unknown";
      }

      const lines = ["interface Root {"];

      for (const [key, value] of Object.entries(parsed)) {
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
          ? key
          : `"${key}"`;

        lines.push(`  ${safeKey}: ${getType(value)};`);
      }

      lines.push("}");

      return lines.join("\n");
    }

    case "json-to-zod": {
      const parsed = JSON.parse(input);

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        throw new Error("JSON root must be an object.");
      }

      function getZodType(value: unknown): string {
        if (value === null) return "z.null()";

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return "z.array(z.unknown())";
          }

          return `z.array(${getZodType(value[0])})`;
        }

        if (typeof value === "string") return "z.string()";
        if (typeof value === "number") return "z.number()";
        if (typeof value === "boolean") return "z.boolean()";

        if (typeof value === "object") {
          const objectLines = Object.entries(value as object).map(
            ([key, val]) =>
              `  ${JSON.stringify(key)}: ${getZodType(val)},`
          );

          return `z.object({\n${objectLines.join("\n")}\n})`;
        }

        return "z.unknown()";
      }

      const lines = [
        `import { z } from "zod";`,
        "",
        `export const schema = z.object({`,
      ];

      for (const [key, value] of Object.entries(parsed)) {
        lines.push(
          `  ${JSON.stringify(key)}: ${getZodType(value)},`
        );
      }

      lines.push("});");

      return lines.join("\n");
    }

    case "base64": {
      try {
        return atob(input);
      } catch {
        return btoa(input);
      }
    }

    case "hash-generator": {
      throw new Error(
        "Hash Generator cannot currently be chained directly because Web Crypto is asynchronous. Use it as the final step for now."
      );
    }

    case "color-converter": {
      const value = input.trim();

      if (value.startsWith("#")) {
        const hex = value.replace("#", "");

        if (hex.length !== 6) {
          throw new Error("Use a 6-digit HEX color.");
        }

        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        return `HEX: #${hex.toUpperCase()}\nRGB: rgb(${r}, ${g}, ${b})`;
      }

      const rgbMatch = value.match(
        /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i
      );

      if (rgbMatch) {
        const [, r, g, b] = rgbMatch;

        const hex = [r, g, b]
          .map((number) =>
            Number(number).toString(16).padStart(2, "0")
          )
          .join("");

        return `RGB: rgb(${r}, ${g}, ${b})\nHEX: #${hex.toUpperCase()}`;
      }

      throw new Error("Use HEX or RGB color format.");
    }

    case "timestamp": {
      const value = input.trim();

      const number = Number(value);

      if (!Number.isNaN(number)) {
        const date = new Date(
          number < 10000000000 ? number * 1000 : number
        );

        if (Number.isNaN(date.getTime())) {
          throw new Error("Invalid timestamp.");
        }

        return date.toISOString();
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date.");
      }

      return String(Math.floor(date.getTime() / 1000));
    }

    case "uuid-generator": {
      return crypto.randomUUID();
    }

    default:
      return input;
  }
}

export default function ToolChainingPage() {
  const [steps, setSteps] = useState<ChainStep[]>(DEFAULT_CHAIN);
  const [input, setInput] = useState(
    `{
  "name": "Parsa",
  "age": 20,
  "developer": true
}`
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const canRun = useMemo(
    () => steps.length > 0 && input.trim().length > 0,
    [steps, input]
  );

  function addStep() {
    setSteps((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        tool: "json-formatter",
      },
    ]);
  }

  function removeStep(id: string) {
    setSteps((current) =>
      current.filter((step) => step.id !== id)
    );
  }

  function updateStep(id: string, tool: ToolId) {
    setSteps((current) =>
      current.map((step) =>
        step.id === id
          ? {
              ...step,
              tool,
            }
          : step
      )
    );
  }

  function moveStep(index: number, direction: -1 | 1) {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= steps.length) {
      return;
    }

    const updated = [...steps];

    const current = updated[index];

    updated[index] = updated[newIndex];
    updated[newIndex] = current;

    setSteps(updated);
  }

  function resetChain() {
    setSteps([
      {
        id: crypto.randomUUID(),
        tool: "json-formatter",
      },
      {
        id: crypto.randomUUID(),
        tool: "json-to-typescript",
      },
    ]);

    setOutput("");
    setError("");
  }

  function runChain() {
    if (!canRun) return;

    setRunning(true);
    setError("");
    setOutput("");

    try {
      let current = input;

      for (const step of steps) {
        current = runTool(step.tool, current);
      }

      setOutput(current);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while running the chain."
      );
    } finally {
      setRunning(false);
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
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Tool Chaining
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Connect DevKit tools together and pass the output of
            one tool directly into the next.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Your Chain
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {steps.length}{" "}
                  {steps.length === 1 ? "step" : "steps"}
                </p>
              </div>

              <button
                onClick={resetChain}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => {
                const tool = getTool(step.tool);

                return (
                  <div key={step.id}>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                      <div className="flex items-center gap-3">
                        <GripVertical
                          size={17}
                          className="shrink-0 text-zinc-700"
                        />

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs font-semibold text-zinc-400">
                          {index + 1}
                        </div>

                        <select
                          value={step.tool}
                          onChange={(event) =>
                            updateStep(
                              step.id,
                              event.target.value as ToolId
                            )
                          }
                          className="h-10 min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-zinc-600"
                        >
                          {TOOLS.map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => removeStep(step.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-950/30 hover:text-red-400"
                          title="Remove step"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="pl-11 text-xs text-zinc-600">
                          {tool.description}
                        </p>

                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              moveStep(index, -1)
                            }
                            disabled={index === 0}
                            className="rounded px-2 text-xs text-zinc-600 transition hover:text-white disabled:opacity-30"
                          >
                            ↑
                          </button>

                          <button
                            onClick={() =>
                              moveStep(index, 1)
                            }
                            disabled={
                              index === steps.length - 1
                            }
                            className="rounded px-2 text-xs text-zinc-600 transition hover:text-white disabled:opacity-30"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowDown
                          size={18}
                          className="text-zinc-700"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={addStep}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-800 py-3 text-sm text-zinc-500 transition hover:border-zinc-600 hover:text-white"
            >
              <Plus size={16} />
              Add Tool
            </button>

            <button
              onClick={runChain}
              disabled={!canRun || running}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Play size={16} />

              {running ? "Running Chain..." : "Run Chain"}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium">
                  Chain Input
                </h2>

                <span className="text-xs text-zinc-600">
                  Step 1 input
                </span>
              </div>

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                spellCheck={false}
                className="h-64 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                placeholder="Enter your chain input..."
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium">
                  Final Output
                </h2>

                {output && (
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                  >
                    {copied ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}

                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>

              <pre className="min-h-64 max-h-[500px] overflow-auto whitespace-pre-wrap rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
                {output ||
                  "The final output of your chain will appear here..."}
              </pre>

              {error && (
                <div className="mt-3 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="font-semibold">
            How Tool Chaining works
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            The output produced by each step automatically becomes
            the input for the next step. This lets you build
            repeatable developer workflows without manually copying
            data between tools.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center gap-2"
              >
                <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-400">
                  {getTool(step.tool).name}
                </span>

                {index < steps.length - 1 && (
                  <ArrowRightSmall />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArrowRightSmall() {
  return (
    <span className="text-zinc-700">
      →
    </span>
  );
}
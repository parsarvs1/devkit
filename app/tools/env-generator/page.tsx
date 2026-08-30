"use client";

import { useState } from "react";
import Link from "next/link";

import RecentToolTracker from "@/components/RecentToolTracker";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  Download,
  Plus,
  X,
  KeyRound,
} from "lucide-react";

interface EnvVariable {
  id: number;
  key: string;
  value: string;
}

export default function EnvGeneratorPage() {
  const [variables, setVariables] = useState<EnvVariable[]>([
    {
      id: 1,
      key: "",
      value: "",
    },
  ]);

  const [format, setFormat] = useState<
    "env" | "example" | "json" | "typescript"
  >("env");

  const [copied, setCopied] = useState(false);

  function addVariable() {
    setVariables((current) => [
      ...current,
      {
        id: Date.now(),
        key: "",
        value: "",
      },
    ]);
  }

  function removeVariable(id: number) {
    setVariables((current) => {
      if (current.length === 1) {
        return [
          {
            id: Date.now(),
            key: "",
            value: "",
          },
        ];
      }

      return current.filter((variable) => variable.id !== id);
    });
  }

  function updateVariable(
    id: number,
    field: "key" | "value",
    value: string
  ) {
    setVariables((current) =>
      current.map((variable) =>
        variable.id === id
          ? {
              ...variable,
              [field]:
                field === "key"
                  ? value.toUpperCase().replace(/\s+/g, "_")
                  : value,
            }
          : variable
      )
    );
  }

  function generateSecret(length = 32) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    const array = new Uint32Array(length);

    crypto.getRandomValues(array);

    return Array.from(array)
      .map((number) => characters[number % characters.length])
      .join("");
  }

  function generateSecretFor(id: number) {
    updateVariable(id, "value", generateSecret());
  }

  function loadExample() {
    setVariables([
      {
        id: 1,
        key: "DATABASE_URL",
        value: "postgresql://localhost:5432/myapp",
      },
      {
        id: 2,
        key: "NEXTAUTH_SECRET",
        value: "your-secret-key",
      },
      {
        id: 3,
        key: "API_URL",
        value: "https://api.example.com",
      },
      {
        id: 4,
        key: "NODE_ENV",
        value: "development",
      },
    ]);
  }

  function clearAll() {
    setVariables([
      {
        id: Date.now(),
        key: "",
        value: "",
      },
    ]);

    setCopied(false);
  }

  function getValidVariables() {
    return variables.filter((variable) => variable.key.trim());
  }

  function generateOutput() {
    const validVariables = getValidVariables();

    if (format === "env") {
      return validVariables
        .map(
          (variable) =>
            `${variable.key}=${variable.value}`
        )
        .join("\n");
    }

    if (format === "example") {
      return validVariables
        .map((variable) => `${variable.key}=`)
        .join("\n");
    }

    if (format === "json") {
      const object = Object.fromEntries(
        validVariables.map((variable) => [
          variable.key,
          variable.value,
        ])
      );

      return JSON.stringify(object, null, 2);
    }

    return `const env = {
${validVariables
  .map(
    (variable) =>
      `  ${variable.key}: process.env.${variable.key},`
  )
  .join("\n")}
};

export default env;`;
  }

  async function copyOutput() {
    const output = generateOutput();

    if (!output) return;

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function downloadOutput() {
    const output = generateOutput();

    if (!output) return;

    let filename = ".env";
    let type = "text/plain";

    if (format === "example") {
      filename = ".env.example";
    }

    if (format === "json") {
      filename = "env.json";
      type = "application/json";
    }

    if (format === "typescript") {
      filename = "env.ts";
      type = "text/typescript";
    }

    const blob = new Blob([output], {
      type,
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);
  }

  const output = generateOutput();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RecentToolTracker
        name="Environment Variable Generator"
        href="/tools/env-generator"
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
            Environment Variable Generator
          </h1>

          <p className="mt-3 text-zinc-400">
            Create, manage and export environment variables
            for your projects.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Variables */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Variables
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
              </div>
            </div>

            <div className="space-y-3">
              {variables.map((variable) => (
                <div
                  key={variable.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="flex gap-3">
                    <div className="min-w-0 flex-1">
                      <label className="mb-2 block text-xs text-zinc-500">
                        Key
                      </label>

                      <input
                        value={variable.key}
                        onChange={(event) =>
                          updateVariable(
                            variable.id,
                            "key",
                            event.target.value
                          )
                        }
                        placeholder="DATABASE_URL"
                        spellCheck={false}
                        className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 font-mono text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-600"
                      />
                    </div>

                    <div className="min-w-0 flex-[1.5]">
                      <label className="mb-2 block text-xs text-zinc-500">
                        Value
                      </label>

                      <div className="flex gap-2">
                        <input
                          value={variable.value}
                          onChange={(event) =>
                            updateVariable(
                              variable.id,
                              "value",
                              event.target.value
                            )
                          }
                          placeholder="your-value"
                          spellCheck={false}
                          className="h-10 min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 font-mono text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-600"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            generateSecretFor(variable.id)
                          }
                          title="Generate secret"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 transition hover:border-zinc-700 hover:text-white"
                        >
                          <KeyRound size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeVariable(variable.id)
                          }
                          title="Remove variable"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-600 transition hover:border-red-900/50 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addVariable}
              className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              <Plus size={16} />
              Add Variable
            </button>
          </div>

          {/* Output */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Output
              </h2>

              {output && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                  >
                    <Copy size={15} />
                    {copied ? "Copied!" : "Copy"}
                  </button>

                  <button
                    onClick={downloadOutput}
                    className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                  >
                    <Download size={15} />
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Format */}

            <div className="mb-3 flex flex-wrap gap-2">
              {[
                {
                  id: "env",
                  label: ".env",
                },
                {
                  id: "example",
                  label: ".env.example",
                },
                {
                  id: "json",
                  label: "JSON",
                },
                {
                  id: "typescript",
                  label: "TypeScript",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setFormat(
                      item.id as
                        | "env"
                        | "example"
                        | "json"
                        | "typescript"
                    )
                  }
                  className={`rounded-lg border px-3 py-2 text-xs transition ${
                    format === item.id
                      ? "border-zinc-600 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <pre className="h-[500px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
              {output ||
                "Generated environment variables will appear here..."}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
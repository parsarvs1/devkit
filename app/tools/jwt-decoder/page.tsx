
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Trash2 } from "lucide-react";

interface JwtPayload {
  [key: string]: unknown;
}

function decodeBase64Url(value: string) {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  return decodeURIComponent(
    atob(padded)
      .split("")
      .map(
        (char) =>
          "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)
      )
      .join("")
  );
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<JwtPayload | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  function decodeToken() {
    try {
      const parts = token.trim().split(".");

      if (parts.length !== 3) {
        throw new Error("Invalid JWT structure");
      }

      const decodedHeader = JSON.parse(
        decodeBase64Url(parts[0])
      );

      const decodedPayload = JSON.parse(
        decodeBase64Url(parts[1])
      );

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError("");
    } catch {
      setHeader(null);
      setPayload(null);
      setError(
        "Invalid JWT. Please check that the token is valid."
      );
    }
  }

  function clearAll() {
    setToken("");
    setHeader(null);
    setPayload(null);
    setError("");
    setCopied("");
  }

  async function copyJson(
    data: JwtPayload | null,
    type: string
  ) {
    if (!data) return;

    await navigator.clipboard.writeText(
      JSON.stringify(data, null, 2)
    );

    setCopied(type);

    setTimeout(() => {
      setCopied("");
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

          <h1 className="text-4xl font-bold">
            JWT Decoder
          </h1>

          <p className="mt-3 text-zinc-400">
            Decode JWT headers and payloads directly in your browser.
          </p>
        </div>

        {/* Token Input */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              JWT Token
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
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            spellCheck={false}
            className="h-40 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
          />

          <button
            onClick={decodeToken}
            className="mt-4 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Decode JWT
          </button>

          {error && (
            <p className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Results */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Header */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Header
              </h2>

              {header && (
                <button
                  onClick={() => copyJson(header, "header")}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />
                  {copied === "header" ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            <pre className="min-h-64 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
              {header
                ? JSON.stringify(header, null, 2)
                : "Decoded header will appear here..."}
            </pre>
          </div>

          {/* Payload */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Payload
              </h2>

              {payload && (
                <button
                  onClick={() => copyJson(payload, "payload")}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />
                  {copied === "payload" ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            <pre className="min-h-64 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
              {payload
                ? JSON.stringify(payload, null, 2)
                : "Decoded payload will appear here..."}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
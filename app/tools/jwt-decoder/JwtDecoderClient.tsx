"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Share2,
  Check,
} from "lucide-react";

import Link from "next/link";
import RecentToolTracker from "@/components/RecentToolTracker";
import TrackToolUsage from "@/components/TrackToolUsage";
import { copyToClipboard } from "@/lib/clipboard";

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

  // Decode via TextDecoder so segments containing non-UTF-8 bytes
  // fail cleanly instead of throwing "URI malformed".
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) =>
    char.charCodeAt(0)
  );

  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

export default function JwtDecoderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState(() =>
    searchParams.get("token") ?? ""
  );
  const [header, setHeader] = useState<JwtPayload | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [shared, setShared] = useState(false);

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

  // Auto-decode on first mount when arriving via a share link, so the
  // decoded panes aren't empty.
  useEffect(() => {
    if (token) {
      // Only on mount: this reads the token seeded from the share URL.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      decodeToken();
    }
    // Only on mount: this reads the token seeded from the share URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearAll() {
    setToken("");
    setHeader(null);
    setPayload(null);
    setError("");
    setCopied("");
    setShared(false);

    router.replace("/tools/jwt-decoder");
  }

  async function copyJson(
    data: JwtPayload | null,
    type: string
  ) {
    if (!data) return;

    const ok = await copyToClipboard(
      JSON.stringify(data, null, 2),
      setError
    );

    if (ok) {
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    }
  }

  async function shareTool() {
    if (!token.trim()) {
      setError("Please enter a JWT token before sharing.");
      return;
    }

    const params = new URLSearchParams();

    params.set("token", token.trim());

    const url =
      `${window.location.origin}/tools/jwt-decoder?` +
      params.toString();

    try {
      await navigator.clipboard.writeText(url);

      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 1500);
    } catch {
      setError("Unable to copy the share link.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="JWT Decoder"
        toolHref="/tools/jwt-decoder"
        category="Security"
      />

      <RecentToolTracker
        name="JWT Decoder"
        href="/tools/jwt-decoder"
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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                JWT Decoder
              </h1>

              <p className="mt-3 text-zinc-400">
                Decode JWT headers and payloads directly in your
                browser.
              </p>
            </div>

            <button
              type="button"
              onClick={shareTool}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              {shared ? (
                <>
                  <Check size={16} />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 size={16} />
                  Share
                </>
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              JWT Token
            </h2>

            <button
              type="button"
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
            type="button"
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

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Header
              </h2>

              {header && (
                <button
                  type="button"
                  onClick={() =>
                    copyJson(header, "header")
                  }
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />

                  {copied === "header"
                    ? "Copied!"
                    : "Copy"}
                </button>
              )}
            </div>

            <pre className="min-h-64 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
              {header
                ? JSON.stringify(header, null, 2)
                : "Decoded header will appear here..."}
            </pre>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Payload
              </h2>

              {payload && (
                <button
                  type="button"
                  onClick={() =>
                    copyJson(payload, "payload")
                  }
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />

                  {copied === "payload"
                    ? "Copied!"
                    : "Copy"}
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
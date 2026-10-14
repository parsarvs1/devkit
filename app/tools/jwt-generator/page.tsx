"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import RecentToolTracker from "@/components/RecentToolTracker";
import ShareButton from "@/components/ShareButton";
import TrackToolUsage from "@/components/TrackToolUsage";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  KeyRound,
  AlertTriangle,
} from "lucide-react";

import { decodeShareState } from "@/lib/shareState";
import { copyToClipboard } from "@/lib/clipboard";

import {
  getJwtGeneratorExample,
  minSecretLength,
  signJwt,
  withExpiration,
  type JwtAlgorithm,
} from "@/shared/jwt";

const ALGORITHMS: JwtAlgorithm[] = ["HS256", "HS384", "HS512"];

const EXPIRATION_OPTIONS: {
  label: string;
  value: number;
}[] = [
  { label: "1 hour", value: 60 * 60 },
  { label: "1 day", value: 60 * 60 * 24 },
  { label: "7 days", value: 60 * 60 * 24 * 7 },
  { label: "30 days", value: 60 * 60 * 24 * 30 },
];

export default function JwtGeneratorPage() {
  const [payload, setPayload] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<JwtAlgorithm>("HS256");
  const [expiresIn, setExpiresIn] = useState<number>(
    EXPIRATION_OPTIONS[1].value
  );
  const [addExpiration, setAddExpiration] = useState(true);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  /*
   * Load shared state from URL
   */
  useEffect(() => {
    // Shared state is hydrated from the URL once on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = new URLSearchParams(window.location.search);
    const sharedState = params.get("state");

    if (!sharedState) return;

    const state = decodeShareState(sharedState);

    if (!state) {
      setError("Invalid or corrupted share link.");
      return;
    }

    if (typeof state.payload === "string") {
      setPayload(state.payload);
    }

    if (typeof state.secret === "string") {
      setSecret(state.secret);
    }

    if (
      typeof state.algorithm === "string" &&
      ALGORITHMS.includes(state.algorithm as JwtAlgorithm)
    ) {
      setAlgorithm(state.algorithm as JwtAlgorithm);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /*
   * Derive the token from the current inputs, so it regenerates
   * whenever any input changes instead of needing a button press.
   * All state updates land after the first await, and the cancelled
   * flag keeps a slow signing from overwriting a newer one.
   */
  useEffect(() => {
    let cancelled = false;

    async function run() {
      const trimmedPayload = payload.trim();
      const trimmedSecret = secret.trim();

      if (!trimmedPayload) {
        return { token: "", error: "" };
      }

      let parsed: Record<string, unknown>;

      try {
        parsed = JSON.parse(trimmedPayload);
      } catch {
        return {
          token: "",
          error: "Payload is not valid JSON.",
        };
      }

      if (
        parsed === null ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        return {
          token: "",
          error: "Payload must be a JSON object.",
        };
      }

      if (!trimmedSecret) {
        return {
          token: "",
          error: "Enter a secret to sign the token.",
        };
      }

      const finalPayload = addExpiration
        ? withExpiration(parsed, expiresIn)
        : parsed;

      try {
        return {
          token: await signJwt(finalPayload, trimmedSecret, algorithm),
          error: "",
        };
      } catch {
        return {
          token: "",
          error: "Failed to sign the token. Please try again.",
        };
      }
    }

    run().then((result) => {
      if (cancelled) return;

      setToken(result.token);
      setError(result.error);
    });

    return () => {
      cancelled = true;
    };
  }, [payload, secret, algorithm, expiresIn, addExpiration]);

  /*
   * Load example
   */
  function loadExample() {
    setPayload(JSON.stringify(getJwtGeneratorExample(), null, 2));
    setSecret("your-256-bit-secret");
    setAlgorithm("HS256");
    setError("");
  }

  /*
   * Clear everything
   */
  function clearAll() {
    setPayload("");
    setSecret("");
    setToken("");
    setError("");
    setCopied(false);
  }

  /*
   * Copy token
   */
  async function copyToken() {
    if (!token) return;

    setError("");

    const ok = await copyToClipboard(token, setError);
    if (ok) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }

  const secretBytes = new TextEncoder().encode(secret);
  const minLength = minSecretLength(algorithm);
  const secretTooShort =
    secretBytes.length > 0 && secretBytes.length < minLength;

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="JWT Generator"
        toolHref="/tools/jwt-generator"
        category="Security"
      />

      <RecentToolTracker
        name="JWT Generator"
        href="/tools/jwt-generator"
      />

      {/* Navigation */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                JWT Generator
              </h1>

              <p className="mt-3 text-zinc-400">
                Sign JSON Web Tokens with an HMAC secret, entirely
                in your browser.
              </p>
            </div>

            <ShareButton
              path="/tools/jwt-generator"
              state={{
                payload,
                secret,
                algorithm,
              }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Config */}
          <div className="space-y-5">
            {/* Payload */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 id="jwt-payload-heading" className="text-sm font-medium">
                  Payload
                </h2>

                <button
                  type="button"
                  onClick={loadExample}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Sparkles size={15} />
                  Example
                </button>
              </div>

              <textarea
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                aria-labelledby="jwt-payload-heading"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "jwt-error" : undefined}
                placeholder='{"sub":"1234567890","name":"John Doe"}'
                spellCheck={false}
                className="h-56 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>

            {/* Secret */}
            <div>
              <label
                htmlFor="jwt-secret"
                className="mb-3 block text-sm font-medium"
              >
                Secret
              </label>

              <div className="relative">
                <KeyRound
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  id="jwt-secret"
                  type="text"
                  value={secret}
                  onChange={(event) => setSecret(event.target.value)}
                  placeholder="Your signing secret"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>

              {secretTooShort && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-400/90">
                  <AlertTriangle size={13} />

                  Secret is {secretBytes.length} bytes;{" "}
                  {algorithm} expects at least {minLength} bytes for
                  security.
                </p>
              )}
            </div>

            {/* Options */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="jwt-algorithm"
                  className="mb-3 block text-sm font-medium"
                >
                  Algorithm
                </label>

                <select
                  id="jwt-algorithm"
                  value={algorithm}
                  onChange={(event) =>
                    setAlgorithm(event.target.value as JwtAlgorithm)
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none transition focus:border-zinc-600"
                >
                  {ALGORITHMS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="jwt-expiration"
                  className="mb-3 block text-sm font-medium"
                >
                  Expires in
                </label>

                <select
                  id="jwt-expiration"
                  value={expiresIn}
                  onChange={(event) =>
                    setExpiresIn(Number(event.target.value))
                  }
                  disabled={!addExpiration}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none transition focus:border-zinc-600 disabled:opacity-40"
                >
                  {EXPIRATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={addExpiration}
                onChange={(event) =>
                  setAddExpiration(event.target.checked)
                }
                className="h-4 w-4 accent-violet-500"
              />

              Add <code className="font-mono text-zinc-300">iat</code> and{" "}
              <code className="font-mono text-zinc-300">exp</code> claims
            </label>

            <button
              type="button"
              onClick={clearAll}
              disabled={!payload.trim() && !secret.trim() && !token}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Trash2 size={15} />
              Clear
            </button>

            {error && (
              <p
                id="jwt-error"
                role="alert"
                className="text-sm text-red-400"
              >
                {error}
              </p>
            )}
          </div>

          {/* Token */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Signed Token
              </h2>

              <button
                type="button"
                onClick={copyToken}
                disabled={!token}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Copy size={15} />

                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <pre
              role="status"
              className="min-h-32 break-all rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-7 text-zinc-300"
            >
              {token || (
                <span className="text-zinc-600">
                  Your signed JWT will appear here...
                </span>
              )}
            </pre>

            {token && (
              <p className="mt-3 text-xs leading-5 text-zinc-600">
                Tokens are signed locally with the Web Crypto API and
                never leave your browser. Anyone holding the secret can
                forge tokens, so keep it safe.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

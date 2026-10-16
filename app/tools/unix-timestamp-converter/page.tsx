"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Clock } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

type Unit = "auto" | "s" | "ms";

interface DateResult {
  utc: string;
  local: string;
  iso: string;
  seconds: number;
  milliseconds: number;
}

function timestampToDate(
  raw: string,
  unit: Unit
): { result: DateResult | null; error: string } {
  if (!raw.trim()) return { result: null, error: "Enter a timestamp." };
  if (!/^-?\d+$/.test(raw.trim()))
    return { result: null, error: "Invalid number." };

  let value = Number(raw.trim());
  let detected: Unit = unit;
  if (unit === "auto") detected = raw.trim().length > 10 ? "ms" : "s";
  if (detected === "ms") value = value / 1000;

  const d = new Date(value * 1000);
  if (Number.isNaN(d.getTime()))
    return { result: null, error: "Out of range." };

  return {
    result: {
      utc: d.toUTCString(),
      local: d.toString(),
      iso: d.toISOString(),
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    },
    error: "",
  };
}

function dateToTimestamp(dateStr: string): {
  result: DateResult | null;
  error: string;
} {
  if (!dateStr) return { result: null, error: "Pick a date/time." };
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime()))
    return { result: null, error: "Invalid date." };

  return {
    result: {
      utc: d.toUTCString(),
      local: d.toString(),
      iso: d.toISOString(),
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    },
    error: "",
  };
}

export default function UnixTimestampConverterPage() {
  const [tsInput, setTsInput] = useState("");
  const [unit, setUnit] = useState<Unit>("auto");
  const [dateInput, setDateInput] = useState("");
  const [result, setResult] = useState<DateResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function convertTs() {
    setError("");
    setCopied(false);
    const { result: r, error: e } = timestampToDate(tsInput, unit);
    setResult(r);
    setError(e);
  }

  function convertDate() {
    setError("");
    setCopied(false);
    const { result: r, error: e } = dateToTimestamp(dateInput);
    setResult(r);
    setError(e);
  }

  function handleNow() {
    const d = new Date();
    setTsInput(String(Math.floor(d.getTime() / 1000)));
    setUnit("s");
    setError("");
    setCopied(false);
    setResult({
      utc: d.toUTCString(),
      local: d.toString(),
      iso: d.toISOString(),
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    });
  }

  function clearAll() {
    setTsInput("");
    setDateInput("");
    setResult(null);
    setError("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!result) return;
    const ok = await copyToClipboard(result.iso);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
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

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">DevKit Tool</p>
          <h1 className="text-4xl font-bold">Unix Timestamp Converter</h1>
          <p className="mt-3 text-zinc-400">
            Convert between Unix timestamps and human-readable dates.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Timestamp to Date */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-sm font-medium">
              Timestamp to Date
            </h2>
            <label
              htmlFor="ts-input"
              className="mb-1 block text-xs text-zinc-500"
            >
              Timestamp
            </label>
            <input
              id="ts-input"
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
              placeholder="1700000000"
              aria-label="Unix timestamp"
              aria-invalid={!!error && !result}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
            />
            <label
              htmlFor="ts-unit"
              className="mb-1 mt-3 block text-xs text-zinc-500"
            >
              Unit
            </label>
            <select
              id="ts-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
            >
              <option value="auto">Auto-detect</option>
              <option value="s">Seconds</option>
              <option value="ms">Milliseconds</option>
            </select>
            <div className="mt-4 flex gap-2">
              <button
                onClick={convertTs}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Convert
              </button>
              <button
                onClick={handleNow}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <Clock size={15} />
                Now
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Date to Timestamp */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-sm font-medium">
              Date to Timestamp
            </h2>
            <label
              htmlFor="date-input"
              className="mb-1 block text-xs text-zinc-500"
            >
              Date / Time (local)
            </label>
            <input
              id="date-input"
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              aria-label="Date and time"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
            />
            <button
              onClick={convertDate}
              className="mt-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Convert
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Result</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Copy size={15} />
                {copied ? "Copied!" : "Copy ISO"}
              </button>
            </div>
            <div className="space-y-2 font-mono text-sm">
              <div>
                <span className="text-zinc-500">UTC: </span>
                <span className="text-zinc-300">{result.utc}</span>
              </div>
              <div>
                <span className="text-zinc-500">Local: </span>
                <span className="text-zinc-300">{result.local}</span>
              </div>
              <div>
                <span className="text-zinc-500">ISO: </span>
                <span className="text-zinc-300">{result.iso}</span>
              </div>
              <div>
                <span className="text-zinc-500">Seconds: </span>
                <span className="text-zinc-300">{result.seconds}</span>
              </div>
              <div>
                <span className="text-zinc-500">Milliseconds: </span>
                <span className="text-zinc-300">{result.milliseconds}</span>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="mb-2 text-sm font-medium">Timezone Notes</h2>
          <p className="text-sm leading-6 text-zinc-500">
            Date/time input is interpreted in your local timezone. UTC and ISO
            outputs are always in UTC. Auto-detect treats values longer than
            10 digits as milliseconds.
          </p>
        </div>
      </section>
    </main>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRightLeft,
  Trash2,
} from "lucide-react";

export default function TimestampPage() {
  const [timestamp, setTimestamp] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  function timestampToDate() {
    try {
      const value = Number(timestamp);

      if (!timestamp || !Number.isFinite(value)) {
        throw new Error();
      }

      const milliseconds =
        timestamp.length <= 10 ? value * 1000 : value;

      const result = new Date(milliseconds);

      if (Number.isNaN(result.getTime())) {
        throw new Error();
      }

      setDate(result.toISOString());
      setError("");
    } catch {
      setDate("");
      setError("Invalid Unix timestamp.");
    }
  }

  function dateToTimestamp() {
    try {
      if (!date) {
        throw new Error();
      }

      const result = new Date(date);

      if (Number.isNaN(result.getTime())) {
        throw new Error();
      }

      setTimestamp(
        Math.floor(result.getTime() / 1000).toString()
      );

      setError("");
    } catch {
      setTimestamp("");
      setError("Invalid date.");
    }
  }

  function useCurrentTime() {
    const now = Math.floor(Date.now() / 1000);

    setTimestamp(now.toString());
    setDate(new Date().toISOString());
    setError("");
  }

  function clearAll() {
    setTimestamp("");
    setDate("");
    setError("");
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

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <h1 className="text-4xl font-bold">
            Timestamp Converter
          </h1>

          <p className="mt-3 text-zinc-400">
            Convert Unix timestamps and dates quickly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Unix Timestamp */}

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-sm font-medium">
              Unix Timestamp
            </h2>

            <input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1750000000"
              inputMode="numeric"
              className="mt-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <button
              onClick={timestampToDate}
              className="mt-4 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Convert to Date
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* Date */}

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-sm font-medium">
              ISO Date
            </h2>

            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="2026-08-11T12:00:00.000Z"
              className="mt-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <button
              onClick={dateToTimestamp}
              className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              Convert to Timestamp
              <ArrowRightLeft size={16} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={useCurrentTime}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
          >
            Use Current Time
          </button>

          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-lg text-sm text-zinc-500 transition hover:text-white"
          >
            <Trash2 size={15} />
            Clear
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h2 className="text-sm font-medium">
            About Unix Timestamp
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Unix timestamp represents a point in time as the
            number of seconds elapsed since January 1, 1970 UTC.
          </p>
        </div>
      </section>
    </main>
  );
}
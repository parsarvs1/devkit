"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, RotateCcw } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

const PRESETS = [
  { label: "Every minute", v: ["*", "*", "*", "*", "*"] },
  { label: "Every 15 min", v: ["*/15", "*", "*", "*", "*"] },
  { label: "Every hour", v: ["0", "*", "*", "*", "*"] },
  { label: "Daily 00:00", v: ["0", "0", "*", "*", "*"] },
  { label: "Weekdays 9am", v: ["0", "9", "*", "*", "1-5"] },
  { label: "Weekly Mon", v: ["0", "0", "*", "*", "1"] },
  { label: "Monthly", v: ["0", "0", "1", "*", "*"] },
];

const FIELD_LABELS = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"];
const FIELD_RANGES = [
  { min: 0, max: 59 },
  { min: 0, max: 23 },
  { min: 1, max: 31 },
  { min: 1, max: 12 },
  { min: 0, max: 6 },
];

function describeExpr(
  minute: string,
  hour: string,
  dom: string,
  month: string,
  dow: string
): string {
  const parts: string[] = [];

  if (minute === "*" && hour === "*") {
    parts.push("every minute");
  } else if (minute === "*") {
    parts.push(`every minute of hour ${hour}`);
  } else if (hour === "*") {
    parts.push(`at minute ${minute} of every hour`);
  } else {
    parts.push(`at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`);
  }

  if (dom !== "*") parts.push(`on day ${dom}`);
  if (month !== "*") parts.push(`in month ${month}`);
  if (dow !== "*") parts.push(`on weekday ${dow}`);

  return parts.length ? `Runs ${parts.join(", ")}.` : "Runs every minute.";
}

export default function CronGeneratorPage() {
  const [fields, setFields] = useState(["*", "*", "*", "*", "*"]);
  const [copied, setCopied] = useState(false);

  const expr = fields.join(" ");
  const summary = describeExpr(fields[0], fields[1], fields[2], fields[3], fields[4]);

  function setField(i: number, value: string) {
    setFields((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function applyPreset(v: string[]) {
    setFields([...v]);
    setCopied(false);
  }

  function handleReset() {
    setFields(["*", "*", "*", "*", "*"]);
    setCopied(false);
  }

  async function handleCopy() {
    const ok = await copyToClipboard(expr);
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
          <h1 className="text-4xl font-bold">Cron Generator</h1>
          <p className="mt-3 text-zinc-400">
            Build cron expressions visually with presets and custom controls.
          </p>
        </div>

        {/* Presets */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-3 text-sm font-medium">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.v)}
                className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Field Controls */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-sm font-medium">Custom Schedule</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FIELD_LABELS.map((label, i) => (
              <div key={label}>
                <label
                  htmlFor={`cron-field-${i}`}
                  className="mb-1 block text-xs text-zinc-500"
                >
                  {label}
                </label>
                <input
                  id={`cron-field-${i}`}
                  value={fields[i]}
                  onChange={(e) => setField(i, e.target.value)}
                  placeholder="*"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
                />
                <p className="mt-1 text-xs text-zinc-600">
                  {FIELD_RANGES[i].min}–{FIELD_RANGES[i].max}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Expression */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">Generated Expression</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Copy size={15} />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="font-mono text-lg">{expr}</p>
          </div>
          <p className="mt-3 text-sm text-zinc-400">{summary}</p>
        </div>

        {/* Syntax Info */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="mb-2 text-sm font-medium">Dialect</h2>
          <p className="text-sm leading-6 text-zinc-500">
            Generates standard 5-field cron expressions. Supports{" "}
            <code className="text-zinc-400">*</code>, lists, ranges, and steps.
            Validate generated expressions with the Cron Parser tool.
          </p>
        </div>
      </section>
    </main>
  );
}

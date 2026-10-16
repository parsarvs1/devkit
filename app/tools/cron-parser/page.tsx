"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

const EXAMPLES = [
  { expr: "* * * * *", label: "Every minute" },
  { expr: "*/15 * * * *", label: "Every 15 min" },
  { expr: "0 9 * * 1-5", label: "Weekdays 9am" },
  { expr: "0 0 1 * *", label: "Monthly" },
];

interface FieldInfo {
  name: string;
  raw: string;
  min: number;
  max: number;
  error: string;
  values: number[] | null;
}

function expandField(
  raw: string,
  min: number,
  max: number
): { values: number[] | null; error: string } {
  if (!raw) return { values: null, error: "Field is empty" };

  const parts = raw.split(",");
  const values: number[] = [];

  for (const part of parts) {
    const [rangePart, stepPart] = part.split("/");
    const step = stepPart ? Number(stepPart) : 1;

    if (stepPart && (Number.isNaN(step) || step < 1)) {
      return { values: null, error: `Invalid step "${stepPart}"` };
    }

    if (rangePart === "*") {
      for (let v = min; v <= max; v += step) values.push(v);
      continue;
    }

    const [startStr, endStr] = rangePart.split("-");
    const start = Number(startStr);
    const end = endStr !== undefined ? Number(endStr) : start;

    if (Number.isNaN(start) || Number.isNaN(end)) {
      return { values: null, error: `Invalid value "${part}"` };
    }
    if (start < min || end > max || start > end) {
      return { values: null, error: `Out of range (${min}–${max})` };
    }

    for (let v = start; v <= end; v += step) values.push(v);
  }

  return { values, error: "" };
}

function describeField(info: FieldInfo): string {
  if (info.error) return info.error;
  if (!info.values) return "—";
  if (info.values.length === 0) return "Never";
  if (info.raw === "*") return "Every";
  return `${info.values.length} value${info.values.length > 1 ? "s" : ""}`;
}

function buildSummary(fields: FieldInfo[]): string {
  const [min, hour, dom, month, dow] = fields;

  const parts: string[] = [];

  // Time
  if (min.raw === "*" && hour.raw === "*") {
    parts.push("every minute");
  } else if (min.raw === "*") {
    parts.push(`every minute of hour ${hour.raw}`);
  } else if (hour.raw === "*") {
    parts.push(`at minute ${min.raw} of every hour`);
  } else {
    const minDesc =
      min.raw.startsWith("*/")
        ? `every ${min.raw.slice(2)} minutes`
        : `minute ${min.raw}`;
    const hourDesc =
      hour.raw.startsWith("*/")
        ? `every ${hour.raw.slice(2)} hours`
        : `hour ${hour.raw}`;
    parts.push(`${minDesc} past ${hourDesc}`);
  }

  // Day of month
  if (dom.raw !== "*") parts.push(`on day ${dom.raw}`);

  // Month
  if (month.raw !== "*") parts.push(`in month ${month.raw}`);

  // Day of week
  if (dow.raw !== "*") parts.push(`on weekday ${dow.raw}`);

  return parts.length ? `Runs ${parts.join(", ")}.` : "Runs every minute.";
}

export default function CronParserPage() {
  const [expr, setExpr] = useState("*/15 * * * *");
  const [copied, setCopied] = useState(false);

  const rawFields = expr.trim().split(/\s+/);
  const [m, h, d, mo, w] = rawFields;

  const fieldDefs = [
    { name: "Minute", raw: m ?? "", min: 0, max: 59 },
    { name: "Hour", raw: h ?? "", min: 0, max: 23 },
    { name: "Day of Month", raw: d ?? "", min: 1, max: 31 },
    { name: "Month", raw: mo ?? "", min: 1, max: 12 },
    { name: "Day of Week", raw: w ?? "", min: 0, max: 6 },
  ];

  const fields: FieldInfo[] = fieldDefs.map((f) => {
    const { values, error } = expandField(f.raw, f.min, f.max);
    return { ...f, values, error };
  });

  const errors: string[] = [];
  if (!expr.trim()) errors.push("Expression is empty.");
  if (rawFields.length !== 5)
    errors.push(
      `Expected 5 fields, got ${rawFields.length}. Format: minute hour day-of-month month day-of-week`
    );
  fields.forEach((f) => {
    if (f.error) errors.push(`${f.name}: ${f.error}`);
  });

  const valid = errors.length === 0;
  const summary = valid ? buildSummary(fields) : "";

  async function handleCopy() {
    if (!valid) return;
    const ok = await copyToClipboard(expr);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  function handleReset() {
    setExpr("* * * * *");
    setCopied(false);
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
          <h1 className="text-4xl font-bold">Cron Parser</h1>
          <p className="mt-3 text-zinc-400">
            Parse and validate standard 5-field cron expressions.
          </p>
        </div>

        {/* Expression Input */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-3 flex items-center justify-between">
            <label
              htmlFor="cron-expr"
              className="text-sm font-medium"
            >
              Expression
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!valid}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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
          <input
            id="cron-expr"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            aria-label="Cron expression"
            aria-invalid={!valid}
            aria-describedby={!valid ? "cron-error" : undefined}
            placeholder="* * * * *"
            spellCheck={false}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
          />

          {/* Validation Status */}
          <div className="mt-4 flex items-start gap-2">
            {valid ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
            ) : (
              <XCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
            )}
            <div className="text-sm">
              {valid ? (
                <span className="text-emerald-400">Valid expression</span>
              ) : (
                <span id="cron-error" role="alert" className="text-red-400">
                  {errors.join(" ")}
                </span>
              )}
            </div>
          </div>

          {/* Summary */}
          {valid && (
            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-medium">Schedule</p>
              <p className="mt-1 text-sm text-zinc-400">{summary}</p>
            </div>
          )}
        </div>

        {/* Field Breakdown */}
        {valid && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 text-sm font-medium">Field Breakdown</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {fields.map((f) => (
                <div
                  key={f.name}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
                >
                  <p className="mb-1 text-xs text-zinc-500">{f.name}</p>
                  <p className="font-mono text-sm">{f.raw}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {describeField(f)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="mb-3 text-sm font-medium">Examples</h2>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.expr}
                onClick={() => setExpr(ex.expr)}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                {ex.label}
                <span className="ml-2 text-zinc-500">{ex.expr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Syntax Info */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="mb-2 text-sm font-medium">Supported Syntax</h2>
          <p className="text-sm leading-6 text-zinc-500">
            Standard 5-field cron: <code className="text-zinc-400">minute hour day-of-month month day-of-week</code>.
            Supports <code className="text-zinc-400">*</code>, lists{" "}
            <code className="text-zinc-400">1,2,3</code>, ranges{" "}
            <code className="text-zinc-400">1-5</code>, and steps{" "}
            <code className="text-zinc-400">*/15</code>. Day-of-month and
            day-of-week follow standard cron semantics. Quartz and other
            dialects are not supported.
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Trash2,
  Palette,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");

  // Support 3-digit shorthand (e.g. #fff) by expanding it to 6 digits.
  if (/^[0-9A-Fa-f]{3}$/.test(cleanHex)) {
    return hexToRgb(
      "#" +
        cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
    );
  }

  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }

  const value = parseInt(cleanHex, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;

      case g:
        h =
          (b - r) / d +
          2;
        break;

      case b:
        h =
          (r - g) / d +
          4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  function convertColor() {
    const result = hexToRgb(hex);

    if (!result) {
      setRgb("");
      setHsl("");
      setError("Enter a valid HEX color (e.g. #6366f1 or #fff).");
      return;
    }

    const hslResult = rgbToHsl(
      result.r,
      result.g,
      result.b
    );

    setRgb(
      `rgb(${result.r}, ${result.g}, ${result.b})`
    );

    setHsl(
      `hsl(${hslResult.h}, ${hslResult.s}%, ${hslResult.l}%)`
    );

    setError("");
  }

  async function copyValue(value: string, name: string) {
    if (!value) return;

    const ok = await copyToClipboard(value, setError);
    if (ok) {
      setCopied(name);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    }
  }

  function clearAll() {
    setHex("");
    setRgb("");
    setHsl("");
    setError("");
    setCopied("");
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

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Palette size={20} />
            </div>

            <p className="text-sm text-zinc-500">
              DevKit Tool
            </p>
          </div>

          <h1 className="text-4xl font-bold">
            Color Converter
          </h1>

          <p className="mt-3 text-zinc-400">
            Convert HEX colors to RGB and HSL values.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="hex-color-heading" className="text-sm font-medium">
              HEX Color
            </h2>

            <button
              onClick={clearAll}
              disabled={!hex.trim() && !rgb && !hsl}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Trash2 size={15} />
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              aria-labelledby="hex-color-heading"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "color-error" : undefined}
              placeholder="#6366f1"
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <button
              onClick={convertColor}
              disabled={!hex.trim()}
              className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Convert
            </button>
          </div>

          {error && (
            <p
              id="color-error"
              role="alert"
              className="mt-4 text-sm text-red-400"
            >
              {error}
            </p>
          )}
        </div>

        {hex && hexToRgb(hex) && (
          <div
            className="mt-6 h-32 rounded-xl border border-zinc-800"
            role="status"
            style={{ backgroundColor: hex }}
          />
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                RGB
              </h2>

              <button
                onClick={() =>
                  copyValue(rgb, "rgb")
                }
                disabled={!rgb}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Copy size={15} />
                {copied === "rgb"
                  ? "Copied!"
                  : "Copy"}
              </button>
            </div>

            <p
              className="break-all font-mono text-sm text-zinc-300"
              role="status"
            >
              {rgb || "RGB value will appear here..."}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                HSL
              </h2>

              <button
                onClick={() =>
                  copyValue(hsl, "hsl")
                }
                disabled={!hsl}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Copy size={15} />
                {copied === "hsl"
                  ? "Copied!"
                  : "Copy"}
              </button>
            </div>

            <p
              className="break-all font-mono text-sm text-zinc-300"
              role="status"
            >
              {hsl || "HSL value will appear here..."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Palette,
  RefreshCw,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");

  if (value.length !== 6) return null;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  if ([r, g, b].some(Number.isNaN)) return null;

  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((value) =>
        Math.max(0, Math.min(255, Math.round(value)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
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
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
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

function mixColors(
  color1: string,
  color2: string,
  amount: number
) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r =
    rgb1.r + (rgb2.r - rgb1.r) * amount;

  const g =
    rgb1.g + (rgb2.g - rgb1.g) * amount;

  const b =
    rgb1.b + (rgb2.b - rgb1.b) * amount;

  return rgbToHex(r, g, b);
}

function generatePalette(hex: string) {
  const colors = [
    { name: "50", amount: 0.95 },
    { name: "100", amount: 0.9 },
    { name: "200", amount: 0.75 },
    { name: "300", amount: 0.6 },
    { name: "400", amount: 0.35 },
    { name: "500", amount: 0 },
    { name: "600", amount: -0.1 },
    { name: "700", amount: -0.25 },
    { name: "800", amount: -0.4 },
    { name: "900", amount: -0.55 },
    { name: "950", amount: -0.7 },
  ];

  return colors.map((color) => {
    let result = hex;

    if (color.amount > 0) {
      result = mixColors(
        hex,
        "#ffffff",
        color.amount
      );
    } else if (color.amount < 0) {
      result = mixColors(
        hex,
        "#000000",
        Math.abs(color.amount)
      );
    }

    return {
      name: color.name,
      value: result,
    };
  });
}

export default function ColorPalettePage() {
  const [color, setColor] = useState("#6366f1");
  // Draft lets the user type freely; color only updates on a complete hex.
  const [draft, setDraft] = useState(color);
  const [copied, setCopied] = useState("");

  const rgb = useMemo(
    () => hexToRgb(color),
    [color]
  );

  const hsl = useMemo(
    () =>
      rgb
        ? rgbToHsl(rgb.r, rgb.g, rgb.b)
        : null,
    [rgb]
  );

  const palette = useMemo(
    () => generatePalette(color),
    [color]
  );

  function normalizeColor(value: string) {
    let next = value;

    if (!next.startsWith("#")) {
      next = "#" + next;
    }

    if (/^#[0-9a-fA-F]{6}$/.test(next)) {
      setColor(next.toLowerCase());
    }
    // Keep the user's raw input so typing, backspace and partial
    // entries don't snap the field back.
    setDraft(value);
  }

  async function copy(value: string) {
    const ok = await copyToClipboard(value, () => setCopied(""));

    if (ok) {
      setCopied(value);

      setTimeout(() => {
        setCopied("");
      }, 1200);
    }
  }

  function randomColor() {
    const value =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    setColor(value);
    setDraft(value);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <Link
          href="/tools"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Tools
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Palette size={21} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Color Palette Generator
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Generate a complete color scale from a single
            base color.
          </p>
        </div>

        {/* Controls */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">

            <div className="flex-1">
              <label className="mb-2 block text-sm text-zinc-400">
                Base Color
              </label>

              <div className="flex gap-3">

                <input
                  type="color"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                    setDraft(event.target.value);
                  }}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900 p-1"
                />

                <input
                  type="text"
                  value={draft}
                  onChange={(event) =>
                    normalizeColor(event.target.value)
                  }
                  aria-label="Base color hex value"
                  className="h-11 flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 font-mono text-sm text-white outline-none transition focus:border-zinc-600"
                />

              </div>
            </div>

            <button
              type="button"
              onClick={randomColor}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              <RefreshCw size={16} />
              Random
            </button>

          </div>

          {/* Color Info */}

          {rgb && hsl && (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <button
                type="button"
                onClick={() => copy(color)}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:border-zinc-700"
              >
                <p className="text-xs text-zinc-600">
                  HEX
                </p>

                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-sm text-zinc-300">
                    {color}
                  </span>

                  {copied === color ? (
                    <Check size={14} />
                  ) : (
                    <Copy
                      size={14}
                      className="text-zinc-600"
                    />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  copy(
                    `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                  )
                }
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:border-zinc-700"
              >
                <p className="text-xs text-zinc-600">
                  RGB
                </p>

                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-sm text-zinc-300">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  copy(
                    `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
                  )
                }
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:border-zinc-700"
              >
                <p className="text-xs text-zinc-600">
                  HSL
                </p>

                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-sm text-zinc-300">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </span>
                </div>
              </button>

            </div>
          )}

        </div>

        {/* Palette */}

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">

          <div className="border-b border-zinc-800 px-5 py-4">
            <h2 className="text-sm font-medium text-zinc-300">
              Generated Palette
            </h2>

            <p className="mt-1 text-xs text-zinc-600">
              Click any color to copy its HEX value.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
            {palette.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => copy(item.value)}
                className="group relative min-h-32 p-4 text-left transition hover:scale-[1.02]"
                style={{
                  backgroundColor: item.value,
                }}
              >
                <div className="absolute inset-x-0 bottom-0 bg-black/20 p-2 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">
                      {item.name}
                    </span>

                    {copied === item.value && (
                      <Check size={13} />
                    )}
                  </div>

                  <span className="mt-0.5 block font-mono text-[10px] text-white/70">
                    {item.value}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
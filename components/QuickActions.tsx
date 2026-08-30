"use client";

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  KeyRound,
  Fingerprint,
  Palette,
  Hash,
  Binary,
  Code2,
} from "lucide-react";

const actions = [
  {
    name: "JSON Formatter",
    description: "Format JSON",
    href: "/tools/json-formatter",
    icon: Braces,
  },
  {
    name: "JWT Decoder",
    description: "Decode JWT",
    href: "/tools/jwt-decoder",
    icon: KeyRound,
  },
  {
    name: "UUID Generator",
    description: "Generate UUID",
    href: "/tools/uuid-generator",
    icon: Fingerprint,
  },
  {
    name: "Color Converter",
    description: "Convert colors",
    href: "/tools/color-converter",
    icon: Palette,
  },
  {
    name: "Hash Generator",
    description: "Generate hashes",
    href: "/tools/hash-generator",
    icon: Hash,
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64",
    href: "/tools/base64",
    icon: Binary,
  },
  {
  name: "JSON → TypeScript",
  description: "Convert JSON to TypeScript",
  href: "/tools/json-to-typescript",
  icon: Code2,
},
{
  name: "JSON → Zod",
  description: "Convert JSON to Zod",
  href: "/tools/json-to-zod",
  icon: Braces,
},
{
  name: "Color Palette",
  description: "Generate color palettes",
  href: "/tools/color-palette",
  icon: Palette,
},
];

export default function QuickActions() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Quick access
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            Quick Actions
          </h2>
        </div>

        <Link
          href="/tools"
          className="flex items-center gap-1 text-sm text-zinc-500 transition hover:text-white"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 transition group-hover:text-zinc-200">
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-zinc-200">
                  {action.name}
                </h3>

                <p className="mt-1 truncate text-xs text-zinc-600">
                  {action.description}
                </p>
              </div>

              <ArrowRight
                size={15}
                className="ml-auto shrink-0 text-zinc-700 transition group-hover:translate-x-0.5 group-hover:text-zinc-400"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
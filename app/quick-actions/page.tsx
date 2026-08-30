"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Search,
  Braces,
  FileJson,
  ShieldCheck,
  Copy,
  Hash,
  Palette,
  Clock3,
  Fingerprint,
} from "lucide-react";

type Action = {
  name: string;
  description: string;
  href: string;
  category: string;
  icon: React.ElementType;
};

const actions: Action[] = [
  {
    name: "Format JSON",
    description: "Format and validate JSON data.",
    href: "/tools/json-formatter",
    category: "JSON",
    icon: Braces,
  },
  {
    name: "JSON → TypeScript",
    description: "Convert JSON objects into TypeScript types.",
    href: "/tools/json-to-typescript",
    category: "JSON",
    icon: FileJson,
  },
  {
    name: "JSON → Zod",
    description: "Generate Zod schemas from JSON.",
    href: "/tools/json-to-zod",
    category: "JSON",
    icon: ShieldCheck,
  },
  {
    name: "Base64",
    description: "Encode and decode Base64 data.",
    href: "/tools/base64",
    category: "Encoding",
    icon: Copy,
  },
  {
    name: "Hash Generator",
    description: "Generate hashes from text.",
    href: "/tools/hash-generator",
    category: "Security",
    icon: Hash,
  },
  {
    name: "Color Converter",
    description: "Convert between common color formats.",
    href: "/tools/color-converter",
    category: "Design",
    icon: Palette,
  },
  {
    name: "Timestamp",
    description: "Convert and inspect timestamps.",
    href: "/tools/timestamp",
    category: "Developer",
    icon: Clock3,
  },
  {
    name: "UUID Generator",
    description: "Generate unique UUIDs instantly.",
    href: "/tools/uuid-generator",
    category: "Developer",
    icon: Fingerprint,
  },
];

export default function QuickActionsPage() {
  const [query, setQuery] = useState("");

  const filteredActions = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return actions;
    }

    return actions.filter((action) =>
      `${action.name} ${action.description} ${action.category}`
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

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

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Quick Actions
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-500">
            Quickly jump to the developer tools you use most.
          </p>
        </div>

        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search actions..."
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
          />
        </div>

        {filteredActions.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-12 text-center">
            <p className="text-sm text-zinc-500">
              No actions found.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                      <Icon
                        size={18}
                        className="text-zinc-400 transition group-hover:text-white"
                      />
                    </div>

                    <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-600">
                      {action.category}
                    </span>
                  </div>

                  <h2 className="mt-5 font-semibold">
                    {action.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-zinc-700">
          {filteredActions.length}{" "}
          {filteredActions.length === 1 ? "action" : "actions"} available
        </p>
      </section>
    </main>
  );
}
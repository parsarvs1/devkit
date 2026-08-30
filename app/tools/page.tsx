"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";
import RecentTools from "@/components/RecentTools";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Format",
    "Security",
    "Converters",
    "Generators",
    "Development",
  ];

  const filteredTools = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        tool.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function clearSearch() {
    setSearch("");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>
        </div>
      </nav>
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Developer Tools
          </h1>

          <p className="mt-3 text-zinc-400">
            Useful tools for everyday development.
            Fast, simple and free.
          </p>
        </div>
        <div className="mt-10">
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tools..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-white"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white text-black"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="mt-12">
                  <RecentTools />
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              {filteredTools.length}{" "}
              {filteredTools.length === 1
                ? "tool"
                : "tools"}
            </p>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.name}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-6 py-16 text-center">
              <h2 className="font-semibold">
                No tools found
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Try a different search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 text-sm text-zinc-400 transition hover:text-white"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
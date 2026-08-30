"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ArrowRight,
  Search,
  Wrench,
  X,
} from "lucide-react";

import { tools } from "@/data/tools";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(tools.map((tool) => tool.category))
    ),
  ];

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        tool.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">

      <Navbar />

      {/* =========================
          HERO
      ========================== */}

      <section className="border-b border-zinc-900">

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400">
              <Wrench size={14} />
              Developer toolkit
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Developer Tools
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7 lg:text-lg">
              Simple, fast and useful tools for everyday
              development.
            </p>

          </div>

          {/* =========================
              SEARCH
          ========================== */}

          <div className="mt-8 max-w-2xl sm:mt-10">

            <div className="relative">

              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 sm:left-4"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search developer tools..."
                className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600 sm:pl-11"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          TOOLS
      ========================== */}

      <section>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">

          {/* =========================
              CATEGORIES
          ========================== */}

          <div className="mb-8 sm:mb-10">

            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
              Categories
            </div>

            {/* Horizontal scroll on mobile */}

            <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">

              <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">

                {categories.map((item) => {
                  const active = category === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm transition ${
                        active
                          ? "border-zinc-600 bg-zinc-800 text-white"
                          : "border-zinc-800 bg-zinc-900/30 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-300"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}

              </div>

            </div>

          </div>

          {/* =========================
              HEADER
          ========================== */}

          <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                {filteredTools.length}{" "}
                {filteredTools.length === 1
                  ? "tool"
                  : "tools"}{" "}
                found
              </p>

              <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                {category === "All"
                  ? "All tools"
                  : category}
              </h2>

            </div>

            {(search || category !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start text-sm text-zinc-500 transition hover:text-white sm:self-auto"
              >
                Clear filters
              </button>
            )}

          </div>

          {/* =========================
              EMPTY STATE
          ========================== */}

          {filteredTools.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-5 py-14 text-center sm:px-6 sm:py-16">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                <Search size={20} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                No tools found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                Try another search or choose a different
                category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Show all tools
              </button>

            </div>

          ) : (

            /* =========================
               TOOL GRID
            ========================== */

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

              {filteredTools.map((tool) => {

                const Icon = tool.icon;

                return (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 sm:p-6"
                  >

                    {/* Top */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition group-hover:border-zinc-700 group-hover:text-white sm:h-11 sm:w-11">
                        <Icon size={20} />
                      </div>

                      <ArrowRight
                        size={17}
                        className="mt-1 shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-300"
                      />

                    </div>

                    {/* Content */}

                    <div className="mt-5">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold">
                          {tool.name}
                        </h3>

                        <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-500">
                          {tool.category}
                        </span>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {tool.description}
                      </p>

                    </div>

                    {/* Bottom */}

                    <div className="mt-5 text-xs font-medium text-zinc-600 transition group-hover:text-zinc-400">
                      Open tool →
                    </div>

                  </Link>
                );

              })}

            </div>

          )}

        </div>

      </section>

      {/* =========================
          CTA
      ========================== */}

      <section className="border-t border-zinc-900">

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-5 py-9 text-center sm:px-12 sm:py-10">

            <h2 className="text-xl font-bold sm:text-2xl">
              More tools coming soon
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              DevKit is continuously growing with new
              utilities and developer-focused tools.
            </p>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}
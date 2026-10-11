"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ArrowRight, Search, Wrench, X } from "lucide-react";
import PinButton from "@/components/PinButton";
import { tools } from "@/data/tools";

import { categories, categoryHref, toolsInCategory } from "@/lib/categories";

export default function ToolsExplorer({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const [search, setSearch] = useState("");

  const items = activeCategory ? toolsInCategory(activeCategory) : tools;

  const title = activeCategory ?? "All tools";

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query),
    );
  }, [items, search]);

  const isSearching = search.trim().length > 0;

  return (
    <>

      <div className="mt-8 max-w-2xl sm:mt-10">
        <div className="group relative">

          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-indigo-600/20 opacity-0 blur-lg transition duration-300 group-focus-within:opacity-100" />

          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-violet-400 sm:left-4"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search developer tools..."
              aria-label="Search developer tools"
              aria-describedby="tools-search-count"
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-600/60 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_-6px_rgba(139,92,246,0.45)] sm:pl-11"
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


      <div className="mb-8 mt-6 sm:mb-10">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
          Categories
        </div>


        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">

            <li>
              <CategoryChip href="/tools" active={!activeCategory}>
                All
              </CategoryChip>
            </li>

            {categories.map((item) => (
              <li key={item}>
                <CategoryChip
                  href={categoryHref(item)}
                  active={activeCategory === item}
                >
                  {item}
                </CategoryChip>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            id="tools-search-count"
            className="text-sm text-zinc-500"
            role="status"
          >
            <span className="font-semibold text-zinc-300">
              {filteredTools.length}
            </span>{" "}
            {filteredTools.length === 1 ? "tool" : "tools"} found
          </p>

          <h2 className="mt-1 text-xl font-bold sm:text-2xl">{title}</h2>
        </div>

        {isSearching && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="self-start text-sm text-zinc-500 transition hover:text-white sm:self-auto"
          >
            Clear search
          </button>
        )}
      </div>



      {filteredTools.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-5 py-14 text-center sm:px-6 sm:py-16">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Search size={20} />
          </div>

          <h3 className="mt-5 text-lg font-semibold">No tools found</h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Try another search or choose a different category.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-6 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Clear search
          </button>
        </div>
      ) : (

        <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filteredTools.map((tool) => {
            const Icon = tool.icon ?? Wrench;

            return (
              <li key={tool.name} className="group/card relative">

                <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-violet-600/0 via-fuchsia-600/0 to-indigo-600/0 opacity-0 blur transition duration-300 group-hover/card:from-violet-600/25 group-hover/card:via-fuchsia-600/20 group-hover/card:to-indigo-600/25 group-hover/card:opacity-100" />

                <Link
                  href={tool.href}
                  className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] sm:p-6"
                >

                  <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                  <div className="flex items-start justify-between gap-4">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-800/80 to-zinc-900 text-zinc-300 transition duration-300 group-hover:border-violet-600/40 group-hover:from-violet-600/20 group-hover:to-fuchsia-600/10 group-hover:text-violet-300 group-hover:shadow-[0_0_18px_-4px_rgba(139,92,246,0.5)]">
                      <Icon size={20} />
                    </div>

                    <div className="flex items-center gap-1">
                      <PinButton href={tool.href} />

                      <ArrowRight
                        size={17}
                        className="text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-violet-400"
                      />
                    </div>
                  </div>


                  <div className="mt-5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <h3 className="font-semibold">{tool.name}</h3>

                      <span className="whitespace-nowrap rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-500 transition group-hover:border-zinc-700 group-hover:text-zinc-400">
                        {tool.category}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-1.5 whitespace-nowrap pt-5 text-xs font-medium text-zinc-600 transition group-hover:text-violet-400">
                    Open tool
                    <ArrowRight
                      size={13}
                      className="transition group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function CategoryChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm transition ${
        active
          ? "border-violet-600/50 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 font-medium text-white shadow-[0_0_16px_-6px_rgba(139,92,246,0.6)]"
          : "border-zinc-800 bg-zinc-900/30 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-300"
      }`}
    >
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Pin, PinOff, Wrench  } from "lucide-react";

import { tools } from "@/data/tools";
import usePinnedTools from "@/hooks/usePinnedTools";
import PinButton from "@/components/PinButton";

export default function PinnedToolsWidget() {
  const { pinnedTools } = usePinnedTools();

  const pinned = tools.filter((tool) =>
    pinnedTools.includes(tool.href)
  );

  return (
    <section className="border-t border-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
              <Pin size={15} />
              Quick access
            </div>

            <h2 className="text-2xl font-bold">
              Pinned Tools
            </h2>
          </div>

          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            Browse tools
            <ArrowRight size={15} />
          </Link>
        </div>

        {pinned.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
              <PinOff size={20} className="text-zinc-500" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No pinned tools yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Pin your favorite tools from the Tools page
              to access them quickly from your workspace.
            </p>

            <Link
              href="/tools"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Explore tools
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map((tool) => {
              const Icon = tool.icon ?? Wrench;

              return (
                <div
                  key={tool.href}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={tool.href}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition group-hover:border-zinc-700 group-hover:text-white"
                    >
                      <Icon size={20} />
                    </Link>

                    <div className="flex items-center gap-1">
                      <PinButton href={tool.href} />

                      <Link
                        href={tool.href}
                        aria-label={`Open ${tool.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
                      >
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>

                  <Link href={tool.href} className="block">
                    <div className="mt-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-zinc-100">
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

                    <div className="mt-5 text-xs font-medium text-zinc-600 transition group-hover:text-zinc-400">
                      Open tool →
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { Clock3, ArrowUpRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  clearToolHistory,
  getToolHistory,
  removeToolFromHistory,
  type ToolHistoryItem,
} from "@/lib/toolHistory";

export default function ToolHistory() {
  const [history, setHistory] = useState<ToolHistoryItem[]>([]);

  function loadHistory() {
    setHistory(getToolHistory());
  }

  useEffect(() => {
    loadHistory();

    function handleUpdate() {
      loadHistory();
    }

    window.addEventListener(
      "tool-history-updated",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "tool-history-updated",
        handleUpdate
      );
    };
  }, []);

  if (history.length === 0) {
    return (
      <section>
        <div className="mb-6 flex items-center gap-2">
          <Clock3 size={18} className="text-zinc-400" />

          <div>
            <h2 className="text-lg font-semibold">
              Tool History
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your recently used tools will appear here.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-12 text-center">
          <Clock3
            size={24}
            className="mx-auto text-zinc-600"
          />

          <h3 className="mt-4 font-medium">
            No tool history yet
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Start using DevKit tools and they will show up here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock3
              size={18}
              className="text-zinc-400"
            />

            <h2 className="text-lg font-semibold">
              Tool History
            </h2>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Quickly access tools you recently used.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            clearToolHistory();
            setHistory([]);
          }}
          className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-red-400"
        >
          <Trash2 size={15} />
          Clear
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800">
        {history.map((item, index) => (
          <div
            key={item.toolHref}
            className={`group flex items-center justify-between gap-4 bg-zinc-900/30 px-5 py-4 transition hover:bg-zinc-900/60 ${
              index !== history.length - 1
                ? "border-b border-zinc-800"
                : ""
            }`}
          >
            <Link
              href={item.toolHref}
              className="flex min-w-0 flex-1 items-center gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition group-hover:border-zinc-700 group-hover:text-zinc-200">
                <Clock3 size={17} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-zinc-200">
                  {item.toolName}
                </h3>

                <p className="mt-1 text-xs text-zinc-600">
                  Recently used
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href={item.toolHref}
                aria-label={`Open ${item.toolName}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
              >
                <ArrowUpRight size={16} />
              </Link>

              <button
                type="button"
                aria-label={`Remove ${item.toolName} from history`}
                onClick={() => {
                  removeToolFromHistory(item.toolHref);
                  setHistory(getToolHistory());
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-950/30 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
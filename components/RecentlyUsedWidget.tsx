
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Trash2,
} from "lucide-react";

import {
  clearToolHistory,
  getToolHistory,
  removeToolFromHistory,
  type ToolHistoryItem,
} from "@/lib/toolHistory";

export default function RecentlyUsedWidget() {
  const [history, setHistory] = useState<ToolHistoryItem[]>([]);

  function loadHistory() {
    setHistory(getToolHistory());
  }

  useEffect(() => {
    // History is hydrated from localStorage once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadHistory();

    window.addEventListener(
      "tool-history-updated",
      loadHistory
    );

    return () => {
      window.removeEventListener(
        "tool-history-updated",
        loadHistory
      );
    };
  }, []);

  function removeTool(toolHref: string) {
    removeToolFromHistory(toolHref);
  }

  function clearHistory() {
    clearToolHistory();
  }

  return (
    <section className="border-t border-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
              <Clock3 size={15} />
              Activity
            </div>

            <h2 className="text-2xl font-bold">
              Recently Used
            </h2>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Clear history
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
              <Clock3
                size={20}
                className="text-zinc-500"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No recent activity
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Tools you use will appear here so you can
              quickly return to your recent work.
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
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.toolHref}
                className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                <Link
                  href={item.toolHref}
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition group-hover:text-white">
                    <Clock3 size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-zinc-200">
                      {item.toolName}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-600">
                      {formatUsedAt(item.usedAt)}
                    </p>
                  </div>
                </Link>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={item.toolHref}
                    aria-label={`Open ${item.toolName}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
                  >
                    <ArrowRight size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeTool(item.toolHref)}
                    aria-label={`Remove ${item.toolName} from recent history`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-800 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function formatUsedAt(timestamp: number) {
  const diff = Date.now() - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(timestamp).toLocaleDateString();
}

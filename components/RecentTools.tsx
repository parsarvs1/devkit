"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock3,
  ArrowUpRight,
  Trash2,
} from "lucide-react";

interface RecentTool {
  name: string;
  href: string;
}

export default function RecentTools() {
  const [recentTools, setRecentTools] = useState<
    RecentTool[]
  >([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Recents are hydrated from localStorage on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem(
        "devkit-recent-tools"
      );

      if (saved) {
        const tools: RecentTool[] = JSON.parse(saved);

        setRecentTools(tools);
      }
    } catch {
      setRecentTools([]);
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    setLoaded(true);
  }, []);

  function clearRecent() {
    localStorage.removeItem("devkit-recent-tools");

    setRecentTools([]);
  }

  if (!loaded || recentTools.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3
            size={17}
            className="text-zinc-500"
          />

          <h2 className="text-sm font-medium text-white">
            Recently Used
          </h2>
        </div>

        <button
          type="button"
          onClick={clearRecent}
          className="flex items-center gap-2 text-xs text-zinc-500 transition hover:text-white"
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recentTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <span className="text-sm text-zinc-300">
              {tool.name}
            </span>

            <ArrowUpRight
              size={15}
              className="text-zinc-600 transition group-hover:text-zinc-300"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
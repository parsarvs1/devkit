"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  Star,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface RecentTool {
  name: string;
  href: string;
}

export default function DashboardStats() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  useEffect(() => {
    // Favorites and recents are hydrated from localStorage on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const savedFavorites = localStorage.getItem(
        "devkit-favorites"
      );

      const savedRecent = localStorage.getItem(
        "devkit-recent-tools"
      );

      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);

        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }

      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);

        if (Array.isArray(parsed)) {
          setRecentTools(parsed);
        }
      }
    } catch {
      setFavorites([]);
      setRecentTools([]);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <>
      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
              <Wrench size={18} className="text-zinc-400" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Available Tools
              </p>

              <p className="text-xl font-semibold">
                Explore
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
              <Star size={18} className="text-zinc-400" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Favorites
              </p>

              <p className="text-xl font-semibold">
                {favorites.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
              <Clock3 size={18} className="text-zinc-400" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Recently Used
              </p>

              <p className="text-xl font-semibold">
                {recentTools.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites */}

      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              Favorite Tools
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your saved developer tools.
            </p>
          </div>

          <Star size={18} className="text-zinc-500" />
        </div>

        {favorites.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {favorites.map((tool) => (
              <Link
                key={tool}
                href="/tools"
                className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                {tool}
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-dashed border-zinc-800 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">
              You don&apos;t have any favorite tools yet.
            </p>

            <Link
              href="/tools"
              className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              Explore tools
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* Recently Used */}

      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              Recently Used
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Tools you&apos;ve opened recently.
            </p>
          </div>

          <Clock3 size={18} className="text-zinc-500" />
        </div>

        {recentTools.length > 0 ? (
          <div className="mt-5 space-y-2">
            {recentTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 transition hover:border-zinc-700"
              >
                <span className="text-sm text-zinc-300">
                  {tool.name}
                </span>

                <ArrowRight
                  size={15}
                  className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-dashed border-zinc-800 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">
              No recently used tools.
            </p>

            <Link
              href="/tools"
              className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              Start using tools
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  FileCode2,
  Star,
  Wrench,
} from "lucide-react";

import { tools } from "@/data/tools";

interface RecentTool {
  name: string;
  href: string;
}

export default function DashboardClient() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites =
        localStorage.getItem("devkit-favorites");

      const savedRecent =
        localStorage.getItem("devkit-recent-tools");

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

    setLoaded(true);
  }, []);

  const favoriteTools = useMemo(() => {
    return tools.filter((tool) =>
      favorites.includes(tool.name)
    );
  }, [favorites]);

  if (!loaded) {
    return (
      <div className="space-y-8">

        <div className="h-32 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/30" />

        <div className="h-32 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/30" />

      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Quick Actions */}

      <section>
        <div className="mb-4 flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">
              <Wrench
                size={17}
                className="text-zinc-500"
              />

              <h2 className="font-semibold">
                Quick Actions
              </h2>
            </div>

            <p className="mt-1 text-sm text-zinc-500">
              Jump straight into your favorite development tools.
            </p>
          </div>

          <Link
            href="/quick-actions"
            className="hidden items-center gap-1 text-sm text-zinc-500 transition hover:text-white sm:flex"
          >
            View all
            <ArrowRight size={14} />
          </Link>

        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {tools.slice(0, 4).map((tool) => {
            const Icon = tool.icon ?? Wrench;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                    <Icon
                      size={17}
                      className="text-zinc-400"
                    />
                  </div>

                  <ArrowRight
                    size={15}
                    className="text-zinc-700 transition group-hover:text-zinc-300"
                  />

                </div>

                <p className="mt-4 text-sm font-medium">
                  {tool.name}
                </p>

                <p className="mt-1 line-clamp-1 text-xs text-zinc-600">
                  {tool.description}
                </p>

              </Link>
            );
          })}

        </div>
      </section>

      {/* Favorites */}

      <section>

        <div className="mb-4 flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">

              <Star
                size={17}
                className="text-zinc-500"
              />

              <h2 className="font-semibold">
                Favorite Tools
              </h2>

            </div>

            <p className="mt-1 text-sm text-zinc-500">
              Your most-used tools in one place.
            </p>
          </div>

        </div>

        {favoriteTools.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 px-6 py-10 text-center">

            <Star
              size={22}
              className="mx-auto text-zinc-700"
            />

            <p className="mt-3 text-sm text-zinc-400">
              No favorite tools yet.
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Add tools to your favorites and they will appear here.
            </p>

            <Link
              href="/tools"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white transition hover:text-zinc-300"
            >
              Browse tools
              <ArrowRight size={14} />
            </Link>

          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {favoriteTools.map((tool) => {
              const Icon = tool.icon ?? Wrench;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">

                    <Icon
                      size={18}
                      className="text-zinc-400"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-medium">
                      {tool.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-600">
                      {tool.description}
                    </p>

                  </div>

                  <ArrowRight
                    size={15}
                    className="shrink-0 text-zinc-700 transition group-hover:text-zinc-300"
                  />

                </Link>
              );
            })}

          </div>
        )}

      </section>

      {/* Recently Used */}

      <section>

        <div className="mb-4 flex items-center gap-2">

          <Clock3
            size={17}
            className="text-zinc-500"
          />

          <div>
            <h2 className="font-semibold">
              Recently Used
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Continue where you left off.
            </p>
          </div>

        </div>

        {recentTools.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 px-6 py-10 text-center">

            <Clock3
              size={22}
              className="mx-auto text-zinc-700"
            />

            <p className="mt-3 text-sm text-zinc-400">
              No recently used tools.
            </p>

            <Link
              href="/tools"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white transition hover:text-zinc-300"
            >
              Explore tools
              <ArrowRight size={14} />
            </Link>

          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {recentTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-4 transition hover:border-zinc-700 hover:bg-zinc-900"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">

                    <FileCode2
                      size={16}
                      className="text-zinc-500"
                    />

                  </div>

                  <span className="text-sm text-zinc-300">
                    {tool.name}
                  </span>

                </div>

                <ArrowRight
                  size={15}
                  className="text-zinc-700 transition group-hover:text-zinc-300"
                />

              </Link>
            ))}

          </div>
        )}

      </section>

      {/* Workspace */}

      <section className="grid gap-4 sm:grid-cols-2">

        <Link
          href="/tools/snippets"
          className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
        >

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">

              <FileCode2
                size={18}
                className="text-zinc-400"
              />

            </div>

            <ArrowRight
              size={15}
              className="text-zinc-700 transition group-hover:text-zinc-300"
            />

          </div>

          <h3 className="mt-5 font-semibold">
            My Snippets
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Save and manage your useful code snippets.
          </p>

        </Link>

        <Link
          href="/tools"
          className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
        >

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">

              <Wrench
                size={18}
                className="text-zinc-400"
              />

            </div>

            <ArrowRight
              size={15}
              className="text-zinc-700 transition group-hover:text-zinc-300"
            />

          </div>

          <h3 className="mt-5 font-semibold">
            All Developer Tools
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Browse the complete DevKit toolkit.
          </p>

        </Link>

      </section>

    </div>
  );
}
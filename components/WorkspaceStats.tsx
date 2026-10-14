"use client";

import { useEffect, useState } from "react";
import {
  Wrench,
  Pin,
  Clock3,
  FileCode2,
} from "lucide-react";

import DashboardWidget from "@/components/DashboardWidget";
import { tools } from "@/data/tools";
import  usePinnedTools  from "@/hooks/usePinnedTools";

export default function WorkspaceStats() {
  const { pinnedTools, loaded: pinsLoaded } = usePinnedTools();

  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [snippetCount, setSnippetCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
   
    try {
      const storedRecent = localStorage.getItem(
        "devkit-recent-tools"
      );

      if (storedRecent) {
        const parsed = JSON.parse(storedRecent);

        if (Array.isArray(parsed)) {
          setRecentTools(parsed);
        }
      }

      const storedSnippets = localStorage.getItem(
        "devkit-snippets"
      );

      if (storedSnippets) {
        const parsed = JSON.parse(storedSnippets);

        if (Array.isArray(parsed)) {
          setSnippetCount(parsed.length);
        }
      }
    } catch {
      setRecentTools([]);
      setSnippetCount(0);
    }
  

    setLoaded(true);
  }, []);

  

  if (!loaded || !pinsLoaded) {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl border border-zinc-800 bg-zinc-800/60" />

                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-zinc-800/60" />

                  <div className="h-2.5 w-32 rounded bg-zinc-800/40" />
                </div>
              </div>

              <div className="h-6 w-8 rounded bg-zinc-800/60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardWidget
        title="Available Tools"
        description="Tools available in DevKit"
        value={tools.length}
        icon={<Wrench size={18} />}
      />

      <DashboardWidget
        title="Pinned Tools"
        description="Your favorite tools"
        value={pinnedTools.length}
        icon={<Pin size={18} />}
      />

      <DashboardWidget
        title="Recently Used"
        description="Tools you've opened"
        value={recentTools.length}
        icon={<Clock3 size={18} />}
      />

      <DashboardWidget
        title="Snippets"
        description="Saved code snippets"
        value={snippetCount}
        icon={<FileCode2 size={18} />}
      />
    </div>
  );
}
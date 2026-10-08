
"use client";

import { useCallback, useEffect, useState } from "react";

export interface RecentTool {
  name: string;
  href: string;
  category?: string;
  usedAt: number;
}

const STORAGE_KEY = "devkit-recent-tools";
const MAX_RECENT_TOOLS = 6;

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Recents are hydrated from localStorage on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setRecentTools(parsed);
        }
      }
    } catch {
      setRecentTools([]);
    }

    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const saveRecentTools = useCallback(
    (items: RecentTool[]) => {
      setRecentTools(items);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Ignore localStorage errors
      }
    },
    []
  );

  const addRecentTool = useCallback(
    (tool: Omit<RecentTool, "usedAt">) => {
      setRecentTools((current) => {
        const filtered = current.filter(
          (item) => item.href !== tool.href
        );

        const updated: RecentTool[] = [
          {
            ...tool,
            usedAt: Date.now(),
          },
          ...filtered,
        ].slice(0, MAX_RECENT_TOOLS);

        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
          );
        } catch {
          // Ignore localStorage errors
        }

        return updated;
      });
    },
    []
  );

  const removeRecentTool = useCallback(
    (href: string) => {
      const updated = recentTools.filter(
        (item) => item.href !== href
      );

      saveRecentTools(updated);
    },
    [recentTools, saveRecentTools]
  );

  const clearRecentTools = useCallback(() => {
    saveRecentTools([]);
  }, [saveRecentTools]);

  return {
    recentTools,
    addRecentTool,
    removeRecentTool,
    clearRecentTools,
    mounted,
  };
}

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
  const { pinnedTools } = usePinnedTools();

  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [snippetCount, setSnippetCount] = useState(0);

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
  }, []);

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
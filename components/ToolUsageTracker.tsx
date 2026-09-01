"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { tools } from "@/data/tools";
import { addToolToHistory } from "@/lib/toolHistory";

export default function ToolUsageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const tool = tools.find(
      (item) => item.href === pathname
    );

    if (!tool) return;

    addToolToHistory(
      tool.name,
      tool.href
    );
  }, [pathname]);

  return null;
}
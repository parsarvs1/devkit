"use client";

import { useEffect } from "react";

interface RecentToolTrackerProps {
  name: string;
  href: string;
}

export default function RecentToolTracker({
  name,
  href,
}: RecentToolTrackerProps) {
  useEffect(() => {
    const key = "devkit-recent-tools";

    const saved = localStorage.getItem(key);

    let recentTools: {
      name: string;
      href: string;
    }[] = [];

    if (saved) {
      try {
        recentTools = JSON.parse(saved);
      } catch {
        recentTools = [];
      }
    }

    recentTools = recentTools.filter(
      (tool) => tool.href !== href
    );

    recentTools.unshift({
      name,
      href,
    });

    recentTools = recentTools.slice(0, 5);

    localStorage.setItem(
      key,
      JSON.stringify(recentTools)
    );
  }, [name, href]);

  return null;
}
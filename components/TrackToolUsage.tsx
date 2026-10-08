"use client";

import { useEffect } from "react";

import { addToolToHistory } from "@/lib/toolHistory";

interface TrackToolUsageProps {
  toolName: string;
  toolHref: string;
  category: string;
}

export default function TrackToolUsage({
  toolName,
  toolHref,
  category,
}: TrackToolUsageProps) {
  useEffect(() => {
    addToolToHistory(toolName, toolHref, category);
  }, [toolName, toolHref, category]);

  return null;
}
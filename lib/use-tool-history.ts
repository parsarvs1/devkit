"use client";

import { useEffect } from "react";

import { addToolToHistory } from "@/lib/tool-history";

export function useToolHistory(
  toolName: string,
  toolHref: string,
  category: string
) {
  useEffect(() => {
    addToolToHistory({
      toolName,
      toolHref,
      category,
    });
  }, [toolName, toolHref, category]);
}
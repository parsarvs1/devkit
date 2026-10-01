"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "devkit-pinned-tools";

export default function usePinnedTools() {
  const [pinnedTools, setPinnedTools] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setPinnedTools(parsed);
        }
      } catch {
        setPinnedTools([]);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    function handlePinsChanged() {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setPinnedTools([]);
        return;
      }

      try {
        const parsed = JSON.parse(stored);
      } catch {
        setPinnedTools([]);
      }
    }

    window.addEventListener("devkit-pins-changed", handlePinsChanged);

    return () => {
      window.removeEventListener("devkit-pins-changed", handlePinsChanged);
    };
  }, []);

  function togglePin(href: string) {
    setPinnedTools((current) => {
      const updated = current.includes(href)
        ? current.filter((item) => item !== href)
        : [...current, href];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      window.dispatchEvent(new Event("devkit-pins-changed"));

      return updated;
    });
  }

  function removePin(href: string) {
    setPinnedTools((current) => {
      const updated = current.filter((item) => item !== href);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      window.dispatchEvent(new Event("devkit-pins-changed"));

      return updated;
    });
  }

  function isPinned(href: string) {
    return pinnedTools.includes(href);
  }

  return {
    pinnedTools,
    togglePin,
    removePin,
    isPinned,
    loaded,
  };
}

const STORAGE_KEY = "devkit-pinned-tools";

export function getPinnedTools(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isToolPinned(href: string): boolean {
  return getPinnedTools().includes(href);
}

export function togglePin(href: string): boolean {
  const pinned = getPinnedTools();

  if (pinned.includes(href)) {
    const updated = pinned.filter((item) => item !== href);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    return false;
  }

  const updated = [...pinned, href];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return true;
}

export function clearPinnedTools(): void {
  localStorage.removeItem(STORAGE_KEY);
}
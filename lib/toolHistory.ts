export interface ToolHistoryItem {
  toolName: string;
  toolHref: string;
  category?: string;
  usedAt: number;
}

const STORAGE_KEY = "devkit-tool-history";
const MAX_HISTORY = 20;

function isToolHistoryItem(
  value: unknown
): value is ToolHistoryItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.toolName === "string" &&
    typeof item.toolHref === "string" &&
    (item.usedAt === undefined ||
      typeof item.usedAt === "number")
  );
}

export function getToolHistory(): ToolHistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isToolHistoryItem);
  } catch {
    return [];
  }
}

export function addToolToHistory(
  toolName: string,
  toolHref: string,
  category?: string
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const currentHistory = getToolHistory();

    const filteredHistory = currentHistory.filter(
      (item) => item.toolHref !== toolHref
    );

    const newItem: ToolHistoryItem = {
      toolName,
      toolHref,
      usedAt: Date.now(),
    };

    if (category) {
      newItem.category = category;
    }

    const updatedHistory = [
      newItem,
      ...filteredHistory,
    ].slice(0, MAX_HISTORY);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    window.dispatchEvent(new Event("tool-history-updated"));
  } catch {
    // Ignore localStorage errors
  }
}

export function removeToolFromHistory(
  toolHref: string
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const currentHistory = getToolHistory();

    const updatedHistory = currentHistory.filter(
      (item) => item.toolHref !== toolHref
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    window.dispatchEvent(new Event("tool-history-updated"));
  } catch {
    // Ignore localStorage errors
  }
}

export function clearToolHistory(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event("tool-history-updated"));
  } catch {
    // Ignore localStorage errors
  }
}

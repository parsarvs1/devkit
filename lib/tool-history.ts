export interface ToolHistoryItem {
  toolName: string;
  toolHref: string;
  category: string;
  usedAt: number;
}

const STORAGE_KEY = "devkit-tool-history";
const MAX_HISTORY = 20;

export function getToolHistory(): ToolHistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const history = JSON.parse(stored);

    if (!Array.isArray(history)) {
      return [];
    }

    return history;
  } catch {
    return [];
  }
}

export function addToolToHistory(
  tool: Omit<ToolHistoryItem, "usedAt">
) {
  if (typeof window === "undefined") {
    return;
  }

  const currentHistory = getToolHistory();

  const filteredHistory = currentHistory.filter(
    (item) => item.toolHref !== tool.toolHref
  );

  const newItem: ToolHistoryItem = {
    ...tool,
    usedAt: Date.now(),
  };

  const newHistory = [
    newItem,
    ...filteredHistory,
  ].slice(0, MAX_HISTORY);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(newHistory)
  );
}

export function removeToolFromHistory(
  toolHref: string
) {
  if (typeof window === "undefined") {
    return;
  }

  const history = getToolHistory();

  const newHistory = history.filter(
    (item) => item.toolHref !== toolHref
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(newHistory)
  );
}

export function clearToolHistory() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}
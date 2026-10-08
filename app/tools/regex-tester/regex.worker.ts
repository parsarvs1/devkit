/// <reference lib="webworker" />

// Runs a user-supplied regex off the main thread so a catastrophic
// backtracking pattern (e.g. (a+)+$) freezes the worker, not the tab.

self.onmessage = (event: MessageEvent) => {
  const { pattern, flags, text, id } = event.data;

  try {
    const regex = new RegExp(pattern, flags);
    const found = text.match(regex);

    self.postMessage({
      id,
      matches: found ? Array.from(found) : [],
      error: null,
    });
  } catch (error) {
    self.postMessage({
      id,
      matches: [],
      error: error instanceof Error ? error.message : "Invalid regular expression.",
    });
  }
};

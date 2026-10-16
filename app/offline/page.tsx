"use client";

import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  function retry() {
    if (typeof window !== "undefined" && navigator.onLine) {
      window.location.reload();
    } else {
      // Wait for connectivity, then reload.
      window.addEventListener("online", () => window.location.reload(), {
        once: true,
      });
    }
  }

  const online = typeof navigator !== "undefined" ? navigator.onLine : true;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <WifiOff size={28} className="text-zinc-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">You are offline</h1>
          <p className="text-sm leading-6 text-zinc-500">
            DevKit needs an internet connection to load new pages. Check your
            network and try again.
          </p>
        </div>

        <button
          onClick={retry}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          <RefreshCw size={15} />
          {online ? "Retry" : "Waiting for connection…"}
        </button>

        {online && (
          <p className="text-xs text-zinc-500">
            Your connection is back — reloading the page.
          </p>
        )}
      </div>
    </main>
  );
}

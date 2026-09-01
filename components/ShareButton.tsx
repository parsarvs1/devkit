"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import {
  createShareUrl,
} from "@/lib/shareState";

interface ShareButtonProps {
  path: string;
  state: Record<string, unknown>;
}

export default function ShareButton({
  path,
  state,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      const url = createShareUrl(
        path,
        state
      );

      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy share URL:",
        error
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
    >
      {copied ? (
        <>
          <Check size={16} />
          Link copied
        </>
      ) : (
        <>
          <Share2 size={16} />
          Share
        </>
      )}
    </button>
  );
}
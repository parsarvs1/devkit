"use client";

import { Pin, PinOff } from "lucide-react";
import usePinnedTools from "@/hooks/usePinnedTools";

interface PinButtonProps {
  href: string;
}

export default function PinButton({
  href,
}: PinButtonProps) {
  const {
    isPinned,
    togglePin,
    loaded,
  } = usePinnedTools();

  const pinned = isPinned(href);

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    togglePin(href);
  }

  if (!loaded) {
    return (
      <div
        className="h-8 w-8 rounded-lg"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        pinned
          ? "Unpin tool"
          : "Pin tool"
      }
      title={
        pinned
          ? "Unpin tool"
          : "Pin tool"
      }
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
        pinned
          ? "bg-zinc-800 text-white hover:bg-zinc-700"
          : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"
      }`}
    >
      {pinned ? (
        <PinOff size={16} />
      ) : (
        <Pin size={16} />
      )}
    </button>
  );
}
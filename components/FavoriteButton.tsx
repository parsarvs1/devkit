"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
  toolName: string;
}

export default function FavoriteButton({
  toolName,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // Favorite state is hydrated from localStorage on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const saved = localStorage.getItem("devkit-favorites");

    if (!saved) return;

    try {
      const favorites: string[] = JSON.parse(saved);

      setFavorite(favorites.includes(toolName));
    } catch {
      setFavorite(false);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [toolName]);

  function toggleFavorite() {
    const saved = localStorage.getItem("devkit-favorites");

    let favorites: string[] = [];

    if (saved) {
      try {
        favorites = JSON.parse(saved);
      } catch {
        favorites = [];
      }
    }

    if (favorites.includes(toolName)) {
      favorites = favorites.filter(
        (name) => name !== toolName
      );
      setFavorite(false);
    } else {
      favorites.push(toolName);
      setFavorite(true);
    }

    localStorage.setItem(
      "devkit-favorites",
      JSON.stringify(favorites)
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        favorite
          ? `Remove ${toolName} from favorites`
          : `Add ${toolName} to favorites`
      }
      title={
        favorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-500 transition hover:border-zinc-700 hover:text-white"
    >
      <Star
        size={17}
        className={
          favorite
            ? "fill-yellow-400 text-yellow-400"
            : ""
        }
      />
    </button>
  );
}
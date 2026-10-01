import {
  ArrowRight,
  Heart,
  Star,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type { Tool } from "./types";

type FavoriteTool = {
  id: Tool;
  name: string;
  description: string;
};

type FavoritesProps = {
  onSelectTool: (tool: string) => void;
};

const TOOL_INFO: FavoriteTool[] = [
  {
    id: "json",
    name: "JSON Formatter",
    description: "Format and validate JSON",
  },
  {
    id: "jwt",
    name: "JWT Decoder",
    description: "Decode JWT tokens",
  },
  {
    id: "uuid",
    name: "UUID Generator",
    description: "Generate UUIDs",
  },
  {
    id: "regex",
    name: "Regex Tester",
    description: "Test regular expressions",
  },
  {
    id: "base64",
    name: "Base64 Encoder",
    description: "Encode and decode Base64",
  },
  {
    id: "timestamp",
    name: "Timestamp",
    description: "Convert timestamps",
  },
  {
    id: "color",
    name: "Color Converter",
    description: "Convert colors",
  },
  {
    id: "hash",
    name: "Hash Generator",
    description: "Generate hashes",
  },
  {
    id: "hash-compare",
    name: "Hash Compare",
    description: "Compare hashes",
  },
  {
    id: "url",
    name: "URL Encoder",
    description: "Encode and decode URLs",
  },
];

export default function Favorites({
  onSelectTool,
}: FavoritesProps) {
  const [
    favorites,
    setFavorites,
  ] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const saved =
        localStorage.getItem(
          "devkit-favorites"
        );

      if (!saved) {
        setFavorites([]);
        return;
      }

      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setFavorites(
            parsed.filter(
              (item): item is string =>
                typeof item === "string"
            )
          );
        }
      } catch {
        localStorage.removeItem(
          "devkit-favorites"
        );

        setFavorites([]);
      }
    };

    loadFavorites();

    window.addEventListener(
      "devkit-favorites-change",
      loadFavorites
    );

    return () => {
      window.removeEventListener(
        "devkit-favorites-change",
        loadFavorites
      );
    };
  }, []);

  const favoriteTools =
    TOOL_INFO.filter((tool) =>
      favorites.includes(tool.id)
    );

  const removeFavorite = (
    toolId: string
  ) => {
    setFavorites((current) => {
      const updated = current.filter(
        (id) => id !== toolId
      );

      localStorage.setItem(
        "devkit-favorites",
        JSON.stringify(updated)
      );

      window.dispatchEvent(
        new CustomEvent(
          "devkit-favorites-change"
        )
      );

      return updated;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);

    localStorage.setItem(
      "devkit-favorites",
      JSON.stringify([])
    );

    window.dispatchEvent(
      new CustomEvent(
        "devkit-favorites-change"
      )
    );
  };

  return (
    <div className="favorites-page">

      {/* HEADER */}

      <header className="favorites-header">
        <div>
          <div className="favorites-eyebrow">
            <Heart size={13} />

            <span>
              YOUR WORKSPACE
            </span>
          </div>

          <h1>
            Favorites
          </h1>

          <p>
            Your favorite developer tools,
            always within reach.
          </p>
        </div>

        {favoriteTools.length > 0 && (
          <button
            type="button"
            className="favorites-clear"
            onClick={clearFavorites}
          >
            <Trash2 size={14} />

            <span>
              Clear all
            </span>
          </button>
        )}
      </header>


      {/* EMPTY STATE */}

      {favoriteTools.length === 0 ? (
        <section className="favorites-empty">

          <div className="favorites-empty-icon">
            <Star size={24} />
          </div>

          <h2>
            No favorites yet
          </h2>

          <p>
            Star your favorite developer
            tools and they will appear here.
          </p>

          <button
            type="button"
            className="favorites-empty-action"
            onClick={() =>
              onSelectTool("home")
            }
          >
            <span>
              Back to Dashboard
            </span>

            <ArrowRight size={15} />
          </button>

        </section>
      ) : (

        /* FAVORITES */

        <section className="favorites-grid">

          {favoriteTools.map((tool) => (
            <article
              className="favorites-card"
              key={tool.id}
            >

              <button
                type="button"
                className="favorites-card-main"
                onClick={() =>
                  onSelectTool(tool.id)
                }
              >

                <div className="favorites-card-icon">
                  <Star
                    size={17}
                    fill="currentColor"
                  />
                </div>

                <div className="favorites-card-content">

                  <strong>
                    {tool.name}
                  </strong>

                  <span>
                    {tool.description}
                  </span>

                </div>

                <ArrowRight
                  size={15}
                  className="favorites-card-arrow"
                />

              </button>

              <button
                type="button"
                className="favorites-remove"
                onClick={() =>
                  removeFavorite(tool.id)
                }
                aria-label={`Remove ${tool.name} from favorites`}
                title="Remove from favorites"
              >
                <Trash2 size={14} />
              </button>

            </article>
          ))}

        </section>
      )}


      {/* FOOTER */}

      {favoriteTools.length > 0 && (
        <div className="favorites-footer">

          <span>
            {favoriteTools.length}{" "}
            {favoriteTools.length === 1
              ? "favorite"
              : "favorites"}
          </span>

          <span>
            •
          </span>

          <span>
            Click a tool to open it
          </span>

        </div>
      )}

    </div>
  );
}
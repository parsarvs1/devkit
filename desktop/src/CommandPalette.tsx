import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type RefObject,
} from "react";

import {
  Braces,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Code2,
  FileKey2,
  GitCompare,
  Hash,
  Home,
  Link,
  Pipette,
  Regex,
  Search,
  X,
} from "lucide-react";

type PaletteItem = {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  group: "Tools" | "Navigation";
  keywords: string[];
  shortcut?: string;
};

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (item: string) => void;
};

const items: PaletteItem[] = [
  {
    id: "home",
    name: "Dashboard",
    description: "Go back to the DevKit dashboard.",
    icon: <Home size={17} />,
    group: "Navigation",
    keywords: ["home", "dashboard", "main"],
    shortcut: "G H",
  },

  {
    id: "json",
    name: "JSON Formatter",
    description: "Format and minify JSON.",
    icon: <Braces size={17} />,
    group: "Tools",
    keywords: ["json", "format", "formatter", "minify"],
  },

  {
    id: "jwt",
    name: "JWT Decoder",
    description: "Decode JWT tokens and inspect payloads.",
    icon: <FileKey2 size={17} />,
    group: "Tools",
    keywords: ["jwt", "token", "decode", "auth"],
  },

  {
    id: "uuid",
    name: "UUID Generator",
    description: "Generate unique UUIDs instantly.",
    icon: <Code2 size={17} />,
    group: "Tools",
    keywords: ["uuid", "generate", "identifier"],
  },

  {
    id: "regex",
    name: "Regex Tester",
    description: "Test regular expressions against text.",
    icon: <Regex size={17} />,
    group: "Tools",
    keywords: ["regex", "regexp", "regular", "expression", "pattern"],
  },

  {
    id: "base64",
    name: "Base64",
    description: "Encode and decode Base64 strings.",
    icon: <Code2 size={17} />,
    group: "Tools",
    keywords: ["base64", "encode", "decode"],
  },

  {
    id: "timestamp",
    name: "Timestamp",
    description: "Convert Unix timestamps and dates.",
    icon: <CalendarClock size={17} />,
    group: "Tools",
    keywords: ["timestamp", "unix", "date", "time"],
  },

  {
    id: "color",
    name: "Color Converter",
    description: "Convert HEX colors to RGB and HSL.",
    icon: <Pipette size={17} />,
    group: "Tools",
    keywords: ["color", "hex", "rgb", "hsl"],
  },

  {
    id: "hash",
    name: "Hash Generator",
    description: "Generate SHA hashes from text.",
    icon: <Hash size={17} />,
    group: "Tools",
    keywords: ["hash", "sha", "sha256", "crypto"],
  },

  {
    id: "hash-compare",
    name: "Hash Compare",
    description: "Compare hashes and verify text integrity.",
    icon: <GitCompare size={17} />,
    group: "Tools",
    keywords: ["hash", "compare", "verify", "checksum"],
  },

  {
    id: "url",
    name: "URL Encoder",
    description: "Encode and decode URLs.",
    icon: <Link size={17} />,
    group: "Tools",
    keywords: ["url", "uri", "encode", "decode"],
  },
];

export default function CommandPalette({
  open,
  onClose,
  onSelect,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  /*
   * ======================================================
   * FILTER + SEARCH
   * ======================================================
   */

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return items;
    }

    return items
      .map((item) => {
        let score = 0;

        const name = item.name.toLowerCase();
        const description = item.description.toLowerCase();
        const id = item.id.toLowerCase();

        if (name === normalized) {
          score += 100;
        }

        if (name.startsWith(normalized)) {
          score += 50;
        }

        if (name.includes(normalized)) {
          score += 30;
        }

        if (description.includes(normalized)) {
          score += 15;
        }

        if (id.includes(normalized)) {
          score += 20;
        }

        for (const keyword of item.keywords) {
          if (keyword.includes(normalized)) {
            score += 25;
          }
        }

        return {
          item,
          score,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((result) => result.item);
  }, [query]);

  /*
   * ======================================================
   * RESET
   * ======================================================
   */

  useEffect(() => {
    if (!open) {
      return;
    }

    setQuery("");
    setSelectedIndex(0);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  /*
   * ======================================================
   * SCROLL SELECTED ITEM
   * ======================================================
   */

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "nearest",
    });
  }, [selectedIndex]);

  /*
   * ======================================================
   * KEYBOARD
   * ======================================================
   */

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((current) =>
          Math.min(current + 1, results.length - 1),
        );

        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedIndex((current) => Math.max(current - 1, 0));

        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const selected = results[selectedIndex];

        if (selected) {
          onSelect(selected.id);
          onClose();
        }
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [open, results, selectedIndex, onClose, onSelect]);

  /*
   * ======================================================
   * CLICK OUTSIDE
   * ======================================================
   */

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  /*
   * ======================================================
   * CLOSED
   * ======================================================
   */

  if (!open) {
    return null;
  }

  const tools = results.filter((item) => item.group === "Tools");

  const navigation = results.filter((item) => item.group === "Navigation");

  const orderedResults = [...navigation, ...tools];


  return (
    <div className="command-palette-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* HEADER */}

        <div className="command-palette-header">
          <Search size={18} />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools and commands..."
            aria-label="Search commands"
          />

          {query && (
            <button
              type="button"
              className="command-palette-clear"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

          <button
            type="button"
            className="command-palette-close"
            onClick={onClose}
            aria-label="Close command palette"
          >
            <kbd>Esc</kbd>
          </button>
        </div>

        {/* RESULTS */}

        <div className="command-palette-results">
          {orderedResults.length === 0 ? (
            <div className="command-palette-empty">
              <Search size={28} />

              <strong>No results found</strong>

              <span>Try another search term.</span>
            </div>
          ) : (
            <>
              {/* NAVIGATION */}

              {navigation.length > 0 && (
                <div className="command-palette-group">
                  <div className="command-palette-group-title">Navigation</div>

                  {navigation.map((item) => {
                    const index = orderedResults.indexOf(item);

                    const selected = index === selectedIndex;

                    return (
                      <CommandItem
                        key={item.id}
                        item={item}
                        selected={selected}
                        setRef={selected ? selectedRef : undefined}
                        onClick={() => {
                          onSelect(item.id);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      />
                    );
                  })}
                </div>
              )}

              {/* TOOLS */}

              {tools.length > 0 && (
                <div className="command-palette-group">
                  <div className="command-palette-group-title">Tools</div>

                  {tools.map((item) => {
                    const index = orderedResults.indexOf(item);

                    const selected = index === selectedIndex;

                    return (
                      <CommandItem
                        key={item.id}
                        item={item}
                        selected={selected}
                        setRef={selected ? selectedRef : undefined}
                        onClick={() => {
                          onSelect(item.id);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}

        <div className="command-palette-footer">
          <div className="command-palette-hints">
            <span>
              <kbd>
                <ChevronUp size={12} />
              </kbd>

              <kbd>
                <ChevronDown size={12} />
              </kbd>

              <span>Navigate</span>
            </span>

            <span>
              <kbd>Enter</kbd>

              <span>Open</span>
            </span>

            <span>
              <kbd>Esc</kbd>

              <span>Close</span>
            </span>
          </div>

          <span className="command-palette-count">
            {orderedResults.length}{" "}
            {orderedResults.length === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  );
}

/*
 * ========================================================
 * COMMAND ITEM
 * ========================================================
 */

type CommandItemProps = {
  item: PaletteItem;
  selected: boolean;
  setRef?: RefObject<HTMLButtonElement | null>;
  onClick: () => void;
  onMouseEnter: () => void;
};

function CommandItem({
  item,
  selected,
  setRef,
  onClick,
  onMouseEnter,
}: CommandItemProps) {
  return (
    <button
      ref={setRef}
      type="button"
      className={`command-palette-item ${
        selected ? "command-palette-item-selected" : ""
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <span className="command-palette-item-icon">{item.icon}</span>

      <span className="command-palette-item-content">
        <span className="command-palette-item-name">{item.name}</span>

        <span className="command-palette-item-description">
          {item.description}
        </span>
      </span>

      {item.shortcut && (
        <span className="command-palette-item-shortcut">{item.shortcut}</span>
      )}
    </button>
  );
}

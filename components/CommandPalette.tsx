"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Search,
  Home,
  Wrench,
  User,
  Settings,
  Code2,
  Braces,
  KeyRound,
  Fingerprint,
  Palette,
  Binary,
  Clock,
  Hash,
  LockKeyhole,
  Regex,
  ShieldCheck,
  Link as LinkIcon,
  FileText,
  Zap,
  Star,
  History,
  ArrowUpRight,
  Folder,
} from "lucide-react";

import {
  categories,
  categoryHref,
  toolsInCategory,
} from "@/lib/categories";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/lib/openCommandPalette";

type CommandCategory =
  | "Navigation"
  | "Developer Tools"
  | "Categories"
  | "Favorites"
  | "Recently Used";

type Command = {
  name: string;
  description?: string;
  href: string;
  category: CommandCategory;
  icon: React.ReactNode;
};

const commands: Command[] = [
  {
    name: "Home",
    description: "Go to homepage",
    href: "/",
    category: "Navigation",
    icon: <Home size={17} />,
  },

  {
    name: "Tools",
    description: "Browse all developer tools",
    href: "/tools",
    category: "Navigation",
    icon: <Wrench size={17} />,
  },

  {
    name: "Dashboard",
    description: "Open your DevKit dashboard",
    href: "/dashboard",
    category: "Navigation",
    icon: <Code2 size={17} />,
  },

  {
    name: "Account",
    description: "Manage your DevKit account",
    href: "/dashboard",
    category: "Navigation",
    icon: <User size={17} />,
  },

  {
    name: "Settings",
    description: "Manage your preferences",
    href: "/settings",
    category: "Navigation",
    icon: <Settings size={17} />,
  },



  ...categories.map((category) => ({
    name: category,
    description: `${toolsInCategory(category).length} ${
      toolsInCategory(category).length === 1 ? "tool" : "tools"
    } in ${category}`,
    href: categoryHref(category),
    category: "Categories" as const,
    icon: <Folder size={17} />,
  })),


  {
    name: "JSON Formatter",
    description: "Format and validate JSON",
    href: "/tools/json-formatter",
    category: "Developer Tools",
    icon: <Braces size={17} />,
  },

  {
    name: "JSON Validator",
    description: "Validate JSON and find syntax errors",
    href: "/tools/json-validator",
    category: "Developer Tools",
    icon: <ShieldCheck size={17} />,
  },

  {
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens",
    href: "/tools/jwt-decoder",
    category: "Developer Tools",
    icon: <KeyRound size={17} />,
  },

  {
    name: "JWT Generator",
    description: "Sign and generate JSON Web Tokens",
    href: "/tools/jwt-generator",
    category: "Developer Tools",
    icon: <KeyRound size={17} />,
  },

  {
    name: "UUID Generator",
    description: "Generate unique UUIDs",
    href: "/tools/uuid-generator",
    category: "Developer Tools",
    icon: <Fingerprint size={17} />,
  },

  {
    name: "Regex Tester",
    description: "Test regular expressions",
    href: "/tools/regex-tester",
    category: "Developer Tools",
    icon: <Regex size={17} />,
  },

  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64",
    href: "/tools/base64",
    category: "Developer Tools",
    icon: <Binary size={17} />,
  },

  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps",
    href: "/tools/timestamp",
    category: "Developer Tools",
    icon: <Clock size={17} />,
  },

  {
    name: "Hash Generator",
    description: "Generate secure hashes",
    href: "/tools/hash-generator",
    category: "Developer Tools",
    icon: <Hash size={17} />,
  },

  {
    name: "URL Encoder / Decoder",
    description: "Encode and decode URL components",
    href: "/tools/url-encoder",
    category: "Developer Tools",
    icon: <LinkIcon size={17} />,
  },

  {
    name: "Color Converter",
    description: "Convert colors between formats",
    href: "/tools/color-converter",
    category: "Developer Tools",
    icon: <Palette size={17} />,
  },

  {
    name: "Password Generator",
    description: "Generate strong passwords",
    href: "/tools/password-generator",
    category: "Developer Tools",
    icon: <LockKeyhole size={17} />,
  },

  {
    name: "Markdown Previewer",
    description: "Write and preview Markdown",
    href: "/tools/markdown-preview",
    category: "Developer Tools",
    icon: <FileText size={17} />,
  },

  {
    name: "JSON → TypeScript",
    description: "Convert JSON into TypeScript interfaces",
    href: "/tools/json-to-typescript",
    category: "Developer Tools",
    icon: <Code2 size={17} />,
  },

  {
    name: "JSON → Zod",
    description: "Convert JSON into Zod schemas",
    href: "/tools/json-to-zod",
    category: "Developer Tools",
    icon: <Braces size={17} />,
  },

  {
    name: "Color Palette Generator",
    description: "Generate a color scale",
    href: "/tools/color-palette",
    category: "Developer Tools",
    icon: <Palette size={17} />,
  },

  {
    name: "API Tester",
    description: "Test HTTP APIs and endpoints",
    href: "/tools/api-tester",
    category: "Developer Tools",
    icon: <Zap size={17} />,
  },

  {
    name: "Environment Variable Generator",
    description: "Generate environment variables",
    href: "/tools/env-generator",
    category: "Developer Tools",
    icon: <Code2 size={17} />,
  },

  {
    name: "Markdown Playground",
    description: "Edit Markdown interactively",
    href: "/tools/markdown-playground",
    category: "Developer Tools",
    icon: <FileText size={17} />,
  },

  {
    name: "Snippets",
    description: "Save and manage code snippets",
    href: "/tools/snippets",
    category: "Developer Tools",
    icon: <Code2 size={17} />,
  },

  {
    name: "Tool Chaining",
    description: "Connect multiple DevKit tools",
    href: "/tools/tool-chaining",
    category: "Developer Tools",
    icon: <Zap size={17} />,
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [favorites, setFavorites] = useState<string[]>([]);

  const [recentTools, setRecentTools] = useState<
    {
      name: string;
      href: string;
    }[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);

 
  const restoreRef = useRef<HTMLElement | null>(null);

 

  const loadLocalData = useCallback(() => {
    try {
      const savedFavorites =
        localStorage.getItem("devkit-favorites");

      const savedRecent =
        localStorage.getItem("devkit-recent-tools");

      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);

        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }

      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);

        if (Array.isArray(parsed)) {
          setRecentTools(parsed);
        }
      }
    } catch {
      setFavorites([]);
      setRecentTools([]);
    }
  }, []);

  

  const openPalette = useCallback(() => {
    if (typeof document !== "undefined") {
      const active = document.activeElement;

      if (active instanceof HTMLElement) {
        restoreRef.current = active;
      }
    }

    loadLocalData();

    setOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, [loadLocalData]);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);

    restoreRef.current?.focus();
    restoreRef.current = null;
  }, []);

 

  useEffect(() => {
    function handleOpen() {
      openPalette();
    }

    window.addEventListener(
      OPEN_COMMAND_PALETTE_EVENT,
      handleOpen,
    );

    return () => {
      window.removeEventListener(
        OPEN_COMMAND_PALETTE_EVENT,
        handleOpen,
      );
    };
  }, [openPalette]);

  

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        if (open) {
          closePalette();
        } else {
          openPalette();
        }

        return;
      }

      
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "p"
      ) {
        event.preventDefault();

        if (!open) {
          openPalette();
        }

        return;
      }

      
      if (event.key === "Escape") {
        closePalette();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, openPalette, closePalette]);

 

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  

  useEffect(() => {
    if (!open) {
      return;
    }

    function isInsidePalette(
      element: EventTarget | null,
    ): boolean {
      return Boolean(
        element instanceof Node &&
          panelRef.current?.contains(element),
      );
    }

    function handleTrap(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }

     
      if (!isInsidePalette(event.target)) {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }

      
      if (!panelRef.current) {
        return;
      }

      const focusable =
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTrap);

    return () => {
      document.removeEventListener("keydown", handleTrap);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    
    loadLocalData();

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [open, loadLocalData]);

  

  const allCommands = useMemo(() => {
    const favoriteCommands: Command[] = [];

    favorites.forEach((favoriteName) => {
      const command = commands.find(
        (item) => item.name === favoriteName
      );

      if (command) {
        favoriteCommands.push({
          ...command,
          category: "Favorites",
        });
      }
    });

    const recentCommands: Command[] = [];

    recentTools.forEach((recent) => {
      const command = commands.find(
        (item) => item.href === recent.href
      );

      if (command) {
        recentCommands.push({
          ...command,
          category: "Recently Used",
        });
      }
    });

    return [
      ...favoriteCommands,
      ...recentCommands,
      ...commands,
    ];
  }, [favorites, recentTools]);

  

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query
      .toLowerCase()
      .trim();

    const seen = new Set<string>();

    return allCommands.filter((command) => {
      if (seen.has(command.href)) {
        return false;
      }

      const searchableText = `
        ${command.name}
        ${command.description ?? ""}
        ${command.category}
      `.toLowerCase();

      const matches =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      if (matches) {
        seen.add(command.href);
      }

      return matches;
    });
  }, [allCommands, query]);

  

  const clampedSelectedIndex =
    filteredCommands.length === 0
      ? 0
      : Math.min(
          selectedIndex,
          filteredCommands.length - 1
        );

  

  function handleInputKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (filteredCommands.length === 0) {
        setSelectedIndex(0);
        return;
      }

      const next = clampedSelectedIndex + 1;

      setSelectedIndex(
        next >= filteredCommands.length ? 0 : next
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (filteredCommands.length === 0) {
        setSelectedIndex(0);
        return;
      }

      const next = clampedSelectedIndex - 1;

      setSelectedIndex(
        next < 0 ? filteredCommands.length - 1 : next
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selected =
        filteredCommands[clampedSelectedIndex];

      if (selected) {
        window.location.href = selected.href;
      }
    }
  }

 

  useEffect(() => {
    if (!open) {
      return;
    }

    const container = resultsRef.current;

    if (!container) {
      return;
    }

    const selected =
      container.querySelector(
        `[data-command-index="${clampedSelectedIndex}"]`
      );

    if (selected instanceof HTMLElement) {
      selected.scrollIntoView({
        block: "nearest",
      });
    }
  }, [clampedSelectedIndex, open]);

  

  function handleSearchChange(
    value: string
  ) {
    setQuery(value);
    setSelectedIndex(0);
  }

 

  function clearSearch() {
    setQuery("");
    setSelectedIndex(0);
    inputRef.current?.focus();
  }

  if (!open) {
    return null;
  }

  

  const navigationCommands =
    filteredCommands.filter(
      (command) =>
        command.category === "Navigation"
    );

  const favoriteCommands =
    filteredCommands.filter(
      (command) =>
        command.category === "Favorites"
    );

  const recentCommands =
    filteredCommands.filter(
      (command) =>
        command.category === "Recently Used"
    );

  const categoryCommands =
    filteredCommands.filter(
      (command) => command.category === "Categories",
    );

  const toolCommands =
    filteredCommands.filter(
      (command) =>
        command.category === "Developer Tools"
    );

  

  const categoriesStartIndex = navigationCommands.length;

  const favoritesStartIndex =
    categoriesStartIndex + categoryCommands.length;

  const recentStartIndex =
    favoritesStartIndex + favoriteCommands.length;

  const toolsStartIndex = recentStartIndex + recentCommands.length;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 px-4 pt-[10vh] backdrop-blur-sm sm:pt-[15vh]"
      onMouseDown={closePalette}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="DevKit command palette"
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        

        <div className="flex items-center border-b border-zinc-800 px-4">

          <Search
            size={19}
            className="shrink-0 text-zinc-500"
          />

          <input
            ref={inputRef}
            autoFocus
            value={query}
            aria-label="Search DevKit"
            onChange={(event) =>
              handleSearchChange(
                event.target.value
              )
            }
            onKeyDown={handleInputKeyDown}
            placeholder="Search DevKit..."
            className="h-16 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="mr-2 rounded-md p-1.5 text-zinc-600 transition hover:bg-zinc-900 hover:text-zinc-300"
            >
              ×
            </button>
          )}

          <button
            type="button"
            onClick={closePalette}
            className="hidden rounded-md border border-zinc-800 px-2 py-1 text-[11px] text-zinc-600 transition hover:border-zinc-700 hover:text-zinc-300 sm:block"
          >
            ESC
          </button>

        </div>

       

        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto p-2"
        >

          {filteredCommands.length === 0 ? (

            <div className="px-4 py-16 text-center">

              <Code2
                size={28}
                className="mx-auto text-zinc-700"
              />

              <p className="mt-4 text-sm text-zinc-400">
                No results found.
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Try another search.
              </p>

            </div>

          ) : (

            <>

              {navigationCommands.length > 0 && (
                <CommandSection
                  title="Navigation"
                  icon={<Home size={13} />}
                  commands={navigationCommands}
                  selectedIndex={clampedSelectedIndex}
                  startIndex={0}
                  onClose={closePalette}
                />
              )}

              {categoryCommands.length > 0 && (
                <CommandSection
                  title="Categories"
                  icon={<Folder size={13} />}
                  commands={categoryCommands}
                  selectedIndex={clampedSelectedIndex}
                  startIndex={categoriesStartIndex}
                  onClose={closePalette}
                />
              )}

              {favoriteCommands.length > 0 && (
                <CommandSection
                  title="Favorites"
                  icon={<Star size={13} />}
                  commands={favoriteCommands}
                  selectedIndex={clampedSelectedIndex}
                  startIndex={favoritesStartIndex}
                  onClose={closePalette}
                />
              )}

              {recentCommands.length > 0 && (
                <CommandSection
                  title="Recently Used"
                  icon={<History size={13} />}
                  commands={recentCommands}
                  selectedIndex={clampedSelectedIndex}
                  startIndex={recentStartIndex}
                  onClose={closePalette}
                />
              )}

              {toolCommands.length > 0 && (
                <CommandSection
                  title="Developer Tools"
                  icon={<Wrench size={13} />}
                  commands={toolCommands}
                  selectedIndex={clampedSelectedIndex}
                  startIndex={toolsStartIndex}
                  onClose={closePalette}
                />
              )}

            </>
          )}

        </div>

        

        <div className="flex flex-col gap-2 border-t border-zinc-800 px-4 py-3 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Code2 size={13} />
            DevKit Command Palette
          </div>

          <div className="flex items-center gap-3">

            <span>
              ↑↓ Navigate
            </span>

            <span>
              ↵ Open
            </span>

            <span>
              ESC Close
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}

function CommandSection({
  title,
  icon,
  commands,
  selectedIndex,
  startIndex,
  onClose,
}: {
  title: string;
  icon: React.ReactNode;
  commands: Command[];
  selectedIndex: number;
  startIndex: number;
  onClose: () => void;
}) {
  return (
    <div className="mb-3">

      

      <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">

        {icon}

        {title}

      </div>

      

      <div className="space-y-1">

        {commands.map((command, index) => {

          const globalIndex = startIndex + index;

          const active =
            globalIndex === selectedIndex;

          return (
            <Link
              key={`${command.category}-${command.href}`}
              href={command.href}
              data-command-index={globalIndex}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                active
                  ? "bg-zinc-900"
                  : "hover:bg-zinc-900/70"
              }`}
            >
              {active && (
                <span className="sr-only">Selected</span>
              )}

              

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
                  active
                    ? "border-zinc-700 bg-zinc-800 text-zinc-200"
                    : "border-zinc-800 bg-zinc-900 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-300"
                }`}
              >
                {command.icon}
              </div>

              

              <div className="min-w-0 flex-1">

                <p
                  className={`text-sm ${
                    active
                      ? "text-white"
                      : "text-zinc-300"
                  }`}
                >
                  {command.name}
                </p>

                {command.description && (
                  <p className="mt-0.5 truncate text-xs text-zinc-600">
                    {command.description}
                  </p>
                )}

              </div>

              

              {active ? (
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-zinc-400"
                />
              ) : (
                <span className="text-zinc-800">
                  ↵
                </span>
              )}

            </Link>
          );
        })}

      </div>

    </div>
  );
}
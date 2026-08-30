"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Home,
  Wrench,
  User,
  Code2,
  Braces,
  KeyRound,
  Fingerprint,
  Palette,
  X,
} from "lucide-react";

type Command = {
  name: string;
  description?: string;
  href: string;
  category: "Navigation" | "Developer Tools";
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
    name: "Account",
    description: "Manage your DevKit account",
    href: "/account",
    category: "Navigation",
    icon: <User size={17} />,
  },

  {
    name: "JSON Formatter",
    description: "Format and validate JSON",
    href: "/tools/json-formatter",
    category: "Developer Tools",
    icon: <Braces size={17} />,
  },
  {
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens",
    href: "/tools/jwt-decoder",
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
    name: "Color Converter",
    description: "Convert colors between formats",
    href: "/tools/color-converter",
    category: "Developer Tools",
    icon: <Palette size={17} />,
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
  description: "Generate a color scale from a base color",
  href: "/tools/color-palette",
  category: "Developer Tools",
  icon: <Palette size={17} />,
},
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const filteredCommands = commands.filter((command) => {
    const value = `${command.name} ${command.description ?? ""}`.toLowerCase();

    return value.includes(query.toLowerCase());
  });

  const navigationCommands = filteredCommands.filter(
    (command) => command.category === "Navigation"
  );

  const toolCommands = filteredCommands.filter(
    (command) => command.category === "Developer Tools"
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Search */}

        <div className="flex items-center border-b border-zinc-800 px-4">
          <Search
            size={18}
            className="shrink-0 text-zinc-500"
          />

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search DevKit..."
            className="h-14 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-zinc-600 transition hover:bg-zinc-900 hover:text-zinc-300"
          >
            <X size={17} />
          </button>
        </div>

        {/* Results */}

        <div className="max-h-[60vh] overflow-y-auto p-2">

          {filteredCommands.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <Code2
                size={24}
                className="mx-auto text-zinc-700"
              />

              <p className="mt-3 text-sm text-zinc-400">
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
                  commands={navigationCommands}
                  onSelect={() => setOpen(false)}
                />
              )}

              {toolCommands.length > 0 && (
                <CommandSection
                  title="Developer Tools"
                  commands={toolCommands}
                  onSelect={() => setOpen(false)}
                />
              )}
            </>
          )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3 text-xs text-zinc-600">
          <span>DevKit Command Palette</span>

          <div className="flex items-center gap-3">
            <span>ESC to close</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandSection({
  title,
  commands,
  onSelect,
}: {
  title: string;
  commands: Command[];
  onSelect: () => void;
}) {
  return (
    <div className="mb-3">
      <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
        {title}
      </div>

      <div className="space-y-1">
        {commands.map((command) => (
          <Link
            key={command.href}
            href={command.href}
            onClick={onSelect}
            className="group flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-zinc-900"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 transition group-hover:border-zinc-700 group-hover:text-zinc-300">
              {command.icon}
            </div>

            <div className="min-w-0">
              <p className="text-sm text-zinc-200">
                {command.name}
              </p>

              {command.description && (
                <p className="mt-0.5 truncate text-xs text-zinc-600">
                  {command.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
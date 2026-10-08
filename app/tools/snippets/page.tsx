"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import RecentToolTracker from "@/components/RecentToolTracker";
import { copyToClipboard } from "@/lib/clipboard";

import {
  ArrowLeft,
  Copy,
  Trash2,
  Plus,
  Search,
  Code2,
  X,
  Check,
  Sparkles,
} from "lucide-react";

interface Snippet {
  id: number;
  title: string;
  language: string;
  category: string;
  code: string;
}

const STORAGE_KEY = "devkit-snippets";

const exampleSnippets: Snippet[] = [
  {
    id: 1,
    title: "Fetch API",
    language: "JavaScript",
    category: "API",
    code: `const response = await fetch("/api/users");

const data = await response.json();

console.log(data);`,
  },
  {
    id: 2,
    title: "React useState",
    language: "TypeScript",
    category: "React",
    code: `const [count, setCount] = useState(0);

function increment() {
  setCount((value) => value + 1);
}`,
  },
  {
    id: 3,
    title: "Next.js Server Component",
    language: "TypeScript",
    category: "Next.js",
    code: `export default async function Page() {
  const data = await getData();

  return <main>{data.title}</main>;
}`,
  },
];

export default function SnippetsPage() {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [category, setCategory] = useState("All");

  const [showEditor, setShowEditor] = useState(false);

  const [title, setTitle] = useState("");
  const [snippetLanguage, setSnippetLanguage] =
    useState("JavaScript");
  const [snippetCategory, setSnippetCategory] =
    useState("General");
  const [code, setCode] = useState("");

  const [copiedId, setCopiedId] = useState<number | null>(
    null
  );

  // Validates a stored payload before trusting it, so a corrupt or
  // hand-edited localStorage entry can't take down the whole page.
  function isValidSnippets(value: unknown): value is Snippet[] {
    return (
      Array.isArray(value) &&
      value.every(
        (item) =>
          item !== null &&
          typeof item === "object" &&
          typeof (item as Snippet).id === "number" &&
          typeof (item as Snippet).title === "string" &&
          typeof (item as Snippet).language === "string" &&
          typeof (item as Snippet).category === "string" &&
          typeof (item as Snippet).code === "string"
      )
    );
  }

  // Seed state once from storage so the effect below only has to
  // handle the "storage is missing/corrupt" repair path.
  const [snippets, setSnippets] = useState<Snippet[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (isValidSnippets(parsed)) {
          return parsed;
        }
        // Corrupt payload: drop it rather than trusting broken data.
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return exampleSnippets;
  });

  useEffect(() => {
    // Persist on change; repair runs on the first mount only if the
    // lazy initializer above couldn't read a valid value.
    if (snippets.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(snippets)
        );
      } catch {
        // Storage is full or blocked — keep working in memory.
      }
    }
  }, [snippets]);

  const languages = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(snippets.map((snippet) => snippet.language))
      ),
    ];
  }, [snippets]);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(snippets.map((snippet) => snippet.category))
      ),
    ];
  }, [snippets]);

  const filteredSnippets = useMemo(() => {
    const query = search.toLowerCase().trim();

    return snippets.filter((snippet) => {
      const matchesSearch =
        !query ||
        snippet.title.toLowerCase().includes(query) ||
        snippet.code.toLowerCase().includes(query) ||
        snippet.language.toLowerCase().includes(query) ||
        snippet.category.toLowerCase().includes(query);

      const matchesLanguage =
        language === "All" ||
        snippet.language === language;

      const matchesCategory =
        category === "All" ||
        snippet.category === category;

      return (
        matchesSearch &&
        matchesLanguage &&
        matchesCategory
      );
    });
  }, [snippets, search, language, category]);

  const idCounter = useRef(0);

  function addSnippet() {
    if (!title.trim() || !code.trim()) {
      return;
    }

    const newSnippet: Snippet = {
      // Date.now() alone can collide on a rapid double-add; the counter
      // guarantees uniqueness within the session.
      id: Date.now() + ++idCounter.current,
      title: title.trim(),
      language: snippetLanguage,
      category: snippetCategory.trim() || "General",
      code,
    };

    setSnippets((current) => [newSnippet, ...current]);

    setTitle("");
    setSnippetLanguage("JavaScript");
    setSnippetCategory("General");
    setCode("");

    setShowEditor(false);
  }

  function deleteSnippet(id: number) {
    setSnippets((current) =>
      current.filter((snippet) => snippet.id !== id)
    );
  }

  async function copySnippet(snippet: Snippet) {
    const ok = await copyToClipboard(snippet.code);
    if (!ok) return;

    setCopiedId(snippet.id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  }

  function loadExamples() {
    setSnippets(exampleSnippets);
  }

  function clearAll() {
    setSnippets([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RecentToolTracker
        name="DevKit Snippets"
        href="/tools/snippets"
      />

      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm text-zinc-500">
              DevKit Tool
            </p>

            <h1 className="text-4xl font-bold">
              DevKit Snippets
            </h1>

            <p className="mt-3 text-zinc-400">
              Save, organize and quickly reuse your favorite
              code snippets.
            </p>
          </div>

          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <Plus size={16} />
            New Snippet
          </button>
        </div>

        {/* Search / Filters */}

        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search snippets..."
                className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
              }
              className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none focus:border-zinc-600"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none focus:border-zinc-600"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Editor */}

        {showEditor && (
          <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Create Snippet
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Save a reusable piece of code.
                </p>
              </div>

              <button
                onClick={() => setShowEditor(false)}
                className="text-zinc-500 transition hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs text-zinc-500">
                  Title
                </label>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="API Request"
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none placeholder:text-zinc-700 focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-zinc-500">
                  Language
                </label>

                <select
                  value={snippetLanguage}
                  onChange={(event) =>
                    setSnippetLanguage(event.target.value)
                  }
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 outline-none focus:border-zinc-600"
                >
                  <option>JavaScript</option>
                  <option>TypeScript</option>
                  <option>Python</option>
                  <option>HTML</option>
                  <option>CSS</option>
                  <option>SQL</option>
                  <option>JSON</option>
                  <option>Bash</option>
                  <option>Dart</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs text-zinc-500">
                  Category
                </label>

                <input
                  value={snippetCategory}
                  onChange={(event) =>
                    setSnippetCategory(event.target.value)
                  }
                  placeholder="React"
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none placeholder:text-zinc-700 focus:border-zinc-600"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-xs text-zinc-500">
                Code
              </label>

              <textarea
                value={code}
                onChange={(event) =>
                  setCode(event.target.value)
                }
                placeholder={`const example = "Hello DevKit";`}
                spellCheck={false}
                className="h-56 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-6 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowEditor(false)}
                className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400 transition hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={addSnippet}
                disabled={!title.trim() || !code.trim()}
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Snippet
              </button>
            </div>
          </div>
        )}

        {/* Actions */}

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {filteredSnippets.length}{" "}
            {filteredSnippets.length === 1
              ? "snippet"
              : "snippets"}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={loadExamples}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              <Sparkles size={15} />
              Examples
            </button>

            <button
              onClick={clearAll}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-red-400"
            >
              <Trash2 size={15} />
              Clear all
            </button>
          </div>
        </div>

        {/* Snippets */}

        {filteredSnippets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-20 text-center">
            <Code2
              size={32}
              className="mx-auto text-zinc-700"
            />

            <h2 className="mt-4 font-semibold">
              No snippets found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Create your first snippet and start building
              your personal code library.
            </p>

            <button
              onClick={() => setShowEditor(true)}
              className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Create Snippet
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredSnippets.map((snippet) => (
              <article
                key={snippet.id}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40"
              >
                <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">
                        {snippet.title}
                      </h2>

                      <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-500">
                        {snippet.language}
                      </span>

                      <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-500">
                        {snippet.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        copySnippet(snippet)
                      }
                      className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    >
                      {copiedId === snippet.id ? (
                        <>
                          <Check size={15} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          Copy
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        deleteSnippet(snippet.id)
                      }
                      className="flex items-center gap-2 text-sm text-zinc-600 transition hover:text-red-400"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>

                <pre className="max-h-96 overflow-auto bg-zinc-950 p-5 font-mono text-sm leading-6 text-zinc-300">
                  {snippet.code}
                </pre>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
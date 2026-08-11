    "use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Regex as RegexIcon } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  function testRegex() {
    setError("");
    setMatches([]);

    if (!pattern) {
      setError("Please enter a regular expression.");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);

      const foundMatches = text.match(regex);

      if (foundMatches) {
        setMatches(foundMatches);
      }
    } catch {
      setError("Invalid regular expression or flags.");
    }
  }

  function clearAll() {
    setPattern("");
    setFlags("g");
    setText("");
    setMatches([]);
    setError("");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
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
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">DevKit Tool</p>

          <h1 className="text-4xl font-bold">Regex Tester</h1>

          <p className="mt-3 text-zinc-400">
            Test regular expressions against your text.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Regex */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Regular Expression</h2>

              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Trash2 size={15} />
                Clear
              </button>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-1 items-center rounded-lg border border-zinc-800 bg-zinc-900 px-4">
                <span className="mr-2 text-zinc-600">/</span>

                <input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="\d+"
                  spellCheck={false}
                  className="w-full bg-transparent py-3 font-mono text-sm outline-none placeholder:text-zinc-600"
                />

                <span className="ml-2 text-zinc-600">/</span>
              </div>

              <input
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="g"
                spellCheck={false}
                className="w-20 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 font-mono text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to test..."
              spellCheck={false}
              className="mt-4 h-64 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm leading-6 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <button
              onClick={testRegex}
              className="mt-4 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <RegexIcon size={16} />
              Test Regex
            </button>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </div>

          {/* Results */}

          <div>
            <h2 className="mb-3 text-sm font-medium">Matches</h2>

            <div className="min-h-64 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              {matches.length > 0 ? (
                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <div
                      key={`${match}-${index}`}
                      className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-zinc-300"
                    >
                      <span className="mr-3 text-zinc-600">{index + 1}</span>

                      {match}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-600">
                  Matches will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

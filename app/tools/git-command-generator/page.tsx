"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Trash2,
  Sparkles,
  Terminal,
  Check,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

import RecentToolTracker from "@/components/RecentToolTracker";
import TrackToolUsage from "@/components/TrackToolUsage";
import ShareButton from "@/components/ShareButton";

import { gitCategories, gitCommands, getCommandsByCategory, generateCommand, getExample } from "@/shared/gitCommand";

type Category = typeof gitCategories[number];

export default function GitCommandGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [generatedCommand, setGeneratedCommand] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // Load initial example
  useEffect(() => {
    const example = getExample();
    setSelectedCommand(example.command.id);
    setSelectedFlags(example.flags);
    setVariableValues(example.variables);
  }, []);

  // Generate command when selections change
  useEffect(() => {
    if (!selectedCommand) return;

    const cmd = gitCommands.find((c) => c.id === selectedCommand);
    if (cmd) {
      const command = generateCommand(cmd.command, selectedFlags, variableValues);
      setGeneratedCommand(command);
    }
  }, [selectedCommand, selectedFlags, variableValues]);

  const filteredCommands = gitCommands.filter((cmd) => {
    const matchesCategory = selectedCategory === "All" || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCmdDetails = gitCommands.find((c) => c.id === selectedCommand);

  function toggleFlag(flag: string) {
    setSelectedFlags((prev) =>
      prev.includes(flag)
        ? prev.filter((f) => f !== flag)
        : [...prev, flag]
    );
  }

  function handleVariableChange(name: string, value: string) {
    setVariableValues((prev) => ({ ...prev, [name]: value }));
  }

  function clearAll() {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedCommand(null);
    setSelectedFlags([]);
    setVariableValues({});
    setGeneratedCommand("");
    setError("");
    setCopied(false);
  }

  function loadExample() {
    const example = getExample();
    setSelectedCommand(example.command.id);
    setSelectedFlags(example.flags);
    setVariableValues(example.variables);
    setError("");
  }

  async function copyOutput() {
    if (!generatedCommand) return;

    const ok = await copyToClipboard(generatedCommand, setError);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  function getCategoryCommands(category: Category) {
    const commands = getCommandsByCategory(category);
    return commands.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
    }));
  }

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage
        toolName="Git Command Generator"
        toolHref="/tools/git-command-generator"
        category="Version Control"
      />

      <RecentToolTracker
        name="Git Command Generator"
        href="/tools/git-command-generator"
      />

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Terminal size={20} />
            </div>
            <p className="text-sm text-zinc-500">DevKit Tool</p>
          </div>

          <h1 className="text-4xl font-bold">Git Command Generator</h1>

          <p className="mt-3 text-zinc-400">
            Generate the perfect git command with flags and options. No more memorizing!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar - Command Selection */}
          <div className="lg:col-span-4">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search git commands..."
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Categories (mobile dropdown) */}
            <div className="mb-4 lg:hidden">
              <button
                type="button"
                onClick={() => setShowCategories(!showCategories)}
                className="flex h-10 w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm"
              >
                <span>{selectedCategory === "All" ? "All Categories" : selectedCategory}</span>
                <ChevronDown size={16} className={showCategories ? "rotate-180" : ""} />
              </button>
              {showCategories && (
                <div className="mt-2 space-y-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
                  <button
                    type="button"
                    onClick={() => { setSelectedCategory("All"); setShowCategories(false); }}
                    className={`block w-full rounded px-3 py-2 text-left text-sm ${selectedCategory === "All" ? "bg-violet-600/20 text-violet-300" : "text-zinc-300 hover:bg-zinc-800"}`}
                  >
                    All Categories
                  </button>
                  {gitCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setSelectedCategory(cat); setShowCategories(false); }}
                      className={`block w-full rounded px-3 py-2 text-left text-sm ${selectedCategory === cat ? "bg-violet-600/20 text-violet-300" : "text-zinc-300 hover:bg-zinc-800"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Categories (desktop sidebar) */}
            <div className="hidden lg:block">
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                Categories
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    selectedCategory === "All"
                      ? "bg-violet-600/20 text-violet-300"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-xs text-zinc-600">{gitCommands.length}</span>
                </button>
                {gitCategories.map((cat) => {
                  const count = getCommandsByCategory(cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                        selectedCategory === cat
                          ? "bg-violet-600/20 text-violet-300"
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-xs text-zinc-600">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Commands List */}
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-medium">
                  {selectedCategory === "All" ? "All Commands" : `${selectedCategory} Commands`}
                </h2>
                <span className="text-xs text-zinc-500">{filteredCommands.length}</span>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-zinc-500">No commands found</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-zinc-800">
                    {filteredCommands.map((cmd) => (
                      <li key={cmd.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedCommand(cmd.id)}
                          className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-zinc-800/50 ${
                            selectedCommand === cmd.id
                              ? "bg-violet-600/10"
                              : ""
                          }`}
                        >
                          <span className="font-medium text-zinc-200">{cmd.name}</span>
                          <span className="text-xs text-zinc-500">{cmd.description}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Command Builder */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              {!selectedCommand ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
                    <Terminal size={32} className="text-zinc-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Select a command</h3>
                  <p className="mt-2 max-w-sm text-sm text-zinc-500">
                    Choose a command from the sidebar to build it with your preferred options.
                  </p>
                </div>
              ) : (
                <>
                  {/* Command Info */}
                  {selectedCmdDetails && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{selectedCmdDetails.name}</h2>
                        <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
                          {selectedCmdDetails.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-500">{selectedCmdDetails.description}</p>
                    </div>
                  )}

                  {/* Flags */}
                  {selectedCmdDetails?.flags && selectedCmdDetails.flags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-sm font-medium">Flags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCmdDetails.flags.map((flag) => (
                          <button
                            key={flag}
                            type="button"
                            onClick={() => toggleFlag(flag)}
                            className={`rounded-lg border px-4 py-2 text-sm font-mono transition ${
                              selectedFlags.includes(flag)
                                ? "border-violet-600 bg-violet-600/20 text-violet-300"
                                : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            <span className="mr-1 text-violet-500">-</span>
                            {flag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variables */}
                  {selectedCmdDetails?.variables && selectedCmdDetails.variables.length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-sm font-medium">Variables</h3>
                      <div className="space-y-3">
                        {selectedCmdDetails.variables.map((v) => (
                          <div key={v.name}>
                            <label className="mb-1 block text-xs text-zinc-500">
                              {v.description}
                            </label>
                            <input
                              type="text"
                              value={variableValues[v.name] || ""}
                              onChange={(e) => handleVariableChange(v.name, e.target.value)}
                              placeholder={v.placeholder || v.name}
                              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generated Command */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium">Generated Command</h3>
                    <div className="relative rounded-lg border border-zinc-800 bg-zinc-950">
                      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500/20" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                            <div className="h-3 w-3 rounded-full bg-green-500/20" />
                          </div>
                          <span className="text-xs text-zinc-500">git</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={loadExample}
                            className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
                          >
                            <Sparkles size={14} />
                            Example
                          </button>
                          <button
                            type="button"
                            onClick={clearAll}
                            className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
                          >
                            <Trash2 size={14} />
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-2 font-mono text-sm">
                          <span className="text-violet-400">git</span>
                          <span className="text-zinc-300">{generatedCommand.replace("git ", "")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={copyOutput}
                      disabled={!generatedCommand}
                      className="flex-1 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {copied ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check size={16} /> Copied!
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Copy size={16} /> Copy Command
                        </span>
                      )}
                    </button>
                  </div>

                  {error && (
                    <p className="mt-4 text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
              <h3 className="text-sm font-medium">Common Git Workflows</h3>
              <div className="mt-3 space-y-3">
                <WorkflowItem
                  title="Start a new project"
                  command="git init"
                />
                <WorkflowItem
                  title="Clone and start working"
                  command="git clone <url>"
                  hint="Then run: git checkout -b feature/your-feature"
                />
                <WorkflowItem
                  title="Make changes and commit"
                  command="git add .\n git commit -m 'Your message'"
                  hint="Use: git status to see what files to add"
                />
                <WorkflowItem
                  title="Push to remote"
                  command="git push -u origin main"
                  hint="Use -u to set upstream for future pushes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function WorkflowItem({ title, command, hint }: { title: string; command: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
      <div className="mb-1.5 font-medium text-zinc-300">{title}</div>
      <div className="mb-1.5 font-mono text-xs text-zinc-400">
        {command.split("\n").map((line, i) => (
          <div key={i}>
            <span className="text-violet-500">git</span> {line.trim()}
          </div>
        ))}
      </div>
      {hint && <div className="text-xs text-zinc-600">{hint}</div>}
    </div>
  );
}

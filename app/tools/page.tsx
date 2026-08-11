
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { Search } from "lucide-react";

export default function ToolsPage() {
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter((tool) => {
    const query = search.toLowerCase();

    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tools
          </p>

          <h1 className="text-4xl font-bold">
            Developer Tools
          </h1>

          <p className="mt-3 text-zinc-400">
            Useful tools for everyday development.
          </p>
        </div>

        {/* Search */}

        <div className="relative mb-8 max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search developer tools..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
          />
        </div>

        {/* Tools */}

        {filteredTools.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-10 text-center">
            <p className="text-sm text-zinc-500">
              No tools found.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

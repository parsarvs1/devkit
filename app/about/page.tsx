import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="mb-3 text-sm text-zinc-500">
          About DevKit
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Developer tools, without the clutter.
        </h1>

        <p className="mt-6 leading-8 text-zinc-400">
          DevKit is an open-source collection of simple,
          fast and useful tools built for developers.
        </p>

        <p className="mt-4 leading-8 text-zinc-400">
          The goal is simple: provide the tools developers
          use every day in one clean and accessible place.
        </p>

        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-lg font-semibold">
            Built with
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "React",
              "Tailwind CSS",
              "Lucide React",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

export default function ToolCard({
  name,
  description,
  icon: Icon,
  href,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 transition group-hover:text-white">
        <Icon size={20} />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            {name}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {description}
          </p>
        </div>

        <ArrowUpRight
          size={18}
          className="shrink-0 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-300"
        />
      </div>
    </Link>
  );
}
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import FavoriteButton from "./FavoriteButton";
import RecentToolLink from "./RecentToolLink";

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
    <article className="group relative rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
          <Icon
            size={19}
            className="text-zinc-300"
          />
        </div>

        <FavoriteButton toolName={name} />
      </div>

      <RecentToolLink
        name={name}
        href={href}
        className="block"
      >
        <div className="mt-5">
          <h3 className="font-semibold text-white">
            {name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {description}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-zinc-600 transition group-hover:text-zinc-300">
          Open tool
          <ArrowUpRight size={15} />
        </div>
      </RecentToolLink>
    </article>
  );
}
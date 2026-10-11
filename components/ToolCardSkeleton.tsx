/**
 * Skeleton placeholder matching the shape of a tool card.
 *
 * Shown while pin/recent data is hydrating from localStorage,
 * so the layout does not flash an empty state or jump.
 */
export default function ToolCardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 sm:p-6 ${className}`}
    >
      {/* Top row: icon + pin */}

      <div className="flex items-start justify-between gap-4">
        <div className="h-11 w-11 rounded-xl border border-zinc-800 bg-zinc-800/60" />

        <div className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />

          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />
        </div>
      </div>

      {/* Content: name + description */}

      <div className="mt-5 space-y-2.5">
        <div className="h-4 w-2/5 rounded bg-zinc-800/60" />

        <div className="h-3 w-full rounded bg-zinc-800/40" />

        <div className="h-3 w-3/4 rounded bg-zinc-800/40" />
      </div>

      {/* Bottom */}

      <div className="mt-5 h-3 w-1/4 rounded bg-zinc-800/40" />
    </div>
  );
}

/**
 * Skeleton matching the shape of a history/recent list row:
 * icon on the left, title + timestamp stacked on the right,
 * action buttons on the far right.
 */
export function ToolRowSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}

        <div className="h-10 w-10 shrink-0 rounded-lg border border-zinc-800 bg-zinc-800/60" />

        {/* Title + timestamp */}

        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-2/5 rounded bg-zinc-800/60" />

          <div className="h-2.5 w-1/4 rounded bg-zinc-800/40" />
        </div>

        {/* Actions */}

        <div className="flex shrink-0 items-center gap-1">
          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />

          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />
        </div>
      </div>
    </div>
  );
}

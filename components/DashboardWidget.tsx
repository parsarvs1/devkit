"use client";

import { ReactNode } from "react";

interface DashboardWidgetProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  value?: string | number;
  children?: ReactNode;
  className?: string;
}

export default function DashboardWidget({
  title,
  description,
  icon,
  value,
  children,
  className = "",
}: DashboardWidgetProps) {
  return (
    <section
      className={`rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-700 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400">
              {icon}
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-zinc-200">
              {title}
            </h3>

            {description && (
              <p className="mt-1 text-xs text-zinc-600">
                {description}
              </p>
            )}
          </div>
        </div>

        {value !== undefined && (
          <span className="text-xl font-semibold text-white">
            {value}
          </span>
        )}
      </div>

      {children && (
        <div className="mt-5">
          {children}
        </div>
      )}
    </section>
  );
}
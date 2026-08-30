"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface RecentToolLinkProps {
  name: string;
  href: string;
  children: ReactNode;
  className?: string;
}

export default function RecentToolLink({
  name,
  href,
  children,
  className,
}: RecentToolLinkProps) {
  function handleClick() {
    const key = "devkit-recent-tools";

    const saved = localStorage.getItem(key);

    let recentTools: {
      name: string;
      href: string;
    }[] = [];

    if (saved) {
      try {
        recentTools = JSON.parse(saved);
      } catch {
        recentTools = [];
      }
    }

    recentTools = recentTools.filter(
      (tool) => tool.href !== href
    );

    recentTools.unshift({
      name,
      href,
    });

    recentTools = recentTools.slice(0, 5);

    localStorage.setItem(
      key,
      JSON.stringify(recentTools)
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
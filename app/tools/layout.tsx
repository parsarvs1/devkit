import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse the full collection of free online developer tools — JSON, JWT, Base64, hashes, UUIDs, regex, timestamps, colors and more.",
  alternates: { canonical: "/tools" },
};

/*
 * NOTE: This layout only wraps the /tools listing page.
 *
 * Individual tool routes get their own layout.tsx with
 * metadata generated from data/tools.ts.
 */

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

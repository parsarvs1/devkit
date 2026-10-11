import type { Metadata } from "next";

import RelatedTools from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse the full collection of free online developer tools — JSON, JWT, Base64, hashes, UUIDs, regex, timestamps, colors and more.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* Related tools — renders only on individual tool pages */}

      <RelatedTools />
    </>
  );
}

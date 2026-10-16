import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Git Diff Viewer",
  description: "Parse and visualize git diffs with a beautiful, easy-to-read interface. See additions, deletions, and changes clearly.",
  alternates: { canonical: "/tools/git-diff-viewer" },
};

export default function GitDiffViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="git-diff-viewer" />
    </>
  );
}

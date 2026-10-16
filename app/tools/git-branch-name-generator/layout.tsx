import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Git Branch Name Generator",
  description: "Generate clean, consistent git branch names from your task description.",
  alternates: { canonical: "/tools/git-branch-name-generator" },
};

export default function GitBranchNameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="git-branch-name-generator" />
    </>
  );
}
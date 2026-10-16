import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Git Command Generator",
  description: "Generate git commands with flags and options. Build the perfect git command for your workflow.",
  alternates: { canonical: "/tools/git-command-generator" },
};

export default function GitCommandGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="git-command-generator" />
    </>
  );
}

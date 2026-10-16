import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: ".gitignore Generator",
  description: "Create a .gitignore file for your project with pre-built templates for Node.js, Python, Java, and more.",
  alternates: { canonical: "/tools/gitignore-generator" },
};

export default function GitignoreGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="gitignore-generator" />
    </>
  );
}

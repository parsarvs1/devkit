import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Character Counter",
  description: "Count characters, words, sentences, lines and paragraphs in your text.",
  alternates: { canonical: "/tools/character-counter" },
};

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="character-counter" />
    </>
  );
}
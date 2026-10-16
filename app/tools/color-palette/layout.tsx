import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

import { toolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = toolMetadata("color-palette");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="color-palette" />
    </>
  );
}

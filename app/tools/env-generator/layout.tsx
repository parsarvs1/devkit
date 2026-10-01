import type { Metadata } from "next";

import { toolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = toolMetadata("env-generator");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

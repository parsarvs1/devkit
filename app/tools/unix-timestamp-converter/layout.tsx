import type { Metadata } from "next";
import { toolMetadata } from "@/lib/toolMetadata";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = toolMetadata("unix-timestamp-converter");

export default function L({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolJsonLd slug="unix-timestamp-converter" /></>;
}

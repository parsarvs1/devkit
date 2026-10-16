import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "CIDR Calculator",
  description: "Calculate network details, broadcast address, and host ranges from a CIDR block.",
  alternates: { canonical: "/tools/cidr-calculator" },
};

export default function CidrCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToolJsonLd slug="cidr-calculator" />
    </>
  );
}
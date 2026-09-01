import type { Metadata } from "next";
import "./globals.css";

import SessionProvider from "@/components/SessionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import CommandPalette from "@/components/CommandPalette";
import ToolUsageTracker from "@/components/ToolUsageTracker";

export const metadata: Metadata = {
  title: "DevKit",
  description: "Developer tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <ToolUsageTracker/>
            <CommandPalette />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
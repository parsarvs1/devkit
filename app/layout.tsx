import type { Metadata } from "next";
import "./globals.css";

import SessionProvider from "@/components/SessionProvider";

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
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
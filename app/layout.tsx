import type { Metadata, Viewport } from "next";
import "./globals.css";

import SessionProvider from "@/components/SessionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import CommandPalette from "@/components/CommandPalette";
import ToolUsageTracker from "@/components/ToolUsageTracker";

const SITE_URL =
  "https://devkit.pars-paris1.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DevKit — Free Online Developer Tools",
    template: "%s · DevKit",
  },
  description:
    "Free, fast and privacy-friendly developer tools. Format JSON, decode JWTs, generate hashes and UUIDs, test regex and more — right in your browser.",
  applicationName: "DevKit",
  generator: "Next.js",
  keywords: [
    "developer tools",
    "json formatter",
    "jwt decoder",
    "uuid generator",
    "regex tester",
    "base64 encoder",
    "hash generator",
    "url encoder",
    "timestamp converter",
    "color converter",
    "password generator",
    "markdown previewer",
    "web developer utilities",
    "online dev tools",
  ],
  authors: [{ name: "Parsa Ravasha" }],
  creator: "Parsa Ravasha",
  publisher: "Parsa Ravasha",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DevKit",
    title: "DevKit — Free Online Developer Tools",
    description:
      "Format JSON, decode JWTs, generate hashes, test regex and more. Fast, free and privacy-friendly developer tools in your browser.",
    images: [
      {
        url: "/screenshots/devkit-home.png",
        width: 1200,
        height: 630,
        alt: "DevKit — Free Online Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevKit — Free Online Developer Tools",
    description:
      "Format JSON, decode JWTs, generate hashes, test regex and more. Fast, free and privacy-friendly developer tools in your browser.",
    images: ["/screenshots/devkit-home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  category: "developer tools",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
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
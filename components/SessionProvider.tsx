"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import ThemeProvider from "@/components/ThemeProvider";

interface SessionProviderProps {
  children: React.ReactNode;
}

export default function SessionProvider({
  children,
}: SessionProviderProps) {
  return (
    <ThemeProvider>
      <NextAuthSessionProvider>
        {children}
      </NextAuthSessionProvider>
    </ThemeProvider>
  );
}
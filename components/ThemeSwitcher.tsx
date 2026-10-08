"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.add(prefersDark ? "dark" : "light");
    root.style.colorScheme = prefersDark ? "dark" : "light";

    return;
  }

  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("devkit-theme");

    const initialTheme: Theme =
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
        ? savedTheme
        : "dark";

    // Theme is hydrated from localStorage once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("devkit-theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      applyTheme("system");
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme, mounted]);

  function setTheme(theme: Theme) {
    setThemeState(theme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
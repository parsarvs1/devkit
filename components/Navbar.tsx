"use client";

import Link from "next/link";

import {
  Code2,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Sun,
  Moon,
  Monitor,
  Check,
  Menu,
  X,
  Search,
  Download,
} from "lucide-react";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { openCommandPalette } from "@/lib/openCommandPalette";
import { usePWAInstall } from "@/components/InstallPrompt";

type Theme = "light" | "dark" | "system";

export default function Navbar() {
  const { data: session, status } = useSession();

  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  const isLoggedIn = status === "authenticated";
  const { canInstall, install } = usePWAInstall();

  

  useEffect(() => {
    if (!open && !themeOpen && !mobileOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setThemeOpen(false);
        setMobileOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setThemeOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener(
      "mousedown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "mousedown",
        handlePointerDown,
      );
    };
  }, [open, themeOpen, mobileOpen]);

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);
    setThemeOpen(false);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setThemeOpen(false);
    setOpen(false);
  }

  function getThemeIcon() {
    if (theme === "light") {
      return <Sun size={17} />;
    }

    if (theme === "dark") {
      return <Moon size={17} />;
    }

    return <Monitor size={17} />;
  }

  return (
    <nav ref={navRef} className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

      

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 text-white"
        >
          <Code2 size={21} />

          <span className="text-lg font-semibold">
            DevKit
          </span>
        </Link>

        

        <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">


          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Search DevKit (Ctrl+K)"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            <Search size={17} />
          </button>

         

          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

         

          <Link
            href="/tools"
            className="transition hover:text-white"
          >
            Tools
          </Link>

        

          <Link
            href="/about"
            className="transition hover:text-white"
          >
            About
          </Link>

        

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeOpen((value) => !value);
                setOpen(false);
              }}
              aria-label="Change theme"
              aria-expanded={themeOpen}
              aria-haspopup="menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              {getThemeIcon()}
            </button>

            {themeOpen && (
              <div
                role="menu"
                aria-label="Theme options"
                className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-2xl"
              >

             

                <button
                  type="button"
                  onClick={() => changeTheme("light")}
                  role="menuitemradio"
                  aria-checked={theme === "light"}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Sun size={16} />
                    Light
                  </span>

                  {theme === "light" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

              

                <button
                  type="button"
                  onClick={() => changeTheme("dark")}
                  role="menuitemradio"
                  aria-checked={theme === "dark"}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Moon size={16} />
                    Dark
                  </span>

                  {theme === "dark" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

              
                <button
                  type="button"
                  onClick={() => changeTheme("system")}
                  role="menuitemradio"
                  aria-checked={theme === "system"}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Monitor size={16} />
                    System
                  </span>

                  {theme === "system" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>
              </div>
            )}
          </div>

         

          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-900" />
          ) : isLoggedIn ? (
            <div className="relative">

            

              <button
                type="button"
                onClick={() => {
                  setOpen((value) => !value);
                  setThemeOpen(false);
                }}
                aria-label="Account menu"
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800">
                  <User size={14} />
                </div>

                <span>
                  {session?.user?.name || "Account"}
                </span>

                <span className="text-xs text-zinc-500">
                  ▼
                </span>
              </button>

            

              {open && (
              <div
                role="menu"
                aria-label="Account menu"
                className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
              >

                

                  <div className="border-b border-zinc-800 px-4 py-3">
                    <p className="truncate text-sm font-medium text-white">
                      {session?.user?.name || "DevKit User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div className="p-1">

                   

                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <LayoutDashboard size={16} />

                      Dashboard
                    </Link>

                  

                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Settings size={16} />

                      Settings
                    </Link>
                  </div>

                

                  <div className="border-t border-zinc-800 p-1">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
                    >
                      <LogOut size={16} />

                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Sign in
            </Link>
          )}

          {canInstall && (
            <button
              type="button"
              onClick={install}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
            >
              <Download size={15} />
              Install App
            </button>
          )}
        </div>

       

        <div className="flex items-center gap-2 md:hidden">

          

          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Search DevKit (Ctrl+K)"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            <Search size={17} />
          </button>

         

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeOpen((value) => !value);
                setMobileOpen(false);
              }}
              aria-label="Change theme"
              aria-expanded={themeOpen}
              aria-haspopup="menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              {getThemeIcon()}
            </button>

            {themeOpen && (
              <div
                role="menu"
                aria-label="Theme options"
                className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-2xl"
              >

              
                <button
                  type="button"
                  onClick={() => changeTheme("light")}
                  role="menuitemradio"
                  aria-checked={theme === "light"}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Sun size={16} />
                    Light
                  </span>

                  {theme === "light" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

              

                <button
                  type="button"
                  onClick={() => changeTheme("dark")}
                  role="menuitemradio"
                  aria-checked={theme === "dark"}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Moon size={16} />
                    Dark
                  </span>

                  {theme === "dark" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

                

                <button
                  type="button"
                  onClick={() => changeTheme("system")}
                  role="menuitemradio"
                  aria-checked={theme === "system"}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Monitor size={16} />
                    System
                  </span>

                  {theme === "system" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>
              </div>
            )}
          </div>

         
          <button
            type="button"
            onClick={() => {
              setMobileOpen((value) => !value);
              setThemeOpen(false);
            }}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </div>

     

      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">

           

            <div className="space-y-1">

              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/tools"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                Tools
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                About
              </Link>
            </div>

           
            <div className="my-3 border-t border-zinc-800" />

           
            {status === "loading" ? (
              <div className="h-10 animate-pulse rounded-lg bg-zinc-900" />
            ) : isLoggedIn ? (
              <div className="space-y-1">

                

                <div className="mb-2 rounded-lg bg-zinc-900 px-3 py-3">
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                      <User size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {session?.user?.name || "DevKit User"}
                      </p>

                      <p className="truncate text-xs text-zinc-500">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                

                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                >
                  <LayoutDashboard size={17} />

                  Dashboard
                </Link>

               

                <Link
                  href="/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                >
                  <Settings size={17} />

                  Settings
                </Link>

                

                <button
                  type="button"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
                >
                  <LogOut size={17} />

                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
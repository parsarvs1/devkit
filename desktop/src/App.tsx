import { useEffect, useState } from "react";

import "./App.css";
import type { Tool } from "./types";
import DesktopShell from "./DesktopShell";
import CommandPalette from "./CommandPalette";
import ThemeToggle from "./ThemeToggle";
import AuthScreen from "./AuthScreen";

import JsonFormatter from "./tools/JsonFormatter";
import JwtDecoder from "./tools/JwtDecoder";
import UuidGenerator from "./tools/UuidGenerator";
import RegexTester from "./tools/RegexTester";
import Base64 from "./tools/Base64";
import Timestamp from "./tools/Timestamp";
import ColorConverter from "./tools/ColorConverter";
import HashGenerator from "./tools/HashGenerator";
import HashCompare from "./tools/HashCompare";
import UrlEncoder from "./tools/UrlEncoder";

import {
  Braces,
  Clock3,
  Code2,
  Fingerprint,
  GitCompare,
  Hash,
  Link,
  Palette,
  Regex,
  Shield,
} from "lucide-react";

type ToolCard = {
  id: Exclude<Tool, "home">;
  name: string;
  description: string;
  icon: React.ReactNode;
};

type User = {
  name: string;
  email: string;
};

type AuthMode = "login" | "signup";

const tools: ToolCard[] = [
  {
    id: "json",
    name: "JSON Formatter",
    description: "Format and minify JSON with ease.",
    icon: <Braces size={20} />,
  },

  {
    id: "jwt",
    name: "JWT Decoder",
    description:
      "Decode JWT tokens and inspect their payload.",
    icon: <Shield size={20} />,
  },

  {
    id: "uuid",
    name: "UUID Generator",
    description:
      "Generate unique UUIDs instantly.",
    icon: <Fingerprint size={20} />,
  },

  {
    id: "regex",
    name: "Regex Tester",
    description:
      "Test regular expressions against text.",
    icon: <Regex size={20} />,
  },

  {
    id: "base64",
    name: "Base64",
    description:
      "Encode and decode Base64 strings.",
    icon: <Code2 size={20} />,
  },

  {
    id: "timestamp",
    name: "Timestamp",
    description:
      "Convert Unix timestamps and dates.",
    icon: <Clock3 size={20} />,
  },

  {
    id: "color",
    name: "Color Converter",
    description:
      "Convert HEX colors to RGB and HSL.",
    icon: <Palette size={20} />,
  },

  {
    id: "hash",
    name: "Hash Generator",
    description:
      "Generate SHA hashes from text instantly.",
    icon: <Hash size={20} />,
  },

  {
    id: "hash-compare",
    name: "Hash Compare",
    description:
      "Compare hashes and verify text integrity.",
    icon: <GitCompare size={20} />,
  },

  {
    id: "url",
    name: "URL Encoder",
    description:
      "Encode and decode URLs and query parameters.",
    icon: <Link size={20} />,
  },
];

export default function App() {
  const [activeTool, setActiveTool] =
    useState<Tool>("home");

  const [commandPaletteOpen, setCommandPaletteOpen] =
    useState(false);

  const [authScreen, setAuthScreen] =
    useState<AuthMode | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  /*
   * ======================================================
   * LOAD SAVED USER
   * ======================================================
   */

  useEffect(() => {
    try {
      const savedUser =
        localStorage.getItem("devkit-user");

      if (!savedUser) {
        return;
      }

      const parsedUser = JSON.parse(
        savedUser
      ) as User;

      if (
        parsedUser &&
        typeof parsedUser.name === "string" &&
        typeof parsedUser.email === "string"
      ) {
        setUser(parsedUser);
      }
    } catch {
      localStorage.removeItem("devkit-user");
    }
  }, []);

  /*
   * ======================================================
   * OPEN TOOL
   * ======================================================
   */

  function openTool(tool: Tool) {
    setActiveTool(tool);
    setCommandPaletteOpen(false);
  }

  /*
   * ======================================================
   * GO HOME
   * ======================================================
   */

  function goHome() {
    setActiveTool("home");
  }

  /*
   * ======================================================
   * COMMAND PALETTE
   * ======================================================
   */

  useEffect(() => {
    function handleKeyboard(
      event: KeyboardEvent
    ) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setCommandPaletteOpen(
          (current) => !current
        );
      }

      if (
        event.key === "Escape" &&
        commandPaletteOpen
      ) {
        setCommandPaletteOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [commandPaletteOpen]);

  /*
   * ======================================================
   * AUTH
   * ======================================================
   */

  function openLogin() {
    setAuthScreen("login");
  }

  function openSignup() {
    setAuthScreen("signup");
  }

  function closeAuth() {
    setAuthScreen(null);
  }

  function handleAuthSuccess(
    loggedInUser: User
  ) {
    setUser(loggedInUser);

    localStorage.setItem(
      "devkit-user",
      JSON.stringify(loggedInUser)
    );

    setAuthScreen(null);
  }

  function handleLogout() {
    setUser(null);

    localStorage.removeItem(
      "devkit-user"
    );

    setActiveTool("home");
  }

  /*
   * ======================================================
   * AUTH SCREEN
   * ======================================================
   */

  if (authScreen) {
    return (
      <AuthScreen
        mode={authScreen}
        onBack={closeAuth}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  /*
   * ======================================================
   * RENDER ACTIVE TOOL
   * ======================================================
   */

  function renderTool() {
    switch (activeTool) {
      case "json":
        return <JsonFormatter />;

      case "jwt":
        return (
          <JwtDecoder
            onBack={goHome}
          />
        );

      case "uuid":
        return <UuidGenerator />;

      case "regex":
        return (
          <RegexTester
            onBack={goHome}
          />
        );

      case "base64":
        return <Base64 />;

      case "timestamp":
        return <Timestamp />;

      case "color":
        return <ColorConverter />;

      case "hash":
        return <HashGenerator />;

      case "hash-compare":
        return <HashCompare />;

      case "url":
        return <UrlEncoder />;

      case "home":
      default:
        return (
          <Dashboard
            onOpenTool={openTool}
          />
        );
    }
  }

  /*
   * ======================================================
   * APP
   * ======================================================
   */

  return (
    <>
      <DesktopShell
        activeTool={activeTool}
        onSelectTool={openTool}
        onCommandPalette={() =>
          setCommandPaletteOpen(true)
        }
        user={user}
        onLogin={openLogin}
        onSignup={openSignup}
        onLogout={handleLogout}
      >
        {renderTool()}
      </DesktopShell>

      <CommandPalette
        open={commandPaletteOpen}
        onClose={() =>
          setCommandPaletteOpen(false)
        }
        onSelect={(tool) => {
          openTool(tool as Tool);
        }}
      />
    </>
  );
}

/*
 * ========================================================
 * DASHBOARD
 * ========================================================
 */

type DashboardProps = {
  onOpenTool: (tool: Tool) => void;
};

function Dashboard({
  onOpenTool,
}: DashboardProps) {
  return (
    <div className="desktop-dashboard">
      {/* HEADER */}

      <section className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            <span className="status-dot" />

            DEVELOPER TOOLKIT
          </div>

          <h1>
            Build faster.
            <br />

            <span>
              Work smarter.
            </span>
          </h1>

          <p>
            A powerful collection of developer
            tools built for everyday development.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <ThemeToggle />
        </div>
      </section>

      {/* TOOLS */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <span className="section-label">
              TOOLS
            </span>

            <h2>
              Developer Utilities
            </h2>
          </div>

          <span className="tool-count">
            {tools.length} tools
          </span>
        </div>

        <div className="desktop-tools-grid">
          {tools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              className="tool-card"
              onClick={() =>
                onOpenTool(tool.id)
              }
            >
              <div className="tool-card-icon">
                {tool.icon}
              </div>

              <div className="tool-card-content">
                <h3>
                  {tool.name}
                </h3>

                <p>
                  {tool.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="desktop-footer">
        <div>
          <Code2 size={16} />

          <span>
            DevKit
          </span>
        </div>

        <span>
          Developer tools for everyday work.
        </span>
      </footer>
    </div>
  );
}
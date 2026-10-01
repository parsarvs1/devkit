import { useEffect, useState } from "react";

import "./App.css";

import AuthScreen from "./AuthScreen";
import CommandPalette from "./CommandPalette";
import DesktopShell from "./DesktopShell";
import Favorites from "./Favorites";
import Home from "./Home";
import Profile from "./Profile";
import SettingsPage from "./Settings";

import Base64 from "./tools/Base64";
import ColorConverter from "./tools/ColorConverter";
import HashCompare from "./tools/HashCompare";
import HashGenerator from "./tools/HashGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import JwtDecoder from "./tools/JwtDecoder";
import LoremIpsum from "./tools/LoremIpsum";
import MarkdownFormatter from "./tools/MarkdownFormatter";
import RegexTester from "./tools/RegexTester";
import Timestamp from "./tools/Timestamp";
import UrlEncoder from "./tools/UrlEncoder";
import UuidGenerator from "./tools/UuidGenerator";

import type { RecentTool, Tool, User } from "./types";

/* =========================================
   TOOL INFO
========================================= */

const TOOL_INFO: Record<
  string,
  {
    name: string;
    description: string;
  }
> = {
  json: {
    name: "JSON Formatter",
    description: "Format and validate JSON",
  },

  jwt: {
    name: "JWT Decoder",
    description: "Decode JWT tokens",
  },

  uuid: {
    name: "UUID Generator",
    description: "Generate UUIDs",
  },

  regex: {
    name: "Regex Tester",
    description: "Test regular expressions",
  },

  base64: {
    name: "Base64 Encoder",
    description: "Encode and decode Base64",
  },

  timestamp: {
    name: "Timestamp",
    description: "Convert timestamps",
  },

  color: {
    name: "Color Converter",
    description: "Convert colors",
  },

  hash: {
    name: "Hash Generator",
    description: "Generate hashes",
  },

  "hash-compare": {
    name: "Hash Compare",
    description: "Compare hashes",
  },

  url: {
    name: "URL Encoder",
    description: "Encode and decode URLs",
  },
  lorem: {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
  },

  markdown: {
    name: "Markdown Formatter",
    description: "Format and validate Markdown text",
  },
};

/* =========================================
   APP
========================================= */

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool>("home");

  const [user, setUser] = useState<User | null>(null);

  const [authOpen, setAuthOpen] = useState(false);

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const [commandPaletteEnabled, setCommandPaletteEnabled] = useState(true);

  const [profileOpen, setProfileOpen] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  /* =========================================
     LOAD RECENT TOOLS
  ========================================= */

  useEffect(() => {
    const savedUser = localStorage.getItem("devkit-user");

    if (!savedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

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

  /* =========================================
     LOAD COMMAND PALETTE SETTING
  ========================================= */

  useEffect(() => {
    const loadCommandPaletteSetting = () => {
      const saved = localStorage.getItem("devkit-command-palette");

      setCommandPaletteEnabled(saved === null ? true : saved === "true");
    };

    loadCommandPaletteSetting();

    window.addEventListener(
      "devkit-settings-change",
      loadCommandPaletteSetting,
    );

    return () => {
      window.removeEventListener(
        "devkit-settings-change",
        loadCommandPaletteSetting,
      );
    };
  }, []);

  /* =========================================
     OPEN TOOL
  ========================================= */

  const openTool = (tool: string) => {
    const nextTool = tool as Tool;

    setActiveTool(nextTool);

    setProfileOpen(false);
    setSettingsOpen(false);
    setFavoritesOpen(false);
    setAuthOpen(false);
    setCommandPaletteOpen(false);

    if (nextTool === "home") {
      return;
    }

    const info = TOOL_INFO[nextTool];

    if (!info) {
      return;
    }

    setRecentTools((current) => {
      const updated = [
        {
          id: nextTool,
          name: info.name,
          description: info.description,
        },
        ...current.filter((item) => item.id !== nextTool),
      ].slice(0, 5);

      localStorage.setItem("devkit-recent-tools", JSON.stringify(updated));

      return updated;
    });
  };

  /* =========================================
     LOGIN
  ========================================= */

  const openLogin = () => {
    setAuthMode("login");

    setAuthOpen(true);

    setProfileOpen(false);
    setSettingsOpen(false);
    setFavoritesOpen(false);
    setCommandPaletteOpen(false);
  };

  /* =========================================
     SIGN UP
  ========================================= */

  const openSignup = () => {
    setAuthMode("signup");

    setAuthOpen(true);

    setProfileOpen(false);
    setSettingsOpen(false);
    setFavoritesOpen(false);
    setCommandPaletteOpen(false);
  };

  /* =========================================
     AUTH SUCCESS
  ========================================= */

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);

    setAuthOpen(false);

    setAuthMode("login");
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("devkit-user");

    setUser(null);
    setProfileOpen(false);
    setSettingsOpen(false);
    setAuthOpen(false);
    setCommandPaletteOpen(false);
    setActiveTool("home");
  };

  /* =========================================
     PROFILE
  ========================================= */

  const openProfile = () => {
    if (!user) {
      openLogin();

      return;
    }

    setProfileOpen(true);

    setSettingsOpen(false);
    setFavoritesOpen(false);
    setAuthOpen(false);
    setCommandPaletteOpen(false);
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  /* =========================================
     SETTINGS
  ========================================= */

  const openSettings = () => {
    setSettingsOpen(true);

    setProfileOpen(false);
    setFavoritesOpen(false);
    setAuthOpen(false);
    setCommandPaletteOpen(false);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  /* =========================================
     FAVORITES
  ========================================= */

  const openFavorites = () => {
    setFavoritesOpen(true);

    setProfileOpen(false);
    setSettingsOpen(false);
    setAuthOpen(false);
    setCommandPaletteOpen(false);
  };

  const closeFavorites = () => {
    setFavoritesOpen(false);
  };

  /* =========================================
     COMMAND PALETTE
  ========================================= */

  const openCommandPalette = () => {
    if (!commandPaletteEnabled) {
      return;
    }

    setCommandPaletteOpen(true);
  };

  const closeCommandPalette = () => {
    setCommandPaletteOpen(false);
  };

  /* =========================================
     HOME COMMAND PALETTE EVENT
  ========================================= */

  useEffect(() => {
    const handleOpenCommandPalette = () => {
      openCommandPalette();
    };

    window.addEventListener(
      "devkit-open-command-palette",
      handleOpenCommandPalette,
    );

    return () => {
      window.removeEventListener(
        "devkit-open-command-palette",
        handleOpenCommandPalette,
      );
    };
  }, [commandPaletteEnabled]);

  /* =========================================
     RENDER TOOL
  ========================================= */

  const renderTool = () => {
    if (favoritesOpen) {
      return <Favorites onSelectTool={openTool} />;
    }

    if (settingsOpen) {
      return <SettingsPage onBack={closeSettings} />;
    }

    if (profileOpen && user) {
      return (
        <Profile
          user={user}
          onBack={closeProfile}
          onUpdateUser={handleUpdateUser}
        />
      );
    }

    switch (activeTool) {
      case "json":
        return <JsonFormatter />;

      case "jwt":
        return <JwtDecoder onBack={() => openTool("home")} />;

      case "uuid":
        return <UuidGenerator />;

      case "regex":
        return <RegexTester onBack={() => openTool("home")} />;

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
      case "lorem":
        return <LoremIpsum />;

      case "markdown":
        return <MarkdownFormatter />;

      case "home":

      default:
        return (
          <Home onSelectTool={openTool} user={user} recentTools={recentTools} />
        );
    }
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <>
      {authOpen ? (
        <AuthScreen
          mode={authMode}
          onBack={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      ) : (
        <>
          <DesktopShell
            activeTool={activeTool}
            onSelectTool={openTool}
            onCommandPalette={openCommandPalette}
            user={user}
            onLogin={openLogin}
            onSignup={openSignup}
            onLogout={handleLogout}
            onProfile={openProfile}
            onSettings={openSettings}
            onFavorites={openFavorites}
          >
            {renderTool()}
          </DesktopShell>

          <CommandPalette
            open={commandPaletteOpen}
            onClose={closeCommandPalette}
            onSelect={openTool}
          />
        </>
      )}
    </>
  );
}

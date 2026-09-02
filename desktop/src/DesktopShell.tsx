import { useState } from "react";
import type { Tool } from "./types";
import {
  Braces,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Command,
  FileKey2,
  GitCompare,
  Hash,
  Heart,
  Home,
  Link,
  LogIn,
  LogOut,
  Pipette,
  Regex,
  Settings,
  UserPlus,
} from "lucide-react";

type User = {
  name: string;
  email: string;
};

type DesktopShellProps = {
  activeTool: Tool;
  children: React.ReactNode;

  onSelectTool: (tool: Tool) => void;

  onCommandPalette: () => void;

  user: User | null;

  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
};

const toolItems: {
  id: Exclude<Tool, "home">;
  name: string;
  icon: React.ComponentType<{
    size?: number;
  }>;
}[] = [
  {
    id: "json",
    name: "JSON Formatter",
    icon: Braces,
  },
  {
    id: "jwt",
    name: "JWT Decoder",
    icon: FileKey2,
  },
  {
    id: "uuid",
    name: "UUID Generator",
    icon: Code2,
  },
  {
    id: "regex",
    name: "Regex Tester",
    icon: Regex,
  },
  {
    id: "base64",
    name: "Base64 Encoder",
    icon: Code2,
  },
  {
    id: "timestamp",
    name: "Timestamp",
    icon: CalendarClock,
  },
  {
    id: "color",
    name: "Color Converter",
    icon: Pipette,
  },
  {
    id: "hash",
    name: "Hash Generator",
    icon: Hash,
  },
  {
    id: "hash-compare",
    name: "Hash Compare",
    icon: GitCompare,
  },
  {
    id: "url",
    name: "URL Encoder",
    icon: Link,
  },
];

export default function DesktopShell({
  activeTool,
  children,
  onSelectTool,
  onCommandPalette,
  user,
  onLogin,
  onSignup,
  onLogout,
}: DesktopShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  const [toolsOpen, setToolsOpen] = useState(false);

  const [accountOpen, setAccountOpen] = useState(false);

  const activeToolItem = toolItems.find((tool) => tool.id === activeTool);

  const activeToolName = activeToolItem?.name ?? "Dashboard";

  const userInitial = user ? user.name.trim().charAt(0).toUpperCase() : "G";

  return (
    <div className="desktop-app">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`desktop-sidebar ${
          collapsed ? "desktop-sidebar-collapsed" : ""
        }`}
      >
        {/* BRAND */}

        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Code2 size={19} />
          </div>

          {!collapsed && (
            <div className="sidebar-brand-text">
              <strong>DevKit</strong>
              <span>Developer Toolkit</span>
            </div>
          )}
        </div>

        {/* MAIN NAV */}

        <div className="sidebar-section">
          {!collapsed && <div className="sidebar-section-label">WORKSPACE</div>}

          {/* DASHBOARD */}

          <button
            type="button"
            className={`sidebar-item ${
              activeTool === "home" ? "sidebar-item-active" : ""
            }`}
            onClick={() => {
              setToolsOpen(false);
              onSelectTool("home");
            }}
          >
            <span className="sidebar-item-icon">
              <Home size={17} />
            </span>

            {!collapsed && (
              <span className="sidebar-item-label">Dashboard</span>
            )}
          </button>

          {/* TOOLS */}

          <div
            className="sidebar-tools-menu"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className={`sidebar-item ${
                activeToolItem ? "sidebar-item-active" : ""
              }`}
              onClick={() => setToolsOpen((current) => !current)}
            >
              <span className="sidebar-item-icon">
                <Code2 size={17} />
              </span>

              {!collapsed && (
                <>
                  <span className="sidebar-item-label">Tools</span>

                  <ChevronDown
                    size={14}
                    className={
                      toolsOpen
                        ? "sidebar-tools-chevron-open"
                        : "sidebar-tools-chevron"
                    }
                  />
                </>
              )}
            </button>

            {/* TOOL DROPDOWN */}

            {!collapsed && toolsOpen && (
              <div className="sidebar-tools-dropdown">
                <div className="sidebar-tools-dropdown-header">
                  Developer Tools
                </div>

                {toolItems.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      className={`sidebar-tool-item ${
                        activeTool === tool.id ? "sidebar-tool-item-active" : ""
                      }`}
                      onClick={() => {
                        onSelectTool(tool.id);
                        setToolsOpen(false);
                      }}
                    >
                      <span>
                        <Icon size={15} />
                      </span>

                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* FAVORITES */}

          <button type="button" className="sidebar-item" onClick={() => {}}>
            <span className="sidebar-item-icon">
              <Heart size={17} />
            </span>

            {!collapsed && (
              <span className="sidebar-item-label">Favorites</span>
            )}
          </button>
        </div>

        {/* SCROLLABLE TOOL AREA */}

        <div className="sidebar-tools" />

        {/* SPACER */}

        <div className="sidebar-spacer" />

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="sidebar-bottom">
          {/* COMMAND PALETTE */}

          <button
            type="button"
            className="sidebar-item"
            onClick={onCommandPalette}
          >
            <span className="sidebar-item-icon">
              <Command size={17} />
            </span>

            {!collapsed && (
              <>
                <span className="sidebar-item-label">Command Palette</span>

                <kbd>Ctrl K</kbd>
              </>
            )}
          </button>

          {/* SETTINGS */}

          <button type="button" className="sidebar-item" onClick={() => {}}>
            <span className="sidebar-item-icon">
              <Settings size={17} />
            </span>

            {!collapsed && <span className="sidebar-item-label">Settings</span>}
          </button>

          {/* ACCOUNT */}

          <div className="sidebar-account">
            <button
              type="button"
              className="sidebar-account-button"
              onClick={() => setAccountOpen((current) => !current)}
            >
              <div className="sidebar-account-avatar">{userInitial}</div>

              {!collapsed && (
                <>
                  <div className="sidebar-account-info">
                    <strong>{user ? user.name : "Guest"}</strong>

                    <span>{user ? user.email : "Not signed in"}</span>
                  </div>

                  <ChevronDown
                    size={14}
                    className={
                      accountOpen
                        ? "sidebar-account-chevron-open"
                        : "sidebar-account-chevron"
                    }
                  />
                </>
              )}
            </button>

            {/* ACCOUNT MENU */}

            {!collapsed && accountOpen && (
              <div className="sidebar-account-menu">
                {user ? (
                  <>
                    <button
                      type="button"
                      className="sidebar-account-menu-item"
                      onClick={() => {
                        setAccountOpen(false);
                      }}
                    >
                      <Settings size={15} />

                      <span>Profile</span>
                    </button>

                    <button
                      type="button"
                      className="sidebar-account-menu-item"
                      onClick={() => {
                        setAccountOpen(false);
                        onLogout();
                      }}
                    >
                      <LogOut size={15} />

                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="sidebar-account-menu-item"
                      onClick={() => {
                        setAccountOpen(false);
                        onLogin();
                      }}
                    >
                      <LogIn size={15} />

                      <span>Sign in</span>
                    </button>

                    <button
                      type="button"
                      className="sidebar-account-menu-item"
                      onClick={() => {
                        setAccountOpen(false);
                        onSignup();
                      }}
                    >
                      <UserPlus size={15} />

                      <span>Create account</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COLLAPSE */}

        <button
          type="button"
          className="sidebar-collapse"
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="desktop-main">
        {/* TOPBAR */}

        <header className="desktop-topbar">
          <div className="desktop-topbar-left">
            <div className="desktop-breadcrumb">
              <span>DevKit</span>

              <span>/</span>

              <strong>{activeToolName}</strong>
            </div>
          </div>

          <div className="desktop-topbar-right">
            <button
              type="button"
              className="desktop-command-button"
              onClick={onCommandPalette}
            >
              <Command size={15} />

              <span>Search tools...</span>

              <kbd>Ctrl K</kbd>
            </button>
          </div>
        </header>

        {/* CONTENT */}

        <div className="desktop-content">{children}</div>
      </main>
    </div>
  );
}

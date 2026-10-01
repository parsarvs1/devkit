import {
  CheckCircle2,
  Clock3,
  Command,
  ExternalLink,
  Heart,
  Keyboard,
  Quote,
  Sparkles,
  Star,
  Terminal,
} from "lucide-react";

import { useEffect, useState } from "react";

import type { RecentTool, User } from "./types";

const TOOL_INFO: RecentTool[] = [
  {
    id: "json",
    name: "JSON Formatter",
    description: "Format and validate JSON",
  },
  {
    id: "jwt",
    name: "JWT Decoder",
    description: "Decode JWT tokens",
  },
  {
    id: "uuid",
    name: "UUID Generator",
    description: "Generate UUIDs",
  },
  {
    id: "regex",
    name: "Regex Tester",
    description: "Test regular expressions",
  },
  {
    id: "base64",
    name: "Base64 Encoder",
    description: "Encode and decode Base64",
  },
  {
    id: "timestamp",
    name: "Timestamp",
    description: "Convert timestamps",
  },
  {
    id: "color",
    name: "Color Converter",
    description: "Convert colors",
  },
  {
    id: "hash",
    name: "Hash Generator",
    description: "Generate hashes",
  },
  {
    id: "hash-compare",
    name: "Hash Compare",
    description: "Compare hashes",
  },
  {
    id: "url",
    name: "URL Encoder",
    description: "Encode and decode URLs",
  },
];

type HomeProps = {
  onSelectTool: (tool: string) => void;
  user: User | null;
  recentTools: RecentTool[];
};

export default function Home({ onSelectTool, user, recentTools }: HomeProps) {
  const displayName = user?.name?.trim() || "Developer";

  const [favorites, setFavorites] = useState<string[]>([]);

  /*
   * Load favorites
   */
  useEffect(() => {
    const saved = localStorage.getItem("devkit-favorites");

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setFavorites(parsed);
      }
    } catch {
      localStorage.removeItem("devkit-favorites");
    }
  }, []);

  /*
   * Toggle favorite
   */
  const toggleFavorite = (toolId: string) => {
    setFavorites((current) => {
      const exists = current.includes(toolId);

      const updated = exists
        ? current.filter((id) => id !== toolId)
        : [...current, toolId];

      localStorage.setItem("devkit-favorites", JSON.stringify(updated));

      return updated;
    });
  };

  const favoriteTools = TOOL_INFO.filter((tool) => favorites.includes(tool.id));

  return (
    <div className="home-page">
      {/* HERO */}

      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-eyebrow">
            <Sparkles size={13} />
            <span>DEVELOPER WORKSPACE</span>
          </div>

          <h1>
            {user ? `Welcome back, ${displayName}.` : "Build faster."}

            <br />

            <span>
              {user ? "Let's build something great." : "Work smarter."}
            </span>
          </h1>

          <p>
            {user
              ? "Your workspace is ready. Pick up where you left off and keep building."
              : "Your developer workspace for everyday tasks, experiments, and productive workflows."}
          </p>

          <button
            type="button"
            className="home-primary-action"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("devkit-open-command-palette"),
              )
            }
          >
            <Command size={15} />

            <span>Open Command Palette</span>

            <kbd>Ctrl K</kbd>
          </button>
        </div>

        <div className="home-hero-visual">
          <div className="home-visual-glow" />

          <div className="home-terminal">
            <div className="home-terminal-header">
              <div className="home-terminal-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="home-terminal-title">devkit</span>
            </div>

            <div className="home-terminal-body">
              <div>
                <span className="home-terminal-symbol">$</span>{" "}
                <span>devkit</span>
              </div>

              <div className="home-terminal-muted">
                initializing workspace...
              </div>

              <div className="home-terminal-line">
                <span className="home-terminal-symbol">$</span>{" "}
                <span>workspace --status</span>
              </div>

              <div className="home-terminal-success">✓ workspace ready</div>

              <div className="home-terminal-success">✓ tools available</div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITY */}

      <section className="home-workspace-grid">
        <div className="home-panel">
          <div className="home-panel-header">
            <div className="home-panel-icon">
              <Clock3 size={16} />
            </div>

            <div>
              <span className="home-section-label">RECENT ACTIVITY</span>

              <h2>Pick up where you left off.</h2>
            </div>
          </div>

          {recentTools.length === 0 ? (
            <div className="home-empty-state">
              <div className="home-empty-icon">
                <Terminal size={18} />
              </div>

              <div>
                <strong>No recent activity</strong>

                <span>
                  Start using a developer tool and it will appear here.
                </span>
              </div>
            </div>
          ) : (
            <div className="home-activity-list">
              {recentTools.map((tool, index) => (
                <div className="home-activity-item" key={tool.id}>
                  <button
                    type="button"
                    className="home-activity-main"
                    onClick={() => onSelectTool(tool.id)}
                  >
                    <div className="home-activity-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="home-activity-info">
                      <strong>{tool.name}</strong>

                      <span>{tool.description}</span>
                    </div>

                    <ExternalLink size={14} className="home-activity-open" />
                  </button>

                  <button
                    type="button"
                    className={`home-favorite-button ${
                      favorites.includes(tool.id) ? "is-favorite" : ""
                    }`}
                    onClick={() => toggleFavorite(tool.id)}
                    aria-label={
                      favorites.includes(tool.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    title={
                      favorites.includes(tool.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <Star
                      size={15}
                      fill={
                        favorites.includes(tool.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAVORITES */}

        <div className="home-panel">
          <div className="home-panel-header">
            <div className="home-panel-icon">
              <Star size={16} />
            </div>

            <div>
              <span className="home-section-label">FAVORITES</span>

              <h2>Your go-to tools.</h2>
            </div>
          </div>

          {favoriteTools.length === 0 ? (
            <div className="home-empty-state">
              <div className="home-empty-icon">
                <Heart size={18} />
              </div>

              <div>
                <strong>Nothing here yet</strong>

                <span>Star a tool from Recent Activity to save it here.</span>
              </div>
            </div>
          ) : (
            <div className="home-favorites-list">
              {favoriteTools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  className="home-favorite-item"
                  onClick={() => onSelectTool(tool.id)}
                >
                  <div className="home-favorite-item-icon">
                    <Star size={15} fill="currentColor" />
                  </div>

                  <div className="home-favorite-item-content">
                    <strong>{tool.name}</strong>

                    <span>{tool.description}</span>
                  </div>

                  <ExternalLink size={14} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DEVELOPER NOTE */}

      <section className="home-today">
        <div className="home-today-icon">
          <Quote size={17} />
        </div>

        <div className="home-today-content">
          <span className="home-section-label">DEVELOPER NOTE</span>

          <p>Great software is built one small improvement at a time.</p>
        </div>
      </section>

      {/* WORKSPACE STATUS */}

      <section className="home-overview">
        <div className="home-overview-header">
          <div>
            <span className="home-section-label">WORKSPACE</span>

            <h2>Everything is ready.</h2>
          </div>

          <div className="home-overview-status">
            <span className="home-status-dot" />
            Online
          </div>
        </div>

        <div className="home-overview-grid">
          <div className="home-overview-item">
            <div className="home-overview-item-icon">
              <Terminal size={16} />
            </div>

            <div>
              <strong>Developer Tools</strong>

              <span>Your utilities are ready to use.</span>
            </div>
          </div>

          <div className="home-overview-item">
            <div className="home-overview-item-icon">
              <Command size={16} />
            </div>

            <div>
              <strong>Command Palette</strong>

              <span>Jump anywhere with Ctrl + K.</span>
            </div>
          </div>

          <div className="home-overview-item">
            <div className="home-overview-item-icon">
              <CheckCircle2 size={16} />
            </div>

            <div>
              <strong>Workspace Status</strong>

              <span>Everything is running normally.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SHORTCUTS + MINDSET */}

      <section className="home-info-grid">
        <div className="home-panel">
          <div className="home-panel-header">
            <div className="home-panel-icon">
              <Keyboard size={16} />
            </div>

            <div>
              <span className="home-section-label">SHORTCUTS</span>

              <h2>Work faster</h2>
            </div>
          </div>

          <div className="home-shortcuts">
            <div className="home-shortcut">
              <div>
                <strong>Command Palette</strong>

                <span>Quickly navigate through DevKit</span>
              </div>

              <kbd>Ctrl K</kbd>
            </div>

            <div className="home-shortcut">
              <div>
                <strong>Close overlay</strong>

                <span>Close menus and dialogs</span>
              </div>

              <kbd>Esc</kbd>
            </div>

            <div className="home-shortcut">
              <div>
                <strong>Developer Tools</strong>

                <span>Access utilities from the sidebar</span>
              </div>

              <kbd>Tools</kbd>
            </div>
          </div>
        </div>

        <div className="home-panel">
          <div className="home-panel-header">
            <div className="home-panel-icon">
              <Sparkles size={16} />
            </div>

            <div>
              <span className="home-section-label">DEVELOPER MINDSET</span>

              <h2>Keep building.</h2>
            </div>
          </div>

          <div className="home-developer-message">
            <p>Good tools should disappear into your workflow.</p>

            <p>Stay focused on the problem, not the process.</p>

            <div className="home-message-line" />

            <span>— DevKit</span>
          </div>
        </div>
      </section>

      <div className="home-footer-note">
        <span>DevKit</span>

        <span className="home-footer-separator">•</span>

        <span>Developer Toolkit</span>
      </div>
    </div>
  );
}

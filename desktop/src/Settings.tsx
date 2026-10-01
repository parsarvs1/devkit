import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Bell,
  Check,
  Database,
  Monitor,
  Moon,
  RotateCcw,
  Settings as SettingsIcon,
  Sun,
  Trash2,
} from "lucide-react";

type SettingsPageProps = {
  onBack: () => void;
};

type Theme = "dark" | "light" | "system";

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const resolvedTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;

  document.documentElement.setAttribute(
    "data-theme",
    resolvedTheme
  );
}

export default function SettingsPage({
  onBack,
}: SettingsPageProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  const [notifications, setNotifications] =
    useState(true);

  const [commandPalette, setCommandPalette] =
    useState(true);

  const [saved, setSaved] = useState(false);

  /* =====================================================
     LOAD SETTINGS
     ===================================================== */

  useEffect(() => {
    try {
      const storedTheme =
        localStorage.getItem("devkit-theme");

      const storedNotifications =
        localStorage.getItem(
          "devkit-notifications"
        );

      const storedCommandPalette =
        localStorage.getItem(
          "devkit-command-palette"
        );

      const initialTheme: Theme =
        storedTheme === "dark" ||
        storedTheme === "light" ||
        storedTheme === "system"
          ? storedTheme
          : "dark";

      const initialNotifications =
        storedNotifications === null
          ? true
          : storedNotifications === "true";

      const initialCommandPalette =
        storedCommandPalette === null
          ? true
          : storedCommandPalette === "true";

      setTheme(initialTheme);
      setNotifications(initialNotifications);
      setCommandPalette(
        initialCommandPalette
      );

      applyTheme(initialTheme);

      /* ================================================
         SYSTEM THEME LISTENER
         ================================================ */

      const mediaQuery =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        );

      const handleSystemThemeChange = () => {
        if (initialTheme === "system") {
          applyTheme("system");
        }
      };

      mediaQuery.addEventListener(
        "change",
        handleSystemThemeChange
      );

      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleSystemThemeChange
        );
      };
    } catch {
      // Ignore localStorage errors.
    }
  }, []);

  /* =====================================================
     CHANGE THEME
     ===================================================== */

  const changeTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);

    applyTheme(nextTheme);

    localStorage.setItem(
      "devkit-theme",
      nextTheme
    );

    /*
     * Notify ThemeToggle and the rest of the app.
     */
    window.dispatchEvent(
      new CustomEvent("devkit-theme-change", {
        detail: nextTheme,
      })
    );
  };

  /* =====================================================
     SAVE
     ===================================================== */

  const saveSettings = () => {
    localStorage.setItem(
      "devkit-theme",
      theme
    );

    localStorage.setItem(
      "devkit-notifications",
      String(notifications)
    );

    localStorage.setItem(
      "devkit-command-palette",
      String(commandPalette)
    );

    window.dispatchEvent(
      new CustomEvent(
        "devkit-settings-change"
      )
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  /* =====================================================
     RESET
     ===================================================== */

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all DevKit settings to their defaults?"
    );

    if (!confirmed) return;

    const defaultTheme: Theme = "dark";

    setTheme(defaultTheme);
    setNotifications(true);
    setCommandPalette(true);

    localStorage.setItem(
      "devkit-theme",
      defaultTheme
    );

    localStorage.setItem(
      "devkit-notifications",
      "true"
    );

    localStorage.setItem(
      "devkit-command-palette",
      "true"
    );

    applyTheme(defaultTheme);

    window.dispatchEvent(
      new CustomEvent(
        "devkit-settings-change"
      )
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  /* =====================================================
     CLEAR LOCAL DATA
     ===================================================== */

  const clearLocalData = () => {
    const confirmed = window.confirm(
      "This will remove DevKit data stored locally. Continue?"
    );

    if (!confirmed) return;

    /*
     * Don't use localStorage.clear().
     *
     * That could remove unrelated data and also
     * sign the user out by deleting devkit-user.
     */

    localStorage.removeItem("devkit-theme");
    localStorage.removeItem(
      "devkit-notifications"
    );
    localStorage.removeItem(
      "devkit-command-palette"
    );

    setTheme("dark");
    setNotifications(true);
    setCommandPalette(true);

    applyTheme("dark");

    window.dispatchEvent(
      new CustomEvent(
        "devkit-settings-change"
      )
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  return (
    <div className="settings-page">

      {/* =================================================
          HEADER
         ================================================= */}

      <div className="settings-header">
        <div className="settings-heading">

          <div className="settings-icon">
            <SettingsIcon size={21} />
          </div>

          <div>
            <div className="page-label">
              PREFERENCES
            </div>

            <h1>Settings</h1>

            <p>
              Customize your DevKit experience.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="settings-back"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          <span>Back</span>
        </button>
      </div>

      {/* =================================================
          APPEARANCE
         ================================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <Monitor size={17} />
          </div>

          <div>
            <h2>Appearance</h2>

            <p>
              Choose how DevKit looks on your device.
            </p>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-option-row">

            <div className="settings-option-info">

              <strong>Theme</strong>

              <span>
                Select your preferred interface theme.
              </span>

            </div>

            <div className="settings-theme-options">

              <button
                type="button"
                className={`settings-theme-button ${
                  theme === "dark"
                    ? "settings-theme-button-active"
                    : ""
                }`}
                onClick={() =>
                  changeTheme("dark")
                }
              >
                <Moon size={15} />

                <span>Dark</span>

                {theme === "dark" && (
                  <Check size={14} />
                )}
              </button>

              <button
                type="button"
                className={`settings-theme-button ${
                  theme === "light"
                    ? "settings-theme-button-active"
                    : ""
                }`}
                onClick={() =>
                  changeTheme("light")
                }
              >
                <Sun size={15} />

                <span>Light</span>

                {theme === "light" && (
                  <Check size={14} />
                )}
              </button>

              <button
                type="button"
                className={`settings-theme-button ${
                  theme === "system"
                    ? "settings-theme-button-active"
                    : ""
                }`}
                onClick={() =>
                  changeTheme("system")
                }
              >
                <Monitor size={15} />

                <span>System</span>

                {theme === "system" && (
                  <Check size={14} />
                )}
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          NOTIFICATIONS
         ================================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <Bell size={17} />
          </div>

          <div>
            <h2>Notifications</h2>

            <p>
              Control notifications and alerts.
            </p>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-option-row">

            <div className="settings-option-info">

              <strong>
                Notifications
              </strong>

              <span>
                Allow DevKit to show notifications.
              </span>

            </div>

            <button
              type="button"
              className={`settings-switch ${
                notifications
                  ? "settings-switch-active"
                  : ""
              }`}
              onClick={() =>
                setNotifications(
                  (current) => !current
                )
              }
              aria-label="Toggle notifications"
              aria-pressed={notifications}
            >
              <span />
            </button>

          </div>

        </div>

      </section>

      {/* =================================================
          BEHAVIOR
         ================================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <SettingsIcon size={17} />
          </div>

          <div>
            <h2>Behavior</h2>

            <p>
              Configure how DevKit behaves.
            </p>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-option-row">

            <div className="settings-option-info">

              <strong>
                Command Palette
              </strong>

              <span>
                Enable the Ctrl + K command palette.
              </span>

            </div>

            <button
              type="button"
              className={`settings-switch ${
                commandPalette
                  ? "settings-switch-active"
                  : ""
              }`}
              onClick={() =>
                setCommandPalette(
                  (current) => !current
                )
              }
              aria-label="Toggle command palette"
              aria-pressed={commandPalette}
            >
              <span />
            </button>

          </div>

        </div>

      </section>

      {/* =================================================
          LOCAL DATA
         ================================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <Database size={17} />
          </div>

          <div>
            <h2>Local Data</h2>

            <p>
              Manage data stored locally by DevKit.
            </p>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-action-row">

            <div className="settings-option-info">

              <strong>
                Reset Settings
              </strong>

              <span>
                Restore all settings to their
                default values.
              </span>

            </div>

            <button
              type="button"
              className="settings-secondary-button"
              onClick={resetSettings}
            >
              <RotateCcw size={14} />
              Reset
            </button>

          </div>

          <div className="settings-divider" />

          <div className="settings-action-row">

            <div className="settings-option-info">

              <strong>
                Clear Local Data
              </strong>

              <span>
                Remove locally stored DevKit data.
              </span>

            </div>

            <button
              type="button"
              className="settings-danger-button"
              onClick={clearLocalData}
            >
              <Trash2 size={14} />
              Clear data
            </button>

          </div>

        </div>

      </section>

      {/* =================================================
          FOOTER
         ================================================= */}

      <div className="settings-footer">

        {saved && (
          <div className="settings-saved">
            <Check size={14} />
            Settings saved
          </div>
        )}

        <button
          type="button"
          className="settings-save"
          onClick={saveSettings}
        >
          <Check size={15} />
          Save changes
        </button>

      </div>

    </div>
  );
}
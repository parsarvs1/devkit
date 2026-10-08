import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Check,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

type Theme = "dark" | "light" | "system";

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
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

export default function ThemeToggle() {
  const [theme, setTheme] =
    useState<Theme>("dark");

  const [open, setOpen] =
    useState(false);

  const selectorRef =
    useRef<HTMLDivElement>(null);

  /*
   * Load saved theme
   * + listen for system theme changes
   */
  useEffect(() => {
    // Theme is hydrated from localStorage on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const savedTheme =
      localStorage.getItem(
        "devkit-theme"
      ) as Theme | null;

    const initialTheme: Theme =
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
        ? savedTheme
        : "dark";

    setTheme(initialTheme);
    applyTheme(initialTheme);
    /* eslint-enable react-hooks/set-state-in-effect */

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    function handleSystemThemeChange() {
      if (initialTheme === "system") {
        applyTheme("system");
      }
    }

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
  }, []);

  /*
   * Close menu when clicking outside
   * or pressing Escape
   */
  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  function changeTheme(
    nextTheme: Theme
  ) {
    setTheme(nextTheme);

    applyTheme(nextTheme);

    localStorage.setItem(
      "devkit-theme",
      nextTheme
    );

    setOpen(false);
  }

  const themes: {
    id: Theme;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "light",
      label: "Light",
      description: "Light theme",
      icon: <Sun size={15} />,
    },
    {
      id: "dark",
      label: "Dark",
      description: "Dark theme",
      icon: <Moon size={15} />,
    },
    {
      id: "system",
      label: "System",
      description: "Use system theme",
      icon: <Monitor size={15} />,
    },
  ];

  return (
    <div
      className="theme-selector"
      ref={selectorRef}
    >
      <button
        className="theme-toggle"
        onClick={() =>
          setOpen((value) => !value)
        }
        type="button"
        aria-label="Theme settings"
        aria-expanded={open}
        title="Theme settings"
      >
        {theme === "dark" ? (
          <Moon size={16} />
        ) : theme === "light" ? (
          <Sun size={16} />
        ) : (
          <Monitor size={16} />
        )}
      </button>

      {open && (
        <div className="theme-menu">
          <div className="theme-menu-header">
            <span>Theme</span>
          </div>

          <div className="theme-options">
            {themes.map((item) => (
              <button
                key={item.id}
                className={`theme-option ${
                  theme === item.id
                    ? "theme-option-active"
                    : ""
                }`}
                onClick={() =>
                  changeTheme(item.id)
                }
                type="button"
              >
                <span className="theme-option-icon">
                  {item.icon}
                </span>

                <span className="theme-option-content">
                  <strong>
                    {item.label}
                  </strong>

                  <span>
                    {item.description}
                  </span>
                </span>

                {theme === item.id && (
                  <Check
                    className="theme-option-check"
                    size={15}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth, BUSINESS_USER } from "../context/AuthContext";

const LINKS = [
  { href: "#about", label: "אודות" },
  { href: "#services", label: "שירותים" },
  { href: "#projects", label: "פרויקטים" },
  { href: "#testimonials", label: "המלצות" },
  { href: "#contact", label: "צור קשר" },
];

/** למשתמש עסקי (זורה) – רק אזור עסקי, אודות, שירותים, פרויקטים */
const BUSINESS_LINKS = [
  { href: "#business-area", label: "אזור עסקי" },
  { href: "#about", label: "אודות" },
  { href: "#services", label: "שירותים" },
  { href: "#projects", label: "פרויקטים" },
];

const MAIN_THEMES = [
  { id: "light", label: "מצב בהיר", icon: "☀️" },
  { id: "dark", label: "מצב כהה", icon: "🌙" },
  { id: "accessibility", label: "נגישות", icon: "♿" },
];

const ACCESSIBILITY_OPTIONS = [
  { id: "accessibility-a", label: "תכלת" },
  { id: "accessibility-b", label: "ירוק" },
];

export default function Nav({ onOpenLogin }) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityMenuOpen, setAccessibilityMenuOpen] = useState(false);
  const accessibilityRef = useRef(null);

  const isAccessibility = theme === "accessibility-a" || theme === "accessibility-b";

  useEffect(() => {
    if (!accessibilityMenuOpen) return;
    const close = (e) => {
      if (accessibilityRef.current && !accessibilityRef.current.contains(e.target)) {
        setAccessibilityMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [accessibilityMenuOpen]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="logo">
          M.P. Projects
        </a>
        <nav>
          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? "סגור תפריט" : "תפריט"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            ☰
          </button>
          <ul className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {(user === BUSINESS_USER ? BUSINESS_LINKS : LINKS).map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-auth">
              {user ? (
                <>
                  <span className="nav-user">שלום, {user}</span>
                  <button
                    type="button"
                    className="nav-logout"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    יציאה
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="nav-login"
                  onClick={() => {
                    onOpenLogin?.();
                    setMenuOpen(false);
                  }}
                  title="כניסה לבעל העסק בלבד"
                >
                  כניסה (בעל העסק)
                </button>
              )}
            </li>
          </ul>
        </nav>
        <div className="theme-toggle-wrap" ref={accessibilityRef}>
          <div className="theme-toggle" role="group" aria-label="בחירת ערכת צבעים">
            {MAIN_THEMES.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                data-theme={id}
                aria-pressed={id === "accessibility" ? isAccessibility : theme === id}
                aria-expanded={id === "accessibility" ? accessibilityMenuOpen : undefined}
                title={label}
                onClick={() => {
                  if (id === "accessibility") {
                    setAccessibilityMenuOpen((o) => !o);
                  } else {
                    setTheme(id);
                    setAccessibilityMenuOpen(false);
                  }
                }}
              >
                {icon}
              </button>
            ))}
          </div>
          {accessibilityMenuOpen && (
            <div className="theme-accessibility-menu" role="menu">
              {ACCESSIBILITY_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  className="theme-accessibility-option"
                  onClick={() => {
                    setTheme(id);
                    setAccessibilityMenuOpen(false);
                  }}
                  aria-pressed={theme === id}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

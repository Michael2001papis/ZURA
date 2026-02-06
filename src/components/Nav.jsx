import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const LINKS = [
  { href: "#about", label: "אודות" },
  { href: "#services", label: "שירותים" },
  { href: "#projects", label: "פרויקטים" },
  { href: "#contact", label: "צור קשר" },
];

const THEMES = [
  { id: "light", label: "מצב בהיר", icon: "☀️" },
  { id: "dark", label: "מצב כהה", icon: "🌙" },
  { id: "accessibility", label: "נגישות", icon: "♿" },
];

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

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
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="theme-toggle" role="group" aria-label="בחירת ערכת צבעים">
          {THEMES.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              data-theme={id}
              aria-pressed={theme === id}
              title={label}
              onClick={() => setTheme(id)}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

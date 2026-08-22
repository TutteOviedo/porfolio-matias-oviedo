"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  // Arranca en null para no "flashear" un tema equivocado antes de leer
  // la preferencia guardada / del sistema operativo.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme") as Theme | null;
    const initial: Theme =
      saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  const isDark = theme === "dark";

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Cambiar tema">
      <span className="knob">{isDark ? "◑" : "◐"}</span>
      <span>{isDark ? "Claro" : "Oscuro"}</span>
    </button>
  );
}

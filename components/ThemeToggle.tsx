"use client";

import { useTheme } from "@/lib/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Cambiar tema">
      <span className="knob">{isDark ? "◑" : "◐"}</span>
      <span>{isDark ? "Claro" : "Oscuro"}</span>
    </button>
  );
}

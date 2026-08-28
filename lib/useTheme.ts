"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

// Estado de tema único para todo el sitio. Hay un solo lugar donde vive:
//   - el atributo data-theme en <html>, que es lo que consumen los tokens de
//     color de globals.css (:root / [data-theme="dark"]);
//   - la key "theme" de localStorage, donde se persiste la preferencia.
//
// Tanto el toggle del header del portfolio como el de /curriculum usan este
// hook, así que los dos leen y escriben el mismo estado: un único toggle
// lógico, sin importar cuál de los dos botones se toca.
export function useTheme() {
  // Arranca en null para no "flashear" un tema equivocado antes de leer la
  // preferencia guardada / la del sistema operativo.
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme") as Theme | null;
    const initial: Theme =
      saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, toggle };
}

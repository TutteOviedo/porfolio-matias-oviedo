"use client";

type Props = {
  theme: "dark" | "light";
  onToggle: () => void;
};

export default function CvThemeToggle({ theme, onToggle }: Props) {
  const isLight = theme === "light";

  return (
    <button id="theme-toggle" title="Cambiar tema" onClick={onToggle}>
      <span className="toggle-icon">{isLight ? "☀️" : "🌙"}</span>
      <span id="toggle-label">{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}

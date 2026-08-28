"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import type { Lang } from "@/lib/i18n/dictionary";

// Los nombres van SIEMPRE en su propio idioma, sin traducir.
const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "es", label: "Español" },
  { lang: "en", label: "English" },
];

// Banderas como SVG embebido (no emojis: los emojis de bandera no se
// renderizan en Windows - se ven como "AR" / "GB"). El proyecto no tiene
// librería de iconos de banderas, así que van inline.
function Flag({ lang }: { lang: Lang }) {
  return lang === "es" ? <FlagAR /> : <FlagGB />;
}

function FlagAR() {
  return (
    <svg className="lang-flag" viewBox="0 0 27 18" aria-hidden="true">
      <rect width="27" height="18" fill="#fff" />
      <rect width="27" height="6" fill="#74acdf" />
      <rect y="12" width="27" height="6" fill="#74acdf" />
      <g stroke="#e8a200" strokeWidth="0.5">
        <line x1="13.5" y1="5.4" x2="13.5" y2="12.6" />
        <line x1="9.9" y1="9" x2="17.1" y2="9" />
        <line x1="10.95" y1="6.45" x2="16.05" y2="11.55" />
        <line x1="10.95" y1="11.55" x2="16.05" y2="6.45" />
      </g>
      <circle cx="13.5" cy="9" r="2.2" fill="#fcbf49" stroke="#e8a200" strokeWidth="0.4" />
    </svg>
  );
}

function FlagGB() {
  // clipPath necesita un id único por instancia (hay una bandera en el
  // botón y otra en cada opción del menú).
  const clip = `${useId()}-uk`;
  return (
    <svg className="lang-flag" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id={clip}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath={`url(#${clip})`}
        stroke="#c8102e"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

export default function LanguageToggle() {
  const { lang, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = OPTIONS.find((o) => o.lang === lang) ?? OPTIONS[0];

  return (
    <div className="lang-select" ref={ref}>
      <button
        type="button"
        className="theme-toggle lang-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Cambiar idioma / Switch language"
        onClick={() => setOpen((v) => !v)}
      >
        <Flag lang={current.lang} />
        <span>{current.label}</span>
        <ChevronDown className="lang-caret" size={13} aria-hidden="true" />
      </button>

      {open && (
        <div className="lang-menu" role="menu">
          {OPTIONS.map((o) => (
            <button
              key={o.lang}
              type="button"
              role="menuitemradio"
              aria-checked={o.lang === lang}
              className="lang-option"
              onClick={() => {
                setLanguage(o.lang);
                setOpen(false);
              }}
            >
              <Flag lang={o.lang} />
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

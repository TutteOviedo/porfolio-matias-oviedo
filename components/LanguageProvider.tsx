"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Entry, Lang, translate } from "@/lib/i18n/dictionary";

type LanguageContextValue = {
  lang: Lang;
  setLanguage: (next: Lang) => void;
  // Traduce una entrada del diccionario al idioma activo. Si el idioma es
  // "en" pero la entrada no tiene traducción, devuelve el texto en español
  // (ver translate() en lib/i18n/dictionary). Así una página sin traducir
  // — /evals hoy — sigue mostrando su contenido en vez de romper.
  t: (entry: Entry) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "lang";

// Mismo patrón que ThemeToggle: preferencia persistida en localStorage y
// aplicada en runtime, sin recargar la página. Arranca en "es" (que es lo
// que renderiza el server y lo que tiene el <html lang>), así que solo un
// visitante que ya eligió "en" ve un cambio después de hidratar.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") {
      setLang(saved);
      document.documentElement.setAttribute("lang", saved);
    }
  }, []);

  function setLanguage(next: Lang) {
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("lang", next);
  }

  const t = (entry: Entry) => translate(entry, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage tiene que usarse dentro de un LanguageProvider");
  }
  return ctx;
}

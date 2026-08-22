"use client";

import { createContext, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import TuteWidget, { TuteWidgetHandle } from "./TuteWidget";

const TuteContext = createContext<(() => void) | null>(null);

// Rutas reales del sitio. El widget solo se muestra en estas — cualquier
// ruta que no esté acá (la 404 incluida) se queda sin el widget sola, sin
// tener que tocar nada del lado de esa página.
const KNOWN_ROUTES = ["/", "/curriculum", "/evals"];

// Vive en el layout raíz, así el widget (y su estado de conversación) no se
// desmonta al navegar entre páginas — Next.js no vuelve a montar el layout
// en cada cambio de ruta, solo lo que está debajo de {children}.
export function TuteProvider({ children }: { children: React.ReactNode }) {
  const tuteRef = useRef<TuteWidgetHandle>(null);
  const openTute = () => tuteRef.current?.open();
  const pathname = usePathname();
  const showWidget = KNOWN_ROUTES.includes(pathname);

  return (
    <TuteContext.Provider value={openTute}>
      {children}
      {showWidget && <TuteWidget ref={tuteRef} />}
    </TuteContext.Provider>
  );
}

export function useTute() {
  const openTute = useContext(TuteContext);
  if (!openTute) {
    throw new Error("useTute tiene que usarse dentro de un TuteProvider");
  }
  return openTute;
}

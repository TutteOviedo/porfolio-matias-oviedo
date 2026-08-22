"use client";

import { createContext, useContext, useRef } from "react";
import TuteWidget, { TuteWidgetHandle } from "./TuteWidget";

const TuteContext = createContext<(() => void) | null>(null);

// Vive en el layout raíz, así el widget (y su estado de conversación) no se
// desmonta al navegar entre páginas — Next.js no vuelve a montar el layout
// en cada cambio de ruta, solo lo que está debajo de {children}.
export function TuteProvider({ children }: { children: React.ReactNode }) {
  const tuteRef = useRef<TuteWidgetHandle>(null);
  const openTute = () => tuteRef.current?.open();

  return (
    <TuteContext.Provider value={openTute}>
      {children}
      <TuteWidget ref={tuteRef} />
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

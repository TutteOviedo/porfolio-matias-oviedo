import type { Metadata } from "next";
import "./globals.css";
import { TuteProvider } from "@/components/TuteProvider";

export const metadata: Metadata = {
  title: "Matías Oviedo — Soporte, Programación & IA",
  description:
    "Soporte de aplicaciones con 6-7 años de experiencia, ahora orientado a IA, agentes y AWS.",
  // ACA REEMPLAZAR: cuando el dominio esté funcionando, agregá acá metadatos de
  // Open Graph / Twitter card (metadataBase, openGraph, etc.) para que se vea
  // bien al compartir el link.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // El atributo data-theme lo controla ThemeToggle en tiempo de ejecución
    // (leyendo localStorage / prefers-color-scheme). Arranca en "light" acá
    // para que no haya parpadeo raro en el primer render del server.
    <html lang="es" data-theme="light">
      <body>
        <TuteProvider>{children}</TuteProvider>
      </body>
    </html>
  );
}

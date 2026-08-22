import type { Metadata } from "next";
import "./globals.css";
import { TuteProvider } from "@/components/TuteProvider";

const TITLE = "Matías Oviedo — Soporte, Programación & IA";
const DESCRIPTION =
  "Soporte de aplicaciones con 6-7 años de experiencia, ahora orientado a IA, agentes y AWS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://matiasoviedo.com.ar"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://matiasoviedo.com.ar",
    siteName: "Matías Oviedo",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
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

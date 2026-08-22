import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./curriculum.css";

// Tipografía propia del CV, escopeada a esta ruta vía next/font/google:
// las variables --font-* que genera solo existen dentro de este layout,
// así que nunca pisan Space Grotesk / Inter / JetBrains Mono del resto del
// sitio ni al revés.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  title: "Cloud Resume Challenge - Matías Oviedo",
  icons: {
    icon: "/curriculum/favicon.ico",
    apple: "/curriculum/apple-touch-icon.png",
  },
};

export default function CurriculumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Bootstrap (grid) y Font Awesome (íconos), solo en esta ruta */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <div className={`${playfairDisplay.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable}`}>
        {children}
      </div>
    </>
  );
}

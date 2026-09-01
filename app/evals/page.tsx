import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EvalsContent from "@/components/EvalsContent";

export const metadata: Metadata = {
  title: "Cómo testeo a Tute - Matías Oviedo",
  description:
    "Los evals que uso para verificar que Tute responde bien, no alucina información, usa las herramientas correctas y mantiene el tono.",
};

// El contenido vive en EvalsContent (client component) para que las partes
// estructurales de la página reaccionen al toggle de idioma. Esta página queda
// como server component solo por el export de metadata.
export default function EvalsPage() {
  return (
    <>
      <Header />
      <EvalsContent />
      <Footer />
    </>
  );
}

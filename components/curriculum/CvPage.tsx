"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CvHeader from "./CvHeader";
import Experience from "./Experience";
import Certifications from "./Certifications";
import Education from "./Education";
import SkillsSidebar from "./SkillsSidebar";
import ProjectsSidebar from "./ProjectsSidebar";
import CvFooter from "./CvFooter";

export default function CvPage() {
  return (
    <div className="cv-page">
      <Link href="/" className="cv-back-link">
        ← Volver al portfolio
      </Link>
      {/* El mismo <ThemeToggle> que usa el resto del sitio (mismo ícono ◐/◑,
          mismo label, mismo estado data-theme). Acá solo lo posicionamos
          fijo arriba a la derecha, espejando el link "volver". */}
      <div className="cv-theme-toggle">
        <ThemeToggle />
      </div>

      <header className="cv-header">
        <div className="container">
          <CvHeader />
        </div>
      </header>

      <main className="cv-body">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <Experience />
              <Certifications />
              <Education />
            </div>
            <div className="col-lg-4">
              <SkillsSidebar />
              <ProjectsSidebar />
            </div>
          </div>
        </div>
      </main>

      <CvFooter />
    </div>
  );
}

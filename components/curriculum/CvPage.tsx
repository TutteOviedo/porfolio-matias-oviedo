"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import CvHeader from "./CvHeader";
import Experience from "./Experience";
import Certifications from "./Certifications";
import Education from "./Education";
import SkillsSidebar from "./SkillsSidebar";
import ProjectsSidebar from "./ProjectsSidebar";
import CvFooter from "./CvFooter";

export default function CvPage() {
  const { t } = useLanguage();

  return (
    <div className="cv-page">
      <Link href="/" className="cv-back-link">
        {t(dictionary.curriculum.header.backToPortfolio)}
      </Link>
      {/* Mismos LanguageToggle y ThemeToggle del resto del sitio (mismo estado
          global de idioma y tema). Acá solo los agrupamos y los fijamos
          arriba a la derecha, espejando el link "volver". */}
      <div className="cv-corner-toggles">
        <LanguageToggle />
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

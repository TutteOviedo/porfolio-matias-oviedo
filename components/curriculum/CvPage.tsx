"use client";

import { useEffect, useState } from "react";
import CvThemeToggle from "./CvThemeToggle";
import CvHeader from "./CvHeader";
import Experience from "./Experience";
import Certifications from "./Certifications";
import Education from "./Education";
import SkillsSidebar from "./SkillsSidebar";
import ProjectsSidebar from "./ProjectsSidebar";
import CvFooter from "./CvFooter";

type CvTheme = "dark" | "light";

export default function CvPage() {
  // Tema propio del CV, independiente del ThemeToggle del resto del sitio:
  // key de localStorage distinta ("cv-theme") y la clase "light" se aplica
  // sobre este wrapper, no sobre <body>/<html> (que persisten entre
  // navegaciones client-side del App Router).
  const [theme, setTheme] = useState<CvTheme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("cv-theme") as CvTheme | null;
    if (saved) setTheme(saved);
  }, []);

  function toggleTheme() {
    const next: CvTheme = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("cv-theme", next);
  }

  return (
    <div className={`cv-page${theme === "light" ? " light" : ""}`}>
      <CvThemeToggle theme={theme} onToggle={toggleTheme} />

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

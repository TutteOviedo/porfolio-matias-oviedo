"use client";

import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Projects() {
  const { t } = useLanguage();
  const d = dictionary.projects;

  return (
    <section id="proyectos">
      <div className="wrap">
        <div className="section-head">
          <div className="logline">
            <span className="dot idle"></span>
            {t(d.eyebrow)}
          </div>
          <h2>{t(d.heading)}</h2>
          <p>{t(d.intro)}</p>
        </div>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-tag">{t(d.cloudResumeTag)}</div>
            <h3>{t(d.cloudResumeTitle)}</h3>
            <p>{t(d.cloudResumeDesc)}</p>
            <a href="https://github.com/TutteOviedo/portfolio-matias-oviedo" className="project-link">
              {t(d.cloudResumeLink)}
            </a>
          </div>
          <div className="project-card">
            <div className="project-tag">{t(d.tuteTag)}</div>
            <h3>{t(d.tuteTitle)}</h3>
            <p>{t(d.tuteDesc)}</p>
            <a href="#tute" className="project-link">
              {t(d.tuteLink)}
            </a>
          </div>
          <div className="project-card">
            <div className="project-tag">{t(d.jobfitTag)}</div>
            <h3>{t(d.jobfitTitle)}</h3>
            <p>{t(d.jobfitDesc)}</p>
            <a href="https://github.com/TutteOviedo/job-fit" className="project-link">
              {t(d.jobfitLink)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

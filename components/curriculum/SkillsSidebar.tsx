"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

// Los % de las barras son fijos (no dependen del idioma).
const SKILL_LEVELS = ["95%", "85%", "70%", "75%", "60%", "70%"];
const LANGUAGE_LEVELS = ["100%", "75%"];

export default function SkillsSidebar() {
  const { t } = useLanguage();
  const d = dictionary.curriculum.skills;

  return (
    <>
      <div className="fade-up delay-3">
        <div className="section-label">{t(d.skillsLabel)}</div>
        <div className="skills-block">
          {d.items.map((skill, i) => (
            <div className="skill-row" key={i}>
              <span className="skill-name">{t(skill)}</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: SKILL_LEVELS[i] }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fade-up delay-4 mt-4">
        <div className="section-label">{t(d.languagesLabel)}</div>
        <div className="skills-block">
          {d.languages.map((lang, i) => (
            <div className="skill-row" key={i}>
              <span className="skill-name">{t(lang)}</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: LANGUAGE_LEVELS[i] }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fade-up delay-5 mt-4">
        <div className="section-label">{t(d.methodologiesLabel)}</div>
        <div className="skills-block">
          <div className="tag-list">
            {d.methodologies.map((m, i) => (
              <span className="tag" key={i}>
                {t(m)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

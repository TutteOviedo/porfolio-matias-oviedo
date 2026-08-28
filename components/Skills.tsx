"use client";

import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Skills() {
  const { t } = useLanguage();
  const d = dictionary.skills;

  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head">
          <div className="logline">
            <span className="dot idle"></span>
            {t(d.eyebrow)}
          </div>
          <h2>{t(d.heading)}</h2>
        </div>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>
              <span className="dot"></span>
              {t(d.group1Title)}
            </h3>
            <div className="tag-row">
              <span className="tag">{t(d.group1Tag1)}</span>
              <span className="tag">{t(d.group1Tag2)}</span>
              <span className="tag">{t(d.group1Tag3)}</span>
              <span className="tag">{t(d.group1Tag4)}</span>
            </div>
          </div>
          <div className="skill-card">
            <h3>
              <span className="dot"></span>
              {t(d.group2Title)}
            </h3>
            <div className="tag-row">
              <span className="tag">{t(d.group2Tag1)}</span>
              <span className="tag">{t(d.group2Tag2)}</span>
              <span className="tag">{t(d.group2Tag3)}</span>
              <span className="tag">{t(d.group2Tag4)}</span>
            </div>
          </div>
          <div className="skill-card">
            <h3>
              <span className="dot"></span>
              {t(d.group3Title)}
            </h3>
            <div className="tag-row">
              <span className="tag">{t(d.group3Tag1)}</span>
              <span className="tag">{t(d.group3Tag2)}</span>
              <span className="tag">{t(d.group3Tag3)}</span>
              <span className="tag">{t(d.group3Tag4)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

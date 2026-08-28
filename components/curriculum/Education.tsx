"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Education() {
  const { t } = useLanguage();
  const d = dictionary.curriculum.education;

  return (
    <section className="fade-up delay-3">
      <div className="section-label">{t(d.label)}</div>

      {d.items.map((item, i) => (
        <div className="cv-card" key={i}>
          <div className="d-flex gap-3 align-items-start">
            <div className="edu-icon">🎓</div>
            <div>
              <div className="card-title">{t(item.title)}</div>
              <div className="card-company">{t(item.institution)}</div>
              <div className="card-period">{t(item.period)}</div>
              <p className="card-desc mb-0">{t(item.desc)}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

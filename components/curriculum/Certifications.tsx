"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Certifications() {
  const { t } = useLanguage();
  const d = dictionary.curriculum.certifications;

  return (
    <section className="fade-up delay-4">
      <div className="section-label">{t(d.label)}</div>

      {d.items.map((cert, i) => (
        <div className="cv-card" key={i}>
          <div className="d-flex gap-3 align-items-start">
            <div className="edu-icon">🏅</div>
            <div>
              <div className="card-title">{t(cert.title)}</div>
              <div className="card-company">{t(cert.issuer)}</div>
              <div className="card-period">{t(cert.period)}</div>
              <p className="card-desc mb-0">{t(cert.desc)}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

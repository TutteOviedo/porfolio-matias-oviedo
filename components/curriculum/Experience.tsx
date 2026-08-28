"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Experience() {
  const { t } = useLanguage();
  const d = dictionary.curriculum.experience;

  return (
    <section className="mb-5 fade-up delay-2">
      <div className="section-label">{t(d.label)}</div>

      {d.jobs.map((job, i) => (
        <div className="cv-card" key={i}>
          <div className="card-title">{t(job.title)}</div>
          <div className="card-company">{t(job.company)}</div>
          <div className="card-period">{t(job.period)}</div>
          <p className="card-desc">{t(job.desc)}</p>
          <div className="tag-list">
            {job.tags.map((tag, j) => (
              <span className="tag" key={j}>
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

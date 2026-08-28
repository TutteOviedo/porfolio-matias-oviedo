"use client";

import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function About() {
  const { t } = useLanguage();
  const d = dictionary.about;

  return (
    <section id="sobre-mi">
      <div className="wrap">
        <div className="logline">
          <span className="dot idle"></span>
          {t(d.eyebrow)}
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              <strong>{t(d.p1Strong)}</strong>
              {t(d.p1Rest)}
            </p>
            <p>
              {t(d.p2Lead)}
              <strong>{t(d.p2Strong)}</strong>
              {t(d.p2Rest)}
            </p>
            <p>
              {t(d.p3Lead)}
              <strong>{t(d.p3Strong)}</strong>
              {t(d.p3Rest)}
            </p>
            <div className="tag-row">
              <span className="tag">{t(d.tag1)}</span>
              <span className="tag">{t(d.tag2)}</span>
              <span className="tag">{t(d.tag3)}</span>
              <span className="tag">{t(d.tag4)}</span>
              <span className="tag">{t(d.tag5)}</span>
              <span className="tag">{t(d.tag6)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

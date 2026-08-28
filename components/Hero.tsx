"use client";

import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Hero() {
  const { t } = useLanguage();
  const d = dictionary.hero;

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="logline">
            <span className="dot"></span>
            {t(d.eyebrow)}
          </div>
          <h1>
            {t(d.titleLine1)}
            <br />
            {t(d.titleLine2)}
            <br />
            {t(d.titleLine3Lead)}
            <span>{t(d.titleAccent)}</span>.
          </h1>
          <p className="lead">{t(d.lead)}</p>
          <div className="stat-row">
            <div className="stat">
              <b>{t(d.stat1Value)}</b>
              <span>{t(d.stat1Label)}</span>
            </div>
            <div className="stat">
              <b>{t(d.stat2Value)}</b>
              <span>{t(d.stat2Label)}</span>
            </div>
            <div className="stat">
              <b>{t(d.stat3Value)}</b>
              <span>{t(d.stat3Label)}</span>
            </div>
          </div>
        </div>
        <div className="orb-wrap">
          <div className="orb">
            {/* ACA REEMPLAZAR: foto real de Matías, por ejemplo
                <img src="/foto-matias.jpg" alt="Matías Oviedo" className="orb-avatar" />
                con la imagen puesta en /public. */}
            <span className="orb-placeholder-text">[ foto de Matías ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}

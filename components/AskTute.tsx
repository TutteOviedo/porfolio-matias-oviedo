"use client";

import Link from "next/link";
import { useTute } from "./TuteProvider";
import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function AskTute() {
  const openTute = useTute();
  const { t } = useLanguage();
  const d = dictionary.askTute;

  return (
    <section id="tute">
      <div className="wrap tute-layout">
        <div className="tute-main">
          <div className="section-head">
            <div className="logline">
              <span className="dot"></span>
              {t(d.eyebrow)}
            </div>
            <h2>{t(d.heading)}</h2>
            <p>{t(d.intro)}</p>
          </div>
          <div className="ask-grid">
            <div className="ask-card">
              <span className="emoji">🙋</span>
              <h4>{t(d.card1Title)}</h4>
              <p>{t(d.card1Body)}</p>
            </div>
            <div className="ask-card">
              <span className="emoji">🗂️</span>
              <h4>{t(d.card2Title)}</h4>
              <p>{t(d.card2Body)}</p>
            </div>
            <Link href="/evals" className="ask-card">
              <span className="emoji">🧩</span>
              <h4>{t(d.card3Title)}</h4>
              <p>{t(d.card3Body)}</p>
            </Link>
          </div>
          <button className="btn btn-primary" onClick={openTute}>
            {t(d.cta)}
          </button>
        </div>
        <div className="orb-wrap">
          <div className="orb">
            <img src="/tute/tute-avatar-hero-waistup.webp" alt="Tute" className="orb-avatar" />
          </div>
        </div>
      </div>
    </section>
  );
}

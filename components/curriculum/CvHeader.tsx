"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import VisitCounter from "./VisitCounter";

const FIRST_NAME = "Matías ";
const LAST_NAME = "Oviedo";
const FULL_NAME = FIRST_NAME + LAST_NAME;

export default function CvHeader() {
  const { t } = useLanguage();
  const d = dictionary.curriculum.header;
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (typedCount >= FULL_NAME.length) return;
    const timeout = setTimeout(() => setTypedCount((c) => c + 1), 96);
    return () => clearTimeout(timeout);
  }, [typedCount]);

  const done = typedCount >= FULL_NAME.length;

  return (
    <>
      <div className="fade-up">
        <div className="name-tag">
          <span>
            {FULL_NAME.slice(0, typedCount)
              .split("")
              .map((char, i) => (
                <span
                  key={i}
                  style={{ color: i >= FIRST_NAME.length ? "var(--primary)" : "var(--text)" }}
                >
                  {char}
                </span>
              ))}
          </span>
          <span className={`tw-cursor${done ? " done" : ""}`}>|</span>
        </div>
        <div className="role-tag">{t(d.roleTag)}</div>
        <div className="contact-row">
          <a href="mailto:oviedo.matias.d@gmail.com">
            <i className="fa-solid fa-envelope"></i> oviedo.matias.d@gmail.com
          </a>
          <span className="dot">·</span>
          <a href="https://github.com/TutteOviedo" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i> github.com/TutteOviedo
          </a>
          <span className="dot">·</span>
          <a href="https://www.linkedin.com/in/oviedo-matias/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"></i> linkedin.com/in/oviedo-matias/
          </a>
        </div>
      </div>

      <VisitCounter />

      <a
        href="/curriculum/cv-matias-oviedo.pdf"
        download
        className="cv-download-btn fade-up delay-3"
      >
        <Download size={13} />
        {t(d.downloadCv)}
      </a>
    </>
  );
}

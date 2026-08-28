"use client";

import Link from "next/link";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Footer() {
  const { t } = useLanguage();
  const d = dictionary.footer;

  return (
    <footer id="contacto">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h2>{t(d.heading)}</h2>
            <p>{t(d.body)}</p>
          </div>
          <div className="contact-links">
            {/* ACA REEMPLAZAR: tu mail, usuario de LinkedIn y de GitHub reales. */}
            <a href="mailto:tu@email.com">
              <Mail size={17} /> oviedo.matias.d@gmail.com
            </a>
            <a href="https://linkedin.com/in/oviedo-matias">
              <Linkedin size={17} /> matias-oviedo
            </a>
            <a href="https://github.com/TutteOviedo">
              <Github size={17} /> TutteOviedo
            </a>
            <Link href="/curriculum">
              <FileText size={17} /> {t(d.cvLink)}
            </Link>
          </div>
        </div>
        <div className="fine-print">© 2026 Matías Oviedo</div>
      </div>
    </footer>
  );
}

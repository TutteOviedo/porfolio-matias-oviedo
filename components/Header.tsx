"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function Header() {
  const isHome = usePathname() === "/";
  // Header se reusa en páginas que no son el home (ej. /evals), donde estas
  // secciones no existen en la página actual - ahí los links tienen que
  // volver a "/" primero en vez de ser anchors relativos.
  const hash = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const { t } = useLanguage();
  const d = dictionary.nav;

  return (
    <header>
      <nav>
        <div className="logo">
          <span>Matías Oviedo</span>
          <span className="cursor"></span>
        </div>
        <div className="nav-links">
          <Link href={hash("sobre-mi")}>{t(d.about)}</Link>
          <Link href={hash("tute")}>{t(d.tute)}</Link>
          <Link href={hash("proyectos")}>{t(d.projects)}</Link>
          <Link href={hash("skills")}>{t(d.skills)}</Link>
          <Link href={hash("contacto")}>{t(d.contact)}</Link>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

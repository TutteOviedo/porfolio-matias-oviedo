"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTute } from "./TuteProvider";

export default function Header() {
  const isHome = usePathname() === "/";
  // Header se reusa en páginas que no son el home (ej. /evals), donde estas
  // secciones no existen en la página actual — ahí los links tienen que
  // volver a "/" primero en vez de ser anchors relativos.
  const hash = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const openTute = useTute();

  return (
    <header>
      <nav>
        <div className="logo">
          <span>Matías Oviedo</span>
          <span className="cursor"></span>
        </div>
        <div className="nav-links">
          <Link href={hash("sobre-mi")}>Sobre mí</Link>
          <a
            href={hash("tute")}
            onClick={(e) => {
              // El widget es global ahora, así que abrirlo no depende de
              // estar en el home — no hace falta navegar a ningún lado.
              e.preventDefault();
              openTute();
            }}
          >
            Tute
          </a>
          <Link href={hash("proyectos")}>Proyectos</Link>
          <Link href={hash("skills")}>Skills</Link>
          <Link href={hash("contacto")}>Contacto</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

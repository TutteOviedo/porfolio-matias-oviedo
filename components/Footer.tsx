import Link from "next/link";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h2>Hablemos.</h2>
            <p>
              Escribime si querés charlar sobre alguna oportunidad, o consultarme sobre alguno de mis proyectos.
            </p>
          </div>
          <div className="contact-links">
            {/* ACA REEMPLAZAR: tu mail, usuario de LinkedIn y de GitHub reales. */}
            <a href="mailto:tu@email.com">
              <Mail size={17} /> oviedo.matias.d@gmail.com
            </a>
            <a href="https://linkedin.com/in/oviedo-matias">
              <Linkedin size={17} /> matias-oviedo
            </a>
            <a href="https://github.com/TU-USUARIO">
              <Github size={17} /> tu-usuario-github
            </a>
            <Link href="/curriculum">
              <FileText size={17} /> Ver mi CV
            </Link>
          </div>
        </div>
        <div className="fine-print">© 2026 Matías Oviedo</div>
      </div>
    </footer>
  );
}

export default function Education() {
  return (
    <section className="fade-up delay-3">
      <div className="section-label">Educación</div>

      <div className="cv-card">
        <div className="d-flex gap-3 align-items-start">
          <div className="edu-icon">🎓</div>
          <div>
            <div className="card-title">Data Science</div>
            <div className="card-company">UTN.BA - Centro de e-Learning</div>
            <div className="card-period">Ene 2025 - Mar 2025</div>
            <p className="card-desc mb-0">
              Formación especializada en la extracción, limpieza y análisis estadístico de grandes
              volúmenes de datos para la generación de insights estratégicos. Incluye el
              desarrollo de modelos predictivos utilizando Python, manejo de librerías de Machine
              Learning y visualización de datos complejos para facilitar la toma de decisiones
              basada en evidencia.
            </p>
          </div>
        </div>
      </div>

      <div className="cv-card">
        <div className="d-flex gap-3 align-items-start">
          <div className="edu-icon">🎓</div>
          <div>
            <div className="card-title">Javascript</div>
            <div className="card-company">Coderhouse</div>
            <div className="card-period">Nov 2023 - Ene 2024</div>
            <p className="card-desc mb-0">
              Especialización en programación funcional y lógica de desarrollo con JavaScript
              (ES6+). Implementación de interactividad avanzada, manipulación del DOM y consumo de
              APIs externas para la creación de aplicaciones web dinámicas y escalables.
            </p>
          </div>
        </div>
      </div>

      <div className="cv-card">
        <div className="d-flex gap-3 align-items-start">
          <div className="edu-icon">🎓</div>
          <div>
            <div className="card-title">Desarrollo Web</div>
            <div className="card-company">Coderhouse</div>
            <div className="card-period">Sep 2023 - Nov 2023</div>
            <p className="card-desc mb-0">
              Capacitación en la creación de sitios web profesionales utilizando HTML y CSS.
              Enfoque en diseño responsivo, optimización de rendimiento y buenas prácticas de
              maquetación para garantizar una excelente experiencia de usuario en cualquier
              dispositivo.
            </p>
          </div>
        </div>
      </div>

      <div className="cv-card">
        <div className="d-flex gap-3 align-items-start">
          <div className="edu-icon">🎓</div>
          <div>
            <div className="card-title">Técnico en Informática</div>
            <div className="card-company">Instituto Técnico Dr. Emilio Lamarca</div>
            <div className="card-period">2012 - 2015</div>
            <p className="card-desc mb-0">Secundario técnico con orientación en infomática.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

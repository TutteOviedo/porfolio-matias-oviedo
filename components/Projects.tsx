export default function Projects() {
  return (
    <section id="proyectos">
      <div className="wrap">
        <div className="section-head">
          <div className="logline">
            <span className="dot idle"></span>
            seccion: trabajo hecho
          </div>
          <h2>Proyectos</h2>
          <p>Lo que fui construyendo para aprender y para resolver problemas concretos.</p>
        </div>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-tag">AWS · Cloud · Funciona como mi CV</div>
            <h3>Cloud Resume Challenge</h3>
            <p>
              Currículum online con arquitectura 100% serverless: S3, CloudFront,
              Route53, API Gateway, Lambda y DynamoDB para el contador de visitas.
            </p>
            <a href="https://github.com/TutteOviedo/porfolio-matias-oviedo" className="project-link">
              Ver en GitHub →
            </a>
          </div>
          <div className="project-card">
            <div className="project-tag">IA · Agentes</div>
            <h3>Tute</h3>
            <p>
              Agente conversacional con tool use real, pensado para responder
              sobre mi experiencia y demostrar buenas prácticas de diseño de
              agentes.
            </p>
            <a href="#tute" className="project-link">
              Probarlo acá ↑
            </a>
          </div>
          <div className="project-card">
            <div className="project-tag">Próximamente</div>
            <h3>[ Nuevo proyecto ]</h3>
            <p>Espacio reservado para el próximo proyecto — se va a ir sumando a medida que avance.</p>
            <a href="#" className="project-link">
              Próximamente
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

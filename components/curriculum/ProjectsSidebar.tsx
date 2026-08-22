export default function ProjectsSidebar() {
  return (
    <div className="fade-up delay-5 mt-4">
      <div className="section-label">Proyectos</div>

      <div className="cv-card">
        <div className="card-title">Cloud Resume Challenge (AWS | DevOps)</div>
        <div className="card-period">2026</div>
        <p className="card-desc mb-2">
          Despliegue de una infraestructura Serverless en AWS para hostear un portfolio
          profesional. Implementación de CI/CD mediante GitHub Actions, almacenamiento en S3,
          seguridad con CloudFront y un contador de visitas dinámico utilizando API Gateway,
          Lambda y DynamoDB.
        </p>
        <div className="tag-list">
          <span className="tag">AWS S3</span>
          <span className="tag">IaaC</span>
          <span className="tag">Serverless</span>
          <span className="tag">CI/CD</span>
          <span className="tag">API Gateway</span>
          <span className="tag">AWS Lambda &amp; DynamoDB</span>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <a href="https://github.com/TutteOviedo/cv-aws" target="_blank" rel="noreferrer" className="card-link">
            Ver en GitHub ↗
          </a>
        </div>
      </div>

      <div className="cv-card">
        <div className="card-title">Data Science</div>
        <div className="card-period">2025</div>
        <p className="card-desc mb-2 mt-2">
          Desarrollo de un pipeline completo de ciencia de datos, abarcando desde la limpieza de
          datasets hasta la implementación de modelos de Machine Learning. El proyecto destaca por
          el uso de Python y librerías estadísticas para transformar datos crudos en información
          estratégica para la toma de decisiones.
        </p>
        <div className="tag-list">
          <span className="tag">Python</span>
          <span className="tag">Pandas / NumPy</span>
          <span className="tag">Machine Learning</span>
          <span className="tag">Análisis Estadístico</span>
          <span className="tag">Matplotlib / Seaborn</span>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <a
            href="https://github.com/TutteOviedo/DataScience/blob/main/Trabajo_Integrador_Final_Mat%C3%ADas_Oviedo.ipynb"
            target="_blank"
            rel="noreferrer"
            className="card-link"
          >
            Ver en GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}

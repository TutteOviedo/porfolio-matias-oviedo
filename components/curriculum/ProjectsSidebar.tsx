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
        <div className="card-title">Tute (Agente de IA)</div>
        <div className="card-period">2026</div>
        <p className="card-desc mb-2">
          Agente conversacional embebido en este mismo portfolio. RAG sobre una base de
          conocimiento propia y tool use, todo armado a mano sin frameworks de agentes. Hoy
          corre en modo demo con respuestas simuladas; el backend serverless (API Gateway +
          Lambda) está en integración.
        </p>
        <div className="tag-list">
          <span className="tag">IA</span>
          <span className="tag">RAG</span>
          <span className="tag">Tool use</span>
          <span className="tag">AWS Lambda</span>
          <span className="tag">API Gateway</span>
        </div>
        <div className="d-flex justify-content-start mt-3">
          {/* ACA REEMPLAZAR: URL real del repo de Tute */}
          <a href="#" target="_blank" rel="noreferrer" className="card-link">
            Ver en GitHub ↗
          </a>
        </div>
      </div>

      <div className="cv-card">
        <div className="card-title">JobFit (IA | Multi-agente)</div>
        <div className="card-period">En desarrollo</div>
        <p className="card-desc mb-2">
          Sistema multi-agente que analiza una oferta laboral: un researcher busca contexto de
          la empresa, un analyst lo cruza con mi perfil real, y un writer arma una carta y un CV
          optimizado para ATS. Orquestado con LangGraph, corre local.
        </p>
        <div className="tag-list">
          <span className="tag">IA</span>
          <span className="tag">Multi-agente</span>
          <span className="tag">LangGraph</span>
          <span className="tag">Python</span>
        </div>
        <div className="d-flex justify-content-start mt-3">
          {/* ACA REEMPLAZAR: URL real del repo de JobFit una vez creado */}
          <a href="#" target="_blank" rel="noreferrer" className="card-link">
            Ver en GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}

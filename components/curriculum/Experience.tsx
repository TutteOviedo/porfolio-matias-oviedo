export default function Experience() {
  return (
    <section className="mb-5 fade-up delay-2">
      <div className="section-label">Experiencia</div>

      <div className="cv-card">
        <div className="card-title">Application Support Engineer</div>
        <div className="card-company">
          Consultores en Desarrollos Tecnológicos S.A. - Tiempo completo
        </div>
        <div className="card-period">Jun 2022 - Presente · 3 años 9 meses</div>
        <p className="card-desc">
          Especialista en soporte técnico y funcional para aplicaciones críticas, gestionando el
          ciclo completo de vida de incidencias a través de Invgate bajo estrictos acuerdos de
          nivel de servicio (SLA). Realizo diagnósticos técnicos, ejecución de pruebas funcionales
          y documentación de procesos, actuando como el principal punto de resolución para
          problemas complejos y garantizando la continuidad operativa del negocio mediante soporte
          evolutivo y preventivo.
        </p>
        <div className="tag-list">
          <span className="tag">SQL</span>
          <span className="tag">Invgate</span>
          <span className="tag">Azure DevOps</span>
          <span className="tag">Troubleshooting</span>
          <span className="tag">Postman</span>
        </div>
      </div>

      <div className="cv-card">
        <div className="card-title">Implementation Consultant</div>
        <div className="card-company">NovaRed S.A. · Tiempo completo</div>
        <div className="card-period">Ene 2021 - Jun 2022 · 1 año 6 meses</div>
        <p className="card-desc">
          Participé activamente en la implementación y parametrización de la plataforma RSA Archer
          (GRC) para entidades del sector bancario. Trabajé como nexo técnico-funcional,
          encargándome del relevamiento de requerimientos, la negociación de alcances y la
          configuración del sistema para la gestión de KPIs y documentación normativa, asegurando
          soluciones alineadas a las necesidades del cliente.
        </p>
        <div className="tag-list">
          <span className="tag">GRC</span>
          <span className="tag">Análisis de Requerimientos</span>
          <span className="tag">Troubleshooting</span>
          <span className="tag">Parametrización</span>
          <span className="tag">Sector Bancario</span>
        </div>
      </div>
    </section>
  );
}

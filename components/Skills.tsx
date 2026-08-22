export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head">
          <div className="logline">
            <span className="dot idle"></span>
            seccion: stack
          </div>
          <h2>Con qué trabajo</h2>
        </div>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>
              <span className="dot"></span>Soporte &amp; Operaciones
            </h3>
            <div className="tag-row">
              <span className="tag">Gestión de tickets</span>
              <span className="tag">Troubleshooting</span>
              <span className="tag">Documentación</span>
              <span className="tag">Atención a usuarios</span>
            </div>
          </div>
          <div className="skill-card">
            <h3>
              <span className="dot"></span>Programación
            </h3>
            <div className="tag-row">
              <span className="tag">Python</span>
              <span className="tag">JavaScript</span>
              <span className="tag">Automatización</span>
              <span className="tag">APIs</span>
            </div>
          </div>
          <div className="skill-card">
            <h3>
              <span className="dot"></span>IA &amp; Cloud
            </h3>
            <div className="tag-row">
              <span className="tag">AWS</span>
              <span className="tag">Agentes de IA</span>
              <span className="tag">Tool use</span>
              <span className="tag">Prompt design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

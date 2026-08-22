export default function About() {
  return (
    <section id="sobre-mi">
      <div className="wrap">
        <div className="logline">
          <span className="dot idle"></span>
          seccion: quién soy
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              <strong>Trabajo en soporte de aplicaciones hace 6 años</strong>,
              resolviendo incidentes, entendiendo sistemas complejos y hablando
              con usuarios que necesitan que las cosas funcionen ya.
            </p>
            <p>
              En el camino sumé <strong>programación, AWS e inteligencia
              artificial</strong> con el fin de automatizar y 
              mejorar el mismo trabajo de soporte que vengo
              haciendo.
            </p>
            <p>
              Hoy busco orientar eso hacia roles de <strong>IA y testing de
              agentes</strong>, donde ese ojo de &quot;¿esto realmente funciona
              como debería?&quot; es justamente el skill que más importa.
            </p>
            <div className="tag-row">
              <span className="tag">Soporte de aplicaciones</span>
              <span className="tag">Troubleshooting</span>
              <span className="tag">Programación</span>
              <span className="tag">AWS</span>
              <span className="tag">Agentes de IA</span>
              <span className="tag">Testing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

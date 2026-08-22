export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="logline">
            <span className="dot"></span>
            disponible_para_roles: IA · agentes · soporte de aplicaciones
          </div>
          <h1>
            6 años haciendo
            <br />
            soporte.
            <br />
            Ahora, resuelvo problemas <span>reales con agentes de IA</span>.
          </h1>
          <p className="lead">
            Soy Matías Oviedo. Hago soporte de aplicaciones webs y mobiles, poco a poco fui
            metiéndome en programación, entornos cloud (AWS) e inteligencia artificial a modo de hobbie —
            hoy diseño y testeo sistemas que automatizan lo que antes hacía a mano.
          </p>
          <div className="stat-row">
            <div className="stat">
              <b>6</b>
              <span>años en soporte</span>
            </div>
            <div className="stat">
              <b>AWS</b>
              <span>cloud &amp; serverless</span>
            </div>
            <div className="stat">
              <b>IA</b>
              <span>agentes &amp; tool use</span>
            </div>
          </div>
        </div>
        <div className="orb-wrap">
          <div className="orb">
            {/* ACA REEMPLAZAR: foto real de Matías, por ejemplo
                <img src="/foto-matias.jpg" alt="Matías Oviedo" className="orb-avatar" />
                con la imagen puesta en /public. */}
            <span className="orb-placeholder-text">[ foto de Matías ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useTute } from "./TuteProvider";

export default function AskTute() {
  const openTute = useTute();

  return (
    <section id="tute">
      <div className="wrap tute-layout">
        <div className="tute-main">
          <div className="section-head">
            <div className="logline">
              <span className="dot"></span>
              tute.status: online
            </div>
            <h2>Conocé a Tute</h2>
            <p>
              Es mi agente de IA. Me conoce bastante y te puede contar lo que quieras saber de mí. Preguntale sobre:


            </p>
          </div>
          <div className="ask-grid">
            <div className="ask-card">
              <span className="emoji">🙋</span>
              <h4>Info profesional o personal</h4>
              <p>Mi experiencia laboral, mi stack, o cosas más generales sobre mí.</p>
            </div>
            <div className="ask-card">
              <span className="emoji">🗂️</span>
              <h4>Detalles de mis proyectos</h4>
              <p>Qué hice, con qué tecnologías, y por qué lo armé así.</p>
            </div>
            <Link href="/evals" className="ask-card">
              <span className="emoji">🧩</span>
              <h4>Cómo está hecho Tute</h4>
              <p>Te lleva directo a la sección donde explico como lo construí y como lo testeo.</p>
            </Link>
          </div>
          <button className="btn btn-primary" onClick={openTute}>
            ¡Preguntale! 
          </button>
        </div>
        <div className="orb-wrap">
          <div className="orb">
            <img src="/tute/tute-avatar-hero-waistup.webp" alt="Tute" className="orb-avatar" />
          </div>
        </div>
      </div>
    </section>
  );
}

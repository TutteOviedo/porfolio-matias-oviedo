export default function SkillsSidebar() {
  return (
    <>
      <div className="fade-up delay-3">
        <div className="section-label">Habilidades</div>
        <div className="skills-block">
          <div className="skill-row">
            <span className="skill-name">Troubleshooting</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "95%" }}></div>
            </div>
          </div>
          <div className="skill-row">
            <span className="skill-name">SQL</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "85%" }}></div>
            </div>
          </div>
          <div className="skill-row">
            <span className="skill-name">Scripting &amp; Logic</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "70%" }}></div>
            </div>
          </div>
          <div className="skill-row">
            <span className="skill-name">API Testing</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "75%" }}></div>
            </div>
          </div>
          <div className="skill-row">
            <span className="skill-name">AWS</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "60%" }}></div>
            </div>
          </div>
          <div className="skill-row">
            <span className="skill-name">IA</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "70%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up delay-4 mt-4">
        <div className="section-label">Idiomas</div>
        <div className="skills-block">
          <div className="skill-row">
            <span className="skill-name">Español</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div className="skill-row">
            <span className="skill-name">Inglés</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up delay-5 mt-4">
        <div className="section-label">Metodologías</div>
        <div className="skills-block">
          <div className="tag-list">
            <span className="tag">Agile / Scrum</span>
            <span className="tag">SLA Management</span>
            <span className="tag">Root Cause Analysis (RCA)</span>
            <span className="tag">Technical Documentation</span>
            <span className="tag">ITIL Foundations</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Diccionario de traducción del sitio.
//
// Estructura: un objeto organizado por sección (nav, hero, about, askTute,
// projects, skills, footer). Cada hoja es un `Entry` con:
//   - `es`: el texto real que hoy está hardcodeado en el componente.
//   - `en`: su traducción.
//
// El `en` es opcional a propósito: si una clave todavía no tiene traducción
// (p. ej. cuando se sume /evals), `translate()` cae automáticamente al `es`
// en vez de romper o mostrar un hueco vacío.

export type Lang = "es" | "en";

export type Entry = { es: string; en?: string };

export function translate(entry: Entry, lang: Lang): string {
  if (lang === "en" && entry.en != null && entry.en !== "") return entry.en;
  return entry.es;
}

export const dictionary = {
  // ---------------------------------------------------------------- NAV
  nav: {
    about: { es: "Sobre mí", en: "About" },
    tute: { es: "Tute", en: "Tute" },
    projects: { es: "Proyectos", en: "Projects" },
    skills: { es: "Skills", en: "Skills" },
    contact: { es: "Contacto", en: "Contact" },
  },

  // ---------------------------------------------------------------- HERO
  hero: {
    eyebrow: {
      es: "disponible_para_roles: IA · agentes · soporte de aplicaciones",
      en: "available_for_roles: AI · agents · application support",
    },
    // El <h1> se arma con estos fragmentos + <br/> + <span> de acento:
    //   {titleLine1}<br/>{titleLine2}<br/>{titleLine3Lead}<span>{titleAccent}</span>.
    titleLine1: { es: "6 años haciendo", en: "6 years doing" },
    titleLine2: { es: "soporte.", en: "support." },
    titleLine3Lead: { es: "Ahora, resuelvo problemas ", en: "Now, I solve " },
    titleAccent: {
      es: "reales con agentes de IA",
      en: "real problems with AI agents",
    },
    lead: {
      es: "Soy Matías Oviedo. Hago soporte de aplicaciones web y mobile, y poco a poco fui metiéndome en programación, entornos cloud (AWS) e inteligencia artificial - hoy diseño y testeo sistemas que automatizan lo que antes hacía a mano.",
      en: "I'm Matías Oviedo. I do support for web and mobile apps, and little by little I got into programming, cloud environments (AWS) and artificial intelligence - today I design and test systems that automate what I used to do by hand.",
    },
    stat1Value: { es: "6", en: "6" },
    stat1Label: { es: "años en soporte", en: "years in support" },
    stat2Value: { es: "AWS", en: "AWS" },
    stat2Label: { es: "cloud & serverless", en: "cloud & serverless" },
    stat3Value: { es: "IA", en: "AI" },
    stat3Label: { es: "agentes & tool use", en: "agents & tool use" },
  },

  // ---------------------------------------------------------------- ABOUT
  about: {
    eyebrow: { es: "seccion: quién soy", en: "section: who I am" },
    // Cada párrafo se arma como <p>[lead]<strong>[strong]</strong>[rest]</p>.
    p1Strong: {
      es: "Trabajo en soporte de aplicaciones hace 6 años",
      en: "I've worked in application support for 6 years",
    },
    p1Rest: {
      es: ", resolviendo incidentes, entendiendo sistemas complejos y hablando con usuarios que necesitan que las cosas funcionen ya.",
      en: ", resolving incidents, making sense of complex systems and talking to users who need things working right now.",
    },
    p2Lead: { es: "En el camino sumé ", en: "Along the way I picked up " },
    p2Strong: {
      es: "programación, AWS e inteligencia artificial",
      en: "programming, AWS and artificial intelligence",
    },
    p2Rest: {
      es: " con el fin de automatizar y mejorar el mismo trabajo de soporte que vengo haciendo.",
      en: " in order to automate and improve the very support work I've been doing.",
    },
    p3Lead: {
      es: "Hoy busco orientar eso hacia roles de ",
      en: "Now I want to steer that toward roles in ",
    },
    p3Strong: {
      es: "IA y testing de agentes",
      en: "AI and agent testing",
    },
    p3Rest: {
      es: ', donde ese ojo de "¿esto realmente funciona como debería?" es justamente el skill que más importa.',
      en: ', where that instinct for "does this actually work the way it should?" is exactly the skill that matters most.',
    },
    tag1: { es: "Soporte de aplicaciones", en: "Application support" },
    tag2: { es: "Troubleshooting", en: "Troubleshooting" },
    tag3: { es: "Programación", en: "Programming" },
    tag4: { es: "AWS", en: "AWS" },
    tag5: { es: "Agentes de IA", en: "AI agents" },
    tag6: { es: "Testing", en: "Testing" },
  },

  // -------------------------------------------------------------- ASK TUTE
  askTute: {
    eyebrow: { es: "tute.status: online", en: "tute.status: online" },
    heading: { es: "Conocé a Tute", en: "Meet Tute" },
    intro: {
      es: "Es mi agente de IA. Me conoce bastante y te puede contar lo que quieras saber de mí. Preguntale sobre:",
      en: "He's my AI agent. He knows me pretty well and can tell you whatever you want to know about me. Ask him about:",
    },
    card1Title: {
      es: "Info profesional o personal",
      en: "Professional or personal info",
    },
    card1Body: {
      es: "Mi experiencia laboral, mi stack, o cosas más generales sobre mí.",
      en: "My work experience, my stack, or more general things about me.",
    },
    card2Title: { es: "Detalles de mis proyectos", en: "Details about my projects" },
    card2Body: {
      es: "Qué hice, con qué tecnologías, y por qué lo armé así.",
      en: "What I built, with which technologies, and why I built it that way.",
    },
    card3Title: { es: "Cómo está hecho Tute", en: "How Tute is built" },
    card3Body: {
      es: "Te lleva directo a la sección donde explico como lo construí y como lo testeo.",
      en: "Takes you straight to the section where I explain how I built it and how I test it.",
    },
    cta: { es: "¡Preguntale!", en: "Ask him!" },
  },

  // -------------------------------------------------------------- PROJECTS
  projects: {
    eyebrow: { es: "seccion: trabajo hecho", en: "section: work done" },
    heading: { es: "Proyectos", en: "Projects" },
    intro: {
      es: "Lo que fui construyendo para aprender y para resolver problemas concretos.",
      en: "Things I've been building to learn and to solve concrete problems.",
    },

    cloudResumeTag: {
      es: "AWS · Cloud · Funciona como mi CV",
      en: "AWS · Cloud · Doubles as my resume",
    },
    cloudResumeTitle: { es: "Cloud Resume Challenge", en: "Cloud Resume Challenge" },
    cloudResumeDesc: {
      es: "Currículum online con arquitectura 100% serverless: S3, CloudFront, Route53, API Gateway, Lambda y DynamoDB para el contador de visitas.",
      en: "Online resume with a 100% serverless architecture: S3, CloudFront, Route53, API Gateway, Lambda and DynamoDB for the visit counter.",
    },
    cloudResumeLink: { es: "Ver en GitHub →", en: "View on GitHub →" },

    tuteTag: { es: "IA · Agentes", en: "AI · Agents" },
    tuteTitle: { es: "Tute", en: "Tute" },
    tuteDesc: {
      es: "Agente conversacional con tool use real, pensado para responder sobre mi experiencia y demostrar buenas prácticas de diseño de agentes.",
      en: "Conversational agent with real tool use, built to answer questions about my experience and to show good agent-design practices.",
    },
    tuteLink: { es: "Probarlo acá ↑", en: "Try it here ↑" },

    jobfitTag: { es: "IA · Multi-agente", en: "AI · Multi-agent" },
    jobfitTitle: { es: "JobFit", en: "JobFit" },
    jobfitDesc: {
      es: "Sistema multi-agente que analiza una oferta laboral: un researcher busca contexto de la empresa, un analyst cruza esa info con mi perfil real, y un writer arma una carta y un CV optimizado para ATS - orquestado con LangGraph.",
      en: "Multi-agent system that analyzes a job posting: a researcher gathers context on the company, an analyst cross-references it with my real profile, and a writer produces a cover letter and an ATS-optimized resume - orchestrated with LangGraph.",
    },
    jobfitLink: { es: "Ver en GitHub →", en: "View on GitHub →" },
  },

  // ---------------------------------------------------------------- SKILLS
  skills: {
    eyebrow: { es: "seccion: stack", en: "section: stack" },
    heading: { es: "Con qué trabajo", en: "What I work with" },

    group1Title: { es: "Soporte & Operaciones", en: "Support & Operations" },
    group1Tag1: { es: "Gestión de tickets", en: "Ticket management" },
    group1Tag2: { es: "Troubleshooting", en: "Troubleshooting" },
    group1Tag3: { es: "Documentación", en: "Documentation" },
    group1Tag4: { es: "Atención a usuarios", en: "User support" },

    group2Title: { es: "Programación", en: "Programming" },
    group2Tag1: { es: "Python", en: "Python" },
    group2Tag2: { es: "JavaScript", en: "JavaScript" },
    group2Tag3: { es: "Automatización", en: "Automation" },
    group2Tag4: { es: "APIs", en: "APIs" },

    group3Title: { es: "IA & Cloud", en: "AI & Cloud" },
    group3Tag1: { es: "AWS", en: "AWS" },
    group3Tag2: { es: "Agentes de IA", en: "AI agents" },
    group3Tag3: { es: "Tool use", en: "Tool use" },
    group3Tag4: { es: "Prompt design", en: "Prompt design" },
  },

  // ---------------------------------------------------------------- FOOTER
  footer: {
    heading: { es: "Hablemos.", en: "Let's talk." },
    body: {
      es: "Escribime si querés charlar sobre alguna oportunidad, o consultarme sobre alguno de mis proyectos.",
      en: "Drop me a line if you'd like to talk about an opportunity, or ask me about any of my projects.",
    },
    cvLink: { es: "Ver mi CV", en: "View my resume" },
  },
} as const;

export type Dictionary = typeof dictionary;

"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { TUTE_HEAD_IMAGES, TUTE_FULL_IMAGES, TuteState } from "@/lib/tuteImages";

export type TuteWidgetHandle = { open: () => void };

type Message = {
  role: "user" | "tute";
  text: string;
  link?: { href: string; label: string };
};

const INITIAL_MESSAGES: Message[] = [
  { role: "user", text: "¿Qué hace Matías?" },
  {
    role: "tute",
    text: "Soporte de aplicaciones hace 6-7 años, y desde ahí sumó programación, AWS e IA. ¿Querés que te cuente de algún proyecto puntual?",
  },
  { role: "user", text: "¿Cómo te hicieron a vos?" },
  {
    role: "tute",
    text: "Buena pregunta — te llevo a la explicación completa de cómo me armaron y me testean 👇",
    link: { href: "/evals", label: "Ver cómo me testean →" },
  },
];

// ACA REEMPLAZAR: esta es la respuesta de relleno que se usa en "modo demo"
// (cuando todavía no hay una API real conectada). Cuando el backend esté
// funcionando, este texto deja de usarse — la respuesta real la arma el
// Lambda de /aws/lambda/tute-handler.
const DEMO_REPLY = "Así voy a responder en vivo una vez que esté conectado a la API 👋";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TuteWidget = forwardRef<TuteWidgetHandle>(function TuteWidget(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [tuteState, setTuteState] = useState<TuteState>("idle");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const demoPlayedRef = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    });
  }

  async function playDemo() {
    await sleep(1000);
    setTuteState("thinking");
    setTyping(true);
    scrollToBottom();
    await sleep(1600);
    setTyping(false);
    setTuteState("talking");
    setMessages((prev) => [...prev, { role: "tute", text: DEMO_REPLY }]);
    scrollToBottom();
    await sleep(1400);
    setTuteState("idle");
  }

  function openWidget() {
    setIsOpen(true);
    if (!demoPlayedRef.current) {
      demoPlayedRef.current = true;
      playDemo();
    }
  }

  useImperativeHandle(ref, () => ({ open: openWidget }));

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    scrollToBottom();

    setTuteState("thinking");
    setTyping(true);
    scrollToBottom();

    let reply: Omit<Message, "role"> = { text: DEMO_REPLY };

    // ACA REEMPLAZAR: NEXT_PUBLIC_TUTE_API_URL tiene que apuntar al endpoint
    // de API Gateway que dispara el Lambda (ver /aws/lambda/tute-handler y
    // aws-roadmap.md). Configurala en .env.local. Mientras no esté seteada,
    // el chat sigue funcionando en "modo demo" para no bloquear el resto del
    // desarrollo del sitio.
    const apiUrl = process.env.NEXT_PUBLIC_TUTE_API_URL;

    if (apiUrl) {
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        // ACA REEMPLAZAR: ajustá esta línea a la forma real de la respuesta
        // que devuelva tu Lambda, por ejemplo { reply: "..." } o { answer: "..." }.
        reply = { text: data.reply ?? DEMO_REPLY };
      } catch (err) {
        reply = { text: "Uy, no pude conectarme. Probá de nuevo en un rato." };
      }
    } else {
      await sleep(2000); // simula el tiempo de "pensar" mientras no hay API real conectada

      // ACA REEMPLAZAR: esto es un placeholder de prueba nomás, para tener
      // algo que mostrar en modo demo — busca la palabra "evals" a lo bruto
      // en el texto del usuario. Cuando el backend real esté conectado esta
      // lógica no importa en absoluto: es la Lambda la que decide, según el
      // significado de la pregunta (no la palabra literal), cuándo llamar a
      // la herramienta redirigir_a_evals().
      if (text.toLowerCase().includes("evals")) {
        reply = {
          text: "Tengo tool use real y hago RAG sobre la base de conocimiento de Matías — no invento nada. Podés ver los casos de prueba que uso para chequear que respondo bien 👇",
          link: { href: "/evals", label: "Ver evals →" },
        };
      }
    }

    setTyping(false);
    setTuteState("talking");
    setMessages((prev) => [...prev, { role: "tute", ...reply }]);
    scrollToBottom();

    await sleep(1300);
    setTuteState("idle");
    setBusy(false);
  }

  return (
    <>
      <div className={`tute-widget${isOpen ? " open" : ""}`}>
        <button
          className="tute-widget-close"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar chat"
        >
          ✕
        </button>
        <div className="tute-header">
          <img className="tute-avatar-img" src={TUTE_HEAD_IMAGES[tuteState]} alt="Tute" />
          <div>
            <b>Tute</b>
            <span>● en línea</span>
          </div>
        </div>
        <div className="chat-log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role === "user" ? "user" : "tute"}`}>
              {m.text}
              {m.link && (
                <Link href={m.link.href} className="bubble-link">
                  {m.link.label}
                </Link>
              )}
            </div>
          ))}
          {typing && (
            <div className="bubble tute">
              <span className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          )}
        </div>
        <div className="chat-input-mock">
          <input
            type="text"
            value={input}
            placeholder="Escribile algo a Tute..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button className="send" onClick={sendMessage} aria-label="Enviar mensaje">
            ➤
          </button>
        </div>
      </div>

      <button
        className={`tute-fab${isOpen ? " open" : ""}`}
        onClick={() => (isOpen ? setIsOpen(false) : openWidget())}
        aria-label="Abrir chat con Tute"
      >
        <img className="fab-avatar-img" src={TUTE_FULL_IMAGES[tuteState]} alt="Tute" />
      </button>
    </>
  );
});

export default TuteWidget;

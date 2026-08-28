"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

export default function VisitCounter() {
  const [status, setStatus] = useState<Status>("loading");
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://vanghn1sdk.execute-api.us-east-1.amazonaws.com/default/GetCloudResumeCount")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setVisits(data.visits);
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("No se pudo cargar el contador:", err);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="counter-bar fade-up delay-2">
      <div className="pulse"></div>
      <div>
        <div className="counter-label">Visitas al perfil</div>
        <div className="counter-value">
          {status === "loading" ? "-" : status === "error" ? "Error" : visits}
        </div>
        <div className="counter-note">
          {status === "success" ? "Visitas registradas" : "Conectar a API para activar"}
        </div>
      </div>
    </div>
  );
}

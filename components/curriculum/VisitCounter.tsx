"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

type Status = "loading" | "success" | "error";

export default function VisitCounter() {
  const { t } = useLanguage();
  const d = dictionary.curriculum.header;
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

  const note =
    status === "loading"
      ? t(d.visitsLoading)
      : status === "error"
        ? t(d.visitsConnect)
        : t(d.visitsRecorded);

  return (
    <div className="counter-bar fade-up delay-2">
      <div className="pulse"></div>
      <div>
        <div className="counter-label">{t(d.visitsLabel)}</div>
        <div className="counter-value">
          {status === "loading" ? "-" : status === "error" ? t(d.visitsError) : visits}
        </div>
        <div className="counter-note">{note}</div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { PLAY_STORE } from "@/lib/links";

const GUARDADO = "zc-aviso-play-fechado";
/* Fechou, não volta tão cedo: uma semana. */
const SILENCIO_MS = 7 * 24 * 60 * 60 * 1000;

function ehAndroid() {
  const dados = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  if (dados?.platform) return dados.platform.toLowerCase() === "android";
  return /android/i.test(navigator.userAgent);
}

function fechadoHaPouco() {
  try {
    const quando = Number(localStorage.getItem(GUARDADO));
    return Number.isFinite(quando) && Date.now() - quando < SILENCIO_MS;
  } catch {
    return false;
  }
}

/**
 * No celular Android, um aviso pequeno no rodapé chama para o app na Play
 * Store. Aparece um pouco depois de a página abrir, para não competir com o
 * título, e some por uma semana quando a pessoa fecha.
 */
export function AvisoAndroid() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!ehAndroid() || fechadoHaPouco()) return;
    const timer = window.setTimeout(() => setVisivel(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visivel) return null;

  const fechar = () => {
    setVisivel(false);
    try {
      localStorage.setItem(GUARDADO, String(Date.now()));
    } catch {
      // Sem armazenamento, o aviso volta na próxima visita.
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Instalar o app ZulCode"
      className="animate-sobe-aviso fixed inset-x-3 z-[60] mx-auto flex max-w-md items-center gap-3 rounded-2xl border-2 border-border bg-card p-3 shadow-xl"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ícone pequeno e fixo */}
      <img src="/icon-light.png" alt="" className="size-11 shrink-0 rounded-xl dark:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element -- ícone pequeno e fixo */}
      <img src="/icon-dark.png" alt="" className="hidden size-11 shrink-0 rounded-xl dark:block" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black leading-tight text-foreground">ZulCode no seu Android</p>
        <p className="text-xs leading-tight text-muted-foreground">Grátis na Play Store.</p>
      </div>
      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        onClick={fechar}
        className="group relative shrink-0 rounded-[14px] outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        <span aria-hidden className="absolute inset-x-0 rounded-[14px] bg-primary brightness-75" style={{ top: 4, bottom: -4 }} />
        <span className="relative top-0 flex items-center gap-1.5 rounded-[14px] bg-primary px-3.5 py-2.5 text-xs font-black uppercase tracking-[0.06em] text-primary-foreground transition-[top] duration-100 group-active:top-[3px]">
          <FaGooglePlay className="size-3.5" aria-hidden />
          Instalar
        </span>
      </a>
      <button
        type="button"
        onClick={fechar}
        aria-label="Fechar aviso"
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

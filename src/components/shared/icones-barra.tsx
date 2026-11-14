/* eslint-disable @next/next/no-img-element -- A chama é uma arte pequena e fixa. */
import { useId } from "react";
import { cn } from "@/lib/utils";

/* Os ícones da barra do app (chama, rupee e pena), com os mesmos desenhos do
   frontend, para a landing mostrar exatamente o que a pessoa vai ver. */

export function Chama({ faixa = "quente", className, apagada = false }: { faixa?: "quente" | "violeta" | "agua"; className?: string; apagada?: boolean }) {
  return (
    <img
      src={`/barra/chama-${faixa}.webp`}
      alt=""
      draggable={false}
      className={cn("h-full w-auto select-none", className)}
      style={apagada ? { filter: "grayscale(1) opacity(.45)" } : undefined}
    />
  );
}

const ATRAS = "M14.99 2.74 19.82 5.87v6.28L14.99 15.28 10.16 12.15V5.87z";
const FRENTE = "M9.01 8.72 13.84 11.85v6.28L9.01 21.26 4.18 18.13v-6.28z";
const BRILHO = "M8.65 10.71 6.57 12.06l.83 1.32 2.1-1.35z";

export function Rupee({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5 overflow-visible", className)}>
      <mask id={`folga-${id}`}>
        <rect width="24" height="24" fill="#fff" />
        <path d={FRENTE} fill="#000" stroke="#000" strokeWidth="4.8" strokeLinejoin="round" />
      </mask>
      <mask id={`brilho-${id}`}>
        <rect x="-6" y="-6" width="36" height="36" fill="#fff" />
        <path d={BRILHO} fill="#000" />
      </mask>
      <path d={ATRAS} fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" mask={`url(#folga-${id})`} />
      <path d={FRENTE} fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" mask={`url(#brilho-${id})`} />
    </svg>
  );
}

const PALHETA =
  "M11.999 41a32.85 32.85 0 0 0 16.68-4.52c.665-.39.61-1.348-.081-1.691L25 33c3.303 0 10-1.337 10-1.337c7.147-6.948 10.78-16.97 9.848-26.842a1.85 1.85 0 0 0-1.67-1.67A33.2 33.2 0 0 0 28 5.25S26.348 9.142 26 11l-2.024-2.817a.98.98 0 0 0-1.309-.271C13.264 13.687 7 23.36 7 36.5";
const HASTE = "M3 45c5-14.5 21-27 34-34";
const PONTA = "M3 45c2-5.8 5-11.2 8.5-16";
const LADO_DE_CIMA = "M3 45C8 30.5 24 18 37 11L56 1V-8H-8V56Z";
const LADO_DE_BAIXO = "M3 45C8 30.5 24 18 37 11L56 1V56H-6Z";

/* O desenho é o "feather-pen" do Streamline Plump (CC BY 4.0), como no app. */
export function Pena({ className }: { className?: string }) {
  const id = useId();
  const cheia = <path d={PALHETA} fill="currentColor" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" />;
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-5 overflow-visible", className)}>
      <defs>
        <mask id={`haste-${id}`}>
          <rect x="-10" y="-10" width="70" height="70" fill="#fff" />
          <path d={HASTE} fill="none" stroke="#000" strokeWidth={3.4} strokeLinecap="round" />
        </mask>
        <clipPath id={`cima-${id}`}><path d={LADO_DE_CIMA} /></clipPath>
        <clipPath id={`baixo-${id}`}><path d={LADO_DE_BAIXO} /></clipPath>
      </defs>
      <g mask={`url(#haste-${id})`}>
        <g clipPath={`url(#cima-${id})`}>{cheia}</g>
        <g clipPath={`url(#baixo-${id})`} opacity={0.5}>{cheia}</g>
      </g>
      <path d={PONTA} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

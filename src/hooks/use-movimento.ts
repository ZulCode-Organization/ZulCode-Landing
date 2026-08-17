"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: no-preference)";

let consulta: MediaQueryList | null = null;
function obterConsulta() {
  if (!consulta) consulta = window.matchMedia(CONSULTA);
  return consulta;
}

function assinar(aoMudar: () => void) {
  const mq = obterConsulta();
  mq.addEventListener("change", aoMudar);
  return () => mq.removeEventListener("change", aoMudar);
}

const lerCliente = () => obterConsulta().matches;
const lerFalso = () => false;
const lerVerdadeiro = () => true;

/* Diz se o usuário aceita animação (`prefers-reduced-motion: no-preference`).
   Como media query não existe no servidor, `padraoNoServidor` escolhe qual é
   o chute seguro de cada caso: `false` pra quem só liga a animação (o 3D não
   nasce ligado), `true` pra quem já mostra o estado final quando o movimento
   está desligado (o editor não pode entregar o código pronto no HTML e depois
   apagá-lo na hidratação).

   O nome tem que começar com "use" — é o que a regra de hooks do ESLint
   reconhece; o resto do código continua em português. */
export function useMovimentoPermitido(padraoNoServidor = false) {
  return useSyncExternalStore(
    assinar,
    lerCliente,
    padraoNoServidor ? lerVerdadeiro : lerFalso
  );
}

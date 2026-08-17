"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Map, Trophy } from "lucide-react";
import { Reveal } from "../reveal";
import { CardLenticular } from "./card-lenticular";
import { CardTilt } from "./card-tilt";

/* Galeria de cartões lenticulares: a frente traz a etapa, o verso a
   explicação, e a virada acontece no hover, no foco do teclado ou no toque. */
const ETAPAS = [
  {
    numero: "01",
    apelido: "@escolha-a-trilha",
    icone: <Map className="size-7" />,
    titulo: "Escolha a trilha",
    texto:
      "Você entra, escolhe a linguagem e recebe uma sequência de fases curtas — uma destrava a outra, sem você ter que montar cronograma.",
    status: "fases em ordem",
    linkTexto: "ver as linguagens",
    link: "#linguagens",
  },
  {
    numero: "02",
    apelido: "@resolva-o-desafio",
    icone: <Code2 className="size-7" />,
    titulo: "Resolva o desafio",
    texto:
      "Cada lição termina com código pra escrever. Você roda ali no navegador e vê o resultado na hora, sem instalar nada.",
    status: "roda no navegador",
    linkTexto: "ver o editor",
    link: "#metodologia",
  },
  {
    numero: "03",
    apelido: "@ganhe-xp",
    icone: <Trophy className="size-7" />,
    titulo: "Ganhe XP e avance",
    texto:
      "Acertou, leva XP e abre a próxima fase. Errou, perde uma vida e tenta de novo — o que te obriga a pensar antes de chutar.",
    status: "XP, nível e ofensiva",
    linkTexto: "começar agora",
    link: "https://zulcode-app.vercel.app/login/",
  },
];

function Frente({ etapa }: { etapa: (typeof ETAPAS)[number] }) {
  return (
    <span className="flex h-full w-full flex-col justify-between p-5">
      <span className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/12 text-primary">
          {etapa.icone}
        </span>
        <span className="font-mono text-xs font-semibold text-muted-foreground/70">
          {etapa.numero}
        </span>
      </span>
      <span className="block">
        <span className="block text-base font-semibold text-foreground">{etapa.titulo}</span>
        <span className="block font-mono text-[11px] text-primary">{etapa.apelido}</span>
      </span>
    </span>
  );
}

function Verso({ etapa }: { etapa: (typeof ETAPAS)[number] }) {
  return (
    <span className="flex h-full w-full flex-col justify-between bg-secondary/50 p-5">
      <span className="text-[13px] leading-relaxed text-muted-foreground">{etapa.texto}</span>
      <span className="flex items-center gap-2 text-[11px] font-semibold text-primary">
        <span className="size-1.5 rounded-full bg-primary" />
        {etapa.status}
      </span>
    </span>
  );
}

export default function ComoFunciona() {
  const cartoes = useRef<(HTMLButtonElement | null)[]>([]);

  /* Setas do teclado andam pela galeria, como num carrossel. */
  const aoTeclar = (indice: number) => (evento: React.KeyboardEvent) => {
    const passo =
      evento.key === "ArrowRight" ? 1 : evento.key === "ArrowLeft" ? -1 : 0;
    if (passo === 0) return;
    evento.preventDefault();
    const total = ETAPAS.length;
    const proximo = (indice + passo + total) % total;
    cartoes.current[proximo]?.focus();
  };

  return (
    <section id="como-funciona" className="w-full px-6 py-24 sm:px-10 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Como funciona
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground md:text-4xl">
            Três passos, e o resto é repetir
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Passe o cursor (ou toque) num cartão pra ver o verso.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ETAPAS.map((etapa, i) => (
            <Reveal key={etapa.numero} delay={i * 90}>
              <CardTilt intensidade={10}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl">
                  <CardLenticular
                    frente={<Frente etapa={etapa} />}
                    verso={<Verso etapa={etapa} />}
                    rotulo={`${etapa.numero}. ${etapa.titulo}. ${etapa.texto}`}
                    aoFocar={(elemento) => {
                      cartoes.current[i] = elemento;
                    }}
                    onKeyDown={aoTeclar(i)}
                  />

                  <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
                    <span className="text-xs text-muted-foreground">passo {etapa.numero}</span>
                    <Link
                      href={etapa.link}
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      {etapa.linkTexto}
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </CardTilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { FaHtml5, FaJava, FaPython, FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { SiCplusplus } from "react-icons/si";
import { Reveal } from "../reveal";
import LogoLoop from "../react-bits/LogoLoop";
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import TerminalHello from "./terminal-hello";

const ITENS = [
  { nome: "JavaScript", icone: <IoLogoJavascript /> },
  { nome: "Python", icone: <FaPython /> },
  { nome: "React", icone: <FaReact /> },
  { nome: "Java", icone: <FaJava /> },
  { nome: "C++", icone: <SiCplusplus /> },
  { nome: "HTML", icone: <FaHtml5 /> },
  { nome: "CSS", icone: <FaCss3Alt /> },
];

/* Cada item do laço: o ícone herda o tamanho do `logoHeight` (o LogoLoop põe
   isso como font-size do item) e o nome fica com corpo próprio. */
const LOGOS = ITENS.map((item) => ({
  node: (
    <span className="group flex cursor-default flex-col items-center gap-3">
      <span className="text-muted-foreground transition-colors duration-200 group-hover:text-primary">
        {item.icone}
      </span>
      <span className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-primary sm:text-sm">
        {item.nome}
      </span>
    </span>
  ),
  title: item.nome,
  ariaLabel: item.nome,
}));

export default function Stack() {
  /* Quem pediu menos movimento recebe a faixa parada (velocidade zero) em vez
     de nenhuma faixa — os nomes continuam todos visíveis. */
  const podeAnimar = useMovimentoPermitido();

  return (
    <section id="linguagens" className="w-full border-y border-border bg-secondary/40 py-20">
      <Reveal className="mb-10 px-6 text-center">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Tecnologias que você vai dominar
        </h2>
      </Reveal>

      {/* Carrossel do React Bits: o laço é calculado por requestAnimationFrame
          com o número de cópias medido em tempo real, então ele nunca dá o
          salto que o keyframe de -50% dava, e desacelera suave no hover. */}
      <div className="py-4">
        <LogoLoop
          logos={LOGOS}
          speed={podeAnimar ? 62 : 0}
          direction="left"
          logoHeight={44}
          gap={72}
          hoverSpeed={12}
          fadeOut
          scaleOnHover
          ariaLabel="Linguagens com trilha no ZulCode"
        />
      </div>

      <div className="mx-auto mt-14 max-w-3xl px-6 sm:px-10">
        <Reveal className="mb-6 text-center">
          <h3 className="text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground md:text-4xl">
            O mesmo &quot;olá, mundo&quot; em cada uma
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Clique numa linguagem e veja o programa que a plataforma te ensina a
            escrever no primeiro dia.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <TerminalHello />
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import { useNaTela } from "@/hooks/use-na-tela";
import { Reveal } from "../reveal";

/* O ciclo de uma aula, um verbo por passo. Cada frase descreve o que o app faz
   naquele passo, sem promessa de resultado. */
const VERBOS = [
  { verbo: "aprenda", texto: "Lições curtas explicam um conceito de cada vez, com exemplo." },
  { verbo: "pratique", texto: "Depois da lição vêm os desafios: você escreve o código e vê o resultado." },
  { verbo: "erre", texto: "Errar custa uma pena, e as penas recarregam. Erro faz parte da aula." },
  { verbo: "corrija", texto: "Quando a resposta não passa, você ajusta o código e tenta de novo." },
  { verbo: "repita", texto: "Um pouco por dia mantém a ofensiva acesa." },
  { verbo: "conquiste", texto: "Cada acerto rende XP e rupees, e a trilha abre a próxima aula." },
];

const PASSO_MS = 2600;
/* Depois de escolher um verbo na mão, a troca automática espera um pouco. */
const PAUSA_MS = 9000;

export default function VerboCodigo() {
  const podeAnimar = useMovimentoPermitido();
  const { ref, naTela } = useNaTela<HTMLElement>(0.3);
  const [atual, setAtual] = useState(0);
  const [aberto, setAberto] = useState(false);
  const pausaAte = useRef(0);
  const seletor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!podeAnimar || !naTela || aberto) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausaAte.current) return;
      setAtual((a) => (a + 1) % VERBOS.length);
    }, PASSO_MS);
    return () => window.clearInterval(id);
  }, [podeAnimar, naTela, aberto]);

  // A lista fecha no Esc e no clique fora.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    const aoClicar = (e: PointerEvent) => {
      if (!seletor.current?.contains(e.target as Node)) setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    window.addEventListener("pointerdown", aoClicar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      window.removeEventListener("pointerdown", aoClicar);
    };
  }, [aberto]);

  const escolher = useCallback((i: number) => {
    setAtual(i);
    setAberto(false);
    pausaAte.current = Date.now() + PAUSA_MS;
  }, []);

  const item = VERBOS[atual];

  return (
    <section ref={ref} id="verbos" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        {/* Fica por cima da janela de código: a lista de verbos abre sobre ela. */}
        <Reveal className="relative z-20 flex min-w-0 flex-col items-start">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Programar é verbo</span>

          {/* A linha de código: o verbo troca sozinho e também abre uma lista. */}
          <h2 className="mt-6 flex items-baseline whitespace-nowrap text-[clamp(1.9rem,8.6vw,3.6rem)] font-bold leading-[1.15] tracking-tight xl:text-[4rem]">
            <span ref={seletor} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={aberto}
                aria-label={`Verbo: ${item.verbo}. Trocar`}
                onClick={() => setAberto((a) => !a)}
                className="flex cursor-pointer items-baseline rounded-lg text-primary underline decoration-primary/40 decoration-dashed decoration-[0.06em] underline-offset-[0.14em] outline-none transition-[text-decoration-color] hover:decoration-primary focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <span key={atual} aria-hidden className="inline-flex">
                  {item.verbo.split("").map((letra, i) => (
                    <span key={i} className="animate-letra-entra" style={{ animationDelay: `${i * 30}ms` }}>
                      {letra}
                    </span>
                  ))}
                </span>
              </button>

              {aberto && (
                <ul
                  role="listbox"
                  aria-label="Escolha um verbo"
                  className="animate-pop-in absolute left-0 top-[calc(100%+0.5rem)] z-30 w-max min-w-[12rem] rounded-[14px] border-2 border-primary bg-card p-1.5 text-xl font-semibold tracking-normal shadow-2xl sm:text-2xl"
                >
                  {VERBOS.map((v, i) => (
                    <li key={v.verbo} role="option" aria-selected={i === atual}>
                      <button
                        type="button"
                        onClick={() => escolher(i)}
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between gap-6 rounded-[10px] px-3.5 py-1.5 text-left transition-colors sm:py-2",
                          i === atual ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10"
                        )}
                      >
                        {v.verbo}
                        {i === atual && <Check className="size-5" strokeWidth={3} aria-hidden />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </span>
            <span className="text-orange-500">.</span>
            <span className="text-foreground">agora</span>
            <span className="text-muted-foreground/50">()</span>
          </h2>

          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronsUpDown className="size-3.5" aria-hidden />
            Toque no verbo para trocar
          </button>

          <p key={atual} aria-live="polite" className="animate-fade-in mt-5 min-h-[3.5rem] max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {item.texto}
          </p>
        </Reveal>

        {/* A lista cresce a cada verbo e recomeça no fim da volta. */}
        <Reveal delay={120}>
          <div className="zc-superficie overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">uma-aula.js</span>
            </div>
            <pre className="min-h-[17rem] overflow-x-auto px-5 py-5 font-mono text-[0.9rem] leading-7 sm:min-h-[18.5rem] sm:text-[1.02rem] sm:leading-8">
              <code>
                <span className="text-violet-500">const</span> <span className="text-foreground">aula</span>{" "}
                <span className="text-muted-foreground">=</span> <span className="text-muted-foreground">[</span>
                {"\n"}
                {VERBOS.slice(0, atual + 1).map((v, i) => (
                  <span key={v.verbo} className={cn("block", i === atual && "animate-fade-in-up")}>
                    {"  "}
                    <span className={i === atual ? "text-primary" : "text-emerald-600 dark:text-emerald-400"}>
                      &quot;{v.verbo}&quot;
                    </span>
                    <span className="text-muted-foreground">,</span>
                  </span>
                ))}
                <span className="text-muted-foreground">]</span>
                <span className="text-orange-500">.</span>
                <span className="text-foreground">agora</span>
                <span className="text-muted-foreground">()</span>
                <span className="animate-caret ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] bg-primary" aria-hidden />
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

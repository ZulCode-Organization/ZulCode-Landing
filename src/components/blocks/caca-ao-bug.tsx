"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import { useNaTela } from "@/hooks/use-na-tela";
import { Reveal } from "../reveal";

const COLS = 9;
const LINS = 6;
const GLIFOS = "A86C2B5G3J40FV31";
/* A grade é sempre a mesma (nada de sorteio no render): o servidor e o
   navegador desenham os mesmos caracteres. */
const GRADE = Array.from({ length: LINS }, (_, l) =>
  Array.from({ length: COLS }, (_, c) => GLIFOS[(l * 7 + c * 5 + l * c) % GLIFOS.length])
);

type Casa = { l: number; c: number };
const PASSO_MS = 420;
/* Sem ninguém mexendo por esse tempo, a mira volta a caçar sozinha. */
const OCIOSO_MS = 3500;

function outraCasa(evitar: Casa): Casa {
  for (;;) {
    const casa = { l: Math.floor(Math.random() * LINS), c: Math.floor(Math.random() * COLS) };
    if (Math.abs(casa.l - evitar.l) + Math.abs(casa.c - evitar.c) >= 3) return casa;
  }
}

/**
 * Um brinquedo: a grade de caracteres esconde um bug, e a mira (a linha e a
 * coluna acesas) acompanha o ponteiro. Pegou, o placar estoura em anel e o bug
 * muda de lugar. Parada, a mira caça sozinha, para a seção nunca ficar morta.
 */
export default function CacaAoBug() {
  const podeAnimar = useMovimentoPermitido();
  const { ref, naTela } = useNaTela<HTMLElement>(0.3);
  const [mira, setMira] = useState<Casa>({ l: 2, c: 2 });
  const [bug, setBug] = useState<Casa>({ l: 4, c: 6 });
  const [achados, setAchados] = useState(0);
  const [estouro, setEstouro] = useState<(Casa & { id: number; n: number }) | null>(null);
  const ultimoToque = useRef(0);
  const estado = useRef({ mira, bug, achados });

  useEffect(() => {
    estado.current = { mira, bug, achados };
  }, [mira, bug, achados]);

  const pegar = useCallback(() => {
    const { bug: onde, achados: quantos } = estado.current;
    setAchados(quantos + 1);
    setEstouro({ ...onde, id: Date.now(), n: quantos + 1 });
    setBug(outraCasa(onde));
  }, []);

  // A caça automática: um passo por vez em direção ao bug.
  useEffect(() => {
    if (!podeAnimar || !naTela) return;
    const id = window.setInterval(() => {
      if (Date.now() - ultimoToque.current < OCIOSO_MS) return;
      const { mira: m, bug: b } = estado.current;
      if (m.l === b.l && m.c === b.c) {
        pegar();
        return;
      }
      setMira(m.c !== b.c ? { l: m.l, c: m.c + Math.sign(b.c - m.c) } : { l: m.l + Math.sign(b.l - m.l), c: m.c });
    }, PASSO_MS);
    return () => window.clearInterval(id);
  }, [podeAnimar, naTela, pegar]);

  const mirar = useCallback((casa: Casa) => {
    ultimoToque.current = Date.now();
    setMira(casa);
  }, []);

  const placar = String(achados).padStart(2, "0");

  return (
    <section ref={ref} id="caca-ao-bug" className="w-full border-y border-border bg-secondary/40 px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="flex flex-col items-start">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Só de brincadeira</span>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-balance text-foreground md:text-5xl">
            Caça ao bug
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Quem programa passa boa parte do tempo procurando o que está errado. Treine o olho:
            ache o inseto escondido na grade e clique nele.
          </p>

          <div className="mt-8 flex items-end gap-5">
            <div className="rounded-2xl border-2 border-border bg-card px-5 py-3">
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Bugs achados</p>
              <p key={achados} className="animate-pop-in font-mono text-5xl font-bold tabular-nums leading-none text-primary" aria-live="polite">
                {placar}
              </p>
            </div>
            <p className="pb-1 font-mono text-xs leading-relaxed text-muted-foreground">
              linha {String(mira.l + 1).padStart(2, "0")}
              <br />
              coluna {String(mira.c + 1).padStart(2, "0")}
            </p>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            No app, os desafios são com código de verdade.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-[640px] select-none rounded-3xl border-2 border-border bg-card p-3 sm:p-4">
            <div className="relative" style={{ aspectRatio: `${COLS} / ${LINS}` }}>
              {/* A mira: uma faixa na linha e outra na coluna. */}
              <span
                aria-hidden
                className="absolute inset-x-0 rounded-md bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-[top] duration-200 ease-out motion-reduce:transition-none"
                style={{ top: `${(mira.l / LINS) * 100}%`, height: `${100 / LINS}%` }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 rounded-md bg-gradient-to-b from-primary/0 via-primary to-primary/0 transition-[left] duration-200 ease-out motion-reduce:transition-none"
                style={{ left: `${(mira.c / COLS) * 100}%`, width: `${100 / COLS}%` }}
              />
              <span
                aria-hidden
                className="absolute rounded-md bg-background ring-2 ring-primary transition-[top,left] duration-200 ease-out motion-reduce:transition-none"
                style={{
                  top: `${(mira.l / LINS) * 100}%`,
                  left: `${(mira.c / COLS) * 100}%`,
                  width: `${100 / COLS}%`,
                  height: `${100 / LINS}%`,
                }}
              />

              <div
                className="relative grid size-full font-mono text-[clamp(0.85rem,2.6vw,1.35rem)] font-bold"
                style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${LINS}, 1fr)` }}
              >
                {GRADE.map((linha, l) =>
                  linha.map((glifo, c) => {
                    const naMira = l === mira.l && c === mira.c;
                    const naFaixa = l === mira.l || c === mira.c;
                    const perto = Math.max(Math.abs(l - mira.l), Math.abs(c - mira.c)) <= 2;
                    const cor = naMira
                      ? "text-primary"
                      : naFaixa
                        ? "text-white"
                        : perto
                          ? "text-primary"
                          : "text-muted-foreground/30";
                    if (l === bug.l && c === bug.c) {
                      return (
                        <button
                          key={`${l}-${c}`}
                          type="button"
                          aria-label="Pegar o bug"
                          onPointerEnter={() => mirar({ l, c })}
                          onFocus={() => mirar({ l, c })}
                          onClick={() => {
                            mirar({ l, c });
                            pegar();
                          }}
                          className={cn("flex cursor-pointer items-center justify-center outline-none transition-colors duration-200", cor)}
                        >
                          <Bug className="size-[52%]" strokeWidth={2.6} aria-hidden />
                        </button>
                      );
                    }
                    return (
                      <span
                        key={`${l}-${c}`}
                        aria-hidden
                        onPointerEnter={() => mirar({ l, c })}
                        onPointerDown={() => mirar({ l, c })}
                        className={cn("flex items-center justify-center transition-colors duration-200", cor)}
                      >
                        {glifo}
                      </span>
                    );
                  })
                )}
              </div>

              {/* O placar novo estoura em anel a partir de onde o bug estava. */}
              {estouro && (
                <span
                  key={estouro.id}
                  aria-hidden
                  className="pointer-events-none absolute z-20"
                  style={{ left: `${((estouro.c + 0.5) / COLS) * 100}%`, top: `${((estouro.l + 0.5) / LINS) * 100}%` }}
                >
                  {Array.from({ length: 8 }, (_, k) => {
                    const a = (k / 8) * Math.PI * 2;
                    return (
                      <span
                        key={k}
                        className="animate-numero-voa absolute font-mono text-sm font-bold tabular-nums text-primary sm:text-base"
                        style={
                          {
                            "--dx": `${Math.round(Math.cos(a) * 78)}px`,
                            "--dy": `${Math.round(Math.sin(a) * 78)}px`,
                            animationDelay: `${k * 25}ms`,
                          } as React.CSSProperties
                        }
                      >
                        {String(estouro.n).padStart(2, "0")}
                      </span>
                    );
                  })}
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

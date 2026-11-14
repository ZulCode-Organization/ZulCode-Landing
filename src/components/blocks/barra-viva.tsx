"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import { cn } from "@/lib/utils";
import { Reveal } from "../reveal";
import { CardTilt } from "./card-tilt";
import { Chama, Pena, Rupee } from "../shared/icones-barra";

/* Roda um passo a cada `ms` enquanto o elemento está na tela e a pessoa aceita
   movimento. Devolve quantos passos já rodaram. */
function useRelogio(ms: number) {
  const podeAnimar = useMovimentoPermitido();
  const ref = useRef<HTMLDivElement>(null);
  const [passo, setPasso] = useState(0);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!podeAnimar || !visivel) return;
    const id = window.setInterval(() => setPasso((p) => p + 1), ms);
    return () => window.clearInterval(id);
  }, [podeAnimar, visivel, ms]);

  return { ref, passo, podeAnimar };
}

function Cartao({ titulo, texto, cor, children }: { titulo: string; texto: string; cor: string; children: ReactNode }) {
  return (
    <CardTilt intensidade={8}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl">
        <div className={cn("relative flex h-56 items-center justify-center overflow-hidden", cor)}>{children}</div>
        <div className="flex flex-1 flex-col gap-2 border-t-2 border-border p-6">
          <h3 className="text-xl font-black text-foreground">{titulo}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{texto}</p>
        </div>
      </div>
    </CardTilt>
  );
}

/* A ofensiva: os dias sobem um a um e, aos 30 e aos 100, a chama troca de cor
   — as mesmas faixas do app. */
const MARCOS_DA_CHAMA: { desde: number; faixa: "quente" | "violeta" | "agua"; cor: string }[] = [
  { desde: 0, faixa: "quente", cor: "text-orange-500" },
  { desde: 30, faixa: "violeta", cor: "text-violet-500" },
  { desde: 100, faixa: "agua", cor: "text-cyan-500" },
];
const DIAS_DEMO = [1, 2, 3, 7, 14, 29, 30, 45, 99, 100, 120];

function Ofensiva() {
  const { ref, passo } = useRelogio(1100);
  const dias = DIAS_DEMO[passo % DIAS_DEMO.length];
  const marco = [...MARCOS_DA_CHAMA].reverse().find((m) => dias >= m.desde)!;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div key={marco.faixa} className="animate-pop-in h-28">
        <div className="animate-chama-viva h-full">
          <Chama faixa={marco.faixa} />
        </div>
      </div>
      <span key={dias} className={cn("animate-pop-in text-4xl font-black tabular-nums", marco.cor)}>
        {dias} {dias === 1 ? "dia" : "dias"}
      </span>
      <div className="flex gap-2">
        {MARCOS_DA_CHAMA.map((m) => (
          <span
            key={m.faixa}
            className={cn(
              "flex items-center gap-1 rounded-full border-2 px-2.5 py-0.5 text-[0.7rem] font-black transition-colors",
              m.faixa === marco.faixa ? "border-current bg-card " + m.cor : "border-border text-muted-foreground"
            )}
          >
            <span className="h-3.5"><Chama faixa={m.faixa} /></span>
            {m.desde === 0 ? "início" : `${m.desde}+`}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Os rupees: a cada passo uma aula é concluída, três rupees voam até o saldo e
   o número sobe. */
function Rupees() {
  const { ref, passo, podeAnimar } = useRelogio(1600);
  const saldo = 240 + passo * 10;
  return (
    <div ref={ref} className="relative flex flex-col items-center gap-4">
      <div className="relative flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-5 py-3 text-3xl font-black text-emerald-500">
        <Rupee className="size-8" />
        <span key={saldo} className="animate-pop-in tabular-nums">{saldo}</span>
        {podeAnimar &&
          [0, 1, 2].map((k) => (
            <span
              key={`${passo}-${k}`}
              className="animate-rupee-voa absolute left-3 top-2 text-emerald-500"
              style={{ ["--de-x" as string]: `${-70 + k * 60}px`, ["--de-y" as string]: "110px", animationDelay: `${k * 90}ms` }}
            >
              <Rupee className="size-6" />
            </span>
          ))}
      </div>
      <span className="relative block">
        <span aria-hidden className="absolute inset-x-0 rounded-2xl bg-primary brightness-75" style={{ top: 5, bottom: -5 }} />
        <span className="relative flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-black uppercase tracking-[0.08em] text-primary-foreground">
          Aula concluída
          <span className="flex items-center gap-0.5 rounded-lg bg-black/20 px-1.5 py-0.5 text-xs">
            +10 <Rupee className="size-3.5" />
          </span>
        </span>
      </span>
    </div>
  );
}

/* As penas: um erro derruba uma, e ela volta enchendo a barrinha de recarga. */
function Penas() {
  const { ref, passo, podeAnimar } = useRelogio(2400);
  const fase = passo % 3;
  const total = fase === 0 ? 5 : 4;
  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative flex gap-1.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={cn("transition-colors duration-300", i < total ? "text-violet-500" : "text-muted-foreground/30")}>
            <Pena className="size-9" />
          </span>
        ))}
        {podeAnimar && fase === 1 && (
          <span key={passo} className="animate-pena-cai absolute right-0 top-0 text-violet-500">
            <Pena className="size-9" />
          </span>
        )}
      </div>
      <div className="flex w-56 flex-col gap-1.5">
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full bg-violet-500", fase === 2 && podeAnimar && "transition-[width] duration-[2200ms] ease-linear")}
            style={{ width: fase === 2 ? "100%" : fase === 1 ? "8%" : "0%" }}
          />
        </div>
        <span className="text-center text-xs font-bold text-muted-foreground">
          {fase === 0 ? "5 de 5 penas" : fase === 1 ? "Errou: −1 pena" : "A pena está voltando…"}
        </span>
      </div>
    </div>
  );
}

export default function BarraViva() {
  return (
    <section id="barra-viva" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">O jogo por trás do estudo</span>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-balance text-foreground md:text-5xl">
            Chama, rupees e penas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Os três números no alto do app são o que te faz voltar amanhã.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <Cartao
              titulo="Ofensiva"
              texto="Estude um pouco todo dia e a chama cresce. Aos 30 dias ela fica violeta, aos 100 vira verde-água."
              cor="bg-orange-500/10"
            >
              <Ofensiva />
            </Cartao>
          </Reveal>
          <Reveal delay={90}>
            <Cartao
              titulo="Rupees"
              texto="Cada aula concluída rende rupees. Troque na loja por temas, avatares e itens que salvam a ofensiva."
              cor="bg-emerald-500/10"
            >
              <Rupees />
            </Cartao>
          </Reveal>
          <Reveal delay={180}>
            <Cartao
              titulo="Penas"
              texto="Errou, perde uma pena e pensa melhor na próxima. Elas voltam com o tempo, e no PRO são ilimitadas."
              cor="bg-violet-500/10"
            >
              <Penas />
            </Cartao>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

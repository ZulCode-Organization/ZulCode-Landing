"use client";

import { useEffect, useRef, useState } from "react";
import { BatteryFull, Lock, Signal, Wifi } from "lucide-react";
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import { Reveal } from "../reveal";
import Device, { larguraTelaDevice } from "../react-bits/Device";
import { AULAS, TrilhaViva } from "./trilha-viva";
import { Lojas } from "./lojas";

const PASSO_MS = 1700;
const ESCALA_CELULAR = 0.62;
const LARGURA_APP = 300;

/* Avança a trilha de exemplo enquanto a seção está na tela: conclui uma aula a
   cada passo e, no fim, recomeça. Fora da tela (ou sem movimento) fica parada
   com metade feita. */
function useProgresso() {
  const podeAnimar = useMovimentoPermitido();
  const [feitas, setFeitas] = useState(2);
  const [visivel, setVisivel] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!podeAnimar || !visivel) return;
    const id = window.setInterval(() => setFeitas((f) => (f >= AULAS.length ? 0 : f + 1)), PASSO_MS);
    return () => window.clearInterval(id);
  }, [podeAnimar, visivel]);

  return { ref, feitas };
}

export default function QualquerTela() {
  const { ref, feitas } = useProgresso();

  return (
    <section id="qualquer-tela" className="w-full px-6 py-24 sm:px-10">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.25fr]">
        <Reveal className="flex flex-col items-start">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">No navegador e no celular</span>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-balance text-foreground md:text-5xl">
            Aprenda em qualquer tela.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Comece no computador e continue no celular. Sua trilha, sua ofensiva e
            seus rupees são os mesmos nos dois, sem nada para configurar.
          </p>
          <Lojas className="mt-8" />
        </Reveal>

        <Reveal delay={120} className="relative flex justify-center lg:justify-end">
          {/* O navegador atrás, o celular na frente: os dois mostram a mesma
              trilha avançando no mesmo instante. */}
          <div className="relative w-full max-w-[560px] sm:pb-20 sm:pl-24">
            <div className="zc-superficie overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-lg bg-muted px-3 py-1 text-xs text-muted-foreground">
                  <Lock className="size-3 shrink-0" />
                  app.zulcode.tech/home
                </span>
              </div>
              <div className="h-[430px]">
                <TrilhaViva feitas={feitas} />
              </div>
            </div>

            <div className="absolute left-0 top-14 hidden sm:block">
              <Device scale={ESCALA_CELULAR} parallaxStrength={5} rotateStrength={3}>
                <div
                  className="flex h-full flex-col bg-background"
                  style={{ zoom: larguraTelaDevice(ESCALA_CELULAR) / LARGURA_APP, width: LARGURA_APP }}
                >
                  {/* A barra de status do aparelho, dos dois lados da ilha. */}
                  <div className="flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[0.8rem] font-bold text-foreground">
                    <span className="tabular-nums">9:41</span>
                    <span className="flex items-center gap-1">
                      <Signal className="size-3.5" strokeWidth={2.6} />
                      <Wifi className="size-3.5" strokeWidth={2.6} />
                      <BatteryFull className="size-4.5" strokeWidth={2.2} />
                    </span>
                  </div>
                  <div className="min-h-0 flex-1">
                    <TrilhaViva feitas={feitas} compacta />
                  </div>
                </div>
              </Device>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

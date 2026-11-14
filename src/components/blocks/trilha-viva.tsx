"use client";

import { Check, CodeXml, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chama, Pena, Rupee } from "../shared/icones-barra";

/* A trilha de uma conta de exemplo, avançando sozinha: cada passo conclui a
   aula atual e abre a próxima. Os números são de demonstração, como numa
   captura de tela; nada aqui fala de usuário de verdade. */
export const AULAS = ["Intro ao JS", "Variáveis", "Tipos de dados", "Operadores", "Condicionais", "Laços"];
const DESLOCAMENTO = [0, 34, 14, -22, -34, -6];
const RUPEES_POR_AULA = 10;
const RUPEES_INICIAIS = 240;

/* O botão do curso da barra do app (LadrilhoCurso no frontend): retângulo
   deitado na cor da linguagem, com a sigla encostada no canto de baixo à
   direita, como no logo do JavaScript. No computador tem a peça de trás; no
   celular é chapado, igual ao app. */
const AMARELO_JS = "#F7DF1E";
function LadrilhoJs({ compacto }: { compacto: boolean }) {
  const altura = compacto ? 36 : 44;
  const largura = compacto ? 52 : 64;
  const raio = Math.round(altura * 0.28);
  const base = compacto ? 0 : 3;
  return (
    <span className="relative justify-self-start" title="Curso: JavaScript" style={{ width: largura, height: altura }}>
      {base > 0 && (
        <span
          aria-hidden
          className="absolute inset-x-0 brightness-75"
          style={{ top: base, bottom: -base, borderRadius: raio, backgroundColor: AMARELO_JS }}
        />
      )}
      <span
        className="absolute inset-0 flex items-end justify-end font-black leading-none"
        style={{
          borderRadius: raio,
          backgroundColor: AMARELO_JS,
          color: "#16181d",
          paddingRight: altura * 0.12,
          paddingBottom: altura * 0.04,
          fontSize: altura * 0.46,
        }}
      >
        JS
      </span>
    </span>
  );
}

export function TrilhaViva({ feitas, compacta = false }: { feitas: number; compacta?: boolean }) {
  const rupees = RUPEES_INICIAIS + feitas * RUPEES_POR_AULA;
  const tamanhoNo = compacta ? 52 : 62;

  return (
    <div className="flex h-full flex-col bg-background text-foreground select-none">
      <div className={cn("grid grid-cols-4 items-center border-b border-border", compacta ? "px-3 py-2.5" : "px-5 py-3")}>
        <LadrilhoJs compacto={compacta} />
        <span className="flex items-center justify-center gap-1 text-sm font-black text-orange-500">
          <span className="h-5"><Chama /></span>8
        </span>
        <span className="flex items-center justify-center gap-1 text-sm font-black text-emerald-500 tabular-nums">
          <Rupee className="size-4.5" />
          <span key={rupees} className="animate-pop-in">{rupees}</span>
        </span>
        <span className="flex items-center justify-center gap-1 text-sm font-black text-violet-500">
          <Pena className="size-4.5" />5
        </span>
      </div>

      <div className={cn("mx-3 mt-3 rounded-2xl bg-primary text-primary-foreground", compacta ? "px-4 py-2.5" : "px-5 py-3.5")}>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.08em] opacity-85">Seção 1 · Unidade 1</p>
        <p className={cn("font-black", compacta ? "text-sm" : "text-base")}>Fundamentos do JavaScript</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/20">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-700 ease-out"
              style={{ width: `${(feitas / AULAS.length) * 100}%` }}
            />
          </div>
          <span className="text-[0.62rem] font-black tabular-nums">{feitas}/{AULAS.length}</span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-start gap-3 overflow-hidden pt-4">
        {AULAS.map((titulo, i) => {
          const estado = i < feitas ? "feita" : i === feitas ? "atual" : "bloqueada";
          return (
            <div key={titulo} className="relative flex flex-col items-center" style={{ transform: `translateX(${DESLOCAMENTO[i]}px)` }}>
              {estado === "atual" && (
                <span className="animate-flutua relative -mb-1 rounded-xl border-2 border-primary bg-card px-2.5 py-1 text-[0.58rem] font-black uppercase tracking-[0.09em] text-primary">
                  Começar
                  <span className="absolute -bottom-[5px] left-1/2 size-2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-primary bg-card" aria-hidden />
                </span>
              )}
              <span className="relative block" style={{ width: tamanhoNo, height: tamanhoNo + 6 }}>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 rounded-[38%] transition-colors duration-500",
                    estado === "bloqueada" ? "bg-border" : "bg-primary brightness-75"
                  )}
                  style={{ height: tamanhoNo }}
                />
                <span
                  key={estado}
                  className={cn(
                    "absolute inset-x-0 top-0 flex items-center justify-center rounded-[38%] transition-colors duration-500",
                    estado === "bloqueada" ? "border-2 border-border bg-muted text-muted-foreground/60" : "bg-primary text-primary-foreground",
                    estado === "feita" && "animate-pop-in"
                  )}
                  style={{ height: tamanhoNo }}
                >
                  {estado === "bloqueada" ? (
                    <Lock className="size-5" />
                  ) : estado === "feita" ? (
                    <Check className="size-6" strokeWidth={3.5} />
                  ) : (
                    <CodeXml className="size-6" strokeWidth={2.75} />
                  )}
                  {estado === "feita" && (
                    <span className="animate-pop-in absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-amber-400 text-amber-950 ring-[3px] ring-background">
                      <Star className="size-3 fill-current" strokeWidth={0} />
                    </span>
                  )}
                </span>
                {estado === "feita" && i === feitas - 1 && (
                  <span className="animate-sobe-some pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 items-center gap-0.5 text-xs font-black text-emerald-500">
                    +{RUPEES_POR_AULA}
                    <Rupee className="size-3.5" />
                  </span>
                )}
              </span>
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}

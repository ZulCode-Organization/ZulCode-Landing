"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { SiPython } from "react-icons/si";
import { Button } from "../ui/button";
import { useMovimentoPermitido } from "@/hooks/use-movimento";

/* Janela de editor com o mesmo enquadramento do mock da tela de login
   (barra com três bolinhas + main.py), só que aqui o código é digitado quando
   a seção entra na tela e o botão RODAR revela a saída.

   É uma demonstração ilustrativa: o código é fixo e a saída é o resultado
   real dele (70), nada aqui finge ser um terminal ao vivo. */

const K = "text-[#c678dd] dark:text-[#ff8fd8]"; // palavra-chave
const F = "text-primary"; // função
const N = "text-[#b26a00] dark:text-[#f5c56b]"; // número
const P = "text-foreground/55"; // pontuação
const V = "text-foreground/90"; // variável

type Pedaco = { texto: string; classe?: string };

const CODIGO: Pedaco[] = [
  { texto: "# cada acerto vale 10 de XP\n", classe: "text-muted-foreground" },
  { texto: "def", classe: K },
  { texto: " " },
  { texto: "calcular_xp", classe: F },
  { texto: "(", classe: P },
  { texto: "acertos", classe: V },
  { texto: "):", classe: P },
  { texto: "\n    " },
  { texto: "return", classe: K },
  { texto: " " },
  { texto: "acertos", classe: V },
  { texto: " * ", classe: P },
  { texto: "10", classe: N },
  { texto: "\n\n" },
  { texto: "print", classe: F },
  { texto: "(", classe: P },
  { texto: "calcular_xp", classe: F },
  { texto: "(", classe: P },
  { texto: "7", classe: N },
  { texto: "))", classe: P },
];

const TOTAL = CODIGO.reduce((soma, pedaco) => soma + pedaco.texto.length, 0);

/* Corta os pedaços no ponto em que a digitação parou. Fica fora do componente
   por ser função pura: entra o número de caracteres já digitados, sai a lista
   pronta pra desenhar — assim o destaque de sintaxe já nasce colorido, sem
   mutar variável durante o render. */
function fatiar(digitados: number): Pedaco[] {
  const visiveis: Pedaco[] = [];
  let restante = digitados;

  for (const pedaco of CODIGO) {
    if (restante <= 0) break;
    visiveis.push({ ...pedaco, texto: pedaco.texto.slice(0, restante) });
    restante -= pedaco.texto.length;
  }

  return visiveis;
}

export default function JanelaCodigo() {
  const alvo = useRef<HTMLDivElement>(null);
  const relogio = useRef<ReturnType<typeof setInterval> | null>(null);
  const [digitados, setDigitados] = useState(0);
  const [saida, setSaida] = useState<"oculta" | "rodando" | "pronta">("oculta");

  const podeAnimar = useMovimentoPermitido(true);
  /* Sem animação, o código aparece inteiro de uma vez — valor derivado, sem
     precisar empurrar estado dentro de um efeito. */
  const escritos = podeAnimar ? digitados : TOTAL;
  const completo = escritos >= TOTAL;

  const digitar = useCallback(() => {
    if (relogio.current) clearInterval(relogio.current);
    setDigitados(0);
    relogio.current = setInterval(() => {
      setDigitados((atual) => {
        if (atual >= TOTAL) {
          if (relogio.current) clearInterval(relogio.current);
          return atual;
        }
        return atual + 1;
      });
    }, 26);
  }, []);

  /* Só começa a digitar quando a janela aparece — se a animação rodasse no
     load, quem chega aqui rolando encontraria o código já pronto. */
  useEffect(() => {
    const elemento = alvo.current;
    if (!elemento || !podeAnimar) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();
        digitar();
      },
      { threshold: 0.35 }
    );

    observer.observe(elemento);
    return () => {
      observer.disconnect();
      if (relogio.current) clearInterval(relogio.current);
    };
  }, [digitar, podeAnimar]);

  const rodar = () => {
    if (!completo || saida === "rodando") return;
    setSaida("rodando");
    setTimeout(() => setSaida("pronta"), 450);
  };

  const reiniciar = () => {
    setSaida("oculta");
    digitar();
  };

  const visiveis = fatiar(escritos);

  return (
    <div ref={alvo} className="flex w-full flex-col gap-3">
      <div className="zc-superficie overflow-hidden rounded-2xl">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-yellow-500/70" />
          <span className="size-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <SiPython className="size-3.5" /> main.py
          </span>

          <Button
            size="sm"
            onClick={rodar}
            disabled={!completo || saida === "rodando"}
            className="zc-press ml-auto"
            style={{ ["--zc-press-color" as string]: "color-mix(in srgb, var(--primary) 60%, black)" }}
          >
            <Play className="size-3" />
            {saida === "rodando" ? "RODANDO" : "RODAR"}
          </Button>
        </div>

        <pre className="min-h-[168px] overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 sm:text-sm">
          <code>
            {visiveis.map((pedaco, i) => (
              <span key={i} className={pedaco.classe}>
                {pedaco.texto}
              </span>
            ))}
            <span className="animate-caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-primary" />
          </code>
        </pre>

        <div className="border-t border-border bg-muted px-5 py-4 font-mono text-[13px]">
          <p className="mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            Saída
          </p>
          {saida === "pronta" ? (
            <p className="animate-fade-in text-green-600 dark:text-green-400">70</p>
          ) : (
            <p className="text-muted-foreground/60">
              {saida === "rodando" ? "executando..." : "clique em RODAR"}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Exemplo do tipo de exercício da plataforma.
        </p>
        {completo ? (
          <Button variant="ghost" size="sm" onClick={reiniciar} className="text-muted-foreground">
            <RotateCcw className="size-3" />
            digitar de novo
          </Button>
        ) : null}
      </div>
    </div>
  );
}

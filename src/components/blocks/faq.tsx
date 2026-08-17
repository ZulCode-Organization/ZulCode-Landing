"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "../reveal";
import { cn } from "@/lib/utils";

const PERGUNTAS = [
  {
    pergunta: "O ZulCode é gratuito mesmo?",
    resposta:
      "É. Criar conta, seguir a trilha e resolver os desafios não custa nada e não pede cartão de crédito.",
  },
  {
    pergunta: "Preciso saber programar pra começar?",
    resposta:
      "Não. A trilha começa do zero, explicando o que é uma variável antes de pedir que você escreva uma. Se você já sabe alguma coisa, dá pra avançar mais rápido pelas primeiras fases.",
  },
  {
    pergunta: "Preciso instalar alguma coisa no computador?",
    resposta:
      "Não. O código dos exercícios roda no próprio navegador — você abre o site, escreve e vê o resultado ali mesmo.",
  },
  {
    pergunta: "Quais linguagens estão disponíveis?",
    resposta:
      "JavaScript, Python, React, Java, C++, HTML e CSS. São as mesmas que aparecem no terminal aqui de cima.",
  },
  {
    pergunta: "Funciona no celular?",
    resposta:
      "Funciona. O app foi desenhado primeiro pra tela pequena, com a trilha e a barra de navegação pensadas pro polegar.",
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full border-y border-border bg-secondary/40 px-6 py-24 sm:px-10 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Dúvidas
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground md:text-4xl">
            O que perguntam antes de começar
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {PERGUNTAS.map((item, i) => {
            const estaAberta = aberta === i;
            return (
              <Reveal key={item.pergunta} delay={i * 60}>
                <div className="zc-superficie overflow-hidden rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setAberta(estaAberta ? null : i)}
                    aria-expanded={estaAberta}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-foreground sm:text-base">
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        estaAberta && "rotate-180"
                      )}
                    />
                  </button>

                  {/* grid 0fr → 1fr anima a altura sem precisar medir o
                      conteúdo nem fixar um max-height chutado. */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      estaAberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

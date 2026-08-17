"use client";

import { useState } from "react";

/* Cartão lenticular: a arte é fatiada em tiras verticais que viram uma depois
   da outra, da esquerda pra direita, mostrando o verso — como um cartão
   lenticular de verdade quando você inclina.

   A geometria mora no CSS (.zc-lent, no globals.css); aqui só entram as
   tiras, o estado de virado e o texto acessível. */

type Props = {
  /* Arte da frente e do verso. O mesmo nó é reaproveitado em todas as tiras,
     cada uma recortando o pedaço que lhe cabe. */
  frente: React.ReactNode;
  verso: React.ReactNode;
  /* O que o leitor de tela anuncia — as tiras são puramente visuais. */
  rotulo: string;
  /* Número de fatias. Mais tiras = lente mais fina, mas cada tira duplica a
     arte duas vezes no DOM, então não vale exagerar. */
  tiras?: number;
  /* Atraso, em ms, entre uma tira e a seguinte. */
  varredura?: number;
  aoFocar?: (elemento: HTMLButtonElement | null) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
};

export function CardLenticular({
  frente,
  verso,
  rotulo,
  tiras = 8,
  varredura = 28,
  aoFocar,
  onKeyDown,
}: Props) {
  /* No toque não existe hover: o clique vira o cartão e mantém virado. */
  const [virado, setVirado] = useState(false);

  return (
    <button
      type="button"
      ref={aoFocar}
      onClick={() => setVirado((atual) => !atual)}
      onKeyDown={onKeyDown}
      aria-pressed={virado}
      data-virado={virado}
      className="zc-lent"
      style={
        {
          "--zc-tiras": tiras,
          "--zc-varredura": `${varredura}ms`,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">{rotulo}</span>

      <span className="zc-lent__tiras" aria-hidden="true">
        {Array.from({ length: tiras }, (_, i) => (
          <span
            key={i}
            className="zc-lent__tira"
            style={{ "--zc-i": i } as React.CSSProperties}
          >
            <span className="zc-lent__face zc-lent__face--frente">
              {/* --zc-i vem por herança da tira: é ele que desloca a arte. */}
              <span className="zc-lent__arte">
                {frente}
              </span>
            </span>
            <span className="zc-lent__face zc-lent__face--verso">
              {/* --zc-i vem por herança da tira: é ele que desloca a arte. */}
              <span className="zc-lent__arte">
                {verso}
              </span>
            </span>
          </span>
        ))}
      </span>
    </button>
  );
}

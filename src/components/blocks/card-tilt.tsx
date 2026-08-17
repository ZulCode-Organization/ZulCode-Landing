"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/* Base dos cartões no estilo ProfileCard do React Bits: o cartão inclina
   seguindo o cursor e um reflexo acompanha a posição do ponteiro.

   A inclinação é escrita direto no style do elemento por ref — o React não
   re-renderiza nada a cada pixel de movimento do mouse. */
export function CardTilt({
  children,
  className,
  intensidade = 9,
}: {
  children: React.ReactNode;
  className?: string;
  /* Graus máximos de inclinação em cada eixo. */
  intensidade?: number;
}) {
  const alvo = useRef<HTMLDivElement>(null);

  const aoMover = (evento: React.PointerEvent<HTMLDivElement>) => {
    const elemento = alvo.current;
    if (!elemento) return;

    const area = elemento.getBoundingClientRect();
    const x = (evento.clientX - area.left) / area.width;
    const y = (evento.clientY - area.top) / area.height;

    elemento.style.setProperty("--zc-rx", `${(0.5 - y) * intensidade}deg`);
    elemento.style.setProperty("--zc-ry", `${(x - 0.5) * intensidade}deg`);
    elemento.style.setProperty("--zc-px", `${x * 100}%`);
    elemento.style.setProperty("--zc-py", `${y * 100}%`);
    elemento.dataset.ativo = "true";
  };

  const aoSair = () => {
    const elemento = alvo.current;
    if (!elemento) return;
    elemento.style.setProperty("--zc-rx", "0deg");
    elemento.style.setProperty("--zc-ry", "0deg");
    elemento.dataset.ativo = "false";
  };

  return (
    <div className={cn("zc-card-palco h-full", className)}>
      <div
        ref={alvo}
        onPointerMove={aoMover}
        onPointerLeave={aoSair}
        data-ativo="false"
        className="zc-card-tilt zc-superficie h-full rounded-2xl"
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* Mock de celular em CSS, com a mesma API do componente Device do React Bits
   Pro (image, scale, isScrollable, enableParallax, parallaxStrength,
   enableRotate, rotateStrength, autoAnimate, className, children).

   Escrito à mão porque o registro Pro exige REACTBITS_LICENSE_KEY, que este
   projeto não tem. Se um dia a chave entrar num .env.local, dá pra instalar o
   oficial e trocar o import: os nomes das props batem.

   Tudo é transform — nada de layout mudando por frame — e o movimento é
   sempre resposta ao ponteiro, a não ser que `autoAnimate` seja ligado. */

export interface DeviceProps {
  /* Imagem mostrada na tela do aparelho. Ignorada se vier `children`. */
  image?: string;
  alt?: string;
  /* Fator de escala do aparelho (0.5 a 1.5 é a faixa recomendada). */
  scale?: number;
  /* Deixa o conteúdo da tela rolar na vertical. */
  isScrollable?: boolean;
  /* Deslocamento sutil acompanhando o ponteiro. */
  enableParallax?: boolean;
  /* Força do deslocamento, em pixels. */
  parallaxStrength?: number;
  /* Rotação sutil acompanhando o ponteiro (inclui giro no eixo Z). */
  enableRotate?: boolean;
  /* Força da rotação, em graus. */
  rotateStrength?: number;
  /* Anima sozinho, simulando um cursor em oito deitado. */
  autoAnimate?: boolean;
  className?: string;
  /* Conteúdo livre dentro da tela (tem prioridade sobre `image`). */
  children?: React.ReactNode;
  /* Extra além da API oficial: faixa preta no topo da tela, no lugar onde
     ficaria a barra de status. Sem ela, um print que já começa no cabeçalho do
     app aparece por baixo da ilha dinâmica. Em px, antes da escala. */
  faixaStatus?: number;
}

/* Medidas base do aparelho, em px, antes da escala. A altura é o que faz o
   print da trilha (1266x2622) caber inteiro na tela útil, com a faixa de
   status somada — sem isso a barra de navegação do app sai cortada ao meio. */
const BASE = {
  largura: 372,
  altura: 781,
  moldura: 13,
  raio: 58,
  raioTela: 46,
  ilhaLargura: 104,
  ilhaAltura: 28,
  ilhaTopo: 12,
  botaoLargura: 3,
};

/* Largura útil da tela (já sem a moldura), em px, para uma dada escala — quem
   renderiza conteúdo próprio dentro do aparelho precisa disso pra ajustar a
   escala do que vai lá dentro. */
export function larguraTelaDevice(scale: number) {
  return (BASE.largura - BASE.moldura * 2) * scale;
}

export default function Device({
  image,
  alt = "",
  scale = 1,
  isScrollable = false,
  enableParallax = true,
  parallaxStrength = 15,
  enableRotate = true,
  rotateStrength = 3,
  autoAnimate = false,
  className,
  children,
  faixaStatus = 0,
}: DeviceProps) {
  const palco = useRef<HTMLDivElement>(null);
  const aparelho = useRef<HTMLDivElement>(null);
  const quadro = useRef<number | null>(null);

  const px = useCallback((valor: number) => `${valor * scale}px`, [scale]);

  /* Recebe a posição do ponteiro normalizada (-1 a 1) e escreve a transformação
     direto no style — sem estado, sem re-render por movimento do mouse. */
  const aplicar = useCallback(
    (x: number, y: number) => {
      const elemento = aparelho.current;
      if (!elemento) return;

      const deslocX = enableParallax ? x * parallaxStrength : 0;
      const deslocY = enableParallax ? y * parallaxStrength : 0;
      const giroY = enableRotate ? x * rotateStrength : 0;
      const giroX = enableRotate ? -y * rotateStrength : 0;
      /* O giro no eixo Z é menor de propósito: ele dá o "peso" de objeto na
         mão, mas passa de charmoso a tonto muito rápido. */
      const giroZ = enableRotate ? x * rotateStrength * 0.35 : 0;

      elemento.style.transform =
        `translate3d(${deslocX}px, ${deslocY}px, 0) ` +
        `rotateX(${giroX}deg) rotateY(${giroY}deg) rotateZ(${giroZ}deg)`;
    },
    [enableParallax, parallaxStrength, enableRotate, rotateStrength]
  );

  const aoMover = (evento: React.PointerEvent<HTMLDivElement>) => {
    if (autoAnimate) return;
    const area = palco.current?.getBoundingClientRect();
    if (!area) return;
    aplicar(
      ((evento.clientX - area.left) / area.width) * 2 - 1,
      ((evento.clientY - area.top) / area.height) * 2 - 1
    );
  };

  const aoSair = () => {
    if (autoAnimate) return;
    aplicar(0, 0);
  };

  /* Cursor simulado percorrendo um oito deitado (lemniscata). */
  useEffect(() => {
    if (!autoAnimate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = (agora - inicio) / 1000;
      aplicar(Math.sin(t * 0.6), Math.sin(t * 1.2) * 0.5);
      quadro.current = requestAnimationFrame(passo);
    };

    quadro.current = requestAnimationFrame(passo);
    return () => {
      if (quadro.current !== null) cancelAnimationFrame(quadro.current);
    };
  }, [autoAnimate, aplicar]);

  return (
    <div
      ref={palco}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      className={cn("select-none", className)}
      style={{ perspective: `${1400 * scale}px` }}
    >
      <div
        ref={aparelho}
        className="relative transition-transform duration-500 ease-out will-change-transform motion-reduce:!transform-none"
        style={{
          width: px(BASE.largura),
          height: px(BASE.altura),
          transformStyle: "preserve-3d",
        }}
      >
        {/* Botões laterais: silencioso e volume na esquerda, power na direita. */}
        <span
          className="absolute -left-[1px] rounded-l-sm bg-neutral-700"
          style={{ top: px(150), width: px(BASE.botaoLargura), height: px(30) }}
        />
        <span
          className="absolute -left-[1px] rounded-l-sm bg-neutral-700"
          style={{ top: px(200), width: px(BASE.botaoLargura), height: px(56) }}
        />
        <span
          className="absolute -left-[1px] rounded-l-sm bg-neutral-700"
          style={{ top: px(270), width: px(BASE.botaoLargura), height: px(56) }}
        />
        <span
          className="absolute -right-[1px] rounded-r-sm bg-neutral-700"
          style={{ top: px(220), width: px(BASE.botaoLargura), height: px(86) }}
        />

        {/* Carcaça */}
        <div
          className="relative size-full overflow-hidden bg-neutral-900 shadow-2xl ring-1 ring-white/10"
          style={{ borderRadius: px(BASE.raio), padding: px(BASE.moldura) }}
        >
          {/* Tela */}
          <div
            className="relative size-full overflow-hidden bg-black"
            style={{ borderRadius: px(BASE.raioTela) }}
          >
            <div
              className={cn(
                "size-full",
                isScrollable ? "overflow-y-auto overscroll-contain" : "overflow-hidden"
              )}
              style={faixaStatus ? { paddingTop: px(faixaStatus) } : undefined}
            >
              {children ?? (
                image ? (
                  /* Não é next/image de propósito: a tela precisa de uma
                     imagem que pode ser bem mais alta que o quadro (pra rolar),
                     e o alinhamento no topo é o que importa aqui. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={alt}
                    draggable={false}
                    className={cn(
                      "w-full",
                      isScrollable ? "h-auto" : "h-full object-cover object-top"
                    )}
                  />
                ) : null
              )}
            </div>

            {/* Ilha dinâmica */}
            <span
              className="absolute left-1/2 -translate-x-1/2 bg-black"
              style={{
                top: px(BASE.ilhaTopo),
                width: px(BASE.ilhaLargura),
                height: px(BASE.ilhaAltura),
                borderRadius: px(BASE.ilhaAltura / 2),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

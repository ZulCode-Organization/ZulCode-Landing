"use client";

/* eslint-disable @next/next/no-img-element -- As artes do Zul são WebP animados:
   o otimizador do Next devolveria só o primeiro quadro. */
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import { cn } from "@/lib/utils";

/**
 * Uma arte do Zul. Parada (o quadro leve) até `animar` ligar e a pessoa aceitar
 * movimento; aí troca pela animação. Assim uma galeria com várias poses só
 * baixa a animação da que está em destaque.
 */
export function ZulAnimado({
  pose,
  animar = true,
  className,
  alt = "",
  prioridade = false,
}: {
  pose: string;
  animar?: boolean;
  className?: string;
  alt?: string;
  prioridade?: boolean;
}) {
  const podeAnimar = useMovimentoPermitido();
  const parado = `/zul/zul-${pose}-parado.webp`;
  const src = animar && podeAnimar ? `/zul/zul-${pose}.webp` : parado;
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading={prioridade ? "eager" : "lazy"}
      decoding="async"
      className={cn("pointer-events-none select-none object-contain", className)}
    />
  );
}

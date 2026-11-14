import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Quanto a base assoma embaixo da face. A face desce 1px a menos no clique,
   deixando uma lasquinha da base à mostra: é o que faz o botão parecer encostar
   no fundo em vez de sumir dentro dele. */
const BASE = 5;

/**
 * O botão com corpo do app (BotaoRelevo no frontend): duas peças sólidas, a de
 * trás mais escura assomando embaixo e a face, que desce em cima dela no clique.
 * Não é box-shadow: com sombra o botão só escurece, com a peça ele afunda.
 */
export function Botao3D({
  children,
  href,
  onClick,
  variante = "primario",
  tamanho = "normal",
  className,
  faceClassName,
  externo,
  rotulo,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variante?: "primario" | "neutro" | "escuro";
  tamanho?: "normal" | "grande" | "pequeno";
  className?: string;
  faceClassName?: string;
  /** Abre em outra aba (lojas de aplicativo). */
  externo?: boolean;
  rotulo?: string;
}) {
  const face = {
    primario: "bg-primary text-primary-foreground",
    neutro: "border-2 border-border bg-card text-foreground",
    escuro: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
  }[variante];
  const base = {
    primario: "bg-primary brightness-75",
    neutro: "bg-border",
    escuro: "bg-black dark:bg-neutral-400",
  }[variante];
  const medida = {
    normal: "px-6 py-3.5 text-[0.85rem]",
    grande: "px-8 py-4 text-[0.95rem]",
    pequeno: "px-4 py-2.5 text-[0.78rem]",
  }[tamanho];

  const corpo = (
    <span className="relative block">
      <span aria-hidden className={cn("absolute inset-x-0 rounded-[16px]", base)} style={{ top: BASE, bottom: -BASE }} />
      <span
        className={cn(
          "relative top-0 flex items-center justify-center gap-2.5 rounded-[16px] font-black uppercase tracking-[0.08em] transition-[top,filter] duration-100 group-hover:brightness-110 group-active:top-[4px] motion-reduce:transition-none",
          face,
          medida,
          faceClassName
        )}
      >
        {children}
      </span>
    </span>
  );

  const externa = cn(
    "group block rounded-[16px] outline-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={externa}
        aria-label={rotulo}
        onClick={onClick}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {corpo}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={externa} aria-label={rotulo}>
      {corpo}
    </button>
  );
}

import type { ReactNode } from "react";
import { FaApple } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { PLAY_STORE } from "@/lib/links";

type Tamanho = "normal" | "pequeno";

/* O triângulo do Google Play nas quatro cores, como no selo oficial. */
function LogoPlay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden strokeLinejoin="round">
      <polygon points="1.5,1 13,13 1.5,25" fill="#00d7fe" stroke="#00d7fe" strokeWidth="1" />
      <polygon points="1.5,1 17.6,9.4 13,13" fill="#00f076" stroke="#00f076" strokeWidth="1" />
      <polygon points="1.5,25 13,13 17.6,16.6" fill="#ff3a44" stroke="#ff3a44" strokeWidth="1" />
      <polygon points="17.6,9.4 22.5,12.2 22.5,13.8 17.6,16.6 13,13" fill="#ffd500" stroke="#ffd500" strokeWidth="1" />
    </svg>
  );
}

/**
 * O selo de loja: preto como os oficiais, cantos de 12px e o corpo do botão
 * do app (a peça de trás assomando embaixo, a face descendo no clique). Um
 * brilho atravessa a face de tempos em tempos para chamar o olho sem piscar.
 */
function Selo({
  icone,
  linha1,
  linha2,
  tamanho,
  brilho = true,
  apagado = false,
}: {
  icone: ReactNode;
  linha1: string;
  linha2: string;
  tamanho: Tamanho;
  brilho?: boolean;
  apagado?: boolean;
}) {
  const pequeno = tamanho === "pequeno";
  return (
    <span className="relative block">
      <span aria-hidden className="absolute inset-x-0 rounded-[14px] bg-neutral-600 dark:bg-neutral-700" style={{ top: 4, bottom: -4 }} />
      <span
        className={cn(
          "relative top-0 flex items-center overflow-hidden rounded-[14px] border border-white/15 bg-[#0b0d12] text-white transition-[top,transform] duration-150 group-hover:-translate-y-0.5 group-active:top-[3px] group-active:translate-y-0 motion-reduce:transition-none",
          pequeno ? "h-12 gap-2.5 pl-3 pr-4" : "h-[3.6rem] gap-3 pl-4 pr-5",
          apagado && "text-white/75"
        )}
      >
        {brilho && (
          <span
            aria-hidden
            className="animate-brilho-passa pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        )}
        <span className={cn("shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110", pequeno ? "size-6" : "size-7")}>
          {icone}
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className={cn("font-medium uppercase tracking-[0.06em] text-white/70", pequeno ? "text-[0.56rem]" : "text-[0.62rem]")}>{linha1}</span>
          <span className={cn("mt-0.5 font-bold tracking-tight", pequeno ? "text-[1.02rem]" : "text-[1.22rem]")}>{linha2}</span>
        </span>
      </span>
    </span>
  );
}

export function BotaoPlayStore({ className, tamanho = "normal" }: { className?: string; tamanho?: Tamanho }) {
  return (
    <a
      href={PLAY_STORE}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Baixar o ZulCode no Google Play"
      className={cn(
        "group block rounded-[14px] outline-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Selo icone={<LogoPlay className="size-full" />} linha1="Disponível no" linha2="Google Play" tamanho={tamanho} />
    </a>
  );
}

/* O app para iPhone ainda não existe: o selo avisa "em breve" em vez de
   fingir um link, com uma etiqueta pulsando no canto. */
export function AppStoreEmBreve({ className, tamanho = "normal" }: { className?: string; tamanho?: Tamanho }) {
  return (
    <div className={cn("group relative block cursor-default select-none", className)} role="img" aria-label="App Store: em breve">
      <Selo icone={<FaApple className="size-full" />} linha1="Em breve na" linha2="App Store" tamanho={tamanho} brilho={false} apagado />
      <span className="absolute -right-2 -top-2.5 flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.08em] text-primary-foreground shadow-md rotate-3">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80 motion-reduce:animate-none" />
          <span className="relative inline-flex size-1.5 rounded-full bg-white" />
        </span>
        Em breve
      </span>
    </div>
  );
}

export function Lojas({ className, tamanho = "normal" }: { className?: string; tamanho?: Tamanho }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <BotaoPlayStore tamanho={tamanho} />
      <AppStoreEmBreve tamanho={tamanho} />
    </div>
  );
}

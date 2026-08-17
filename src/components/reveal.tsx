"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /* Atraso em ms aplicado só depois que o elemento entra na tela, pra
     escalonar a entrada de uma lista de cards. */
  delay?: number;
}

/* Revela o conteúdo quando ele entra na viewport. O estilo inicial (oculto e
   deslocado) mora no CSS via [data-reveal], então sem JS nada some da tela —
   o componente só liga a animação. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revelado, setRevelado] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevelado(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      data-revealed={revelado}
      className={cn(className)}
      style={{ transitionDelay: revelado ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

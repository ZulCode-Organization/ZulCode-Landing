"use client";

import { useEffect, useRef, useState } from "react";

/* Diz se o elemento está na tela. As seções animadas usam isso para só gastar
   quadro (e bateria) enquanto alguém está de fato olhando para elas. */
export function useNaTela<T extends HTMLElement>(limiar = 0.25) {
  const ref = useRef<T>(null);
  const [naTela, setNaTela] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting), { threshold: limiar });
    obs.observe(el);
    return () => obs.disconnect();
  }, [limiar]);

  return { ref, naTela };
}

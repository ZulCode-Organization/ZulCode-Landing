"use client";

import { useEffect, useRef } from "react";

const COLUNAS = 46;

/**
 * O Zul desenhado numa grade de pontos. Quase apagado, ele acende onde a luz
 * passa: a luz segue o ponteiro e, sozinha, passeia pelo desenho. As cores vêm
 * da própria arte, amostrada uma vez para a grade. Com o movimento desligado,
 * o desenho aparece inteiro e parado.
 */
export function ZulPontilhado({ src, className }: { src: string; className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pontos: { x: number; y: number; cor: string }[] = [];
    let lado = 0;
    let quadro = 0;
    let visivel = false;
    let pronto = false;
    let ultimoToque = -Infinity;
    const luz = { x: 0.5, y: 0.45 };
    const alvo = { x: 0.5, y: 0.45 };

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      lado = canvas.clientWidth;
      canvas.width = Math.round(lado * dpr);
      canvas.height = Math.round(lado * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const desenhar = () => {
      const passo = lado / COLUNAS;
      const alcance = parado ? 9 : 0.4;
      ctx.clearRect(0, 0, lado, lado);
      // A grade de fundo, bem fraca.
      ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
      for (let l = 0; l < COLUNAS; l++) {
        for (let c = 0; c < COLUNAS; c++) {
          ctx.beginPath();
          ctx.arc((c + 0.5) * passo, (l + 0.5) * passo, passo * 0.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      for (const p of pontos) {
        const d = Math.hypot(p.x - luz.x, p.y - luz.y);
        const f = Math.pow(Math.max(0, 1 - d / alcance), 1.4);
        ctx.globalAlpha = 0.14 + 0.86 * f;
        ctx.fillStyle = p.cor;
        ctx.beginPath();
        ctx.arc(p.x * lado, p.y * lado, passo * (0.2 + 0.26 * f), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const laco = (agora: number) => {
      if (agora - ultimoToque > 2200) {
        const t = agora / 1000;
        alvo.x = 0.5 + 0.3 * Math.sin(t * 0.7);
        alvo.y = 0.48 + 0.3 * Math.sin(t * 1.1 + 1);
      }
      luz.x += (alvo.x - luz.x) * 0.1;
      luz.y += (alvo.y - luz.y) * 0.1;
      desenhar();
      if (visivel) quadro = requestAnimationFrame(laco);
    };

    // Amostra a arte numa grade COLUNAS x COLUNAS, centralizada e sem distorcer.
    const img = new Image();
    img.onload = () => {
      const amostra = document.createElement("canvas");
      amostra.width = COLUNAS;
      amostra.height = COLUNAS;
      const a = amostra.getContext("2d");
      if (!a) return;
      const escala = Math.min(COLUNAS / img.width, COLUNAS / img.height) * 0.94;
      const w = img.width * escala;
      const h = img.height * escala;
      a.drawImage(img, (COLUNAS - w) / 2, (COLUNAS - h) / 2, w, h);
      const dados = a.getImageData(0, 0, COLUNAS, COLUNAS).data;
      pontos = [];
      for (let l = 0; l < COLUNAS; l++) {
        for (let c = 0; c < COLUNAS; c++) {
          const i = (l * COLUNAS + c) * 4;
          if (dados[i + 3] < 110) continue;
          // O bico e os pés são quase pretos: clareados para aparecer no fundo escuro.
          const escuro = Math.max(dados[i], dados[i + 1], dados[i + 2]) < 70;
          const cor = escuro ? "rgb(120, 134, 152)" : `rgb(${dados[i]}, ${dados[i + 1]}, ${dados[i + 2]})`;
          pontos.push({ x: (c + 0.5) / COLUNAS, y: (l + 0.5) / COLUNAS, cor });
        }
      }
      pronto = true;
      desenhar();
    };
    img.src = src;

    const aoMover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      alvo.x = (e.clientX - r.left) / r.width;
      alvo.y = (e.clientY - r.top) / r.height;
      ultimoToque = performance.now();
    };

    medir();
    desenhar();

    const aoRedimensionar = new ResizeObserver(() => {
      medir();
      desenhar();
    });
    aoRedimensionar.observe(canvas);

    const naTela = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      cancelAnimationFrame(quadro);
      if (visivel && !parado) quadro = requestAnimationFrame(laco);
      else if (pronto) desenhar();
    });
    naTela.observe(canvas);
    if (!parado) canvas.addEventListener("pointermove", aoMover);

    return () => {
      cancelAnimationFrame(quadro);
      aoRedimensionar.disconnect();
      naTela.disconnect();
      canvas.removeEventListener("pointermove", aoMover);
      img.onload = null;
    };
  }, [src]);

  return <canvas ref={tela} role="img" aria-label="O Zul desenhado em pontos de luz" className={className} style={{ touchAction: "pan-y" }} />;
}

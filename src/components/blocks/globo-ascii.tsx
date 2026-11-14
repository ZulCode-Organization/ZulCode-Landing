"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* As linguagens do app como pontos acesos no planeta, ligadas em sequência.
   São marcos decorativos: não representam lugares nem pessoas. */
const MARCOS = [
  { nome: "python", lat: 0.62, lon: 0.3 },
  { nome: "javascript", lat: 0.18, lon: 0.95 },
  { nome: "typescript", lat: -0.38, lon: 1.55 },
  { nome: "java", lat: 0.42, lon: 2.6 },
  { nome: "c#", lat: -0.2, lon: 3.5 },
  { nome: "go", lat: 0.5, lon: 4.6 },
];

/* A rampa de densidade: do quase vazio ao cheio. */
const RAMPA = " .,:;-=+*#%@";
/* O que pisca de vez em quando no lugar de um caractere: pedaços de código. */
const CODIGO = "01{}<>/;=()[]$";

/* Velocidade da rolagem, em radianos por ms: o chão anda no passo do robô. */
const ROLA_BASE = 0.00022;

const CELULA_L = 8;
const CELULA_A = 11;

/* Ruído de valor em 3D, com hash inteiro: barato e determinístico, o mesmo
   planeta em toda visita. */
function hash(x: number, y: number, z: number) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
function suave(t: number) {
  return t * t * (3 - 2 * t);
}
function ruido(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = suave(x - xi), yf = suave(y - yi), zf = suave(z - zi);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), xf), l(c(0, 1, 0), c(1, 1, 0), xf), yf),
    l(l(c(0, 0, 1), c(1, 0, 1), xf), l(c(0, 1, 1), c(1, 1, 1), xf), yf),
    zf
  );
}

/* O mapa do planeta, calculado uma vez: altura por latitude e longitude. */
const MAPA_L = 256;
const MAPA_A = 128;
function gerarMapa() {
  const mapa = new Float32Array(MAPA_L * MAPA_A);
  for (let j = 0; j < MAPA_A; j++) {
    const lat = (j / (MAPA_A - 1) - 0.5) * Math.PI;
    for (let i = 0; i < MAPA_L; i++) {
      const lon = (i / MAPA_L) * Math.PI * 2;
      const x = Math.cos(lat) * Math.cos(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.sin(lon);
      let v = 0, amp = 0.55, freq = 1.6;
      for (let o = 0; o < 4; o++) {
        v += amp * ruido(x * freq + 11, y * freq + 7, z * freq + 3);
        amp *= 0.5;
        freq *= 2.1;
      }
      mapa[j * MAPA_L + i] = v;
    }
  }
  return mapa;
}

function rgb(cor: string): [number, number, number] {
  const h = cor.replace("#", "").trim();
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6), 16);
  return Number.isNaN(n) ? [128, 128, 128] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const rgba = ([r, g, b]: [number, number, number], a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;

type Cores = { ponto: [number, number, number]; texto: [number, number, number]; fundo: [number, number, number] };
function lerCores(el: HTMLElement): Cores {
  const css = getComputedStyle(el);
  const v = (nome: string) => css.getPropertyValue(nome).trim();
  return { ponto: rgb(v("--primary")), texto: rgb(v("--foreground")), fundo: rgb(v("--background")) };
}

/**
 * O planeta do hero, desenhado em caracteres: cada célula de uma grade de
 * texto vira um ponto da esfera, e a densidade do caractere sai da luz e do
 * relevo. Os continentes são da cor da marca, o mar fica apagado, e de vez em
 * quando um caractere vira um pedaço de código. Rola como uma esteira sob quem
 * estiver em `children` (posto no alto do globo) e com o arrasto; para fora da
 * tela e fica parado para quem pediu menos movimento.
 */
export function GloboAscii({ className, children }: { className?: string; children?: ReactNode }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const palco = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mapa = gerarMapa();
    let cores = lerCores(canvas);
    let largura = 0;
    let altura = 0;
    let quadro = 0;
    let visivel = true;
    // O planeta rola como uma roda sob os pés do Zul: o alto anda para a
    // esquerda enquanto ele anda para a direita. `angulo` só escolhe que lado
    // do mundo fica de frente.
    const angulo = 0.4;
    let rola = 0;
    let giro = ROLA_BASE; // radianos por ms
    let antes = performance.now();
    let arrastando = false;
    let ultimoX = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = canvas.clientWidth;
      altura = canvas.clientHeight;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // O planeta encosta no pé do quadro e deixa o alto livre para o Zul.
      R = Math.min(largura * 0.42, altura * 0.4);
      cx = largura / 2;
      cy = altura - R - altura * 0.04;
      const ator = palco.current;
      if (ator) {
        ator.style.left = `${cx}px`;
        ator.style.top = `${cy - R}px`;
        ator.style.width = `${R * 0.7}px`;
      }
    };

    const altitude = (lat: number, lon: number) => {
      let u = (lon / (Math.PI * 2)) % 1;
      if (u < 0) u += 1;
      const v = Math.min(0.9999, Math.max(0, lat / Math.PI + 0.5));
      return mapa[Math.floor(v * (MAPA_A - 1)) * MAPA_L + Math.floor(u * MAPA_L)];
    };

    const desenhar = (agora: number) => {
      const inclina = 0.38;
      const ci = Math.cos(inclina), si = Math.sin(inclina);
      const ca = Math.cos(angulo), sa = Math.sin(angulo);
      const cr = Math.cos(rola), sr = Math.sin(rola);
      const t = agora / 1000;
      const lento = Math.floor(t * 5);

      ctx.clearRect(0, 0, largura, altura);

      // Um halo da cor da marca atrás do planeta.
      const halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.25);
      halo.addColorStop(0, rgba(cores.ponto, 0.16));
      halo.addColorStop(1, rgba(cores.ponto, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, largura, altura);

      ctx.font = `600 ${CELULA_A - 1}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Luz vindo do alto à esquerda, um pouco de frente.
      const lx = -0.45, ly = 0.55, lz = 0.7;
      const colunas = Math.ceil((R * 2) / CELULA_L) + 2;
      const linhas = Math.ceil((R * 2) / CELULA_A) + 2;
      const x0 = cx - (colunas / 2) * CELULA_L;
      const y0 = cy - (linhas / 2) * CELULA_A;

      for (let lin = 0; lin < linhas; lin++) {
        const py = y0 + (lin + 0.5) * CELULA_A;
        const dy = (cy - py) / R;
        for (let col = 0; col < colunas; col++) {
          const px = x0 + (col + 0.5) * CELULA_L;
          const dx = (px - cx) / R;
          const d2 = dx * dx + dy * dy;
          if (d2 > 1) continue;
          const dz = Math.sqrt(1 - d2);
          // Da vista para o mundo: desfaz a rolagem, a inclinação e o giro.
          const rx = dx * cr + dy * sr;
          const ry = -dx * sr + dy * cr;
          const y1 = ry * ci + dz * si;
          const z1 = -ry * si + dz * ci;
          const wx = rx * ca - z1 * sa;
          const wz = rx * sa + z1 * ca;
          const lat = Math.asin(Math.max(-1, Math.min(1, y1)));
          const lon = Math.atan2(wz, wx);
          const h = altitude(lat, lon);
          const luz = Math.max(0, dx * lx + dy * ly + dz * lz);
          const borda = Math.pow(1 - dz, 3);
          const terra = h > 0.53;
          const semente = hash(col, lin, lento);

          let valor: number;
          let alfa: number;
          let cor: [number, number, number];
          if (terra) {
            valor = 0.45 + 0.4 * luz + Math.min(0.15, (h - 0.53) * 1.2);
            alfa = 0.35 + 0.65 * luz;
            cor = cores.ponto;
          } else {
            valor = 0.2 + 0.32 * luz;
            alfa = 0.16 + 0.34 * luz + borda * 0.35;
            cor = cores.texto;
          }
          let letra = RAMPA[Math.min(RAMPA.length - 1, Math.floor(valor * RAMPA.length))];
          if (semente > 0.985 && luz > 0.15) {
            letra = CODIGO[Math.floor(hash(lin, col, lento + 7) * CODIGO.length)];
            cor = cores.ponto;
            alfa = 1;
          }
          if (letra === " ") continue;
          ctx.fillStyle = rgba(cor, Math.min(1, alfa));
          ctx.fillText(letra, px, py);
        }
      }

      // Os marcos: projetados, ligados em sequência quando os dois estão na frente.
      const pontos = MARCOS.map((m) => {
        const x = Math.cos(m.lat) * Math.cos(m.lon);
        const y = Math.sin(m.lat);
        const z = Math.cos(m.lat) * Math.sin(m.lon);
        // Mundo para a vista: gira, inclina e rola.
        const vx = x * ca + z * sa;
        const vz1 = -x * sa + z * ca;
        const vy = y * ci - vz1 * si;
        const vz = y * si + vz1 * ci;
        const qx = vx * cr - vy * sr;
        const qy = vx * sr + vy * cr;
        return { nome: m.nome, x: cx + qx * R, y: cy - qy * R, z: vz };
      });

      ctx.lineWidth = 1.4;
      for (let k = 0; k < pontos.length - 1; k++) {
        const a = pontos[k], b = pontos[k + 1];
        if (a.z < 0.05 || b.z < 0.05) continue;
        const forca = Math.min(1, Math.min(a.z, b.z) / 0.35);
        // Um arco levemente curvado para fora, como uma rota.
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const ox = mx - cx, oy = my - cy;
        const ol = Math.hypot(ox, oy) || 1;
        const cxp = mx + (ox / ol) * R * 0.12, cyp = my + (oy / ol) * R * 0.12;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, rgba(cores.ponto, 0.9 * forca));
        grad.addColorStop(1, rgba(cores.ponto, 0.35 * forca));
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cxp, cyp, b.x, b.y);
        ctx.stroke();
        // Um pulso correndo pela rota.
        const f = (t * 0.45 + k * 0.23) % 1;
        const qx = (1 - f) * (1 - f) * a.x + 2 * (1 - f) * f * cxp + f * f * b.x;
        const qy = (1 - f) * (1 - f) * a.y + 2 * (1 - f) * f * cyp + f * f * b.y;
        ctx.fillStyle = rgba(cores.ponto, forca);
        ctx.beginPath();
        ctx.arc(qx, qy, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = "700 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.textAlign = "left";
      for (let k = 0; k < pontos.length; k++) {
        const p = pontos[k];
        if (p.z < 0.05) continue;
        const forca = Math.min(1, p.z / 0.35);
        const brilho = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
        brilho.addColorStop(0, rgba(cores.ponto, 0.85 * forca));
        brilho.addColorStop(1, rgba(cores.ponto, 0));
        ctx.fillStyle = brilho;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(cores.fundo, forca);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(cores.ponto, forca);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        // O nome vai para o lado de dentro quando encostaria na borda do canvas.
        const larg = ctx.measureText(p.nome).width;
        const lx = p.x + 10 + larg > largura - 4 ? p.x - 10 - larg : p.x + 10;
        ctx.fillStyle = rgba(cores.texto, 0.85 * forca);
        ctx.fillText(p.nome, lx, p.y - 10);
      }
    };

    const passo = (agora: number) => {
      const dt = Math.min(64, agora - antes);
      antes = agora;
      if (!arrastando) giro += (ROLA_BASE - giro) * 0.03;
      rola += dt * giro;
      desenhar(agora);
      if (visivel) quadro = requestAnimationFrame(passo);
    };

    medir();
    desenhar(performance.now());
    if (!parado) quadro = requestAnimationFrame(passo);

    // Arrastar gira o planeta; ao soltar ele desacelera de volta ao ritmo normal.
    const aoApertar = (e: PointerEvent) => {
      if (parado) return;
      arrastando = true;
      ultimoX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const aoMover = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - ultimoX;
      ultimoX = e.clientX;
      // Arrastar para a esquerda puxa o chão junto, como uma esteira.
      rola -= dx / Math.max(R, 1);
      giro = -dx * 0.0004;
    };
    const aoSoltar = () => {
      arrastando = false;
    };
    canvas.addEventListener("pointerdown", aoApertar);
    canvas.addEventListener("pointermove", aoMover);
    canvas.addEventListener("pointerup", aoSoltar);
    canvas.addEventListener("pointercancel", aoSoltar);

    const aoRedimensionar = new ResizeObserver(() => {
      medir();
      desenhar(performance.now());
    });
    aoRedimensionar.observe(canvas);

    const naTela = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      if (visivel && !parado) {
        antes = performance.now();
        cancelAnimationFrame(quadro);
        quadro = requestAnimationFrame(passo);
      }
    });
    naTela.observe(canvas);

    // O tema troca as variáveis de cor no <html>: relê as cores na troca.
    const aoTrocarTema = new MutationObserver(() => {
      cores = lerCores(canvas);
      desenhar(performance.now());
    });
    aoTrocarTema.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

    return () => {
      cancelAnimationFrame(quadro);
      canvas.removeEventListener("pointerdown", aoApertar);
      canvas.removeEventListener("pointermove", aoMover);
      canvas.removeEventListener("pointerup", aoSoltar);
      canvas.removeEventListener("pointercancel", aoSoltar);
      aoRedimensionar.disconnect();
      naTela.disconnect();
      aoTrocarTema.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      <canvas ref={tela} aria-hidden className="absolute inset-0 size-full" style={{ touchAction: "pan-y" }} />
      {/* Quem anda em cima do planeta: posicionado no alto do globo a cada
          medida, com os pés afundando um tiquinho na superfície. */}
      <div ref={palco} className="pointer-events-none absolute" style={{ transform: "translate(-50%, -96%)" }}>
        {children}
      </div>
    </div>
  );
}

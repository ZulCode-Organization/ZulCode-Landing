"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Device, { larguraTelaDevice } from "../react-bits/Device";
import RotatingText from "../react-bits/RotatingText";
import { JornadaMock } from "./jornada-mock";

const APP = "https://zulcode-app.vercel.app/login/";

/* Escala do aparelho no hero e a largura em que a tela do app é desenhada
   (o mesmo alvo de celular do frontend) — a razão entre as duas vira o zoom
   aplicado lá dentro. */
const ESCALA_APARELHO = 0.72;
const LARGURA_APP = 390;

/* Frases que passam no lugar do complemento do título. Todas descrevem algo
   que a plataforma faz de fato — nada de promessa inventada. */
const FRASES = [
  "jogando de verdade",
  "com XP a cada acerto",
  "direto no navegador",
  "sem pagar nada",
];

export default function HomeHero() {
  return (
    /* Mesma divisão da tela de login do app: um painel `bg-secondary/40` de um
       lado e o conteúdo do outro. No celular o painel vai pra baixo do texto
       (flex-col-reverse) em vez de sumir. */
    <section
      id="banner"
      className="flex w-full flex-col-reverse lg:min-h-[calc(100svh-64px)] lg:flex-row"
    >
      <div className="flex items-center justify-center border-t border-border bg-secondary/40 px-6 py-14 sm:px-10 lg:w-1/2 lg:border-t-0 lg:border-r lg:px-16">
        <div className="flex flex-col items-center gap-5">
          {/* Não é print: é a própria Jornada do app rodando dentro do
              aparelho, com scroll de verdade. A rotação é fraca de propósito —
              a tela precisa ficar legível enquanto a pessoa rola a trilha. */}
          <Device scale={ESCALA_APARELHO} parallaxStrength={6} rotateStrength={2}>
            <JornadaMock zoom={larguraTelaDevice(ESCALA_APARELHO) / LARGURA_APP} />
          </Device>

          <p className="max-w-xs text-center text-xs text-muted-foreground">
            A Jornada do app, rodando aqui do lado. Role a tela do celular pra
            percorrer a trilha.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex max-w-xl flex-col items-start">
          <div
            className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary"
            style={{ animationDelay: "40ms" }}
          >
            <Sparkles className="size-3.5" />
            100% gratuito pra começar
          </div>

          <h1
            className="animate-fade-in-up mt-6 flex flex-col gap-2 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            <span className="whitespace-nowrap">Aprenda a codar</span>
            {/* Sem fundo sólido de propósito: o AnimatePresence troca a frase
                em modo "wait", e por uma fração de segundo o espaço fica
                vazio — numa caixa azul isso vira um retângulo piscando. */}
            <RotatingText
              texts={FRASES}
              mainClassName="w-fit overflow-hidden pr-1 text-primary"
              splitLevelClassName="overflow-hidden pb-1"
              staggerFrom="last"
              staggerDuration={0.02}
              rotationInterval={2800}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            />
          </h1>

          <p
            className="animate-fade-in-up mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            Lições curtas, desafios de código de verdade e uma trilha que você
            quer terminar. Ganhe XP, mantenha a ofensiva e vire dev sem pagar
            nada.
          </p>

          <div
            className="animate-fade-in-up mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <Link href={APP} className="w-full sm:w-auto">
              <Button
                size="hero"
                className="zc-press zc-press-shadow w-full sm:w-auto"
                style={{ ["--zc-press-color" as string]: "color-mix(in srgb, var(--primary) 60%, black)" }}
              >
                COMEÇAR AGORA
              </Button>
            </Link>
            <Link href={APP} className="w-full sm:w-auto">
              <Button variant="outline" size="hero" className="zc-press w-full sm:w-auto">
                JÁ TENHO CONTA
              </Button>
            </Link>
          </div>

          {/* Não são números de usuário nem métrica inventada — é só o que a
              plataforma de fato entrega, escrito curto. */}
          <ul
            className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
            style={{ animationDelay: "360ms" }}
          >
            {["Código rodando no navegador", "Trilha gamificada"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

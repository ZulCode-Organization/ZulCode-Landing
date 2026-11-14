"use client";

import { APP_CADASTRO, APP_LOGIN } from "@/lib/links";
import { Botao3D } from "../ui/botao-3d";
import RotatingText from "../react-bits/RotatingText";
import { ZulAnimado } from "../zul/zul-animado";
import { GloboAscii } from "./globo-ascii";
import { Lojas } from "./lojas";

/* Frases que passam no lugar do complemento do título. Todas descrevem algo
   que a plataforma faz de fato — nada de promessa inventada. */
const FRASES = ["jogando de verdade", "com XP a cada acerto", "direto no celular", "sem pagar nada"];

export default function HomeHero() {
  return (
    <section id="banner" className="relative w-full overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-4 px-6 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24 lg:pt-16">
        <div className="flex flex-col items-start text-left">
          <h1
            className="animate-fade-in-up flex flex-col items-start gap-1 text-[2.5rem] font-black leading-[1.02] tracking-tight text-foreground sm:text-[3.2rem] lg:text-[2.75rem] xl:text-[3.1rem]"
            style={{ animationDelay: "120ms" }}
          >
            <span>Aprenda a programar</span>
            <RotatingText
              texts={FRASES}
              mainClassName="w-fit justify-start overflow-hidden text-primary sm:whitespace-nowrap"
              splitLevelClassName="overflow-hidden pb-1"
              staggerFrom="last"
              staggerDuration={0.02}
              rotationInterval={2600}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            />
          </h1>

          <p
            className="animate-fade-in-up mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            Lições curtas, desafios de código de verdade e uma trilha que você quer
            terminar. Ganhe XP, mantenha a ofensiva e vire dev com o Zul do seu lado.
          </p>

          <div
            className="animate-fade-in-up mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <Botao3D href={APP_CADASTRO} tamanho="grande" className="flex-1" faceClassName="whitespace-nowrap">
              Começar agora
            </Botao3D>
            <Botao3D href={APP_LOGIN} variante="neutro" tamanho="grande" className="flex-1" faceClassName="whitespace-nowrap">
              Já tenho conta
            </Botao3D>
          </div>

          <div className="animate-fade-in-up mt-8" style={{ animationDelay: "360ms" }}>
            <Lojas tamanho="pequeno" />
          </div>
        </div>

        {/* O planeta em caracteres, com as linguagens do app acesas e ligadas,
            e o Zul no robô andando em cima dele. */}
        <div
          className="animate-fade-in relative mx-auto aspect-[5/6] w-full max-w-[380px] cursor-grab active:cursor-grabbing sm:max-w-[460px] lg:max-w-[500px]"
          style={{ animationDelay: "200ms" }}
        >
          <GloboAscii className="absolute inset-0">
            <ZulAnimado pose="robo" prioridade className="w-full" alt="O Zul montado num robozinho, andando em cima do planeta" />
          </GloboAscii>
        </div>
      </div>
    </section>
  );
}

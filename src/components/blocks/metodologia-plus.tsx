import MetodologiaBlocks from "./metodologia-blocks";
import { Reveal } from "../reveal";

export default function MetodologiaPlus() {
  return (
    <section className="w-full px-6 py-24 sm:px-10 lg:px-20 xl:px-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Por que gruda
          </span>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground md:text-4xl">
            Vicia, mas faz <span className="text-primary">bem</span>
            <br />
            para seu futuro
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
            Usamos mecânicas de jogos para tornar o aprendizado de programação
            divertido e viciante. Com desafios, recompensas e uma comunidade
            engajada, você vai querer voltar todos os dias para aprender mais e
            subir de nível!
          </p>
        </Reveal>
        <MetodologiaBlocks />
      </div>
    </section>
  );
}

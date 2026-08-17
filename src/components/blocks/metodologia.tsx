import { Reveal } from "../reveal";
import JanelaCodigo from "./janela-codigo";

export default function Metodologia() {
  return (
    <section id="metodologia" className="w-full px-6 py-24 sm:px-10 lg:px-20 xl:px-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Metodologia
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground md:text-4xl">
              Você aprende <span className="text-primary">escrevendo código</span>, não assistindo vídeo
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Cada lição é curta e termina com um desafio real: você escreve o
              código, roda ali mesmo no navegador e vê o resultado na hora.
              Acertou, ganha XP e destrava a próxima fase. Errou, perde uma vida
              e tenta de novo — o que te obriga a pensar antes de chutar.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-2 flex flex-col gap-3">
              {[
                "Trilha com fases que destravam conforme você avança",
                "Metas diárias e ofensiva pra criar o hábito",
                "Ranking pra comparar seu progresso com o dos outros",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-base">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <JanelaCodigo />
        </Reveal>
      </div>
    </section>
  );
}

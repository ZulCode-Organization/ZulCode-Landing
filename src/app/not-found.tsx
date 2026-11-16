/* eslint-disable @next/next/no-img-element -- WebP animado: o otimizador do Next devolveria só o primeiro quadro */
import type { Metadata } from "next";
import Link from "next/link";
import { Botao3D } from "@/components/ui/botao-3d";
import { PAGINAS_CURSOS } from "@/lib/paginas-cursos";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

/* Quem cai num endereço que não existe: o Zul, o caminho de volta e os
   cursos, para a visita não acabar aqui. Cabe sempre numa tela só, sem
   rolagem: os tamanhos seguem a largura e a altura da janela, e a lista de
   cursos some em telas baixas. */
export default function NaoEncontrada() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 py-6 text-center">
      {/* O 404 gigante, com o Zul do robô andando em cima dele. Aqui ele anda
          sempre: a página é curta e a animação é o ponto dela. */}
      <div className="relative pt-[clamp(6.1rem,min(29.5vw,23vh),14.5rem)]">
        <img
          src="/zul/zul-robo.webp"
          alt="O Zul montado num robozinho, andando em cima do 404"
          className="absolute left-1/2 top-0 w-[clamp(5rem,min(24vw,18.7vh),12rem)] -translate-x-[40%]"
        />
        <p
          aria-hidden
          className="select-none text-[clamp(5.5rem,min(34vw,26vh),17rem)] font-black leading-[0.8] tracking-[-0.06em] text-primary"
        >
          404
        </p>
      </div>
      <h1 className="mt-[min(2rem,3vh)] text-2xl font-black tracking-tight text-balance text-foreground sm:text-4xl">
        O Zul procurou, mas essa página não existe
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        Talvez o endereço tenha um erro de digitação, ou a página mudou de lugar.
      </p>
      <Botao3D href="/" tamanho="grande" className="mt-[min(2rem,3.5vh)] w-full max-w-xs" faceClassName="whitespace-nowrap">
        Voltar para o início
      </Botao3D>
      <div className="mt-[min(3rem,5vh)] flex flex-col items-center [@media(max-height:720px)]:hidden">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Ou escolha um curso</p>
      <ul className="mt-3 flex max-w-xl flex-wrap justify-center gap-2">
        {PAGINAS_CURSOS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/${p.slug}`}
              className="block rounded-[12px] border-2 border-border bg-card px-3.5 py-2 text-sm font-bold text-foreground transition-colors hover:border-primary/60"
            >
              {p.curso}
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}

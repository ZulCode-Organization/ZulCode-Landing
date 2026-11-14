import { APP_CADASTRO } from "@/lib/links";
import { cn } from "@/lib/utils";
import { Reveal } from "../reveal";
import { Botao3D } from "../ui/botao-3d";
import { ZulPontilhado } from "../zul/zul-pontilhado";
import { Lojas } from "./lojas";

/* O letreiro: palavras enormes subindo sem parar. Tudo aqui é verdade no app:
   criar conta é grátis e não pede cartão. */
const LETREIRO = [
  { texto: "Comece", destaque: false },
  { texto: "hoje", destaque: true },
  { texto: "É de", destaque: false },
  { texto: "graça", destaque: true },
  { texto: "Sem", destaque: false },
  { texto: "cartão", destaque: true },
];

/**
 * O fecho da página, sempre em fundo escuro: de um lado o letreiro gigante,
 * do outro o Zul em pontos de luz e as portas de entrada.
 */
export default function Fecho() {
  return (
    <section id="comece" className="w-full overflow-hidden border-y border-white/10 bg-[#0b0d12] text-white">
      <div className="mx-auto grid max-w-6xl items-stretch lg:grid-cols-[1.1fr_1fr]">
        {/* O letreiro é decoração: o convite escrito está na coluna ao lado. */}
        <div aria-hidden className="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-[620px]">
          <div className="animate-letreiro-sobe flex flex-col pl-5 sm:pl-8">
            {[...LETREIRO, ...LETREIRO].map((item, i) => (
              <span
                key={i}
                className={cn(
                  "whitespace-nowrap text-[clamp(4.6rem,17vw,10.5rem)] font-black uppercase leading-[0.86] tracking-[-0.045em]",
                  item.destaque ? "text-primary" : "text-white"
                )}
              >
                {item.texto}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0b0d12] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0d12] to-transparent" />
        </div>

        <Reveal className="flex flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
          <ZulPontilhado src="/zul/zul-celular-parado.webp" className="aspect-square w-full max-w-[330px] cursor-crosshair" />
          <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-tight text-balance sm:text-4xl">
            O Zul já está te esperando
          </h2>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-white/65">
            Crie a conta, escolha uma linguagem e faça a primeira lição agora.
          </p>
          <Botao3D href={APP_CADASTRO} tamanho="grande" className="mt-7 w-full max-w-xs" faceClassName="whitespace-nowrap">
            Começar agora
          </Botao3D>
          <Lojas tamanho="pequeno" className="mt-6 justify-center" />
        </Reveal>
      </div>
    </section>
  );
}

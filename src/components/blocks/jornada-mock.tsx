import {
  BookOpen,
  CodeXml,
  Home,
  Lock,
  Menu,
  MoreHorizontal,
  ShoppingBag,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* A Jornada do app, reproduzida aqui pra rodar dentro do celular do hero.

   É a tela de verdade: mesmas lições (o curso de JavaScript de
   `src/data/trilha.ts` do frontend), mesmo zigue-zague, mesmos nós com sombra
   sólida e ícone de código, mesma barra inferior. A diferença é que aqui nada
   é clicável — não existe <a> nem <button> em lugar nenhum, só o scroll
   funciona. Ninguém entra numa atividade nem troca de aba a partir da landing.

   Os estados são os de uma conta nova: a primeira lição é a atual e o resto
   está bloqueado. Nenhum número de XP ou progresso de usuário é inventado —
   os chips do topo aparecem sem valor, como quando ainda não há sessão. */

type Licao = {
  titulo: string;
  subtitulo: string;
  xp: number;
  estado: "atual" | "bloqueada";
};

type Unidade = {
  secao: number;
  unidade: number;
  titulo: string;
  licoes: Licao[];
};

/* Recorte fiel de `unidadesTrilha`: a unidade 1 inteira e o começo da 2, o
   suficiente pra mostrar a virada de unidade sem transformar o hero num
   scroll infinito. */
const UNIDADES: Unidade[] = [
  {
    secao: 1,
    unidade: 1,
    titulo: "Fundamentos do JavaScript",
    licoes: [
      { titulo: "Intro ao JS", subtitulo: "O que é JavaScript", xp: 20, estado: "atual" },
      { titulo: "Variáveis", subtitulo: "let, const e var", xp: 25, estado: "bloqueada" },
      { titulo: "Tipos de dados", subtitulo: "Números, texto e booleanos", xp: 20, estado: "bloqueada" },
      { titulo: "Operadores", subtitulo: "Comparações e cálculos", xp: 25, estado: "bloqueada" },
      { titulo: "Condicionais", subtitulo: "if, else e switch", xp: 30, estado: "bloqueada" },
      { titulo: "Laços", subtitulo: "for e while", xp: 25, estado: "bloqueada" },
      { titulo: "Funções", subtitulo: "Declare e reutilize código", xp: 25, estado: "bloqueada" },
      { titulo: "Revisão", subtitulo: "Feche a unidade", xp: 35, estado: "bloqueada" },
    ],
  },
  {
    secao: 1,
    unidade: 2,
    titulo: "Arrays e Objetos",
    licoes: [
      { titulo: "Arrays", subtitulo: "Listas ordenadas", xp: 20, estado: "bloqueada" },
      { titulo: "Métodos de array", subtitulo: "push, map e filter", xp: 25, estado: "bloqueada" },
      { titulo: "Objetos", subtitulo: "Pares chave-valor", xp: 20, estado: "bloqueada" },
    ],
  },
];

/* Mesmo ciclo de alinhamento da trilha do app. */
const ALINHAMENTO = ["justify-start", "justify-end", "justify-center"] as const;

type Linha =
  | { tipo: "divisor"; chave: string; unidade: number }
  | { tipo: "licao"; chave: string; licao: Licao; alinhamento: string };

/* O zigue-zague é calculado uma vez, fora do render: o índice corre por todas
   as unidades sem reiniciar, senão o desenho pularia na virada de cada uma. */
const LINHAS: Linha[] = (() => {
  const linhas: Linha[] = [];
  let indice = 0;

  UNIDADES.forEach((unidade, posicao) => {
    if (posicao > 0) {
      linhas.push({ tipo: "divisor", chave: `divisor-${unidade.unidade}`, unidade: unidade.unidade });
    }
    unidade.licoes.forEach((licao) => {
      linhas.push({
        tipo: "licao",
        chave: `${unidade.unidade}-${licao.titulo}`,
        licao,
        alinhamento: ALINHAMENTO[indice % 3],
      });
      indice += 1;
    });
  });

  return linhas;
})();

const ITENS_NAV = [
  { rotulo: "Jornada", icone: Home, ativo: true },
  { rotulo: "Elementos", icone: BookOpen, ativo: false },
  { rotulo: "Loja", icone: ShoppingBag, ativo: false },
  { rotulo: "Perfil", icone: User, ativo: false },
  { rotulo: "Mais", icone: MoreHorizontal, ativo: false },
];

function No({ licao }: { licao: Licao }) {
  const bloqueada = licao.estado === "bloqueada";

  return (
    <div className="flex w-[136px] flex-col items-center gap-2">
      {!bloqueada && (
        /* Balão "Começar" logo acima do nó atual. No app ele flutua; aqui
           fica parado, porque nada nesta landing sobe e desce sozinho. */
        <div className="-mb-3">
          <div className="relative">
            <span className="block rounded-xl border-2 border-primary bg-card px-4.5 py-2 text-[0.75rem] font-black uppercase tracking-[0.09em] text-primary shadow-sm">
              Começar
            </span>
            <span
              className="absolute -bottom-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-primary bg-card"
              aria-hidden
            />
          </div>
        </div>
      )}

      {/* Sombra sólida embaixo + face por cima: a mesma pilha do nó do app. */}
      <div className="relative size-[96px] h-[104px]">
        <span
          className={cn(
            "absolute left-[8px] top-[17px] size-[80px] rounded-[30px]",
            bloqueada ? "bg-border" : "bg-primary brightness-75"
          )}
          aria-hidden
        />
        <span
          className={cn(
            "absolute left-[8px] top-[8px] flex size-[80px] items-center justify-center rounded-[30px]",
            bloqueada
              ? "border-2 border-border bg-muted text-muted-foreground/60"
              : "bg-primary text-primary-foreground"
          )}
        >
          {bloqueada ? <Lock className="size-7" /> : <CodeXml className="size-8" strokeWidth={2.75} />}
        </span>
      </div>

      <span
        className={cn(
          "text-center text-[0.88rem] font-extrabold text-pretty",
          bloqueada ? "text-muted-foreground/60" : "text-primary"
        )}
      >
        {licao.titulo}
      </span>
      <span className="text-center text-[0.78rem] text-muted-foreground">{licao.subtitulo}</span>
      {!bloqueada && (
        <span className="text-[0.8rem] font-extrabold text-primary">+{licao.xp} XP</span>
      )}
    </div>
  );
}

export function JornadaMock({ zoom = 1 }: { zoom?: number }) {
  const unidadeAtiva = UNIDADES[0];
  const total = unidadeAtiva.licoes.length;

  return (
    /* `zoom` deixa a tela ser desenhada nas medidas reais do app (390px de
       largura) e encolher junto com a moldura do aparelho — inclusive no
       layout, o que o `transform: scale` não faria. */
    /* pt-14 é a área segura embaixo da câmera: o fundo do app sobe até o topo
       da tela e a ilha dinâmica fica por cima dele, como num aparelho de
       verdade — em vez de uma tarja preta cortando o cabeçalho. */
    <div
      className="zc-scroll-hidden flex flex-col bg-background pt-14 text-foreground select-none"
      /* O `zoom` já resolve as porcentagens no espaço do pai, então 100% aqui
         preenche o aparelho inteiro e tudo lá dentro (nós, textos, barras)
         encolhe junto, mantendo as medidas reais do app. */
      style={{ zoom, width: "100%", height: "100%" }}
    >
      {/* Única área que rola — igual ao app, onde a barra inferior fica de
          fora do scroll. */}
      <div className="zc-scroll-hidden flex-1 overflow-y-auto overflow-x-hidden">
        {/* Sem a barra de status do app (os chips de XP e moedas): aqui não
            existe usuário logado, então não haveria saldo pra mostrar — e sem
            ela o cabeçalho da unidade começa lá em cima, aproveitando a tela. */}
        <div className="px-4 pb-10 pt-4">
          <div className="mx-auto max-w-3xl">
            {/* Cabeçalho da unidade, grudado no topo da tela. */}
            <div className="sticky top-0 z-10 rounded-3xl bg-primary px-7 py-5 text-white shadow-lg shadow-primary/20">
              <div className="flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1 basis-50">
                  <p className="text-xs font-black uppercase tracking-[0.08em] opacity-85">
                    Seção {unidadeAtiva.secao} • Unidade {unidadeAtiva.unidade}
                  </p>
                  <h2 className="mt-1 text-xl font-black">{unidadeAtiva.titulo}</h2>
                </div>

                <span className="flex shrink-0 items-center gap-2 rounded-2xl bg-black/15 px-4.5 py-3">
                  <Menu className="size-4.5" strokeWidth={2.4} />
                  <span className="text-[0.8rem] font-black uppercase tracking-[0.06em]">Guia</span>
                </span>
              </div>

              <div className="mt-3.5 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-md bg-black/20">
                  <div className="h-full w-0 rounded-md bg-white" />
                </div>
                <span className="shrink-0 text-xs font-black opacity-90">0/{total}</span>
              </div>
            </div>

            <div className="mx-auto mt-7 flex max-w-[290px] flex-col items-center gap-4 pb-3">
              {LINHAS.map((linha) =>
                linha.tipo === "divisor" ? (
                  <div
                    key={linha.chave}
                    className="relative flex w-full items-center justify-center py-2"
                  >
                    <div className="absolute inset-x-0 top-1/2 h-px bg-border" aria-hidden />
                    <span className="relative rounded-full border border-border bg-background px-4 py-1.5 text-[0.7rem] font-black uppercase tracking-[0.08em] text-muted-foreground">
                      Unidade {linha.unidade}
                    </span>
                  </div>
                ) : (
                  <div key={linha.chave} className={cn("flex w-full", linha.alinhamento)}>
                    <No licao={linha.licao} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior: desenho igual ao do app, mas sem link nenhum. */}
      <div className="flex shrink-0 items-center justify-around border-t border-border bg-background px-2 py-2">
        {ITENS_NAV.map(({ rotulo, icone: Icone, ativo }) => (
          <div
            key={rotulo}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-1",
              ativo ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-[10px]",
                ativo && "bg-primary text-primary-foreground"
              )}
            >
              <Icone className="size-5" />
            </span>
            <span className="text-[0.62rem] font-black uppercase tracking-[0.05em]">{rotulo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

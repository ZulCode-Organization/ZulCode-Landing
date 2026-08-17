"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaHtml5, FaJava, FaPython, FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { SiCplusplus } from "react-icons/si";
import { useMovimentoPermitido } from "@/hooks/use-movimento";
import { cn } from "@/lib/utils";

/* Terminal do "olá, mundo": clique numa linguagem e ele escreve o programa
   equivalente e mostra a saída. O código é real — é o mesmo hello world que
   roda em cada linguagem, não um texto decorativo. */

type Linguagem = {
  id: string;
  nome: string;
  icone: React.ReactNode;
  arquivo: string;
  comando: string;
  codigo: string;
  saida: string;
};

const LINGUAGENS: Linguagem[] = [
  {
    id: "js",
    nome: "JavaScript",
    icone: <IoLogoJavascript />,
    arquivo: "hello.js",
    comando: "node hello.js",
    codigo: 'console.log("Olá, mundo!");',
    saida: "Olá, mundo!",
  },
  {
    id: "py",
    nome: "Python",
    icone: <FaPython />,
    arquivo: "hello.py",
    comando: "python hello.py",
    codigo: 'print("Olá, mundo!")',
    saida: "Olá, mundo!",
  },
  {
    id: "react",
    nome: "React",
    icone: <FaReact />,
    arquivo: "App.jsx",
    comando: "npm run dev",
    codigo: 'export default function App() {\n  return <h1>Olá, mundo!</h1>;\n}',
    saida: "Olá, mundo!  (renderizado na página)",
  },
  {
    id: "java",
    nome: "Java",
    icone: <FaJava />,
    arquivo: "Main.java",
    comando: "java Main.java",
    codigo:
      'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Olá, mundo!");\n  }\n}',
    saida: "Olá, mundo!",
  },
  {
    id: "cpp",
    nome: "C++",
    icone: <SiCplusplus />,
    arquivo: "hello.cpp",
    comando: "g++ hello.cpp && ./a.out",
    codigo:
      '#include <iostream>\n\nint main() {\n  std::cout << "Olá, mundo!" << std::endl;\n}',
    saida: "Olá, mundo!",
  },
  {
    id: "html",
    nome: "HTML",
    icone: <FaHtml5 />,
    arquivo: "index.html",
    comando: "abrir index.html",
    codigo: "<h1>Olá, mundo!</h1>",
    saida: "Olá, mundo!  (na tela do navegador)",
  },
  {
    id: "css",
    nome: "CSS",
    icone: <FaCss3Alt />,
    arquivo: "style.css",
    comando: "abrir index.html",
    codigo: 'body::after {\n  content: "Olá, mundo!";\n}',
    saida: "Olá, mundo!  (escrito pelo próprio CSS)",
  },
];

const COMENTARIO = "text-muted-foreground";
const TEXTO = "text-green-600 dark:text-green-400";
const TAG = "text-primary";
const PALAVRA = "text-[#c678dd] dark:text-[#ff8fd8]";
const NUMERO = "text-[#b26a00] dark:text-[#f5c56b]";

const PALAVRAS =
  "function|const|let|var|def|class|public|static|void|int|return|import|export|default|include|using|namespace|print|println|console|log|std|cout|endl|System|out|main|args|String|content";

const FONTE_PADRAO =
  `(\\/\\/[^\\n]*|#[^\\n]*|<!--[\\s\\S]*?-->)` +
  `|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')` +
  `|(<\\/?[a-zA-Z][a-zA-Z0-9-]*>?)` +
  `|\\b(${PALAVRAS})\\b` +
  `|(\\d+)`;

type Pedaco = { texto: string; classe?: string };

/* Realce simples e puro: entra o trecho já digitado, sai a lista de pedaços
   coloridos. Um `new RegExp` por chamada evita compartilhar o `lastIndex` de
   uma regex global entre renders. */
function realcar(codigo: string): Pedaco[] {
  const padrao = new RegExp(FONTE_PADRAO, "g");
  const pedacos: Pedaco[] = [];
  let ultimo = 0;
  let achado: RegExpExecArray | null;

  while ((achado = padrao.exec(codigo)) !== null) {
    if (achado.index > ultimo) {
      pedacos.push({ texto: codigo.slice(ultimo, achado.index) });
    }
    const classe = achado[1]
      ? COMENTARIO
      : achado[2]
        ? TEXTO
        : achado[3]
          ? TAG
          : achado[4]
            ? PALAVRA
            : NUMERO;
    pedacos.push({ texto: achado[0], classe });
    ultimo = achado.index + achado[0].length;
  }

  if (ultimo < codigo.length) pedacos.push({ texto: codigo.slice(ultimo) });
  return pedacos;
}

export default function TerminalHello() {
  const alvo = useRef<HTMLDivElement>(null);
  const relogio = useRef<ReturnType<typeof setInterval> | null>(null);
  const [escolhida, setEscolhida] = useState(0);
  const [digitados, setDigitados] = useState(0);

  const podeAnimar = useMovimentoPermitido(true);
  const linguagem = LINGUAGENS[escolhida];
  const total = linguagem.codigo.length;
  const escritos = podeAnimar ? Math.min(digitados, total) : total;
  const completo = escritos >= total;

  const digitar = useCallback((tamanho: number) => {
    if (relogio.current) clearInterval(relogio.current);
    setDigitados(0);
    relogio.current = setInterval(() => {
      setDigitados((atual) => {
        if (atual >= tamanho) {
          if (relogio.current) clearInterval(relogio.current);
          return atual;
        }
        return atual + 1;
      });
    }, 22);
  }, []);

  /* Começa a escrever quando o terminal aparece na tela. */
  useEffect(() => {
    const elemento = alvo.current;
    if (!elemento || !podeAnimar) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();
        digitar(LINGUAGENS[0].codigo.length);
      },
      { threshold: 0.3 }
    );

    observer.observe(elemento);
    return () => {
      observer.disconnect();
      if (relogio.current) clearInterval(relogio.current);
    };
  }, [digitar, podeAnimar]);

  const trocar = (indice: number) => {
    setEscolhida(indice);
    if (podeAnimar) digitar(LINGUAGENS[indice].codigo.length);
  };

  const visiveis = realcar(linguagem.codigo.slice(0, escritos));

  return (
    <div ref={alvo} className="zc-superficie w-full overflow-hidden rounded-2xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
          zulcode — {linguagem.arquivo}
        </span>
      </div>

      {/* Barra de linguagens: é daqui que sai o "olá, mundo" de cada uma. */}
      <div className="flex flex-wrap gap-2 border-b border-border bg-card px-4 py-3">
        {LINGUAGENS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => trocar(i)}
            aria-pressed={i === escolhida}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
              i === escolhida
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            <span className="text-sm">{item.icone}</span>
            {item.nome}
          </button>
        ))}
      </div>

      <div className="min-h-[230px] px-5 py-5 font-mono text-[13px] leading-7 sm:text-sm">
        <p className="text-muted-foreground">
          <span className="text-primary">➜</span> ~/zulcode{" "}
          <span className="text-foreground">{linguagem.comando}</span>
        </p>

        <pre className="mt-3 overflow-x-auto">
          <code>
            {visiveis.map((pedaco, i) => (
              <span key={i} className={pedaco.classe}>
                {pedaco.texto}
              </span>
            ))}
            {!completo ? (
              <span className="animate-caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-primary" />
            ) : null}
          </code>
        </pre>

        {completo ? (
          <p className="animate-fade-in mt-4 border-t border-border pt-4">
            <span className="mr-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              saída
            </span>
            <span className="text-green-600 dark:text-green-400">{linguagem.saida}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

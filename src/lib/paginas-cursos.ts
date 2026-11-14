/* Uma página por linguagem, cada uma mirando uma busca ("aprender python",
   "aprender javascript"...). As unidades e as aulas são as de verdade, tiradas
   do conteúdo do backend (src/conteudo/cursos): a página não promete nada que a
   trilha não tem. Se a trilha mudar lá, atualize aqui. */

export type Pergunta = { pergunta: string; resposta: string };

export type PaginaCurso = {
  /** O caminho da página, sem barra: zulcode.tech/aprender-python */
  slug: string;
  /** O nome em CURSOS (lib/cursos.tsx), de onde vêm o ícone e a cor. */
  curso: string;
  /** O <title>: a busca primeiro, a marca vem do template do layout. */
  titulo: string;
  descricao: string;
  h1: string;
  chamada: string;
  porque: string[];
  totalAulas: number;
  unidades: { titulo: string; aulas: string[] }[];
  exemplo: { arquivo: string; codigo: string; saida: string };
  perguntas: Pergunta[];
};

const perguntasComuns = (nome: string, primeiraAula: string): Pergunta[] => [
  {
    pergunta: `Dá para aprender ${nome} sem saber nada de programação?`,
    resposta: `Dá. A trilha começa do zero, em "${primeiraAula}", e cada aula explica um conceito com exemplo antes de pedir que você escreva código.`,
  },
  {
    pergunta: `Preciso instalar o ${nome} no computador?`,
    resposta: "Não. Os exercícios rodam no próprio navegador ou no app: você escreve o código e vê o resultado ali mesmo.",
  },
  {
    pergunta: `O curso de ${nome} é grátis mesmo?`,
    resposta: "É. Criar conta, seguir a trilha e resolver os desafios não custa nada e não pede cartão de crédito.",
  },
  {
    pergunta: `Dá para aprender ${nome} pelo celular?`,
    resposta: "Dá. No Android tem o app na Play Store, e no iPhone a trilha funciona pelo navegador. Seu progresso é o mesmo no celular e no computador.",
  },
];

export const PAGINAS_CURSOS: PaginaCurso[] = [
  {
    slug: "aprender-python",
    curso: "Python",
    titulo: "Aprender Python grátis, do zero e pelo celular",
    descricao:
      "Curso de Python grátis para iniciantes: 42 aulas curtas com exercícios de código, do print às list comprehensions. No navegador e no app Android.",
    h1: "Aprenda Python do zero, de graça",
    chamada:
      "Uma trilha de 42 aulas curtas que começa no primeiro print e chega a dicionários e list comprehensions. Você escreve código de verdade em cada desafio.",
    porque: [
      "Python tem uma escrita enxuta, perto do inglês, e por isso costuma ser a primeira linguagem de muita gente.",
      "É usada em análise de dados, automação de tarefas, inteligência artificial e sistemas web.",
    ],
    totalAulas: 42,
    unidades: [
      { titulo: "Primeiros passos", aulas: ["Mostrando valores com print", "Guardando valores em variáveis", "Números e contas", "Textos e f-strings"] },
      { titulo: "Funções", aulas: ["Criando a sua primeira função", "Parâmetros e return", "Escreva suas funções", "Funções prontas do Python"] },
      { titulo: "Decisões", aulas: ["Verdadeiro ou falso", "if, elif e else", "and, or e not", "Decidindo com código"] },
      { titulo: "Listas e laços", aulas: ["Listas", "Mudando a lista", "Repetindo com for", "Laços na prática"] },
      { titulo: "Dicionários", aulas: ["Dicionários: valores com nome", "Percorrendo dicionários", "Funções com dicionários", "Projeto: boletim"] },
      { titulo: "Transformando listas", aulas: ["List comprehension", "Filtrando com if", "sum, max, min e sorted", "Listas sem laço"] },
    ],
    exemplo: {
      arquivo: "notas.py",
      codigo: 'notas = [7, 9, 5, 10]\naprovadas = [n for n in notas if n >= 7]\nprint(f"Aprovadas: {len(aprovadas)} de {len(notas)}")',
      saida: "Aprovadas: 3 de 4",
    },
    perguntas: perguntasComuns("Python", "Mostrando valores com print"),
  },
  {
    slug: "aprender-javascript",
    curso: "JavaScript",
    titulo: "Aprender JavaScript grátis, do zero e pelo celular",
    descricao:
      "Curso de JavaScript grátis para iniciantes: 42 aulas curtas com exercícios de código, do console.log ao map e filter. No navegador e no app Android.",
    h1: "Aprenda JavaScript do zero, de graça",
    chamada:
      "Uma trilha de 42 aulas curtas que vai do primeiro console.log até objetos, map e filter. Você escreve código de verdade em cada desafio.",
    porque: [
      "JavaScript é a linguagem que roda dentro dos navegadores: quase tudo que se mexe num site passa por ela.",
      "Também roda fora do navegador, com Node.js, então dá para usar a mesma linguagem no site e no servidor.",
    ],
    totalAulas: 42,
    unidades: [
      { titulo: "Primeiros passos", aulas: ["Mostrando valores com console.log", "Guardando valores: let e const", "Números e contas", "Textos e template strings"] },
      { titulo: "Funções", aulas: ["Criando a sua primeira função", "Parâmetros e return", "Escreva suas funções", "Arrow functions"] },
      { titulo: "Decisões", aulas: ["Verdadeiro ou falso", "if e else", "E, ou, não", "Decidindo com código"] },
      { titulo: "Listas e laços", aulas: ["Arrays: listas de valores", "Mudando a lista", "Repetindo com for", "Laços na prática"] },
      { titulo: "Objetos", aulas: ["Objetos: valores com nome", "Listas de objetos", "Funções com objetos", "Projeto: boletim"] },
      { titulo: "Transformando listas", aulas: ["map: transformar cada item", "filter: ficar só com alguns", "find e some: procurando", "Listas sem laço"] },
    ],
    exemplo: {
      arquivo: "notas.js",
      codigo:
        "const notas = [7, 9, 5, 10];\nconst aprovadas = notas.filter((n) => n >= 7);\nconsole.log(`Aprovadas: ${aprovadas.length} de ${notas.length}`);",
      saida: "Aprovadas: 3 de 4",
    },
    perguntas: perguntasComuns("JavaScript", "Mostrando valores com console.log"),
  },
  {
    slug: "aprender-typescript",
    curso: "TypeScript",
    titulo: "Aprender TypeScript grátis, com exercícios práticos",
    descricao:
      "Curso de TypeScript grátis: 41 aulas curtas sobre tipos, interfaces, uniões e genéricos, com exercícios de código. No navegador e no app Android.",
    h1: "Aprenda TypeScript de graça, com prática",
    chamada:
      "Uma trilha de 41 aulas curtas que vai dos tipos básicos até genéricos e tipos utilitários. Você escreve código de verdade em cada desafio.",
    porque: [
      "TypeScript é JavaScript com tipos: o editor avisa do erro antes de o programa rodar.",
      "É muito usado em projetos web grandes. Se você nunca programou, começar pela trilha de JavaScript ajuda.",
    ],
    totalAulas: 41,
    unidades: [
      { titulo: "Tipos básicos", aulas: ["JavaScript com tipos", "string, number e boolean", "Inferência: o tipo que vem sozinho", "Escreva com tipos"] },
      { titulo: "Funções tipadas", aulas: ["Parâmetros e retorno com tipo", "Opcionais, valor padrão e void", "Funções com tipos na prática", "Tipos de função"] },
      { titulo: "Listas e tuplas", aulas: ["Arrays com tipo", "Tuplas", "Union: um ou outro", "Listas na prática"] },
      { titulo: "Objetos com forma", aulas: ["type e interface", "Opcionais e readonly", "Objetos na prática", "Projeto: carrinho de compras"] },
      { titulo: "Estreitando tipos", aulas: ["typeof: descobrindo o tipo", "null e undefined", "Uniões com etiqueta", "Estreitando na prática"] },
      { titulo: "Genéricos e utilitários", aulas: ["Genéricos: o tipo como parâmetro", "Tipos utilitários", "Genéricos na prática", "Projeto: biblioteca de tarefas"] },
    ],
    exemplo: {
      arquivo: "tarefas.ts",
      codigo:
        'type Tarefa = { titulo: string; feita: boolean };\n\nconst tarefas: Tarefa[] = [\n  { titulo: "Estudar tipos", feita: true },\n  { titulo: "Fazer o desafio", feita: false },\n];\n\nconst faltam = tarefas.filter((t) => !t.feita).length;\nconsole.log(`Faltam ${faltam} tarefa(s)`);',
      saida: "Faltam 1 tarefa(s)",
    },
    perguntas: perguntasComuns("TypeScript", "JavaScript com tipos"),
  },
  {
    slug: "aprender-java",
    curso: "Java",
    titulo: "Aprender Java grátis, do zero e pelo celular",
    descricao:
      "Curso de Java grátis para iniciantes: 42 aulas curtas com exercícios de código, das variáveis a classes, ArrayList e HashMap. No navegador e no app Android.",
    h1: "Aprenda Java do zero, de graça",
    chamada:
      "Uma trilha de 42 aulas curtas que começa no primeiro programa e chega a classes, objetos e coleções. Você escreve código de verdade em cada desafio.",
    porque: [
      "Java está em sistemas de bancos e grandes empresas e é a linguagem de muitas faculdades e cursos técnicos.",
      "É uma boa porta para orientação a objetos: classes, construtores e encapsulamento aparecem cedo.",
    ],
    totalAulas: 42,
    unidades: [
      { titulo: "Primeiros passos", aulas: ["Olá, Java", "Variáveis e tipos", "Contas e a divisão inteira", "Textos"] },
      { titulo: "Decisões", aulas: ["Comparações e boolean", "if, else if e else", "&&, || e !", "switch"] },
      { titulo: "Laços e arrays", aulas: ["Repetindo com for", "while", "Arrays", "Percorrendo arrays"] },
      { titulo: "Métodos", aulas: ["Criando métodos", "return", "Sobrecarga", "Escopo das variáveis"] },
      { titulo: "Classes e objetos", aulas: ["Sua primeira classe", "Construtores", "Métodos de objeto", "Encapsulamento: private e getters"] },
      { titulo: "Coleções", aulas: ["ArrayList", "Percorrendo listas", "HashMap", "Juntando tudo: lista de objetos"] },
    ],
    exemplo: {
      arquivo: "Main.java",
      codigo:
        'public class Main {\n  public static void main(String[] args) {\n    int[] notas = {7, 9, 5, 10};\n    int aprovadas = 0;\n    for (int n : notas) {\n      if (n >= 7) aprovadas++;\n    }\n    System.out.println("Aprovadas: " + aprovadas + " de " + notas.length);\n  }\n}',
      saida: "Aprovadas: 3 de 4",
    },
    perguntas: perguntasComuns("Java", "Olá, Java"),
  },
  {
    slug: "aprender-csharp",
    curso: "C#",
    titulo: "Aprender C# grátis, do zero e pelo celular",
    descricao:
      "Curso de C# grátis para iniciantes: 42 aulas curtas com exercícios de código, das variáveis a classes, records e LINQ. No navegador e no app Android.",
    h1: "Aprenda C# do zero, de graça",
    chamada:
      "Uma trilha de 42 aulas curtas que começa no primeiro programa e chega a classes, records, Dictionary e LINQ. Você escreve código de verdade em cada desafio.",
    porque: [
      "C# é a linguagem principal do .NET, da Microsoft, usada em sistemas web, aplicativos de empresa e programas para Windows.",
      "Também é a linguagem dos jogos feitos na Unity.",
    ],
    totalAulas: 42,
    unidades: [
      { titulo: "Primeiros passos", aulas: ["Olá, C#", "Variáveis e tipos", "Contas", "Textos e interpolação"] },
      { titulo: "Decisões", aulas: ["Comparações e bool", "if e else", "switch", "null e ??"] },
      { titulo: "Laços e listas", aulas: ["for e while", "Arrays", "List", "Percorrendo e filtrando"] },
      { titulo: "Métodos", aulas: ["Criando métodos", "Parâmetros opcionais e nomeados", "Vários resultados: tuplas e out", "Escopo e passagem de valores"] },
      { titulo: "Classes e objetos", aulas: ["Classes e propriedades", "Construtores", "Métodos de objeto", "Records e herança"] },
      { titulo: "Coleções e LINQ", aulas: ["Dictionary", "LINQ: Where e Select", "LINQ: contar, somar e ordenar", "Juntando tudo: lista de objetos"] },
    ],
    exemplo: {
      arquivo: "Program.cs",
      codigo:
        'var notas = new List<int> { 7, 9, 5, 10 };\nvar aprovadas = notas.Where(n => n >= 7).Count();\nConsole.WriteLine($"Aprovadas: {aprovadas} de {notas.Count}");',
      saida: "Aprovadas: 3 de 4",
    },
    perguntas: perguntasComuns("C#", "Olá, C#"),
  },
  {
    slug: "aprender-go",
    curso: "Go",
    titulo: "Aprender Go (Golang) grátis, do zero e pelo celular",
    descricao:
      "Curso de Go (Golang) grátis para iniciantes: 42 aulas curtas com exercícios de código, de variáveis a structs, interfaces e maps. No navegador e no app Android.",
    h1: "Aprenda Go do zero, de graça",
    chamada:
      "Uma trilha de 42 aulas curtas que começa no primeiro programa e chega a structs, ponteiros, interfaces e maps. Você escreve código de verdade em cada desafio.",
    porque: [
      "Go foi criada no Google para ser simples e rápida. Tem poucas palavras-chave e um jeito só de fazer cada coisa.",
      "É usada em servidores e em ferramentas de nuvem; o Docker e o Kubernetes são escritos em Go.",
    ],
    totalAulas: 42,
    unidades: [
      { titulo: "Primeiros passos", aulas: ["Olá, Go", "Variáveis", "Contas", "Textos"] },
      { titulo: "Decisões", aulas: ["Comparações e bool", "if e else", "switch", "Escopo e a variável curta"] },
      { titulo: "Laços e slices", aulas: ["for, o único laço", "Slices", "range", "Slices na prática"] },
      { titulo: "Funções", aulas: ["Criando funções", "Vários retornos", "Erros como valores", "Funções como valores"] },
      { titulo: "Structs e métodos", aulas: ["Structs", "Métodos", "Ponteiros e receptores", "Interfaces"] },
      { titulo: "Mapas", aulas: ["Maps", "A chave existe?", "Contando e agrupando", "Ordenando"] },
    ],
    exemplo: {
      arquivo: "main.go",
      codigo:
        'package main\n\nimport "fmt"\n\nfunc main() {\n    notas := []int{7, 9, 5, 10}\n    aprovadas := 0\n    for _, n := range notas {\n        if n >= 7 {\n            aprovadas++\n        }\n    }\n    fmt.Printf("Aprovadas: %d de %d\\n", aprovadas, len(notas))\n}',
      saida: "Aprovadas: 3 de 4",
    },
    perguntas: perguntasComuns("Go", "Olá, Go"),
  },
];

export function paginaDoCurso(slug: string) {
  return PAGINAS_CURSOS.find((p) => p.slug === slug);
}

export function paginaPorNome(nome: string) {
  return PAGINAS_CURSOS.find((p) => p.curso === nome);
}

/* As perguntas da seção Dúvidas. Ficam fora do componente (que é de cliente)
   para a página também publicá-las como FAQ estruturado para o Google. */
export const PERGUNTAS: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "O ZulCode é gratuito mesmo?",
    resposta:
      "É. Criar conta, seguir a trilha e resolver os desafios não custa nada e não pede cartão de crédito.",
  },
  {
    pergunta: "Preciso saber programar pra começar?",
    resposta:
      "Não. A trilha começa do zero, explicando o que é uma variável antes de pedir que você escreva uma. Se você já sabe alguma coisa, dá pra avançar mais rápido pelas primeiras fases.",
  },
  {
    pergunta: "Preciso instalar alguma coisa no computador?",
    resposta:
      "Não. O código dos exercícios roda no próprio navegador — você abre o site, escreve e vê o resultado ali mesmo.",
  },
  {
    pergunta: "Quais linguagens estão disponíveis?",
    resposta:
      "Python, JavaScript, TypeScript, Java, C# e Go, cada uma com a própria trilha.",
  },
  {
    pergunta: "Funciona no celular?",
    resposta:
      "Funciona. No Android tem o app na Play Store, e no iPhone dá pra usar pelo navegador enquanto o app da App Store não chega. A trilha e a barra de navegação foram pensadas pro polegar.",
  },
];

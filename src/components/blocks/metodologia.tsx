export default function Metodologia() {
  return (
    <div 
      id="metodologia" 
      className="px-[100px] w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16 py-16"
    >
      <div className="flex items-start gap-2 shrink-0">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Qual a nossa<br />
          <span className="text-primary">metodologia</span>
        </h3>
        <span className="text-7xl md:text-8xl lg:text-9xl font-bold leading-tight text-primary text-center">
          ?
        </span>
      </div>
      <div className="w-full lg:pt-2">
        <p className="text-base md:text-lg text-muted-foreground w-full leading-relaxed">
          Na ZulCode, acreditamos que aprender a programar deve ser tão divertido quanto o seu jogo favorito. Nossa metodologia transforma conceitos complexos em lições rápidas e desafios interativos onde você ganha XP e sobe no ranking a cada acerto. O foco é a constância: através de metas diárias e sistemas de recompensas, ajudamos você a criar o hábito de codar sem esforço. Aqui, você domina a lógica de programação enquanto mantém sua ofensiva ativa e conquista seu espaço no mercado. É o aprendizado prático, viciante e direto ao ponto.
        </p>
      </div>
    </div>
  );
}
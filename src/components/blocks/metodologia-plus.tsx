import MetodologiaBlocks from "./metodologia-blocks";

export default function MetodologiaPlus() {
  return (
    <section className="w-full px-6 py-24 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
            Vicia, mas faz{" "}
            <span className="text-primary">bem</span>
            <br />
            para seu futuro
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-prose">
            Usamos mecânicas de jogos para tornar o aprendizado de programação
            divertido e viciante. Com desafios, recompensas e uma comunidade
            engajada, você vai querer voltar todos os dias para aprender mais e
            subir de nível!
          </p>
        </div>
        <MetodologiaBlocks />
      </div>
    </section>
  );
}
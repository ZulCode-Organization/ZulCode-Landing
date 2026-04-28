import { BsGraphUpArrow } from "react-icons/bs";
import { FaFireAlt, FaRegHeart } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";

const blocks = [
  {
    icon: <FaFireAlt className="text-primary text-xl" />,
    title: "Mantenha a Ofensiva",
    description:
      "Estude um pouco todos os dias para manter o ritmo e a motivação. A prática constante é a chave para o sucesso!",
  },
  {
    icon: <FaRegHeart className="text-primary text-xl" />,
    title: "Gerencie suas vidas",
    description:
      "Errou? Perdeu uma vida. Isso te força a pensar antes de agir, tornando o aprendizado mais eficaz e divertido.",
  },
  {
    icon: <FaBookBookmark className="text-primary text-xl" />,
    title: "Desenvolva suas habilidades",
    description:
      "Aprenda com desafios práticos e realistas que simulam situações do mundo real.",
  },
  {
    icon: <BsGraphUpArrow className="text-primary text-xl" />,
    title: "Ganhe recompensas",
    description:
      "Complete desafios e alcance novos níveis para ganhar recompensas e validar seu progresso.",
  },
];

export default function MetodologiaBlocks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {blocks.map((item) => (
        <div
          key={item.title}
          className="flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow duration-200"
        >
          <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center">
            {item.icon}
          </div>
          <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
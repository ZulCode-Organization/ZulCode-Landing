import { BsGraphUpArrow } from "react-icons/bs";
import { FaFireAlt, FaRegHeart } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { Reveal } from "../reveal";

const blocks = [
  {
    icon: <FaFireAlt className="text-xl" />,
    title: "Mantenha a Ofensiva",
    description:
      "Estude um pouco todos os dias para manter o ritmo e a motivação. A prática constante é a chave para o sucesso!",
  },
  {
    icon: <FaRegHeart className="text-xl" />,
    title: "Gerencie suas vidas",
    description:
      "Errou? Perdeu uma vida. Isso te força a pensar antes de agir, tornando o aprendizado mais eficaz e divertido.",
  },
  {
    icon: <FaBookBookmark className="text-xl" />,
    title: "Desenvolva suas habilidades",
    description:
      "Aprenda com desafios práticos e realistas que simulam situações do mundo real.",
  },
  {
    icon: <BsGraphUpArrow className="text-xl" />,
    title: "Ganhe recompensas",
    description:
      "Complete desafios e alcance novos níveis para ganhar recompensas e validar seu progresso.",
  },
];

export default function MetodologiaBlocks() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {blocks.map((item, index) => (
        <Reveal key={item.title} delay={index * 90}>
          <div className="zc-superficie flex h-full flex-col gap-3 rounded-2xl p-6 transition-colors duration-200 hover:border-primary/40">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
              {item.icon}
            </div>
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

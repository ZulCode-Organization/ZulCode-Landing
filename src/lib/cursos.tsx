import type { ReactNode } from "react";
import { FaJava } from "react-icons/fa";
import { SiGo, SiJavascript, SiPython, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

/* Os cursos que têm trilha de verdade no app (pastas de conteudo/cursos do
   backend). A landing não promete linguagem que o app não ensina. */
export type Curso = { nome: string; icone: ReactNode; cor: string };

export const CURSOS: Curso[] = [
  { nome: "Python", icone: <SiPython />, cor: "#3776ab" },
  { nome: "JavaScript", icone: <SiJavascript />, cor: "#e6b800" },
  { nome: "TypeScript", icone: <SiTypescript />, cor: "#3178c6" },
  { nome: "Java", icone: <FaJava />, cor: "#e76f00" },
  { nome: "C#", icone: <TbBrandCSharp />, cor: "#8a3fd1" },
  { nome: "Go", icone: <SiGo />, cor: "#00add8" },
];

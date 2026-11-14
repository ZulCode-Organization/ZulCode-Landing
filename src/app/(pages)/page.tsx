import BarraViva from "@/components/blocks/barra-viva";
import CacaAoBug from "@/components/blocks/caca-ao-bug";
import ComoFunciona from "@/components/blocks/como-funciona";
import Faq from "@/components/blocks/faq";
import Fecho from "@/components/blocks/fecho";
import Footer from "@/components/blocks/footer";
import HomeHero from "@/components/blocks/home-hero";
import Metodologia from "@/components/blocks/metodologia";
import MetodologiaPlus from "@/components/blocks/metodologia-plus";
import QualquerTela from "@/components/blocks/qualquer-tela";
import Stack from "@/components/blocks/stack";
import VerboCodigo from "@/components/blocks/verbo-codigo";

/* As seções alternam o fundo chapado com faixas em `bg-secondary/40`, como a
   tela de login do app divide showcase e formulário. */
export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HomeHero />
      <Stack />
      <VerboCodigo />
      <QualquerTela />
      <BarraViva />
      <ComoFunciona />
      <CacaAoBug />
      <Metodologia />
      <MetodologiaPlus />
      <Faq />
      <Fecho />
      <Footer />
    </div>
  );
}

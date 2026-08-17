import ComoFunciona from "@/components/blocks/como-funciona";
import Faq from "@/components/blocks/faq";
import Footer from "@/components/blocks/footer";
import HomeHero from "@/components/blocks/home-hero";
import Metodologia from "@/components/blocks/metodologia";
import MetodologiaPlus from "@/components/blocks/metodologia-plus";
import Stack from "@/components/blocks/stack";

/* A separação entre seções vem do próprio fundo: blocos em `bg-background` se
   alternam com faixas em `bg-secondary/40` e borda, do mesmo jeito que a tela
   de login divide showcase e formulário. Sem degradê, sem vidro. */
export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HomeHero />
      <Stack />
      <ComoFunciona />
      <Metodologia />
      <MetodologiaPlus />
      <Faq />
      <Footer />
    </div>
  );
}

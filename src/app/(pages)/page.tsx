import { JsonLd, ORGANIZACAO, faqEstruturado } from "@/components/seo/json-ld";
import { PERGUNTAS } from "@/lib/faq";
import { PLAY_STORE, SITE_URL } from "@/lib/links";
import { PAGINAS_CURSOS } from "@/lib/paginas-cursos";
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
/* O que o Google lê sobre a home: o site, o app grátis, os cursos e o FAQ. */
const DADOS = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZACAO,
    // O nome que o Google mostra no lugar de "zulcode.tech" no resultado.
    { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: "ZulCode", alternateName: ["Zul Code", "zulcode.tech"], inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}/#organizacao` } },
    {
      "@type": "MobileApplication",
      name: "ZulCode",
      operatingSystem: "Android",
      applicationCategory: "EducationalApplication",
      installUrl: PLAY_STORE,
      offers: { "@type": "Offer", price: 0, priceCurrency: "BRL" },
      publisher: { "@id": `${SITE_URL}/#organizacao` },
    },
    {
      "@type": "ItemList",
      name: "Cursos de programação grátis do ZulCode",
      itemListElement: PAGINAS_CURSOS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `Aprender ${p.curso}`, url: `${SITE_URL}/${p.slug}` })),
    },
    faqEstruturado(PERGUNTAS),
  ],
};

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd dados={DADOS} />
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

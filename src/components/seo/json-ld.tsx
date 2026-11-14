import { PLAY_STORE, SITE_URL } from "@/lib/links";
import type { Pergunta } from "@/lib/paginas-cursos";

/* Dados estruturados (schema.org) para o Google entender a página: quem é o
   ZulCode, que existe um app grátis, quais são os cursos e as perguntas
   frequentes. Vai como <script type="application/ld+json">, invisível na tela.
   O `<` é escapado para nenhum texto conseguir fechar a tag do script. */
export function JsonLd({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}

export const ORGANIZACAO = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organizacao`,
  name: "ZulCode",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-light.png`,
  sameAs: [
    "https://github.com/ZulCode-Organization",
    "https://instagram.com/zulcode",
    "https://www.tiktok.com/@zul_code",
    PLAY_STORE,
  ],
};

export function faqEstruturado(perguntas: Pergunta[]) {
  return {
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };
}

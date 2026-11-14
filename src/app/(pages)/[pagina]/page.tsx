import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import Footer from "@/components/blocks/footer";
import { Lojas } from "@/components/blocks/lojas";
import { Reveal } from "@/components/reveal";
import { JsonLd, ORGANIZACAO, faqEstruturado } from "@/components/seo/json-ld";
import { Botao3D } from "@/components/ui/botao-3d";
import { CURSOS } from "@/lib/cursos";
import { APP_CADASTRO, SITE_URL } from "@/lib/links";
import { PAGINAS_CURSOS, paginaDoCurso } from "@/lib/paginas-cursos";

/* Só existem as páginas das linguagens: qualquer outro endereço vira 404, em
   vez de uma página vazia que o Google indexaria. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGINAS_CURSOS.map((p) => ({ pagina: p.slug }));
}

type Props = { params: Promise<{ pagina: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pagina = paginaDoCurso((await params).pagina);
  if (!pagina) return {};
  const url = `/${pagina.slug}`;
  return {
    title: pagina.titulo,
    description: pagina.descricao,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "pt_BR", url, siteName: "ZulCode", title: pagina.titulo, description: pagina.descricao, images: [{ url: "/mascot.png" }] },
    twitter: { card: "summary_large_image", title: pagina.titulo, description: pagina.descricao, images: ["/mascot.png"] },
  };
}

export default async function PaginaCurso({ params }: Props) {
  const pagina = paginaDoCurso((await params).pagina);
  if (!pagina) notFound();
  const curso = CURSOS.find((c) => c.nome === pagina.curso);
  const outras = PAGINAS_CURSOS.filter((p) => p.slug !== pagina.slug);
  const url = `${SITE_URL}/${pagina.slug}`;

  const dados = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACAO,
      {
        "@type": "Course",
        name: `Curso de ${pagina.curso} grátis`,
        description: pagina.descricao,
        url,
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        educationalLevel: "Iniciante",
        provider: { "@id": `${SITE_URL}/#organizacao` },
        offers: { "@type": "Offer", price: 0, priceCurrency: "BRL", category: "Free" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: `${pagina.totalAulas} aulas` },
        syllabusSections: pagina.unidades.map((u) => ({ "@type": "Syllabus", name: u.titulo, description: u.aulas.join(", ") })),
      },
      { ...faqEstruturado(pagina.perguntas) },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ZulCode", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `Aprender ${pagina.curso}`, item: url },
        ],
      },
    ],
  };

  return (
    <main className="flex w-full flex-col">
      <JsonLd dados={dados} />

      {/* Abertura */}
      <section className="w-full px-6 pb-16 pt-8 sm:px-10 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Você está em" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">ZulCode</Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="text-foreground">Aprender {pagina.curso}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col items-start">
              <span
                className="flex size-16 items-center justify-center rounded-[16px] text-[2rem] text-white"
                style={{ background: curso?.cor }}
                aria-hidden
              >
                {curso?.icone}
              </span>
              <h1 className="mt-6 text-[2.4rem] font-black leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl">
                {pagina.h1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{pagina.chamada}</p>

              <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em]">
                {["Grátis", `${pagina.unidades.length} unidades`, `${pagina.totalAulas} aulas`, "Do zero"].map((t) => (
                  <li key={t} className="rounded-full border-2 border-border bg-card px-3 py-1 text-muted-foreground">{t}</li>
                ))}
              </ul>

              <Botao3D href={APP_CADASTRO} tamanho="grande" className="mt-8 w-full max-w-sm" faceClassName="whitespace-nowrap">
                Começar {pagina.curso} agora
              </Botao3D>
              <Lojas tamanho="pequeno" className="mt-6" />
            </div>

            {/* Um programa curto, do nível que a trilha alcança. */}
            <div className="zc-superficie overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">{pagina.exemplo.arquivo}</span>
              </div>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.82rem] leading-6 text-foreground sm:text-[0.92rem]">
                <code>{pagina.exemplo.codigo}</code>
              </pre>
              <div className="border-t border-border bg-secondary/40 px-5 py-3 font-mono text-[0.82rem] sm:text-[0.92rem]">
                <span className="text-muted-foreground">saída › </span>
                <span className="text-emerald-600 dark:text-emerald-400">{pagina.exemplo.saida}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A trilha */}
      <section className="w-full border-y border-border bg-secondary/40 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">A trilha</span>
            <h2 className="mt-3 text-3xl font-black leading-[1.1] tracking-tight text-foreground md:text-4xl">
              O que você vai aprender em {pagina.curso}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              {pagina.unidades.length} unidades com {pagina.totalAulas} aulas. Cada unidade tem um
              &quot;ache o erro&quot; e termina com uma prova.
            </p>
          </Reveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pagina.unidades.map((u, i) => (
              <li key={u.titulo}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <div className="h-full rounded-2xl border-2 border-border bg-card p-6">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">Unidade {i + 1}</p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-foreground">{u.titulo}</h3>
                    <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                      {u.aulas.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full" style={{ background: curso?.cor }} aria-hidden />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Por que essa linguagem */}
      <section className="w-full px-6 py-20 sm:px-10">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black leading-[1.1] tracking-tight text-foreground md:text-4xl">
            Por que aprender {pagina.curso}?
          </h2>
          {pagina.porque.map((p) => (
            <p key={p} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{p}</p>
          ))}
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            No ZulCode, cada acerto rende XP e rupees, a ofensiva marca os dias seguidos de estudo e as
            penas deixam você errar sem medo.
          </p>
        </Reveal>
      </section>

      {/* Dúvidas: <details> abre e fecha sem JavaScript. */}
      <section className="w-full border-y border-border bg-secondary/40 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-black leading-[1.1] tracking-tight text-foreground md:text-4xl">
            Dúvidas sobre o curso de {pagina.curso}
          </h2>
          <div className="flex flex-col gap-3">
            {pagina.perguntas.map((p) => (
              <details key={p.pergunta} className="group zc-superficie rounded-2xl">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-foreground sm:text-base [&::-webkit-details-marker]:hidden">
                  {p.pergunta}
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{p.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* As outras trilhas, e o convite final. */}
      <section className="w-full px-6 py-20 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <h2 className="text-3xl font-black leading-[1.1] tracking-tight text-balance text-foreground md:text-4xl">
            Comece {pagina.curso} hoje, de graça
          </h2>
          <Botao3D href={APP_CADASTRO} tamanho="grande" className="mt-8 w-full max-w-sm" faceClassName="whitespace-nowrap">
            Criar conta grátis
          </Botao3D>
          <p className="mt-14 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Outras linguagens</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-3">
            {outras.map((o) => {
              const c = CURSOS.find((x) => x.nome === o.curso);
              return (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="flex items-center gap-2.5 rounded-[14px] border-2 border-border bg-card px-4 py-2.5 font-black text-foreground transition-colors hover:border-primary/60"
                  >
                    <span className="flex size-7 items-center justify-center rounded-lg text-base text-white" style={{ background: c?.cor }} aria-hidden>
                      {c?.icone}
                    </span>
                    Aprender {o.curso}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/links";
import { PAGINAS_CURSOS } from "@/lib/paginas-cursos";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...PAGINAS_CURSOS.map((p) => ({ url: `${SITE_URL}/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

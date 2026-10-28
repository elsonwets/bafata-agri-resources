import { site } from "@/data/site";
import { LANGS, dicts, type Lang } from "@/i18n";

type PageHead = {
  lang: Lang;
  /** Path of this page, with trailing slash ("/", "/fr/", "/buy-raw-cashew-nuts/"). */
  path: string;
  title: string;
  description: string;
  /** Path of this page in each language, for hreflang. English is x-default. */
  alternates: Partial<Record<Lang, string>>;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  jsonLd: object;
};

/**
 * Everything a page puts in <head>: title, description, canonical, hreflang
 * alternates, Open Graph, Twitter card and its JSON-LD graph. The root route
 * only carries what is identical on every page.
 */
export function pageHead(p: PageHead) {
  const url = `${site.url}${p.path}`;
  const image = p.image ?? `${site.url}/og-image.jpg`;
  const t = dicts[p.lang];

  return {
    meta: [
      { title: p.title },
      { name: "description", content: p.description },
      { property: "og:type", content: p.type ?? "website" },
      { property: "og:locale", content: t.meta.ogLocale },
      ...LANGS.filter((l) => l !== p.lang && p.alternates[l]).map((l) => ({
        property: "og:locale:alternate",
        content: dicts[l].meta.ogLocale,
      })),
      { property: "og:url", content: url },
      { property: "og:site_name", content: site.shortName },
      { property: "og:title", content: p.title },
      { property: "og:description", content: p.description },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: p.imageAlt ?? t.meta.ogAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: p.title },
      { name: "twitter:description", content: p.description },
      { name: "twitter:image", content: image },
    ],
    links: [
      { rel: "canonical", href: url },
      ...Object.entries(p.alternates).map(([l, path]) => ({
        rel: "alternate",
        hrefLang: l,
        href: `${site.url}${path}`,
      })),
      ...(p.alternates.en ? [{ rel: "alternate", hrefLang: "x-default", href: `${site.url}${p.alternates.en}` }] : []),
    ],
    scripts: [
      {
        type: "application/ld+json",
        // Static, author-controlled content — no user input reaches this string.
        children: JSON.stringify(p.jsonLd),
      },
    ],
  };
}

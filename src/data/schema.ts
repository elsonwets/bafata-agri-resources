import { site } from "./site.ts";
import type { Guide } from "./guides.ts";
import { dicts, homePath, type Lang } from "../i18n/index.tsx";

/**
 * JSON-LD graphs.
 *
 * Search engines use them for rich results; answer engines (ChatGPT,
 * Perplexity, Google AI Overviews) use them to tie the facts on a page to one
 * entity — "Bafata Agri Resources, a raw cashew exporter in Bissau". Every
 * value is derived from the same data the visible page renders: never put a
 * claim in a graph that the page itself does not make.
 */

const org = `${site.url}/#organization`;
const website = `${site.url}/#website`;
const ogImage = `${site.url}/og-image.jpg`;

/** The company, described once (in English) and referenced by @id. */
function organization() {
  const t = dicts.en;
  const spec = (i: number) => t.quality.table.rows[i].ours;

  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": org,
    name: site.shortName,
    legalName: site.legalName,
    alternateName: ["Bafata Agri", "Bafata Agri Resources SARL", "Bafatá Agri Resources"],
    url: site.url,
    description: t.meta.description,
    slogan: site.tagline,
    logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-mark.png`, width: 470, height: 369 },
    image: ogImage,
    email: site.email,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      { "@type": "Country", name: site.country },
      ...t.markets.routes.map((r) => ({ "@type": "Country", name: r.country })),
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phone,
      email: site.email,
      areaServed: "Worldwide",
    },
    knowsAbout: [
      "Raw cashew nuts (RCN)",
      "Cashew export from Guinea-Bissau",
      "Guinea-Bissau cashew campaign",
      "Kernel outturn ratio (KOR)",
      "Cashew moisture control",
      "Export documentation",
      "Phytosanitary certification",
      "Port of Bissau",
    ],
    makesOffer: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      availabilityStarts: site.campaign.openingISO,
      areaServed: "Worldwide",
      itemOffered: {
        "@type": "Product",
        name: "Raw cashew nuts (RCN), Guinea-Bissau origin",
        category: "Agricultural commodity",
        description: t.origin.disclaimer,
        countryOfOrigin: { "@type": "Country", name: site.country },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Outturn (KOR)", value: spec(0) },
          { "@type": "PropertyValue", name: "Moisture", value: spec(1) },
          { "@type": "PropertyValue", name: "Nut count per kg", value: spec(2) },
          { "@type": "PropertyValue", name: "Incoterms", value: site.incoterms.join(", ") },
        ],
      },
    },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": website,
    url: `${site.url}/`,
    name: site.shortName,
    publisher: { "@id": org },
    inLanguage: ["en", "fr", "pt"],
  };
}

const faqNode = (id: string, items: { q: string; a: string }[], lang: string) => ({
  "@type": "FAQPage",
  "@id": id,
  inLanguage: lang,
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export function homeGraph(lang: Lang) {
  const t = dicts[lang];
  const url = `${site.url}${homePath(lang)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": website },
        about: { "@id": org },
        primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
        dateModified: site.updated,
      },
      {
        "@type": "HowTo",
        "@id": `${url}#how-to-buy`,
        name: t.howToBuy.heading,
        description: t.howToBuy.lead,
        inLanguage: lang,
        step: t.howToBuy.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
      },
      faqNode(`${url}#faq`, t.faq.items, lang),
    ],
  };
}

export function guideGraph(g: Guide) {
  const url = `${site.url}/${g.slug}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      websiteNode(),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.h1,
        description: g.description,
        inLanguage: "en",
        url,
        image: `${site.url}/photos/${g.photo}.webp`,
        dateModified: site.updated,
        author: { "@id": org },
        publisher: { "@id": org },
        about: { "@id": org },
        isPartOf: { "@id": website },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: g.label, item: url },
        ],
      },
      faqNode(`${url}#faq`, g.faqs, "en"),
    ],
  };
}

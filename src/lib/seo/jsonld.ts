import { COMPANY } from "@/config/company";
import { FAQ, type FaqEntry } from "@/data/faq";

/**
 * Structured data builders.
 *
 * Every value resolves from COMPANY or the FAQ source, so the markup
 * cannot drift away from what the page actually says. Nothing here
 * asserts a rating, a price or a review: none exist, and fabricating
 * them in structured data is both a lie and a manual action waiting to
 * happen.
 */

export function buildOrganisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: COMPANY.name,
    url: COMPANY.url,
    email: COMPANY.email,
    logo: `${COMPANY.url}/logo/bafata-emblem.svg`,
    description:
      "Raw cashew nut exporter in Guinea-Bissau. Buys village by village, " +
      "grades and stores in Bafata, and loads at the port of Bissau for " +
      "India, the United Arab Emirates and Vietnam.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GW",
      addressLocality: "Bissau",
    },
    areaServed: COMPANY.markets.map((m) => m.label),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.url,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: COMPANY.legalName },
  };
}

export function buildFaqJsonLd(entries: FaqEntry[] = FAQ) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: COMPANY.url,
      },
    ],
  };
}

/** Everything the page embeds, in one graph. */
export function buildAllJsonLd() {
  return [
    buildOrganisationJsonLd(),
    buildWebSiteJsonLd(),
    buildFaqJsonLd(),
    buildBreadcrumbJsonLd(),
  ];
}

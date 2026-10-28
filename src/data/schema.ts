import { site } from "./site";
import { faqs, howToBuy, markets, origin, quality, seo } from "./content";

/**
 * JSON-LD graph for the home page.
 *
 * Search engines use it for rich results; answer engines (ChatGPT, Perplexity,
 * Google AI Overviews) use it to tie the facts on the page to one entity —
 * "Bafata Agri Resources, a raw cashew exporter in Bissau" — so every value
 * here is derived from the same data the visible page renders. Never put a
 * claim in this graph that the page itself does not make.
 */

const org = `${site.url}/#organization`;
const page = `${site.url}/#webpage`;
const ogImage = `${site.url}/og-image.jpg`;

const spec = (name: string) => quality.table.rows.find((r) => r.param === name)!.ours;

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": org,
      name: site.shortName,
      legalName: site.legalName,
      alternateName: ["Bafata Agri", "Bafata Agri Resources SARL"],
      url: site.url,
      description: seo.description,
      slogan: site.tagline,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-mark.svg` },
      image: ogImage,
      email: site.email,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: site.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      areaServed: [
        { "@type": "Country", name: site.country },
        ...[...new Set(markets.routes.map((r) => r.country))].map((name) => ({
          "@type": "Country",
          name,
        })),
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
          description: origin.disclaimer,
          countryOfOrigin: { "@type": "Country", name: site.country },
          additionalProperty: [
            { "@type": "PropertyValue", name: "Outturn (KOR)", value: spec("Outturn (KOR)") },
            { "@type": "PropertyValue", name: "Moisture", value: spec("Moisture") },
            { "@type": "PropertyValue", name: "Nut count per kg", value: spec("Nut count / kg") },
            { "@type": "PropertyValue", name: "Incoterms", value: markets.incoterms.join(", ") },
          ],
        },
      },
      ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.shortName,
      publisher: { "@id": org },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": page,
      url: `${site.url}/`,
      name: seo.title,
      description: seo.description,
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": org },
      primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
      dateModified: site.updated,
    },
    {
      "@type": "HowTo",
      "@id": `${site.url}/#how-to-buy`,
      name: howToBuy.heading,
      description: howToBuy.lead,
      step: howToBuy.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
        url: `${site.url}/#how-to-buy`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      isPartOf: { "@id": page },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

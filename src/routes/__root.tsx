import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "@/styles.css?url";
import { site } from "@/data/site";
import { faqs, seo } from "@/data/content";

const ogImage = `${site.url}/photos/port-crane-quay.webp`;

/**
 * Structured data. The Organization block establishes who is answering, and
 * the FAQPage block is what answer engines lift verbatim.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      description: seo.description,
      logo: `${site.url}/brand/logo-mark.svg`,
      telephone: site.phone,
      areaServed: "Worldwide",
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
      knowsAbout: [
        "Raw cashew nuts",
        "RCN export",
        "Guinea-Bissau cashew campaign",
        "Export documentation",
        "Phytosanitary certification",
      ],
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Raw cashew nuts (RCN), Guinea-Bissau origin",
          category: "Agricultural commodity",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords.join(", ") },
      { name: "theme-color", content: "#f3f4f0" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:url", content: site.url },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1800" },
      { property: "og:image:height", content: "1200" },
      { property: "og:image:alt", content: seo.ogAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${site.url}/` },
      { rel: "icon", href: "/brand/logo-mark.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        // Static, author-controlled content — no user input reaches this string.
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

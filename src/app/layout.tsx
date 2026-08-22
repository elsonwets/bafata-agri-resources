import type { Metadata, Viewport } from "next";
import { Anton, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/data/site";
import { seo, faqs } from "@/data/content";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ForestBackground } from "@/components/background/ForestBackground";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#04120c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${site.shortName}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/photos/port-crane-quay.webp",
        width: 1800,
        height: 1200,
        alt: seo.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/photos/port-crane-quay.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/brand/logo-mark.svg", type: "image/svg+xml" }],
  },
};

/**
 * Structured data. The Organization block establishes who is answering, and
 * the FAQPage block is what answer engines lift verbatim.
 */
function StructuredData() {
  const graph = {
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

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled content — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${fraunces.variable} ${inter.variable} ${mono.variable} antialiased`}
    >
      <body className="relative min-h-screen">
        <StructuredData />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to main content
        </a>

        <ForestBackground />

        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

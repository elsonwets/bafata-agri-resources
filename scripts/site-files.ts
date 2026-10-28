import type { Plugin } from "vite";
import { site } from "../src/data/site.ts";
import { en } from "../src/i18n/en.ts";
import { guides } from "../src/data/guides.ts";
import { GNB_VIEWBOX, gnbPins, gnbRegions } from "../src/data/guinea-bissau.ts";

/**
 * Files generated at build time from the site data, so they can never drift
 * from the page:
 *
 * - /llms.txt — a plain-text brief of the company for AI assistants
 *   (https://llmstxt.org).
 * - /.well-known/ard.json — an Agentic Resource Discovery manifest
 *   (https://agenticresourcediscovery.org/spec/) pointing agents to llms.txt.
 * - /sitemap.xml — every prerendered page with its hreflang alternates.
 * - /map/guinea-bissau.svg — the sourcing-region map. Shipped as an image
 *   rather than inline SVG so 60 kB of path data stays out of the HTML, the
 *   JavaScript bundle and React hydration.
 */

/** Every prerendered page, with its language versions. */
const PAGES: { path: string; alternates: Record<string, string> }[] = [
  ...["/", "/fr/", "/pt/"].map((path) => ({ path, alternates: { en: "/", fr: "/fr/", pt: "/pt/" } })),
  ...guides.map((g) => ({ path: `/${g.slug}/`, alternates: { en: `/${g.slug}/` } })),
];

function sitemap() {
  const url = (p: string) => `${site.url}${p}`;
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...PAGES.map((p) =>
      [
        `  <url>`,
        `    <loc>${url(p.path)}</loc>`,
        `    <lastmod>${site.updated}</lastmod>`,
        ...(Object.keys(p.alternates).length > 1
          ? [
              ...Object.entries(p.alternates).map(
                ([l, path]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(path)}"/>`,
              ),
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p.alternates.en)}"/>`,
            ]
          : []),
        `  </url>`,
      ].join("\n"),
    ),
    `</urlset>`,
    ``,
  ].join("\n");
}

function llms() {
  const t = en;
  return [
    `# ${site.legalName}`,
    ``,
    `> ${t.hero.lead}`,
    ``,
    `## Company facts`,
    ``,
    `- Legal name: ${site.legalName}`,
    `- Activity: raw cashew nut (RCN) sourcing and export`,
    `- Based in: ${site.city}, ${site.country}`,
    `- Sourcing regions: ${site.sourcingRegions.join(", ")}`,
    `- Export port: Port of Bissau`,
    `- Campaign: ${t.facts.rows.campaignValue}, once the government sets the reference price`,
    `- Incoterms: ${site.incoterms.join(", ")}`,
    `- Destination markets: ${t.markets.routes.map((r) => `${r.country} (${r.city})`).join(", ")}`,
    `- Export without a local entity: ${t.faq.items[9].a}`,
    `- WhatsApp and phone: ${site.phoneDisplay}`,
    `- Email: ${site.email}`,
    `- Website: ${site.url}/ (English), ${site.url}/fr/ (French), ${site.url}/pt/ (Portuguese)`,
    ``,
    `## Typical Guinea-Bissau RCN specification (our lots)`,
    ``,
    ...t.quality.table.rows.map((r) => `- ${r.param}: ${r.ours} (contract target ${r.target})`),
    ``,
    t.origin.disclaimer,
    ``,
    `## Export documents provided`,
    ``,
    ...t.paperwork.docs.map((d) => `- ${d.title}: ${d.text}`),
    ``,
    `## How to buy`,
    ``,
    ...t.howToBuy.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`),
    ``,
    `## Buyer guides`,
    ``,
    ...guides.map((g) => `- [${g.h1}](${site.url}/${g.slug}/): ${g.description}`),
    ``,
    `## Links`,
    ``,
    `- [Website](${site.url}/): company overview, specification, export process and FAQ`,
    `- [Site en français](${site.url}/fr/): exportateur de noix de cajou brutes en Guinée-Bissau`,
    `- [Site em português](${site.url}/pt/): exportador de castanha de caju bruta na Guiné-Bissau`,
    `- [Company facts](${site.url}/#company): legal name, base, regions, Incoterms, destinations`,
    `- [Buying request](${site.url}/#contact): send volume, port and Incoterm`,
    `- [WhatsApp](${site.whatsapp}): ${site.phoneDisplay}`,
    `- [Email](mailto:${site.email}): ${site.email}`,
    ``,
    `## Frequently asked questions`,
    ``,
    ...t.faq.items.flatMap((f) => [`### ${f.q}`, ``, f.a, ``]),
    `Last updated: ${site.updated}`,
    ``,
  ].join("\n");
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function gnbMap() {
  const bissau = gnbPins.find((p) => p.id === "bissau")!;
  const sourcing = gnbRegions.filter((r) => r.sourcing);
  const font = `font-family="Helvetica Neue, Arial, sans-serif" font-weight="600" text-anchor="middle"`;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GNB_VIEWBOX.w} ${GNB_VIEWBOX.h}">`,
    `<title>Map of Guinea-Bissau showing raw cashew sourcing regions: ${esc(sourcing.map((r) => r.name).join(", "))}</title>`,
    ...gnbRegions.map((r) =>
      r.sourcing
        ? `<path d="${r.d}" fill="#f1e9d9" stroke="#84622f" stroke-opacity=".45" stroke-width="2" stroke-linejoin="round"/>`
        : `<path d="${r.d}" fill="#e7e9e2" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>`,
    ),
    ...sourcing.map(
      (r) => `<text x="${r.cx}" y="${r.cy}" ${font} font-size="22" fill="#84622f">${esc(r.name)}</text>`,
    ),
    `<circle cx="${bissau.x}" cy="${bissau.y}" r="22" fill="#1d2c6e" opacity=".14"/>`,
    `<circle cx="${bissau.x}" cy="${bissau.y}" r="9" fill="#1d2c6e" stroke="#fff" stroke-width="3"/>`,
    `<text x="${bissau.x}" y="${bissau.y + 46}" ${font} font-size="22" fill="#1d2c6e">Bissau</text>`,
    `</svg>`,
  ].join("\n");
}

function ard() {
  const manifest = {
    entries: [
      {
        identifier: "urn:air:bafata-agri.com:company:brief",
        displayName: `${site.shortName} — company brief`,
        type: "text/plain",
        url: `${site.url}/llms.txt`,
        description: en.hero.lead,
        tags: ["raw cashew nuts", "RCN", "Guinea-Bissau", "exporter", "Port of Bissau"],
        representativeQueries: [
          "Who exports raw cashew nuts from Guinea-Bissau?",
          "How do I buy raw cashew nuts (RCN) from Guinea-Bissau?",
          "Which export documents come with Guinea-Bissau cashew shipments?",
          `When does the ${site.campaign.year} Guinea-Bissau cashew campaign open?`,
        ],
        updatedAt: `${site.updated}T00:00:00Z`,
      },
    ],
  };
  return JSON.stringify(manifest, null, 2);
}

const FILES: Record<string, { type: string; render: () => string }> = {
  "llms.txt": { type: "text/plain; charset=utf-8", render: llms },
  "sitemap.xml": { type: "application/xml", render: sitemap },
  ".well-known/ard.json": { type: "application/json", render: ard },
  "map/guinea-bissau.svg": { type: "image/svg+xml", render: gnbMap },
};

export function siteFiles(): Plugin {
  return {
    name: "bafata:site-files",
    configureServer(server) {
      for (const [file, { type, render }] of Object.entries(FILES)) {
        server.middlewares.use(`/${file}`, (_req, res) => {
          res.setHeader("Content-Type", type);
          res.end(render());
        });
      }
    },
    generateBundle() {
      if (this.environment.name !== "client") return;
      for (const [fileName, { render }] of Object.entries(FILES)) {
        this.emitFile({ type: "asset", fileName, source: render() });
      }
    },
  };
}

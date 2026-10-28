import type { Plugin } from "vite";
import { site } from "../src/data/site.ts";
import { faqs, hero, howToBuy, markets, origin, paperwork, quality } from "../src/data/content.ts";
import { GNB_VIEWBOX, gnbPins, gnbRegions } from "../src/data/guinea-bissau.ts";

/**
 * Files generated at build time from the site data, so they can never drift
 * from the page:
 *
 * - /llms.txt — a plain-text brief of the company for AI assistants
 *   (https://llmstxt.org).
 * - /map/guinea-bissau.svg — the sourcing-region map. Shipped as an image
 *   rather than inline SVG so 60 kB of path data stays out of the HTML, the
 *   JavaScript bundle and React hydration.
 */

function llms() {
  const countries = [...new Set(markets.routes.map((r) => r.country))];

  return [
    `# ${site.legalName}`,
    ``,
    `> ${hero.lead}`,
    ``,
    `## Company facts`,
    ``,
    `- Legal name: ${site.legalName}`,
    `- Activity: raw cashew nut (RCN) sourcing and export`,
    `- Based in: ${site.city}, ${site.country}`,
    `- Sourcing regions: ${site.sourcingRegions.join(", ")}`,
    `- Export port: Port of Bissau`,
    `- Campaign: preparation opens ${site.campaign.preparationMonth} ${site.campaign.year}; official opening ${site.campaign.openingMonth} ${site.campaign.year}, once the government sets the reference price`,
    `- Incoterms: ${markets.incoterms.join(", ")}`,
    `- Destination markets: ${countries.join(", ")}`,
    `- WhatsApp and phone: ${site.phoneDisplay}`,
    `- Email: ${site.email}`,
    `- Website: ${site.url}/`,
    ``,
    `## Typical Guinea-Bissau RCN specification (our lots)`,
    ``,
    ...quality.table.rows.map((r) => `- ${r.param}: ${r.ours} (contract target ${r.target})`),
    ``,
    origin.disclaimer,
    ``,
    `## Export documents provided`,
    ``,
    ...paperwork.docs.map((d) => `- ${d.title}: ${d.text}`),
    ``,
    `## How to buy`,
    ``,
    ...howToBuy.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`),
    ``,
    `## Links`,
    ``,
    `- [Website](${site.url}/): company overview, specification, export process and FAQ`,
    `- [Quality and moisture](${site.url}/#quality): parameters, targets and our lot ranges`,
    `- [Export documentation](${site.url}/#documents): the document set shipped with every lot`,
    `- [How to buy](${site.url}/#how-to-buy): the six steps from enquiry to discharge`,
    `- [Company facts](${site.url}/#company): legal name, base, regions, Incoterms, destinations`,
    `- [Buying request](${site.url}/#contact): send volume, port and Incoterm`,
    `- [WhatsApp](${site.whatsapp}): ${site.phoneDisplay}`,
    `- [Email](mailto:${site.email}): ${site.email}`,
    ``,
    `## Frequently asked questions`,
    ``,
    ...faqs.flatMap((f) => [`### ${f.q}`, ``, f.a, ``]),
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
    `<text x="${bissau.x}" y="${bissau.y + 46}" ${font} font-size="22" fill="#1d2c6e">Bissau · port</text>`,
    `</svg>`,
  ].join("\n");
}

const FILES: Record<string, { type: string; render: () => string }> = {
  "llms.txt": { type: "text/plain; charset=utf-8", render: llms },
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

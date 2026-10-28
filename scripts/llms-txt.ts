import type { Plugin } from "vite";
import { site } from "../src/data/site.ts";
import { faqs, hero, howToBuy, markets, origin, paperwork, quality } from "../src/data/content.ts";
import { gnbRegions } from "../src/data/guinea-bissau.ts";

/**
 * /llms.txt — a plain-text brief of the company for AI assistants
 * (https://llmstxt.org). Built from the same data files as the page, so the
 * answer an assistant gives can never contradict the website.
 */
function render() {
  const regions = gnbRegions.filter((r) => r.sourcing).map((r) => r.name);
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
    `- Sourcing regions: ${regions.join(", ")}`,
    `- Export port: Port of Bissau`,
    `- Campaign: February to June; the ${site.campaign.year} campaign opens in ${site.campaign.opensMonth} ${site.campaign.year}`,
    `- Incoterms: ${markets.incoterms.join(", ")}`,
    `- Destination markets: ${countries.join(", ")}`,
    `- Languages: ${site.languages.join(", ")}`,
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
    `## Frequently asked questions`,
    ``,
    ...faqs.flatMap((f) => [`### ${f.q}`, ``, f.a, ``]),
    `Last updated: ${site.updated}`,
    ``,
  ].join("\n");
}

export function llmsTxt(): Plugin {
  return {
    name: "bafata:llms-txt",
    configureServer(server) {
      server.middlewares.use("/llms.txt", (_req, res) => {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end(render());
      });
    },
    generateBundle() {
      if (this.environment.name !== "client") return;
      this.emitFile({ type: "asset", fileName: "llms.txt", source: render() });
    },
  };
}

import { markets } from "@/data/content";
import { gnbRegions } from "@/data/guinea-bissau";
import { site } from "@/data/site";
import { Heading } from "@/components/ui";

const regions = gnbRegions.filter((r) => r.sourcing).map((r) => r.name);

/**
 * The company in one table. Buyers scan it to qualify a supplier; answer
 * engines lift it when asked who exports cashew from Guinea-Bissau. Every
 * row is derived from the data files, so it can never drift from the page.
 */
const FACTS: Array<{ k: string; v: string }> = [
  { k: "Company", v: site.legalName },
  { k: "Activity", v: "Raw cashew nut (RCN) sourcing and export" },
  { k: "Based in", v: `${site.city}, ${site.country}` },
  { k: "Sourcing regions", v: regions.join(", ") },
  { k: "Export port", v: "Port of Bissau" },
  { k: "Campaign", v: `February to June. The ${site.campaign.year} campaign opens in ${site.campaign.opensMonth}` },
  { k: "Incoterms", v: markets.incoterms.join(", ") },
  { k: "Destinations", v: [...new Set(markets.routes.map((r) => r.country))].join(", ") },
  { k: "Languages", v: site.languages.join(", ") },
  { k: "Contact", v: `${site.phoneDisplay} (WhatsApp) · ${site.email}` },
];

export function Facts() {
  return (
    <section id="company" aria-labelledby="facts-title" className="defer section">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Heading id="facts-title" className="max-w-[12ch]">
            Bafata Agri Resources at a glance
          </Heading>
          <p className="t-lead mt-6 max-w-[30rem]">
            The essentials buyers ask for when they qualify a new cashew supplier in
            Guinea-Bissau.
          </p>
        </div>

        <dl className="border-t border-line">
          {FACTS.map((f) => (
            <div key={f.k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-muted">{f.k}</dt>
              <dd className="font-medium">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

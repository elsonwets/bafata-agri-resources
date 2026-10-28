import { useDict } from "@/i18n";
import { site } from "@/data/site";
import { Heading } from "@/components/ui";

/**
 * The company in one table. Buyers scan it to qualify a supplier; answer
 * engines lift it when asked who exports cashew from Guinea-Bissau. Every
 * row is derived from the data files, so it can never drift from the page.
 */
export function Facts() {
  const { facts, markets, cta } = useDict();
  const r = facts.rows;
  const rows = [
    { k: r.company, v: site.legalName },
    { k: r.activity, v: r.activityValue },
    { k: r.base, v: cta.office },
    { k: r.regions, v: site.sourcingRegions.join(", ") },
    { k: r.port, v: r.portValue },
    { k: r.campaign, v: r.campaignValue },
    { k: r.incoterms, v: site.incoterms.join(", ") },
    { k: r.destinations, v: markets.routes.map((d) => d.country).join(", ") },
    { k: r.contact, v: `${site.phoneDisplay} (WhatsApp) · ${site.email}` },
  ];
  return (
    <section id="company" aria-labelledby="facts-title" className="defer section">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Heading id="facts-title" className="max-w-[12ch]">
            {facts.heading}
          </Heading>
          <p className="t-lead mt-6 max-w-[30rem]">
            {facts.lead}
          </p>
        </div>

        <dl className="border-t border-line">
          {rows.map((f) => (
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

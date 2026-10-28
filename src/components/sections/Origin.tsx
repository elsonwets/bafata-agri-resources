import { origin } from "@/data/content";
import { site } from "@/data/site";
import { Heading } from "@/components/ui";

export function Origin() {
  return (
    <section id="origin" aria-labelledby="origin-title" className="section">
      <div className="shell">
        <Heading id="origin-title">{origin.heading.join(" ")}</Heading>

        <p className="t-statement mt-10 max-w-[46ch] lg:mt-14">
          {origin.body[0]} <span className="quiet">{origin.body[1]}</span>
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <figure className="rounded-[28px] bg-raised p-5 sm:p-8">
            {/* Generated at build time by scripts/site-files.ts. */}
            <img
              src="/map/guinea-bissau.svg"
              alt={`Map of Guinea-Bissau. Bissau is marked on the Atlantic coast; the highlighted raw cashew sourcing regions are ${site.sourcingRegions.join(", ")}.`}
              width={1000}
              height={601}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.8125rem] text-muted">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-[3px] bg-shell-tint ring-1 ring-shell/40" aria-hidden />
                Regions we buy in
              </span>
              <span>
                Boundaries:{" "}
                <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  geoBoundaries
                </a>
                ,{" "}
                <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  © OpenStreetMap contributors
                </a>{" "}
                (ODbL)
              </span>
            </figcaption>
          </figure>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line">
          {origin.stats.map((s) => (
            <div key={s.label} className="flex flex-col bg-raised p-5 sm:p-7">
              <dt className="text-[0.9375rem] text-muted">{s.label}</dt>
              <dd className="num mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none font-semibold tracking-[-0.035em] text-shell">
                {s.value}
              </dd>
              <dd className="mt-auto pt-4 text-[0.875rem] leading-snug text-ink-soft">{s.note}</dd>
            </div>
          ))}
          </dl>
        </div>
        <p className="mt-10 max-w-[60ch] text-[0.875rem] text-muted">{origin.disclaimer}</p>
      </div>
    </section>
  );
}

import { origin } from "@/data/content";
import { GNB_VIEWBOX, gnbPins, gnbRegions } from "@/data/guinea-bissau";
import { Heading } from "@/components/ui";

const bissau = gnbPins.find((p) => p.id === "bissau")!;
const sourcing = gnbRegions.filter((r) => r.sourcing);

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
            <svg
              viewBox={`0 0 ${GNB_VIEWBOX.w} ${GNB_VIEWBOX.h}`}
              className="w-full"
              role="img"
              aria-labelledby="gnb-title gnb-desc"
            >
              <title id="gnb-title">Map of Guinea-Bissau showing our raw cashew sourcing regions</title>
              <desc id="gnb-desc">
                Bissau is marked on the Atlantic coast. The highlighted regions are{" "}
                {sourcing.map((r) => r.name).join(", ")}.
              </desc>

              {gnbRegions.map((r) => (
                <path
                  key={r.id}
                  d={r.d}
                  fill={r.sourcing ? "var(--shell-tint)" : "var(--sunken)"}
                  stroke={r.sourcing ? "var(--shell)" : "var(--canvas)"}
                  strokeOpacity={r.sourcing ? 0.45 : 1}
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
              ))}

              {sourcing.map((r) => (
                <text
                  key={r.id}
                  x={r.cx}
                  y={r.cy}
                  textAnchor="middle"
                  fontSize={22}
                  fontWeight={600}
                  fill="var(--shell)"
                >
                  {r.name}
                </text>
              ))}

              <circle cx={bissau.x} cy={bissau.y} r={22} fill="var(--navy)" opacity={0.14} />
              <circle cx={bissau.x} cy={bissau.y} r={9} fill="var(--navy)" stroke="#fff" strokeWidth={3} />
              <text
                x={bissau.x}
                y={bissau.y + 46}
                textAnchor="middle"
                fontSize={22}
                fontWeight={650}
                fill="var(--navy)"
              >
                Bissau · port
              </text>
            </svg>
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

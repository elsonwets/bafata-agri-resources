import { markets } from "@/data/content";
import { MAP_VIEWBOX, mapDestinations, mapOrigin } from "@/data/map-points";
import { Heading } from "@/components/ui";

/**
 * Basemap and endpoint projections are baked at build time (see
 * scripts/build-map.mjs). The dotted basemap is used as a CSS mask so its
 * colour follows the design tokens instead of the colour it was baked in.
 */

/** A lifted quadratic arc between two projected points — long hauls bow
 *  more than short hops, and every route bows towards the top of the map. */
function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(len * 0.28, 16);
  return `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - lift} ${b.x} ${b.y}`;
}

const mask = "url(/map/world-dots.svg) center / 100% 100% no-repeat";

export function Markets() {
  return (
    <section id="markets" aria-labelledby="markets-title" className="defer section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <Heading id="markets-title">{markets.heading.join(" ")}</Heading>
          <div>
            <p className="t-lead max-w-[34rem]">{markets.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Incoterms we ship on">
              {markets.incoterms.map((t) => (
                <li key={t} className="rounded-full bg-raised px-4 py-1.5 text-[0.875rem] font-medium shadow-[0_0_0_1px_var(--line)]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[28px] bg-raised p-4 sm:p-10">
          <div className="relative" style={{ aspectRatio: `${MAP_VIEWBOX.w} / ${MAP_VIEWBOX.h}` }}>
            <div
              aria-hidden
              className="absolute inset-0 bg-[#9aa1b0]"
              style={{ mask, WebkitMask: mask }}
            />
            <svg
              viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Shipping routes from the Port of Bissau to ${markets.routes.map((r) => r.city).join(", ")}`}
            >
              {mapDestinations.map((d) => (
                <path
                  key={d.id}
                  d={arcPath(mapOrigin, d)}
                  fill="none"
                  stroke="var(--navy)"
                  strokeWidth={0.32}
                  strokeLinecap="round"
                  strokeDasharray="0.01 0.9"
                />
              ))}
              {mapDestinations.map((d) => (
                <circle key={d.id} cx={d.x} cy={d.y} r={0.75} fill="var(--navy)" stroke="#fff" strokeWidth={0.3} />
              ))}
              <circle cx={mapOrigin.x} cy={mapOrigin.y} r={2.6} fill="var(--shell)" opacity={0.2} />
              <circle cx={mapOrigin.x} cy={mapOrigin.y} r={1.1} fill="var(--shell)" stroke="#fff" strokeWidth={0.35} />
            </svg>
            <span
              className="absolute -translate-x-1/2 translate-y-3 text-[0.75rem] font-semibold whitespace-nowrap text-shell sm:text-[0.875rem]"
              style={{
                left: `${(mapOrigin.x / MAP_VIEWBOX.w) * 100}%`,
                top: `${(mapOrigin.y / MAP_VIEWBOX.h) * 100}%`,
              }}
            >
              Bissau
            </span>
          </div>
        </div>

        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {markets.routes.map((r) => (
            <li key={r.city} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
              <span className="font-medium">{r.city}</span>
              <span className="text-[0.9375rem] text-muted">{r.country}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

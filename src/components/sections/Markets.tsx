"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { markets } from "@/data/content";
import { MAP_VIEWBOX, mapDestinations, mapOrigin } from "@/data/map-points";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

/**
 * "From Bissau to global markets."
 *
 * Basemap and endpoint projections are baked at build time (see
 * scripts/build-map.mjs), so the browser receives a static SVG plus six
 * pre-projected coordinates instead of a polygon dataset and a projection
 * library. The arcs draw themselves as the section enters view.
 */

/**
 * A great-circle-ish arc between two projected points. The control point is
 * lifted perpendicular to the chord, proportional to its length, so short
 * hops stay flat and long hauls bow properly.
 */
function arcPath(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Always bow towards the top of the map — routes read as "over the world".
  const lift = Math.min(len * 0.28, 16);
  return `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
}

export function Markets() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".mk-arc");

      if (prefersReducedMotion()) {
        gsap.set(paths, { strokeDashoffset: 0, opacity: 1 });
        gsap.set(".mk-node, .mk-label", { opacity: 1, scale: 1 });
        return;
      }

      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });

      gsap
        .timeline({
          scrollTrigger: { trigger: ".mk-map", start: "top 78%", once: true },
        })
        .to(paths, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.14,
        })
        .fromTo(
          ".mk-node",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.09 },
          0.45,
        )
        .fromTo(
          ".mk-label",
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          0.75,
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="markets" className="section-y relative">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow>{markets.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeading
              as="h2"
              lines={markets.heading}
              accentLine={1}
              className="type-h2 mt-5 text-cream opacity-0"
            />
          </div>

          <Reveal className="max-w-[44ch]">
            <p className="type-lead text-[0.9375rem]">{markets.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {markets.incoterms.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/18 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.1em] text-leaf-300 uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* --- the map --- */}
        <Reveal from="scale" className="mk-map relative mt-14">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-forest-900/40">
            {/* Basemap: static, pre-generated, ~10kb over the wire gzipped. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/map/world-dots.svg"
              alt=""
              aria-hidden
              className="pointer-events-none block w-full select-none opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
            />

            <svg
              viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
              className="pointer-events-none absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Shipping routes from the Port of Bissau, Guinea-Bissau, to ${markets.routes
                .map((r) => r.city)
                .join(", ")}`}
            >
              <defs>
                <linearGradient id="mk-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c8963e" stopOpacity="0" />
                  <stop offset="12%" stopColor="#dcae55" stopOpacity="0.95" />
                  <stop offset="88%" stopColor="#5fb37d" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#5fb37d" stopOpacity="0" />
                </linearGradient>
              </defs>

              {mapDestinations.map((d) => (
                <path
                  key={d.id}
                  className="mk-arc opacity-0"
                  d={arcPath(mapOrigin, d)}
                  fill="none"
                  stroke="url(#mk-line)"
                  strokeWidth={0.28}
                  strokeLinecap="round"
                />
              ))}

              {/* Origin: larger, gold, with a slow radar pulse. */}
              <g className="mk-node opacity-0" style={{ transformOrigin: `${mapOrigin.x}px ${mapOrigin.y}px` }}>
                <circle cx={mapOrigin.x} cy={mapOrigin.y} r={1.5} fill="#dcae55" opacity={0.22}>
                  <animate
                    attributeName="r"
                    values="1.2;4.2;1.2"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.35;0;0.35"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={mapOrigin.x} cy={mapOrigin.y} r={0.72} fill="#dcae55" />
              </g>

              {mapDestinations.map((d) => (
                <g
                  key={d.id}
                  className="mk-node opacity-0"
                  style={{ transformOrigin: `${d.x}px ${d.y}px` }}
                >
                  <circle cx={d.x} cy={d.y} r={1.1} fill="#5fb37d" opacity={0.2}>
                    <animate
                      attributeName="r"
                      values="0.8;2.8;0.8"
                      dur="2.8s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0;0.3"
                      dur="2.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={d.x} cy={d.y} r={0.5} fill="#8ccfa0" />
                </g>
              ))}
            </svg>

            {/* Origin label, positioned in percentage terms over the map. */}
            <span
              className="mk-label pointer-events-none absolute -translate-x-1/2 translate-y-2 font-mono text-[0.5625rem] tracking-[0.14em] whitespace-nowrap text-gold-300 uppercase opacity-0 sm:text-[0.625rem]"
              style={{
                left: `${(mapOrigin.x / MAP_VIEWBOX.w) * 100}%`,
                top: `${(mapOrigin.y / MAP_VIEWBOX.h) * 100}%`,
              }}
            >
              Bissau
            </span>
          </div>
        </Reveal>

        {/* --- destination ledger, which is also the accessible fallback --- */}
        <Reveal stagger={0.06} as="ul" className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.routes.map((r, i) => (
            <li
              key={r.city}
              className="flex items-baseline gap-4 border-t border-white/12 pt-4"
            >
              <span className="font-mono text-[0.625rem] text-gold-400/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-[0.875rem] font-medium text-cream">
                  {r.city}
                </span>
                <span className="block text-[0.75rem] text-muted">{r.country}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

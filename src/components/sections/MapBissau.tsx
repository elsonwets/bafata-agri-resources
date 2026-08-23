"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { GNB_VIEWBOX, gnbPins, gnbRegions } from "@/data/guinea-bissau";
import { site, waLinks } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { cn } from "@/lib/utils";

/**
 * Where we are and where we buy.
 *
 * Real administrative boundaries rather than a decorative blob — the
 * producing regions are the actual regions, and hovering a name in the list
 * lights up its geography. Boundary data is ODbL, attributed below the map.
 */
export function MapBissau() {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  const sourcing = gnbRegions.filter((r) => r.sourcing);
  const bissau = gnbPins[0];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".gnb-region, .gnb-pin", { opacity: 1, scale: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: ".gnb-map", start: "top 80%", once: true },
        })
        .fromTo(
          ".gnb-region",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.06 },
        )
        .fromTo(
          ".gnb-pin",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2.6)" },
          "-=0.3",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="location" className="section-y relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          {/* --- copy --- */}
          <div>
            <Reveal>
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="type-h2 mt-5 text-cream">
                Based in Bissau.{" "}
                <span className="text-gold-400">Buying across the country.</span>
              </h2>
              <p className="type-lead mt-6 max-w-[46ch]">
                Our office and warehouse are in Bissau, beside the export port.
                We buy in the producing regions inland — the same orchards,
                markets and warehouses, campaign after campaign.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="type-eyebrow text-muted">Sourcing regions</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sourcing.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHover(r.id)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(r.id)}
                      onBlur={() => setHover(null)}
                      aria-describedby="gnb-map-title"
                      className={cn(
                        // min-h-11 keeps the chip on the 44px touch minimum.
                        "min-h-11 cursor-pointer rounded-full border px-3.5 py-2 text-[0.8125rem] transition-colors duration-200",
                        hover === r.id
                          ? "border-leaf-400 bg-leaf-400/15 text-leaf-200"
                          : "border-white/16 text-cream/75 hover:border-leaf-400/60",
                      )}
                    >
                      {r.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <dl className="grid gap-5 sm:grid-cols-2">
                <div className="border-t border-white/12 pt-4">
                  <dt className="type-eyebrow text-muted">Office &amp; warehouse</dt>
                  <dd className="mt-2 flex items-start gap-2 text-[0.875rem] text-cream">
                    <MapPin size={15} aria-hidden className="mt-0.5 shrink-0 text-gold-400" />
                    <span>
                      {site.city}, {site.country}
                      <br />
                      <span className="font-mono text-[0.75rem] text-muted">
                        {site.geo.lat.toFixed(4)}°N · {Math.abs(site.geo.lng).toFixed(4)}°W
                      </span>
                    </span>
                  </dd>
                </div>
                <div className="border-t border-white/12 pt-4">
                  <dt className="type-eyebrow text-muted">Direct line</dt>
                  <dd className="mt-2">
                    <a
                      href={waLinks.general}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.875rem] text-cream underline-offset-4 hover:text-gold-400 hover:underline"
                    >
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="mt-8">
              <Button
                href={waLinks.general}
                external
                icon={<MessageCircle size={16} strokeWidth={2.2} aria-hidden />}
              >
                Message us from Bissau time
              </Button>
            </Reveal>
          </div>

          {/* --- the map --- */}
          <div className="gnb-map relative">
            <svg
              viewBox={`0 0 ${GNB_VIEWBOX.w} ${GNB_VIEWBOX.h}`}
              className="w-full"
              role="img"
              aria-labelledby="gnb-map-title gnb-map-desc"
            >
              <title id="gnb-map-title">
                Map of Guinea-Bissau showing our raw cashew sourcing regions
              </title>
              <desc id="gnb-map-desc">
                Bissau is marked on the Atlantic coast. The highlighted regions
                are {sourcing.map((r) => r.name).join(", ")}.
              </desc>

              <defs>
                <linearGradient id="gnb-src" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3a8f5e" />
                  <stop offset="100%" stopColor="#1a5539" />
                </linearGradient>
                <filter id="gnb-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {gnbRegions.map((r) => {
                const lit = hover === r.id;
                return (
                  <path
                    key={r.id}
                    className="gnb-region opacity-0 transition-[fill,stroke] duration-300"
                    d={r.d}
                    fill={
                      lit
                        ? "#5fb37d"
                        : r.sourcing
                          ? "url(#gnb-src)"
                          : "#0f3626"
                    }
                    stroke={lit ? "#b6e3c2" : "#04120c"}
                    strokeWidth={lit ? 3 : 2}
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* Bissau: port and office. */}
              <g className="gnb-pin opacity-0" style={{ transformOrigin: `${bissau.x}px ${bissau.y}px` }}>
                <circle
                  cx={bissau.x}
                  cy={bissau.y}
                  r={10}
                  fill="#dcae55"
                  opacity={0.28}
                  filter="url(#gnb-glow)"
                >
                  <animate
                    attributeName="r"
                    values="9;26;9"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={bissau.x} cy={bissau.y} r={8} fill="#dcae55" stroke="#04120c" strokeWidth={2.5} />
              </g>

              {/* Region names, drawn at each area-weighted centroid. */}
              {gnbRegions
                .filter((r) => r.sourcing)
                .map((r) => (
                  <text
                    key={`${r.id}-label`}
                    x={r.cx}
                    y={r.cy}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={19}
                    letterSpacing={2}
                    fill={hover === r.id ? "#04120c" : "#b6e3c2"}
                    opacity={hover === r.id ? 1 : 0.72}
                    style={{ textTransform: "uppercase", pointerEvents: "none" }}
                  >
                    {r.name}
                  </text>
                ))}

              <text
                x={bissau.x}
                y={bissau.y + 30}
                textAnchor="middle"
                className="font-mono"
                fontSize={20}
                letterSpacing={2.5}
                fill="#ecc87e"
                style={{ textTransform: "uppercase", pointerEvents: "none" }}
              >
                Bissau
              </text>
            </svg>

            <p className="mt-4 text-right font-mono text-[0.5625rem] tracking-[0.08em] text-muted/70 uppercase">
              Boundaries:{" "}
              <a
                href="https://www.geoboundaries.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-muted hover:underline"
              >
                geoBoundaries
              </a>{" "}
              ·{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-muted hover:underline"
              >
                © OpenStreetMap contributors
              </a>{" "}
              · ODbL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

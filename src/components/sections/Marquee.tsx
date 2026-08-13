"use client";

import { COMPANY } from "@/config/company";

const INCOTERMS = ["FOB Bissau", "CFR", "CIF"];

const ITEMS = [
  ...COMPANY.partners,
  ...COMPANY.markets.map((m) => m.label),
  ...INCOTERMS,
];

/**
 * Continuous marquee.
 *
 * Runs on a CSS animation rather than a GSAP timeline: it is a constant
 * linear translation with no scroll coupling, so it costs nothing and it
 * pauses cleanly on hover and under reduced motion through CSS alone.
 * The row is duplicated so the loop point is seamless, and the copy is
 * hidden from assistive technology to avoid reading everything twice.
 */
export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-6">
      {/* Edges fade into the page rather than being cut off. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[color:var(--color-ink)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[color:var(--color-ink)] to-transparent"
      />

      <div className="group flex w-max animate-[marquee_38s_linear_infinite] gap-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-12"
            aria-hidden={copy === 1}
          >
            {ITEMS.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-12 whitespace-nowrap text-sm uppercase tracking-[0.24em] text-[color:var(--color-bone)]/45"
              >
                {item}
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[color:var(--color-gold)]/60"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

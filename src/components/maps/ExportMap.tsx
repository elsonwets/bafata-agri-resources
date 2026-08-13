"use client";

import { useEffect, useRef } from "react";
import { DotMap } from "./DotMap";
import { arcPath, projectPoint } from "./Arc";
import { COMPANY } from "@/config/company";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getGsap } from "@/lib/motion/gsap";
import field from "@/data/world.dots.json";
import type { Dot } from "@/lib/dots/lattice";
import type { BBox } from "@/lib/dots/projection";

const dots = field.dots as Dot[];
const bbox = field.bbox as BBox;
const size = field.size;

const origin = projectPoint(
  COMPANY.origin.lon,
  COMPANY.origin.lat,
  bbox,
  size,
);

const routes = COMPANY.markets.map((m) => ({
  id: m.id,
  label: m.label,
  point: projectPoint(m.lon, m.lat, bbox, size),
}));

export function ExportMap() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap, ScrollTrigger } = getGsap();
    const root = ref.current;

    const ctx = gsap.context(() => {
      const paths = root.querySelectorAll<SVGPathElement>("[data-route]");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.35,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      // Animates the radius, not the scale. An SVG circle scales about
      // the SVG origin rather than its own centre unless transform-box
      // is set, which sends the markers flying off across the map.
      gsap.from(root.querySelectorAll("[data-destination]"), {
        attr: { r: 0 },
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.35,
        delay: 0.9,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className="relative w-full">
      {/*
        Height-driven, like the sourcing map. At its natural aspect the
        field is taller than the fold, so the routes that carry the whole
        point of the section end up below the screen.
      */}
      <DotMap
        dots={dots}
        size={size}
        seed={4402}
        title="World map showing raw cashew nut shipments leaving the port of Bissau for India, the United Arab Emirates and Vietnam"
        className="h-[34svh] w-full sm:h-[52svh]"
      />

      {/* Routes and markers sit above the field in their own layer. */}
      <svg
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="pointer-events-none absolute inset-0 h-[34svh] w-full sm:h-[52svh]"
        aria-hidden="true"
      >
        {routes.map((r) => (
          <path
            key={r.id}
            data-route={r.id}
            d={arcPath(origin, r.point)}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth={2}
            strokeOpacity={0.75}
            strokeLinecap="round"
          />
        ))}

        <circle
          cx={origin.x}
          cy={origin.y}
          r={7}
          fill="var(--color-gold)"
        />

        {routes.map((r) => (
          <circle
            key={r.id}
            data-destination={r.id}
            cx={r.point.x}
            cy={r.point.y}
            r={6}
            fill="var(--color-gold)"
          />
        ))}
      </svg>

      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[color:var(--color-bone)]/60">
        <li className="text-[color:var(--color-gold)]">
          {COMPANY.origin.label}
        </li>
        {routes.map((r) => (
          <li key={r.id}>{r.label}</li>
        ))}
      </ul>
    </div>
  );
}

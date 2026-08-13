"use client";

import { useState } from "react";
import { DotMap } from "./DotMap";
import { HOME_REGION, REGIONS } from "@/data/regions";
import field from "@/data/guinea-bissau.dots.json";
import type { Dot } from "@/lib/dots/lattice";

const dots = field.dots as Dot[];

export function SourcingMap() {
  const [active, setActive] = useState<string | null>(null);
  const region = REGIONS.find((r) => r.id === active);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-16">
      {/*
        Driven by height rather than width. A max-height on an SVG that
        is already width:100% constrains nothing, because the viewBox
        aspect decides the height. Giving it an explicit height lets the
        viewBox letterbox inside instead of growing off the screen.
      */}
      <DotMap
        dots={dots}
        size={field.size}
        solidIds={[HOME_REGION]}
        regions={REGIONS}
        activeId={active}
        onActivate={setActive}
        seed={1187}
        title="Map of Guinea-Bissau showing its nine administrative regions, with Bafatá highlighted"
        className="h-[38svh] w-full sm:h-[52svh]"
      />

      <div className="lg:pl-4">
        {/*
          Reserves its own height so hovering the map does not shove the
          layout around, and stays in the DOM so a screen reader can read
          the change rather than having the node appear and disappear.
        */}
        <div aria-live="polite" className="min-h-32">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)]">
            {region ? region.label : HOME_REGION}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-[color:var(--color-bone)]/80">
            {region
              ? region.note
              : "We buy at village level across the interior, then move every lot down to the port of Bissau. Hover a region to see its part."}
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[color:var(--color-bone)]/50">
          {REGIONS.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(r.id)}
                onFocus={() => setActive(r.id)}
                onBlur={() => setActive(null)}
                className={`transition-colors ${
                  active === r.id
                    ? "text-[color:var(--color-gold)]"
                    : "hover:text-[color:var(--color-bone)]"
                }`}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { pillars } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Bits";

/**
 * Four reasons, four photographs of the actual operation. Each card reveals
 * its image on hover; on touch the image is simply always visible, because
 * a hover-only reveal hides content from half the audience.
 */
export function Pillars() {
  return (
    <section id="why" className="section-y relative">
      <div className="shell">
        <Reveal>
          <Eyebrow>{pillars.eyebrow}</Eyebrow>
          <h2 className="type-h2 mt-5 max-w-[18ch] text-cream">{pillars.heading}</h2>
        </Reveal>

        <Reveal
          stagger={0.09}
          as="ul"
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.items.map((p) => (
            <li
              key={p.n}
              className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-sm border border-white/10 p-6"
            >
              <Photo
                slug={p.photo}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                className="absolute inset-0 -z-10"
                imgClassName="scale-105 opacity-45 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-65"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/78 to-forest-950/35"
              />

              <span
                aria-hidden
                className="absolute top-5 right-6 font-display text-[3.5rem] leading-none text-cream/12 transition-colors duration-500 group-hover:text-gold-400/28"
              >
                {p.n}
              </span>

              <h3 className="type-h3 text-cream">{p.title}</h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-cream/72">
                {p.text}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

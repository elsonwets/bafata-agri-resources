"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { origin } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow, Stat } from "@/components/ui/Bits";

export function Origin() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // The photograph drifts slower than the page — classic depth parallax.
      gsap.fromTo(
        ".origin-photo img",
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: ".origin-photo",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="origin" className="section-y relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* --- copy --- */}
          <div>
            <Reveal>
              <Eyebrow>{origin.eyebrow}</Eyebrow>
            </Reveal>

            <SplitHeading
              as="h2"
              lines={origin.heading}
              accentLine={1}
              className="type-h2 mt-6 text-cream opacity-0"
            />

            <Reveal stagger={0.12} className="mt-8 space-y-5">
              {origin.body.map((p, i) => (
                <p key={i} className="type-lead max-w-[54ch]">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>

          {/* --- photograph --- */}
          <Reveal from="scale" className="origin-photo relative">
            <Photo
              slug="warehouse-bulk-store"
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="aspect-[4/5] rounded-sm"
              imgClassName="scale-115"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-5 left-5 right-5 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-cashew-200/90 uppercase">
              Bissau warehouse · lot consolidation
            </figcaption>
          </Reveal>
        </div>

        {/* --- the numbers buyers actually ask for --- */}
        <Reveal
          stagger={0.09}
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {origin.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} note={s.note} />
          ))}
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-[68ch] text-[0.8125rem] leading-relaxed text-muted/80">
            {origin.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { howToBuy } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

/**
 * Six steps down a vertical line. The connector draws itself as you scroll,
 * which is the site's "branch" motif carrying information down the page.
 */
export function HowToBuy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".htb-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".htb-list",
            start: "top 72%",
            end: "bottom 78%",
            scrub: 0.5,
          },
        },
      );

      // Each marker lights up as the line reaches it.
      gsap.utils.toArray<HTMLElement>(".htb-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#0f3626", scale: 0.8 },
          {
            backgroundColor: "#dcae55",
            scale: 1,
            duration: 0.3,
            scrollTrigger: { trigger: dot, start: "top 66%", once: true },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="how" className="section-y relative">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{howToBuy.eyebrow}</Eyebrow>
            <h2 className="type-h2 mt-5 text-cream">{howToBuy.heading}</h2>
            <p className="type-lead mt-6">{howToBuy.lead}</p>
          </Reveal>
        </div>

        <ol className="htb-list relative mt-16 grid gap-y-10 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          {/* The connector: only meaningful on the single-column layout. */}
          <span
            aria-hidden
            className="htb-line absolute top-2 bottom-2 left-[13px] w-px origin-top bg-gradient-to-b from-gold-400 via-leaf-400 to-transparent md:hidden"
          />

          {howToBuy.steps.map((s) => (
            <Reveal as="li" key={s.n} from="up" className="relative pl-11 md:pl-0">
              <span
                aria-hidden
                className="htb-dot absolute top-1.5 left-0 h-[27px] w-[27px] rounded-full border-2 border-forest-950 bg-forest-750 md:hidden"
              />
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-gold-400">
                  {s.n}
                </span>
                <span aria-hidden className="hidden h-px flex-1 bg-white/12 md:block" />
              </div>
              <h3 className="type-h3 mt-3 text-cream">{s.title}</h3>
              <p className="mt-3 max-w-[44ch] text-[0.875rem] leading-relaxed text-muted">
                {s.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

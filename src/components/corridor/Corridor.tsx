"use client";

import { useEffect, useRef } from "react";
import { CHAIN } from "@/data/chain";
import { Photo } from "@/components/media/Photo";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getGsap } from "@/lib/motion/gsap";

/**
 * The Corridor: one pinned section carrying the goods from the village
 * buying point to the vessel hold.
 *
 * Built fallback-first. The five beats are real markup in normal flow,
 * so the section is complete and readable with no JavaScript and under
 * reduced motion. The pin, the scrub and the parallax are layered on top
 * of that only when motion is welcome.
 */
export function Corridor() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const { gsap, ScrollTrigger } = getGsap();
    const root = sectionRef.current;

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>("[data-track]");
      const beats = gsap.utils.toArray<HTMLElement>("[data-beat]");
      if (!track || !beats.length) return;

      // Horizontal travel is the width of the track minus one viewport.
      const distance = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: () => -distance(), ease: "none" });

      // Each plate drifts against the travel, which reads as depth
      // rather than as a filmstrip sliding past.
      beats.forEach((beat) => {
        const plate = beat.querySelector("[data-plate]");
        if (!plate) return;
        gsap.fromTo(
          plate,
          { xPercent: -6, scale: 1.08 },
          {
            xPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: beat,
              containerAnimation: tl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // The progress rail fills as the sequence advances.
      const rail = root.querySelector("[data-rail-fill]");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
            },
          },
        );
      }
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="chain"
      aria-label="From village scale to vessel hold"
      className="relative md:h-svh md:overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-28 sm:px-10 md:pt-32">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold)]">
          Village scale to vessel hold
        </p>
        <div className="mt-4 h-px w-full max-w-md bg-[color:var(--color-bone)]/15">
          <div
            data-rail-fill
            className="h-px w-full origin-left bg-[color:var(--color-gold)] md:scale-x-0"
          />
        </div>
      </div>

      <div
        data-track
        className="flex flex-col gap-24 px-6 py-24 sm:px-10 md:h-full md:flex-row md:items-center md:gap-0 md:py-0 md:pl-[8vw] md:pr-[30vw]"
      >
        {CHAIN.map((beat, i) => (
          <article
            key={beat.id}
            data-beat
            className="flex shrink-0 flex-col gap-8 md:w-[68vw] md:flex-row md:items-center md:gap-14 md:pr-[6vw]"
          >
            <div className="md:w-[42%] md:shrink-0">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-bone)]/40">
                {beat.step}
              </p>
              <h3 className="mt-4 text-3xl font-medium leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {beat.heading}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--color-bone)]/70 sm:text-lg">
                {beat.body}
              </p>

              {beat.places && (
                <ul className="mt-7 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-bone)]/40">
                  {beat.places.map((p, pi) => (
                    <li key={p} className="flex items-center gap-3">
                      {pi > 0 && (
                        <span aria-hidden="true" className="opacity-50">
                          &rarr;
                        </span>
                      )}
                      <span
                        className={
                          pi === beat.places!.length - 1
                            ? "text-[color:var(--color-gold)]"
                            : undefined
                        }
                      >
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/*
              Height is driven by the viewport rather than an aspect
              ratio, so the pinned frame is actually filled instead of
              leaving a third of the screen empty below the plates.
            */}
            <div className="overflow-hidden rounded-2xl md:w-[58%]">
              <Photo
                slug={beat.slug}
                sizes="(min-width: 768px) 40vw, 92vw"
                priority={i === 0}
                className="photo-graded aspect-[4/3] w-full object-cover md:aspect-auto md:h-[62svh]"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

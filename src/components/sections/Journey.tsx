"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { journey } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Bits";
import { cn } from "@/lib/utils";

/**
 * "From soil to ship" — vertical scroll drives a horizontal track of eight
 * stages while the section is pinned.
 *
 * Below the lg breakpoint the pin is dropped entirely in favour of a native
 * snap-scrolling rail: pinning fights momentum scrolling on touch devices
 * and is the single fastest way to make a phone feel broken.
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        rail: "(max-width: 1023px), (prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        if (!ctx.conditions?.pinned) {
          // Rail mode: report the active card from the native scroll position.
          const onScroll = () => {
            const card = track.clientWidth * 0.78;
            setActive(Math.round(track.scrollLeft / card));
          };
          track.addEventListener("scroll", onScroll, { passive: true });
          return () => track.removeEventListener("scroll", onScroll);
        }

        const distance = () => track.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // Track length decides scroll length, so pacing stays constant
            // however many stages the client adds later.
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setActive(
                Math.min(
                  journey.steps.length - 1,
                  Math.round(self.progress * (journey.steps.length - 1)),
                ),
              ),
          },
        });

        // Cards lift and settle as they cross the middle of the viewport.
        const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card.querySelector("img"),
            { scale: 1.22, xPercent: 6 },
            {
              scale: 1,
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        return () => {
          tween.scrollTrigger?.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden lg:flex lg:h-screen lg:flex-col"
    >
      {/* --- heading rail --- */}
      <div className="shell shrink-0 pt-24 lg:pt-28 lg:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{journey.eyebrow}</Eyebrow>
            {/* Held smaller than a normal section heading: this one has to
                share a fixed-height viewport with the track below it. */}
            <h2 className="type-h3 mt-4 max-w-[18ch] text-cream sm:text-[clamp(1.75rem,3.4vw,3rem)]">
              {journey.heading}
            </h2>
          </div>
          <p className="type-lead max-w-[42ch] text-[0.9375rem] lg:mb-2">
            {journey.lead}
          </p>
        </div>
      </div>

      {/* --- the track --- */}
      <div
        ref={trackRef}
        className={cn(
          "mt-2 flex gap-5 px-[var(--gutter)] pb-6",
          // Touch: a native snap rail. Desktop: GSAP moves this element.
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "lg:mt-0 lg:min-h-0 lg:flex-1 lg:snap-none lg:items-center lg:overflow-visible lg:pb-0",
        )}
        style={{ scrollbarWidth: "none" }}
      >
        {journey.steps.map((step, i) => (
          <article
            key={step.n}
            className={cn(
              "journey-card group relative shrink-0 snap-start",
              "w-[78vw] max-w-[26rem] sm:w-[58vw] lg:w-[22rem] xl:w-[24rem]",
            )}
          >
            <div className="relative overflow-hidden rounded-sm lg:h-[min(62vh,34rem)]">
              <Photo
                slug={step.photo}
                sizes="(max-width: 1024px) 78vw, 24rem"
                className="aspect-[3/4] lg:h-full lg:aspect-auto"
                priority={i < 2}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/25 to-transparent"
              />

              <span
                aria-hidden
                className="absolute top-5 left-5 font-display text-[3.25rem] leading-none text-cream/22"
              >
                {step.n}
              </span>

              <div className="absolute inset-x-5 bottom-5">
                <p className="type-eyebrow text-[0.5625rem] text-gold-400">
                  {step.sub}
                </p>
                <h3 className="type-h3 mt-2 text-cream">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[0.8125rem] leading-relaxed text-cream/75">
                  {step.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* --- progress --- */}
      <div className="shell shrink-0 pb-16 lg:pt-6 lg:pb-10">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold-400">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div
            className="relative h-px flex-1 bg-white/15"
            role="progressbar"
            aria-valuenow={active + 1}
            aria-valuemin={1}
            aria-valuemax={journey.steps.length}
            aria-label="Journey stage"
          >
            <span
              className="absolute inset-y-0 left-0 bg-gold-400 transition-[width] duration-500 ease-out"
              style={{
                width: `${((active + 1) / journey.steps.length) * 100}%`,
              }}
            />
          </div>
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted">
            {String(journey.steps.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

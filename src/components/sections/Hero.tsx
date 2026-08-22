"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MessageCircle, MoveRight } from "lucide-react";
import { gsap, ease, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/data/content";
import { waLinks } from "@/data/site";
import { LogoTree3D } from "@/components/three/LogoTree3D";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      const lines = root.querySelectorAll<HTMLElement>(".hero-line > span");

      if (reduced) {
        gsap.set([lines, ".hero-fade"], { opacity: 1, yPercent: 0, y: 0 });
      } else {
        // Entrance: the headline lands first, everything else follows it.
        const tl = gsap.timeline({ delay: 0.15 });
        tl.set(headlineRef.current, { opacity: 1 })
          .fromTo(
            lines,
            { yPercent: 118 },
            { yPercent: 0, duration: 1.25, ease: ease.out, stagger: 0.09 },
          )
          .fromTo(
            ".hero-fade",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.9, ease: ease.out, stagger: 0.09 },
            "-=0.75",
          );

        // Departure: copy drifts up and dims while the mark sinks and shrinks.
        gsap.to(".hero-parallax", {
          yPercent: -22,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.to(treeRef.current, {
          yPercent: 16,
          scale: 0.86,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative grid min-h-[100svh] grid-rows-[1fr_auto] overflow-hidden pt-24"
    >
      <div className="shell grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        {/* --- copy --- */}
        <div className="hero-parallax relative z-10 order-2 lg:order-1">
          <div className="hero-fade opacity-0">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            ref={headlineRef}
            className="type-mega mt-6 text-cream opacity-0"
          >
            {hero.headline.map((line, i) => (
              <span key={i} className="hero-line split-line">
                <span className={i === 2 ? "text-gold-400" : undefined}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-fade type-lead mt-7 max-w-xl opacity-0">{hero.lead}</p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3 opacity-0">
            <Button
              href="#contact"
              variant="gold"
              icon={<MoveRight size={16} strokeWidth={2.2} aria-hidden />}
            >
              {hero.primaryCta}
            </Button>
            <Button
              href={waLinks.general}
              external
              variant="outline"
              icon={<MessageCircle size={16} strokeWidth={2.2} aria-hidden />}
            >
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        {/* --- the mark, in three dimensions --- */}
        <div className="relative order-1 lg:order-2">
          <div
            ref={treeRef}
            // Held back on phones so the headline and the primary CTA are not
            // pushed below the fold by the mark.
            className="relative mx-auto aspect-square w-full max-w-[min(34rem,64vw)] lg:max-w-[min(34rem,78vw)]"
          >
            {/* Warm pool of light behind the canopy. */}
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 42% 34%, rgba(200,150,62,0.30), rgba(37,113,72,0.20) 46%, transparent 72%)",
              }}
            />
            <LogoTree3D className="absolute inset-0" />
          </div>
        </div>
      </div>

      {/* --- baseline meta --- */}
      <div className="hero-parallax shell relative z-10 w-full pb-8 pt-10">
        <div className="hairline" />
        <div className="hero-fade mt-5 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 opacity-0">
          <dl className="flex flex-wrap items-center gap-x-9 gap-y-3">
            {hero.meta.map((m) => (
              <div key={m.k} className="flex flex-col gap-1">
                <dt className="type-eyebrow text-[0.5625rem] text-muted">{m.k}</dt>
                <dd className="font-mono text-[0.8125rem] text-cream/90">{m.v}</dd>
              </div>
            ))}
          </dl>

          <p className="flex items-center gap-2.5 text-[0.75rem] tracking-[0.14em] text-muted uppercase">
            <ArrowDown
              size={14}
              aria-hidden
              className="animate-bounce text-leaf-400 motion-reduce:animate-none"
            />
            {hero.scrollHint}
          </p>
        </div>
      </div>
    </section>
  );
}

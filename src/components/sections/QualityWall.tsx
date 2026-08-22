"use client";

import { useEffect, useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { quality } from "@/data/content";
import { PolaroidPhoto } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Bits";
import { cn } from "@/lib/utils";

/**
 * The section modelled directly on the reference film at 06s–09s.
 *
 * A wall of torn-paper field photographs drifts past at five different
 * speeds while the camera pushes in; a precision weighing console resolves
 * out of the middle of it, its LCD counting up as you scroll and the spec
 * table filling in row by row.
 *
 * The whole thing is scrubbed, not timed — the reading pace belongs to the
 * visitor, which is the difference between a story and a cutscene.
 */

/** Five columns, each with its own photographs and its own drift speed. */
const COLUMNS: { photos: string[]; speed: number; offset: number }[] = [
  {
    photos: ["warehouse-team-stacking", "weighbridge-arrival", "port-quay-stacks", "truck-convoy-road"],
    speed: -0.34,
    offset: -60,
  },
  {
    photos: ["warehouse-carry-bag", "truck-tarped-load", "warehouse-stack-crew", "port-cargo-net"],
    speed: 0.46,
    offset: 40,
  },
  {
    photos: ["weighbridge-weighing", "vessel-hold-loaded", "warehouse-bulk-store", "port-lifting-sling"],
    speed: -0.52,
    offset: 0,
  },
  {
    photos: ["port-crane-quay", "weighbridge-ticket", "warehouse-loading-truck", "port-trucks-line"],
    speed: 0.38,
    offset: 30,
  },
  {
    photos: ["port-fleet-quay", "weighbridge-second-pass", "truck-tarped-load", "port-cranes-trucks"],
    speed: -0.29,
    offset: -40,
  },
];

export function QualityWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const lcdRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const settle = () => {
      gsap.set([".qw-console", ".qw-row", ".qw-point", ".qw-badge"], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "none",
      });
      if (lcdRef.current) {
        lcdRef.current.textContent = quality.console.target.toFixed(2);
      }
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        scrubbed: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        plain: "(max-width: 767px), (prefers-reduced-motion: reduce)",
      },
      (ctx2) => {
        if (!ctx2.conditions?.scrubbed) {
          settle();
          return;
        }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // The camera pushes into the wall for the whole section.
      tl.fromTo(
        ".qw-wall",
        { scale: 1.02, filter: "blur(0px)" },
        { scale: 1.24, filter: "blur(3px)", ease: "none" },
        0,
      );

      // Columns drift at their own speeds — this is the motion from the film.
      gsap.utils.toArray<HTMLElement>(".qw-col").forEach((col, i) => {
        tl.fromTo(
          col,
          { yPercent: COLUMNS[i].offset * 0.2 },
          { yPercent: COLUMNS[i].speed * 100, ease: "none" },
          0,
        );
      });

      // The wall dims so the console can own the frame once it lands.
      tl.to(".qw-wall", { opacity: 0.34, ease: "none" }, 0.18);

      // Console resolves out of the wall.
      tl.fromTo(
        ".qw-console",
        { opacity: 0, scale: 0.9, y: 60, filter: "blur(14px)" },
        { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.34 },
        0.16,
      );

      // The readout settles on the target weight.
      const counter = { v: 0 };
      tl.to(
        counter,
        {
          v: quality.console.target,
          ease: "power2.out",
          duration: 0.34,
          onUpdate: () => {
            if (lcdRef.current) lcdRef.current.textContent = counter.v.toFixed(2);
          },
        },
        0.2,
      );

      tl.fromTo(
        ".qw-row",
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, stagger: 0.035, ease: "power2.out", duration: 0.2 },
        0.34,
      );

      tl.fromTo(
        ".qw-badge",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, ease: "back.out(2)", duration: 0.12 },
        0.48,
      );

      tl.fromTo(
        ".qw-point",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.05, ease: "power2.out", duration: 0.2 },
        0.58,
      );
      },
      section,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quality"
      // Three viewports of scroll on desktop — enough room to read the table
      // without the wall feeling like it is on rails. On phones the section
      // flows normally: the console is taller than a small viewport, and
      // pinning content that does not fit only hides it.
      className="relative overflow-hidden md:h-[300vh]"
    >
      <div className="relative flex items-center overflow-hidden py-24 md:sticky md:top-0 md:h-[100svh] md:py-0 md:pt-[4.5rem] md:pb-6">
        {/* --- the photo wall --- */}
        <div
          aria-hidden
          className="qw-wall pointer-events-none absolute inset-0 grid origin-center grid-cols-3 gap-3 p-3 will-change-transform sm:grid-cols-4 lg:grid-cols-5 lg:gap-4 lg:p-4"
        >
          {COLUMNS.map((col, i) => (
            <div
              key={i}
              className={cn(
                "qw-col flex flex-col gap-4 will-change-transform",
                // Narrow viewports only have room for three columns.
                i === 3 && "hidden sm:flex",
                i === 4 && "hidden lg:flex",
              )}
            >
              {/* Doubled so the column never runs out of photographs. */}
              {[...col.photos, ...col.photos].map((slug, j) => (
                <PolaroidPhoto
                  key={`${slug}-${j}`}
                  slug={slug}
                  caption={j % 3 === 1}
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="shrink-0"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Scrim keeps the console legible over the busiest photographs.
            Two layers: a radial pool under the console, plus a vertical wash
            so the heading still reads where the radial falls off. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(78%_66%_at_50%_50%,rgba(4,18,12,0.97)_0%,rgba(4,18,12,0.9)_42%,rgba(4,18,12,0.66)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,18,12,0.92)_0%,rgba(4,18,12,0.35)_28%,rgba(4,18,12,0.35)_72%,rgba(4,18,12,0.92)_100%)]"
        />

        {/* --- foreground --- */}
        <div className="shell relative z-10 w-full">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{quality.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(1.75rem,3.9vw,3.25rem)] leading-[0.94] tracking-[-0.02em] text-cream uppercase">
              {quality.heading[0]}{" "}
              <span className="text-gold-400">{quality.heading[1]}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
              {quality.lead}
            </p>
          </div>

          {/* --- precision weighing console --- */}
          <div className="qw-console mx-auto mt-7 max-w-4xl opacity-0 will-change-transform">
            <div className="glass overflow-hidden rounded-xl border-white/14 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              {/* Console chrome */}
              <div className="flex items-center gap-2.5 border-b border-white/10 bg-forest-950/60 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <i className="block h-2 w-2 rounded-full bg-white/18" />
                  <i className="block h-2 w-2 rounded-full bg-white/18" />
                  <i className="block h-2 w-2 rounded-full bg-leaf-400/60" />
                </span>
                <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
                  {quality.console.caption}
                </p>
              </div>

              <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[auto_1fr] lg:gap-8">
                {/* Readout */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="lcd min-w-[11rem] px-4 py-3 sm:min-w-[13rem]">
                    <p className="text-[0.5625rem] tracking-[0.18em] uppercase opacity-70">
                      {quality.console.label}
                    </p>
                    <p className="mt-1 flex items-baseline justify-end gap-1.5">
                      <span
                        ref={lcdRef}
                        className="text-[2rem] leading-none font-bold tabular-nums sm:text-[2.5rem]"
                      >
                        0.00
                      </span>
                      <span className="text-[0.875rem] font-semibold opacity-70">
                        {quality.console.unit}
                      </span>
                    </p>
                  </div>

                  <p className="qw-badge inline-flex items-center gap-2 rounded-full bg-cashew-200 px-3.5 py-2 text-[0.6875rem] font-semibold tracking-[0.1em] text-ink uppercase opacity-0">
                    <BadgeCheck size={14} strokeWidth={2.4} aria-hidden />
                    {quality.console.badge}
                  </p>
                </div>

                {/* Spec table */}
                <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[30rem] border-collapse text-left">
                    <caption className="sr-only">
                      Raw cashew nut specification: our lots compared with the
                      Guinea-Bissau market average
                    </caption>
                    <thead>
                      <tr className="border-b border-white/12">
                        {quality.table.head.map((h, i) => (
                          <th
                            key={h}
                            scope="col"
                            className={cn(
                              "pb-2.5 font-mono text-[0.5625rem] tracking-[0.16em] uppercase",
                              i === 3 ? "text-gold-400" : "text-muted",
                            )}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {quality.table.rows.map((r) => (
                        <tr
                          key={r.param}
                          className="qw-row border-b border-white/8 opacity-0 last:border-0"
                        >
                          <th
                            scope="row"
                            className="py-2.5 pr-4 text-[0.8125rem] font-medium text-cream"
                          >
                            {r.param}
                          </th>
                          <td className="py-2.5 pr-4 font-mono text-[0.8125rem] text-muted tabular-nums">
                            {r.target}
                          </td>
                          <td className="py-2.5 pr-4 font-mono text-[0.8125rem] text-muted tabular-nums">
                            {r.market}
                          </td>
                          <td className="py-2.5 font-mono text-[0.8125rem] font-semibold text-gold-300 tabular-nums">
                            {r.ours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* --- supporting claims --- */}
            <ul className="mt-6 grid gap-x-7 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {quality.points.map((p) => (
                <li key={p.title} className="qw-point border-t border-white/12 pt-3 opacity-0">
                  <h3 className="text-[0.8125rem] font-semibold text-leaf-300">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">
                    {p.text}
                  </p>
                </li>
              ))}
            </ul>

            <p className="qw-point mx-auto mt-6 max-w-[62ch] text-center type-serif text-[1rem] leading-relaxed text-cashew-200 opacity-0 italic">
              {quality.claim}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getGsap } from "@/lib/motion/gsap";

/**
 * The client portal, shown as card-stacking panels.
 *
 * The panels are built in markup rather than pasted in as screenshots.
 * No real interface has been supplied, and a rendered mockup is honest
 * about being a mockup in a way a fake screenshot is not. Every panel
 * carries a visible "Illustrative preview" label, and the sample values
 * are deliberately generic placeholders, never plausible trade figures.
 */

type Panel = {
  id: string;
  title: string;
  caption: string;
  body: React.ReactNode;
};

const cell = "px-4 py-3 text-sm";
const head =
  "px-4 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-bone)]/40";

const PANELS: Panel[] = [
  {
    id: "stock",
    title: "Stock",
    caption: "What is in the warehouse right now, by lot.",
    body: (
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className={head}>Lot</th>
            <th className={head}>Received</th>
            <th className={head}>Status</th>
          </tr>
        </thead>
        <tbody className="text-[color:var(--color-bone)]/75">
          {[
            ["Lot reference", "Date received", "In store"],
            ["Lot reference", "Date received", "In store"],
            ["Lot reference", "Date received", "Allocated"],
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              {row.map((v, j) => (
                <td key={j} className={cell}>
                  {j === 2 ? (
                    <span className="rounded-full border border-[color:var(--color-gold)]/40 px-2.5 py-1 text-xs text-[color:var(--color-gold)]">
                      {v}
                    </span>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    id: "lots",
    title: "Lot detail",
    caption: "Where a lot was bought, graded and stored.",
    body: (
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
        {[
          ["Origin region", "Region"],
          ["Purchase date", "Date"],
          ["Grading", "Recorded on intake"],
          ["Storage", "Warehouse bay"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-bone)]/40">
              {k}
            </dt>
            <dd className="mt-1.5 text-[color:var(--color-bone)]/80">{v}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "contracts",
    title: "Contracts",
    caption: "Terms, incoterm and documents against each contract.",
    body: (
      <ul className="space-y-3 text-sm text-[color:var(--color-bone)]/75">
        {["Contract terms", "Incoterm", "Certificate of origin", "Bill of lading"].map(
          (item) => (
            <li
              key={item}
              className="flex items-center justify-between border-b border-white/5 pb-3"
            >
              <span>{item}</span>
              <span className="text-[color:var(--color-bone)]/35">
                Document
              </span>
            </li>
          ),
        )}
      </ul>
    ),
  },
  {
    id: "shipments",
    title: "Shipment milestones",
    caption: "The stages a consignment has passed.",
    body: (
      <ol className="space-y-4">
        {["Stuffed", "Sealed", "At quay", "Loaded", "Sailed"].map((step, i) => (
          <li key={step} className="flex items-center gap-4">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                i < 3
                  ? "bg-[color:var(--color-gold)]"
                  : "border border-white/25"
              }`}
            />
            <span className="text-sm text-[color:var(--color-bone)]/75">
              {step}
            </span>
          </li>
        ))}
      </ol>
    ),
  },
];

export function CrmStack() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !ref.current) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const { gsap, ScrollTrigger } = getGsap();
    const root = ref.current;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // Each card shrinks and dims as the next one settles over it,
        // which is what makes the stack read as depth rather than as
        // panels simply scrolling away.
        gsap.to(card, {
          scale: 0.94 - (cards.length - 2 - i) * 0.01,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <div ref={ref} className="space-y-6 md:space-y-0">
      {PANELS.map((panel) => (
        <article
          key={panel.id}
          data-card
          className="rounded-2xl border border-white/10 bg-[color:var(--color-navy)]/35 p-6 backdrop-blur-sm sm:p-8 md:sticky md:top-28"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
              {panel.title}
            </h3>
            {/*
              Required by the brief: the portal is not live, and every
              panel has to say so where it is seen, not in a footnote.
            */}
            <span className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--color-bone)]/45">
              Illustrative preview
            </span>
          </div>
          <p className="mt-2 text-sm text-[color:var(--color-bone)]/55">
            {panel.caption}
          </p>
          <div className="mt-6">{panel.body}</div>
        </article>
      ))}
    </div>
  );
}

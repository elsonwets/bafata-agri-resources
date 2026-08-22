"use client";

import { operation } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow, Index } from "@/components/ui/Bits";

/**
 * The "you don't need to build this" argument, delivered as a numbered
 * capability ledger. Deliberately dense and unglamorous — this is the
 * section a procurement manager screenshots and sends to their director.
 */
export function Operation() {
  return (
    <section id="operation" className="section-y relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* --- claim --- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>{operation.eyebrow}</Eyebrow>
            </Reveal>

            <SplitHeading
              as="h2"
              lines={operation.heading}
              accentLine={2}
              className="type-h2 mt-6 text-cream opacity-0"
            />

            <Reveal>
              <p className="type-lead mt-8 max-w-[50ch]">{operation.body}</p>
            </Reveal>

            <Reveal from="scale" className="mt-10 hidden lg:block">
              <Photo
                slug="team-fleet-group"
                sizes="40vw"
                className="aspect-[16/10] rounded-sm"
              />
            </Reveal>
          </div>

          {/* --- ledger --- */}
          <Reveal stagger={0.06} as="ul" className="grid gap-px bg-white/10">
            {operation.capabilities.map((c) => (
              <li
                key={c.n}
                className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 bg-forest-950/40 px-1 py-6 transition-colors duration-300 hover:bg-forest-900/60 sm:px-6"
              >
                <Index n={c.n} className="pt-1.5" />
                <div>
                  <h3 className="text-[0.9375rem] font-semibold tracking-[0.01em] text-cream">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] text-[0.875rem] leading-relaxed text-muted">
                    {c.text}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { FileText } from "lucide-react";
import { paperwork } from "@/data/content";
import { waLinks } from "@/data/site";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";

/**
 * The documentation section. Rendered as a stack of paper — each document a
 * cream card with a torn edge — because "we handle the paperwork" is an
 * abstract promise until you can see the file.
 */
export function Paperwork() {
  return (
    <section id="documents" className="section-y relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>{paperwork.eyebrow}</Eyebrow>
            </Reveal>

            <SplitHeading
              as="h2"
              lines={paperwork.heading}
              accentLine={1}
              className="type-h2 mt-6 text-cream opacity-0"
            />

            <Reveal>
              <p className="type-lead mt-8 max-w-[50ch]">{paperwork.body}</p>
            </Reveal>

            <Reveal>
              <p className="mt-6 max-w-[50ch] border-l-2 border-gold-400/50 pl-5 text-[0.875rem] leading-relaxed text-cashew-200/90">
                {paperwork.note}
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <Button
                href={waLinks.documents}
                external
                variant="outline"
                icon={<FileText size={16} strokeWidth={2.2} aria-hidden />}
              >
                Ask about your document set
              </Button>
            </Reveal>
          </div>

          {/* --- the file --- */}
          <Reveal stagger={0.07} as="ul" className="grid gap-3 sm:grid-cols-2">
            {paperwork.docs.map((d, i) => (
              <li
                key={d.title}
                className="group relative rounded-sm bg-cashew-100 p-5 transition-transform duration-500 ease-out hover:-translate-y-1"
                style={{
                  // A hand-stacked look: each sheet sits at its own tiny angle.
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (0.35 + (i % 3) * 0.22)}deg)`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[0.875rem] font-semibold text-ink">
                    {d.title}
                  </h3>
                  <FileText
                    size={15}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-ink/35"
                  />
                </div>
                <p className="mt-2 text-[0.75rem] leading-relaxed text-ink/62">
                  {d.text}
                </p>
                {/* Ruled lines suggesting the body of the document below. */}
                <div aria-hidden className="mt-4 space-y-1.5">
                  <span className="block h-px w-full bg-ink/10" />
                  <span className="block h-px w-[86%] bg-ink/10" />
                  <span className="block h-px w-[62%] bg-ink/10" />
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

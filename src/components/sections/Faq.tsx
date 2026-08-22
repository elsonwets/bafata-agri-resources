"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";
import { cn } from "@/lib/utils";

/**
 * Buyer questions, answered directly.
 *
 * Also the block answer engines quote: the same content is emitted as
 * FAQPage JSON-LD from the root layout, so a lift into an AI answer carries
 * the real specification rather than a paraphrase of the marketing copy.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y relative">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="type-h2 mt-5 text-cream">
                What buyers ask us first
              </h2>
              <p className="type-lead mt-6 max-w-[40ch]">
                If your question is not here, send it on WhatsApp — you will get
                a person, not a form response.
              </p>
            </Reveal>
          </div>

          <Reveal stagger={0.05} as="ul" className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "text-[0.9375rem] font-medium transition-colors duration-200 sm:text-[1.0625rem]",
                          isOpen ? "text-gold-400" : "text-cream",
                        )}
                      >
                        {f.q}
                      </span>
                      <Plus
                        size={18}
                        aria-hidden
                        className={cn(
                          "mt-0.5 shrink-0 transition-transform duration-400 ease-out",
                          isOpen ? "rotate-45 text-gold-400" : "text-muted",
                        )}
                      />
                    </button>
                  </h3>

                  {/* Grid-rows transition animates height without measuring. */}
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-6 text-[0.875rem] leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

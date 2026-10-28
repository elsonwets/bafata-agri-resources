import { faqs } from "@/data/content";
import { Heading, PlusIcon } from "@/components/ui";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="defer section">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Heading id="faq-title" className="max-w-[10ch]">Questions buyers ask</Heading>

        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} name="faq" className="faq border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-6 text-[1.1875rem] font-semibold tracking-[-0.02em]">
                {f.q}
                <PlusIcon className="faq-icon shrink-0 text-muted" />
              </summary>
              <p className="max-w-[62ch] pb-7 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

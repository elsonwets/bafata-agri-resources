import { howToBuy } from "@/data/content";
import { Heading } from "@/components/ui";

export function HowToBuy() {
  return (
    <section id="how-to-buy" aria-labelledby="buy-title" className="defer section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <Heading id="buy-title">{howToBuy.heading}</Heading>
          <p className="t-lead max-w-[34rem]">{howToBuy.lead}</p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {howToBuy.steps.map((s) => (
            <li key={s.n} className="border-t-2 border-ink pt-6">
              <p className="num text-[2.5rem] leading-none font-semibold tracking-[-0.04em] text-navy">
                {Number(s.n)}
              </p>
              <h3 className="mt-5 text-[1.1875rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

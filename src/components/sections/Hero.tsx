import { useDict } from "@/i18n";
import { wa } from "@/data/site";
import { Action, Photo, WhatsAppIcon } from "@/components/ui";

export function Hero() {
  const t = useDict();
  const { hero } = t;

  return (
    <section id="top" aria-labelledby="hero-title" className="pt-14 sm:pt-20">
      <div className="shell flex flex-col items-center text-center">
        <a
          href="#contact"
          className="mb-7 inline-flex items-center gap-2 rounded-full bg-raised px-4 py-1.5 text-[0.875rem] text-ink-soft shadow-[0_0_0_1px_var(--line)] transition-colors hover:text-ink"
        >
          <span className="size-1.5 rounded-full bg-shell" aria-hidden />
          {hero.pill}
        </a>

        <h1 id="hero-title" className="t-hero max-w-[12ch]">
          {hero.headline.join(" ")}
        </h1>

        <p className="t-lead mt-7 max-w-[40rem]">{hero.lead}</p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Action href="#contact">{hero.primaryCta}</Action>
          <Action href={wa(t.wa.general)} external variant="secondary" icon={<WhatsAppIcon />}>
            {hero.secondaryCta}
          </Action>
        </div>
      </div>

      <div className="hero-frame mt-14 sm:mt-20">
        <Photo
          slug="port-crane-quay"
          priority
          md
          sizes="100vw"
          className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[2.1/1]"
        />
      </div>

      <dl className="shell mt-8 grid grid-cols-1 gap-y-3 text-[0.9375rem] sm:grid-cols-3">
        {hero.meta.map((m) => (
          <div key={m.k} className="flex justify-center gap-2">
            <dt className="text-muted">{m.k}</dt>
            <dd className="num font-medium">{m.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

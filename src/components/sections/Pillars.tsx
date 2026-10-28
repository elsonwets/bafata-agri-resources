import { pillars } from "@/data/content";
import { Heading, Photo } from "@/components/ui";

export function Pillars() {
  return (
    <section aria-labelledby="pillars-title" className="defer section bg-raised">
      <div className="shell">
        <Heading id="pillars-title">{pillars.heading}</Heading>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {pillars.items.map((p) => (
            <li key={p.title} className="group overflow-hidden rounded-[28px] bg-canvas">
              <Photo
                slug={p.photo}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[16/10]"
                imgClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
              <div className="p-7 sm:p-9">
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-3 max-w-[36rem] text-ink-soft">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { useDict } from "@/i18n";
import { Heading, Photo } from "@/components/ui";

export function Operation() {
  const { operation } = useDict();
  return (
    <section id="operation" aria-labelledby="operation-title" className="defer bg-raised section">
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading id="operation-title" className="max-w-[14ch]">
            {operation.heading.join(" ")}
          </Heading>
          <p className="t-lead mt-7 max-w-[34rem]">{operation.body}</p>
          <Photo
            slug="team-fleet-portrait"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="mt-10 aspect-[3/2] rounded-[22px]"
          />
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {operation.capabilities.map((c) => (
            <li key={c.title} className="grid gap-1.5 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{c.title}</h3>
              <p className="text-ink-soft">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

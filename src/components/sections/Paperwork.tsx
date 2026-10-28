import { useDict } from "@/i18n";
import { wa } from "@/data/site";
import { Action, Heading, WhatsAppIcon } from "@/components/ui";

export function Paperwork() {
  const t = useDict();
  const { paperwork } = t;
  return (
    <section id="documents" aria-labelledby="documents-title" className="defer section">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Heading id="documents-title" className="max-w-[13ch]">
            {paperwork.heading.join(" ")}
          </Heading>
          <p className="t-lead mt-7 max-w-[32rem]">{paperwork.body}</p>
          <Action href={wa(t.wa.documents)} external variant="secondary" icon={<WhatsAppIcon />} className="mt-9">
            {paperwork.ask}
          </Action>
        </div>

        <div>
          <ol className="grid gap-px overflow-hidden rounded-[24px] bg-line sm:grid-cols-2">
            {paperwork.docs.map((d, i) => (
              <li key={d.title} className="bg-raised p-6 sm:p-7">
                <p className="num text-[0.875rem] font-medium text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.015em]">{d.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{d.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[60ch] text-[0.9375rem] text-muted">{paperwork.note}</p>
        </div>
      </div>
    </section>
  );
}

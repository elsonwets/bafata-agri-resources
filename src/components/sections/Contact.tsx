import { useState, type FormEvent } from "react";
import { cta } from "@/data/content";
import { site, wa, waLinks } from "@/data/site";
import { Action, CheckIcon, WhatsAppIcon } from "@/components/ui";
import { cn } from "@/lib/utils";

const INCOTERMS = ["FOB Bissau", "CFR", "CIF", "FAS", "Not sure yet"];

type Field = {
  name: keyof typeof cta.form.fields;
  type?: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

const FIELDS: Field[] = [
  { name: "name", required: true, autoComplete: "name" },
  { name: "company", required: true, autoComplete: "organization" },
  { name: "email", type: "email", required: true, autoComplete: "email" },
  { name: "country", autoComplete: "country-name" },
  { name: "volume", type: "text", placeholder: "e.g. 500" },
  { name: "port", placeholder: "e.g. Tuticorin" },
  { name: "incoterm", options: INCOTERMS },
  { name: "window", placeholder: "e.g. March–April 2027" },
  { name: "message", full: true },
];

/**
 * The buying request.
 *
 * The site is statically hosted, so rather than pretending to have a mail
 * backend the form composes the enquiry and hands it to WhatsApp — which is
 * where this business actually answers, and which gives the buyer a copy of
 * what they sent. Validation is the browser's; there is nothing to fake.
 */
export function Contact() {
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const line = (label: string, key: string) => {
      const v = String(data.get(key) ?? "").trim();
      return v ? `${label}: ${v}` : null;
    };

    const body = [
      `New buying request — raw cashew nuts, Guinea-Bissau`,
      ``,
      line("Name", "name"),
      line("Company", "company"),
      line("Email", "email"),
      line("Destination country", "country"),
      line("Volume (MT)", "volume"),
      line("Destination port", "port"),
      line("Incoterm", "incoterm"),
      line("Shipment window", "window"),
      line("Notes", "message"),
      ``,
      `Sent from ${site.url}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const url = wa(body);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(url);
  };

  const field =
    "w-full rounded-[14px] bg-canvas px-4 py-3.5 text-[1rem] text-ink outline-none ring-1 ring-transparent transition-shadow placeholder:text-muted/70 focus:bg-raised focus:ring-2 focus:ring-navy";

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="contact-title" className="t-h2 max-w-[15ch]">
            {cta.heading.join(" ")}
          </h2>
          <p className="t-lead mt-7 max-w-[32rem]">{cta.body}</p>

          <dl className="mt-10 grid gap-6 text-[1rem]">
            <div>
              <dt className="text-muted">WhatsApp and phone</dt>
              <dd className="mt-1">
                <a href={waLinks.general} target="_blank" rel="noopener noreferrer" className="num text-[1.25rem] font-semibold tracking-[-0.02em] text-navy hover:underline">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-[1.25rem] font-semibold tracking-[-0.02em] text-navy hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Office</dt>
              <dd className="mt-1 font-medium">Bissau, Guinea-Bissau</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[28px] bg-raised p-6 shadow-[0_1px_2px_rgb(21_25_43/0.04),0_24px_60px_-28px_rgb(21_25_43/0.25)] sm:p-10">
          {sent ? (
            <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center">
              <span className="grid size-12 place-items-center rounded-full bg-navy-tint text-navy">
                <CheckIcon />
              </span>
              <h3 className="t-h3 mt-6">Your request is ready in WhatsApp</h3>
              <p className="mt-3 max-w-[34ch] text-ink-soft">
                Press send in WhatsApp and it reaches us in Bissau. If the app didn't open, message us directly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action href={sent} external icon={<WhatsAppIcon />}>
                  Open WhatsApp
                </Action>
                <button
                  type="button"
                  onClick={() => setSent(null)}
                  className="min-h-12 rounded-full px-5 font-medium text-navy hover:bg-navy-tint"
                >
                  Edit my request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} aria-labelledby="form-title">
              <h3 id="form-title" className="t-h3">{cta.form.title}</h3>
              <p className="mt-1.5 text-ink-soft">{cta.form.subtitle}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {FIELDS.map((f) => {
                  const id = `f-${f.name}`;
                  const label = cta.form.fields[f.name];
                  return (
                    <div key={f.name} className={cn("flex flex-col gap-2", f.full && "sm:col-span-2")}>
                      <label htmlFor={id} className="text-[0.9375rem] font-medium">
                        {label}
                        {f.required ? null : <span className="font-normal text-muted"> (optional)</span>}
                      </label>
                      {f.options ? (
                        <select id={id} name={f.name} defaultValue="" className={cn(field, "appearance-none")}>
                          <option value="" disabled>
                            Choose
                          </option>
                          {f.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : f.full ? (
                        <textarea id={id} name={f.name} rows={4} className={cn(field, "resize-y")} />
                      ) : (
                        <input
                          id={id}
                          name={f.name}
                          type={f.type ?? "text"}
                          required={f.required}
                          placeholder={f.placeholder}
                          autoComplete={f.autoComplete}
                          className={field}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                className="mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 text-[1.0625rem] font-medium text-white transition-[background-color,transform] hover:bg-navy-deep active:scale-[0.98]"
              >
                <WhatsAppIcon />
                {cta.form.submit}
              </button>
              <p className="mt-4 text-center text-[0.875rem] text-muted">{cta.form.note}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

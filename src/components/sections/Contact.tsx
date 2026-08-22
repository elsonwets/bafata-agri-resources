"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { cta } from "@/data/content";
import { site, wa, waLinks } from "@/data/site";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";

const INCOTERMS = ["FOB Bissau", "CFR", "CIF", "FAS", "Not sure yet"];

type Field = {
  name: keyof typeof cta.form.fields;
  type?: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
  hint?: string;
};

const FIELDS: Field[] = [
  { name: "name", required: true, hint: "So we know who we're replying to" },
  { name: "company", required: true },
  { name: "email", type: "email", required: true },
  { name: "country" },
  { name: "volume", hint: "In metric tonnes, even approximate" },
  { name: "port" },
  { name: "incoterm", options: INCOTERMS },
  { name: "window", hint: "e.g. March–April 2027" },
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
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    window.open(wa(body), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contact" className="section-y relative">
      <div className="shell">
        <div className="relative overflow-hidden rounded-lg border border-white/12">
          {/* Backdrop: the quay at Bissau, heavily dimmed. */}
          <Photo
            slug="port-dual-cranes"
            sizes="100vw"
            className="absolute inset-0 -z-10"
            imgClassName="opacity-25"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-950 via-forest-950/94 to-forest-900/88"
          />

          <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:p-14">
            {/* --- the pitch --- */}
            <div>
              <Reveal>
                <Eyebrow>{cta.eyebrow}</Eyebrow>
              </Reveal>

              <SplitHeading
                as="h2"
                lines={cta.heading}
                accentLine={1}
                className="type-h2 mt-5 text-cream opacity-0"
              />

              <Reveal>
                <p className="type-lead mt-6 max-w-[46ch]">{cta.body}</p>
              </Reveal>

              <Reveal className="mt-9">
                <Button
                  href={waLinks.campaign}
                  external
                  variant="gold"
                  icon={<MessageCircle size={16} strokeWidth={2.2} aria-hidden />}
                >
                  {cta.secondary}
                </Button>
                <p className="mt-4 font-mono text-[0.75rem] tracking-[0.1em] text-muted">
                  {site.phoneDisplay}
                </p>
              </Reveal>

              <Reveal className="mt-10 border-t border-white/12 pt-6">
                <p className="type-eyebrow text-muted">Campaign timing</p>
                <p className="mt-3 max-w-[40ch] text-[0.875rem] leading-relaxed text-cashew-200">
                  The {site.campaign.year} harvest opens in{" "}
                  <strong className="font-semibold text-gold-400">
                    {site.campaign.opensMonth} {site.campaign.year}
                  </strong>
                  . Allocation, specification and freight are agreed before the
                  origin gets busy — not during.
                </p>
              </Reveal>
            </div>

            {/* --- the form --- */}
            <Reveal from="scale">
              <div className="glass rounded-lg p-5 sm:p-7">
                <h3 className="type-h3 text-cream">{cta.form.title}</h3>
                <p className="mt-2 text-[0.8125rem] text-muted">
                  {cta.form.subtitle}
                </p>

                <form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                  {FIELDS.map((f) => {
                    const label = cta.form.fields[f.name];
                    const id = `bf-${f.name}`;
                    return (
                      <div
                        key={f.name}
                        className={f.full ? "sm:col-span-2" : undefined}
                      >
                        <label
                          htmlFor={id}
                          className="block text-[0.75rem] font-medium text-cream/85"
                        >
                          {label}
                          {f.required ? (
                            <span aria-hidden className="ml-1 text-gold-400">
                              *
                            </span>
                          ) : null}
                        </label>

                        {f.options ? (
                          <select
                            id={id}
                            name={f.name}
                            defaultValue=""
                            className="mt-1.5 h-12 w-full rounded-md border border-white/16 bg-forest-950/70 px-3 text-[0.875rem] text-cream transition-colors focus:border-leaf-400"
                          >
                            <option value="" disabled>
                              Select…
                            </option>
                            {f.options.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : f.full ? (
                          <textarea
                            id={id}
                            name={f.name}
                            rows={3}
                            className="mt-1.5 w-full resize-y rounded-md border border-white/16 bg-forest-950/70 px-3 py-2.5 text-[0.875rem] text-cream transition-colors placeholder:text-muted/50 focus:border-leaf-400"
                          />
                        ) : (
                          <input
                            id={id}
                            name={f.name}
                            type={f.type ?? "text"}
                            required={f.required}
                            autoComplete={
                              f.name === "email"
                                ? "email"
                                : f.name === "name"
                                  ? "name"
                                  : f.name === "company"
                                    ? "organization"
                                    : f.name === "country"
                                      ? "country-name"
                                      : "off"
                            }
                            inputMode={f.name === "volume" ? "numeric" : undefined}
                            aria-describedby={f.hint ? `${id}-hint` : undefined}
                            className="mt-1.5 h-12 w-full rounded-md border border-white/16 bg-forest-950/70 px-3 text-[0.875rem] text-cream transition-colors placeholder:text-muted/50 focus:border-leaf-400"
                          />
                        )}

                        {f.hint ? (
                          <p
                            id={`${id}-hint`}
                            className="mt-1.5 text-[0.6875rem] text-muted/80"
                          >
                            {f.hint}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full"
                      icon={<Send size={15} strokeWidth={2.2} aria-hidden />}
                    >
                      {cta.form.submit}
                    </Button>

                    <p
                      className="mt-3 text-[0.6875rem] leading-relaxed text-muted"
                      role="status"
                    >
                      {sent
                        ? "WhatsApp should have opened with your request. If it did not, tap the WhatsApp button above and paste your details."
                        : cta.form.note}
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

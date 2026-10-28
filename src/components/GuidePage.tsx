import { site, wa } from "@/data/site";
import { guides, type Guide } from "@/data/guides";
import { guideGraph } from "@/data/schema";
import { dicts } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { Layout } from "@/components/Layout";
import { Action, Photo, PlusIcon, WhatsAppIcon } from "@/components/ui";

const t = dicts.en;

/** <head> of a guide. Guides exist in English only. */
export const guideHead = (g: Guide) =>
  pageHead({
    lang: "en",
    path: `/${g.slug}/`,
    title: g.title,
    description: g.description,
    alternates: { en: `/${g.slug}/` },
    image: `${site.url}/photos/${g.photo}.webp`,
    imageAlt: g.h1,
    type: "article",
    jsonLd: guideGraph(g),
  });

const updated = new Date(site.updated).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * A buyer guide: one question answered in depth, then the shortest route to
 * a conversation. Same visual language as the home page, set as a readable
 * article column.
 */
export function GuidePage({ guide: g }: { guide: Guide }) {
  const related = guides.filter((x) => x.slug !== g.slug);

  return (
    <Layout lang="en" alternates={{ en: `/${g.slug}/` }}>
      <article>
        <header className="shell pt-12 sm:pt-16">
          <nav aria-label="Breadcrumb" className="text-[0.875rem] text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/" className="hover:text-ink">{t.ui.home}</a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink-soft">{g.label}</li>
            </ol>
          </nav>
          <h1 className="t-h2 mt-6 max-w-[20ch]">{g.h1}</h1>
          <p className="t-lead mt-6 max-w-[44rem]">{g.lead}</p>
          <p className="mt-6 text-[0.875rem] text-muted">
            {t.ui.updated} <time dateTime={site.updated}>{updated}</time> · {site.name}
          </p>
        </header>

        <div className="shell mt-12">
          <Photo
            slug={g.photo}
            priority
            sizes="(max-width: 1216px) 100vw, 1152px"
            className="aspect-[16/9] rounded-[28px] sm:aspect-[2.2/1]"
          />
        </div>

        <div className="shell mt-16 grid gap-16 pb-8 lg:grid-cols-[1fr_17rem] lg:gap-20">
          <div className="max-w-[44rem]">
            {g.sections.map((s) => (
              <section key={s.heading} className="mb-16" aria-labelledby={slugify(s.heading)}>
                <h2 id={slugify(s.heading)} className="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-semibold tracking-[-0.03em]">
                  {s.heading}
                </h2>

                {s.steps && (
                  <ol className="mt-6 grid gap-5">
                    {s.steps.map((st, i) => (
                      <li key={st.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                        <span className="num grid size-9 place-items-center rounded-full bg-navy-tint text-[0.9375rem] font-semibold text-navy">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold tracking-[-0.015em]">{st.title}</h3>
                          <p className="mt-1 text-ink-soft">{st.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {s.terms && (
                  <dl className="mt-6 border-t border-line">
                    {s.terms.map((d) => (
                      <div key={d.term} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                        <dt className="font-semibold">{d.term}</dt>
                        <dd className="text-ink-soft">{d.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {s.table && (
                  <div className="mt-6 overflow-x-auto rounded-[20px] bg-raised p-2">
                    <table className="num w-full min-w-[30rem] border-collapse text-left text-[0.9375rem]">
                      <caption className="sr-only">{s.table.caption}</caption>
                      <thead>
                        <tr className="text-muted">
                          {s.table.head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r[0]} className="border-t border-line">
                            {r.map((c, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="px-4 py-3 font-medium">{c}</th>
                              ) : (
                                <td key={i} className={i === r.length - 1 ? "px-4 py-3 font-semibold text-shell" : "px-4 py-3 text-ink-soft"}>
                                  {c}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-soft">{p}</p>
                ))}
              </section>
            ))}

            <section aria-labelledby="guide-faq" className="mb-8">
              <h2 id="guide-faq" className="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-semibold tracking-[-0.03em]">
                Frequently asked questions
              </h2>
              <div className="mt-4 border-t border-line">
                {g.faqs.map((f) => (
                  <details key={f.q} name="guide-faq" className="faq border-b border-line">
                    <summary className="flex items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold tracking-[-0.015em]">
                      {f.q}
                      <PlusIcon className="faq-icon shrink-0 text-muted" />
                    </summary>
                    <p className="pb-6 text-ink-soft">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[24px] bg-raised p-6">
              <p className="font-semibold tracking-[-0.015em]">{t.cta.heading.join(" ")}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">{t.cta.form.subtitle}</p>
              <div className="mt-5 grid gap-2">
                <Action href="/#contact" size="sm">{t.ui.buyingRequest}</Action>
                <Action href={wa(t.wa.general)} external size="sm" variant="secondary" icon={<WhatsAppIcon />}>
                  WhatsApp
                </Action>
              </div>
            </div>

            <nav aria-label="Related guides" className="mt-8">
              <p className="text-[0.875rem] font-semibold">{t.ui.guides}</p>
              <ul className="mt-3 grid gap-2.5 text-[0.9375rem] text-ink-soft">
                {related.map((r) => (
                  <li key={r.slug}>
                    <a href={`/${r.slug}/`} className="underline-offset-4 hover:text-ink hover:underline">{r.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </article>
    </Layout>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

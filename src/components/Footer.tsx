import { site, wa } from "@/data/site";
import { guides } from "@/data/guides";
import { homePath, useDict, type Lang } from "@/i18n";

export function Footer() {
  const t = useDict();
  const home = homePath(t.lang as Lang);

  return (
    <footer className="border-t border-line bg-raised">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1fr_0.8fr_1fr_1.2fr]">
        <div>
          <img
            src="/brand/logo-lockup.webp"
            alt={site.name}
            width={176}
            height={149}
            loading="lazy"
            decoding="async"
            className="h-auto w-44"
          />
        </div>

        <nav aria-label={t.footer.navigate}>
          <p className="text-[0.875rem] font-semibold">{t.footer.navigate}</p>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-soft">
            {t.nav.map((n) => (
              <li key={n.id}>
                <a href={`${home}#${n.id}`} className="hover:text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.ui.guides}>
          <p className="text-[0.875rem] font-semibold">{t.ui.guides}</p>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-soft">
            {guides.map((g) => (
              <li key={g.slug}>
                <a href={`/${g.slug}/`} hrefLang="en" className="hover:text-ink">
                  {g.label}
                  {t.ui.englishOnly && <span className="text-muted"> {t.ui.englishOnly}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.875rem] font-semibold">{t.footer.contact}</p>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-soft">
            <li>
              <a href={wa(t.wa.general)} target="_blank" rel="noopener noreferrer" className="num hover:text-ink">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] hover:text-ink">{site.email}</a>
            </li>
            <li>{t.footer.address}</li>
          </ul>
        </div>
      </div>
      <div className="shell">
        <p className="border-t border-line py-6 text-[0.8125rem] text-muted">
          © {new Date().getFullYear()} {site.name}. {t.footer.legal}
        </p>
      </div>
    </footer>
  );
}

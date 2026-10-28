import { footer } from "@/data/content";
import { nav, site, waLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-raised">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/brand/logo-mark.svg" alt="" width={40} height={40} loading="lazy" className="size-10" />
            <p className="font-semibold tracking-[-0.015em]">{site.name}</p>
          </div>
          <p className="mt-5 max-w-[30ch] text-[0.9375rem] text-ink-soft">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[0.875rem] font-semibold">Navigate</h2>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-soft">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.875rem] font-semibold">Contact</h2>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-soft">
            <li>
              <a href={waLinks.general} target="_blank" rel="noopener noreferrer" className="num hover:text-ink">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
            </li>
            <li>{footer.address.join(", ")}</li>
          </ul>
        </div>
      </div>
      <div className="shell"><p className="border-t border-line py-6 text-[0.8125rem] text-muted">{footer.legal}</p></div>
    </footer>
  );
}

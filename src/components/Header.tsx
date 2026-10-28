import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { LANGS, dicts, homePath, useDict, type Lang } from "@/i18n";
import { Action } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * A translucent bar in the manner of a product page's global nav: quiet,
 * blurred over whatever scrolls beneath it, with the one action that
 * matters — the buying request — always within reach.
 *
 * `alternates` maps each language to this page's URL in that language;
 * a language without its own version links to its home page.
 */
export function Header({ alternates = {} }: { alternates?: Partial<Record<Lang, string>> }) {
  const t = useDict();
  const lang = t.lang as Lang;
  const home = homePath(lang);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const switcher = (
    <ul className="flex items-center rounded-full bg-sunken p-0.5 text-[0.75rem] font-semibold" aria-label={t.ui.language}>
      {LANGS.map((l) => (
        <li key={l}>
          <a
            href={alternates[l] ?? homePath(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            title={dicts[l].langName}
            className={cn(
              "grid h-8 min-w-9 place-items-center rounded-full px-2 uppercase transition-colors",
              l === lang ? "bg-raised text-ink shadow-sm" : "text-muted hover:text-ink",
            )}
          >
            {l}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href={`${home}#top`} className="flex shrink-0 items-center gap-2.5" aria-label={`${site.shortName}, ${t.ui.backToTop}`}>
          <img src="/brand/logo-mark-96.webp" alt="" width={38} height={30} className="h-[30px] w-[38px]" />
          <span className="hidden text-[0.9375rem] leading-tight font-semibold tracking-[-0.015em] xs:inline">
            Bafata Agri Resources
          </span>
        </a>

        <nav aria-label={t.ui.sections} className="hidden xl:block">
          <ul className="flex items-center gap-6 text-[0.875rem] text-ink-soft">
            {t.nav
              .filter((n) => n.id !== "contact")
              .map((n) => (
                <li key={n.id}>
                  <a href={`${home}#${n.id}`} className="transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{switcher}</div>
          <Action href={`${home}#contact`} size="sm">
            {t.ui.buyingRequest}
          </Action>
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-canvas xl:hidden">
        <div className="shell py-4">
          <div className="sm:hidden">{switcher}</div>
          <ul className="mt-2 flex flex-col sm:mt-0">
            {t.nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`${home}#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[1.5rem] font-semibold tracking-[-0.03em]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

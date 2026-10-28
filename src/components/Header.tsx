import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { Action } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * A translucent bar in the manner of a product page's global nav: quiet,
 * blurred over whatever scrolls beneath it, with the one action that
 * matters — the buying request — always within reach.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.shortName}, back to top`}>
          <img src="/brand/logo-mark.svg" alt="" width={30} height={30} className="size-[30px]" />
          <span className="hidden text-[0.9375rem] leading-tight font-semibold tracking-[-0.015em] xs:inline">
            Bafata Agri Resources
          </span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.875rem] text-ink-soft">
            {nav
              .filter((n) => n.href !== "#contact")
              .map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Action href="#contact" size="sm">
            Buying request
          </Action>
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
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

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-canvas lg:hidden"
      >
        <ul className="shell flex flex-col py-4">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[1.5rem] font-semibold tracking-[-0.03em]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

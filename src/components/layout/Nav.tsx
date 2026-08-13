"use client";

import { useEffect, useState } from "react";
import { EmblemMark } from "./EmblemMark";
import { COMPANY } from "@/config/company";

const LINKS = [
  { href: "#chain", label: "The chain" },
  { href: "#sourcing", label: "Sourcing" },
  { href: "#portal", label: "Portal" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Floating glass pill. Condenses once the hero is behind it, which keeps
 * the emblem large while it is the only thing on screen and small once
 * it is competing with content.
 */
export function Nav() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-5xl items-center gap-4 rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] px-4 backdrop-blur-xl transition-all duration-500 sm:gap-8 sm:px-6 ${
          condensed ? "py-2" : "py-3"
        }`}
      >
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 text-[color:var(--color-bone)]"
        >
          <EmblemMark
            className={`text-[color:var(--color-bone)] transition-all duration-500 ${
              condensed ? "w-9" : "w-12"
            }`}
          />
          <span className="sr-only">{COMPANY.legalName}, home</span>
          <span
            className={`hidden font-medium tracking-tight transition-all duration-500 sm:block ${
              condensed ? "text-sm" : "text-base"
            }`}
          >
            Bafat&aacute; Agri Resources
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-6 text-sm text-[color:var(--color-bone)]/70 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-[color:var(--color-bone)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="ml-auto shrink-0 rounded-full bg-[color:var(--color-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-ink)] transition-transform duration-300 hover:scale-[1.03] md:ml-0"
        >
          Start a conversation
        </a>
      </nav>
    </header>
  );
}

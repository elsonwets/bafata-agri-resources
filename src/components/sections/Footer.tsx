"use client";

import { MessageCircle, MapPin } from "lucide-react";
import { footer } from "@/data/content";
import { site, waLinks } from "@/data/site";
import { Glyph } from "@/components/brand/Glyph";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-10">
      <div className="shell">
        <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr_1fr]">
          {/* --- identity --- */}
          <div>
            <div className="flex items-center gap-3">
              <Glyph size={46} className="text-leaf-300" />
              <span className="leading-tight">
                <span className="block font-display text-[1.125rem] tracking-[0.03em] text-cream">
                  Bafata Agri Resources
                </span>
                <span className="type-eyebrow block text-[0.5625rem] text-leaf-400/80">
                  {site.legalForm} · Raw cashew nut exports
                </span>
              </span>
            </div>

            <address className="mt-6 flex items-start gap-2 text-[0.875rem] not-italic text-muted">
              <MapPin size={15} aria-hidden className="mt-0.5 shrink-0 text-gold-400/80" />
              <span>
                {footer.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>

            <p className="mt-6 max-w-[42ch] text-[0.8125rem] leading-relaxed text-muted/85">
              We source, inspect and export raw cashew nuts from Guinea-Bissau,
              and carry the documentation through to your discharge port.
            </p>
          </div>

          {/* --- navigation --- */}
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="type-eyebrow text-muted">{col.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[0.875rem] text-cream/78 underline-offset-4 transition-colors hover:text-gold-400 hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* --- contact --- */}
          <div>
            <h2 className="type-eyebrow text-muted">Talk to us</h2>
            <a
              href={waLinks.general}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 font-mono text-[1.0625rem] text-cream transition-colors hover:text-gold-400"
            >
              <MessageCircle size={17} aria-hidden className="text-gold-400" />
              {site.phoneDisplay}
            </a>

            <p className="mt-5 max-w-[34ch] text-[0.8125rem] leading-relaxed text-muted">
              WhatsApp is the fastest route to us. We answer in English,
              Portuguese and French.
            </p>

            <p className="mt-6 rounded-md border border-gold-400/28 bg-gold-400/8 px-4 py-3 text-[0.8125rem] text-cashew-200">
              <strong className="font-semibold text-gold-300">
                Campaign {site.campaign.year}
              </strong>{" "}
              opens {site.campaign.opensMonth} {site.campaign.year}. Talk to us
              before allocation closes.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-muted/75">{footer.legal}</p>
          <p className="font-mono text-[0.625rem] tracking-[0.14em] text-muted/60 uppercase">
            {site.city} · {site.geo.lat.toFixed(2)}°N {Math.abs(site.geo.lng).toFixed(2)}°W
          </p>
        </div>
      </div>
    </footer>
  );
}

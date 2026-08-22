"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { nav, site, waLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/brand/Glyph";
import { cn } from "@/lib/utils";

/**
 * Sticky header that condenses once the hero is behind you, plus a scroll
 * progress rule pinned to its bottom edge.
 */
export function Header() {
  const barRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -120",
        end: 99999,
        onToggle: (self) => setSolid(self.isActive),
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    });
    return () => ctx.revert();
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const jump = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    // Defer so the overflow lock is released before we measure.
    requestAnimationFrame(() =>
      el.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <>
      <header
        ref={barRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-white/10 bg-forest-950/72 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex items-center justify-between gap-6 py-3.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
          >
            <Glyph size={38} className="shrink-0 text-leaf-300" />
            <span className="leading-none">
              <span className="block font-display text-[0.9375rem] tracking-[0.04em] text-cream">
                Bafata
              </span>
              <span className="type-eyebrow block text-[0.5625rem] text-leaf-400/80">
                Agri Resources
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      jump(item.href);
                    }}
                    className="relative block cursor-pointer rounded-full px-3.5 py-2 text-[0.8125rem] text-cream/70 transition-colors duration-200 hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={waLinks.general}
              external
              variant="gold"
              className="hidden px-5 py-2.5 sm:inline-flex"
              icon={<MessageCircle size={15} strokeWidth={2.2} aria-hidden />}
            >
              WhatsApp
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 text-cream lg:hidden"
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          aria-hidden
          className="h-px origin-left scale-x-0 bg-gradient-to-r from-leaf-400 via-gold-400 to-gold-300"
        />
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 bg-forest-950/96 backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex h-full flex-col justify-center">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    jump(item.href);
                  }}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="font-mono text-[0.6875rem] text-gold-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-h3 text-cream">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3">
            <Button
              href={waLinks.general}
              external
              icon={<MessageCircle size={16} aria-hidden />}
            >
              WhatsApp {site.phoneDisplay}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

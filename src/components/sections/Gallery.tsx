"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photos, src, type PhotoCat } from "@/data/photos";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Bits";
import { cn } from "@/lib/utils";

const FILTERS: { id: PhotoCat | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "warehouse", label: "Warehouse" },
  { id: "logistics", label: "Trucking" },
  { id: "weighbridge", label: "Weighbridge" },
  { id: "port", label: "Port of Bissau" },
  { id: "vessel", label: "Vessel" },
  { id: "team", label: "Team" },
  { id: "bissau", label: "Bissau" },
];

/**
 * The full field archive — every photograph from the client's shoot, none of
 * them stock. Filterable by stage of the operation, with a lightbox for
 * reading the captions at size.
 */
export function Gallery() {
  const [filter, setFilter] = useState<PhotoCat | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.cat === filter)),
    [filter],
  );

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? null : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  // Keyboard control for the lightbox, plus restoring focus on close.
  useEffect(() => {
    if (open === null) return;

    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open, step]);

  const current = open === null ? null : visible[open];

  return (
    <section id="gallery" className="section-y relative">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Eyebrow>The archive</Eyebrow>
            <h2 className="type-h2 mt-5 max-w-[16ch] text-cream">
              Our campaign, photographed
            </h2>
            <p className="type-lead mt-5 max-w-[48ch]">
              Every image on this site is our own operation in Guinea-Bissau —
              the warehouse, the weighbridge, the convoys and the quay at the
              Port of Bissau. No stock photography.
            </p>
          </Reveal>

          <Reveal className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
            <span className="text-gold-400">
              {String(visible.length).padStart(2, "0")}
            </span>{" "}
            / {photos.length} frames
          </Reveal>
        </div>

        {/* --- filters --- */}
        <Reveal className="mt-10">
          <ul className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <li key={f.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={cn(
                      // min-h-11 keeps the chip on the 44px touch minimum.
                      "min-h-11 cursor-pointer rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-200",
                      active
                        ? "border-gold-400 bg-gold-400 text-ink"
                        : "border-white/16 text-cream/72 hover:border-leaf-400/60 hover:text-cream",
                    )}
                  >
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* --- masonry --- */}
        <ul className="mt-8 gap-3 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          {visible.map((p, i) => (
            <li key={p.slug} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-sm"
                aria-label={`Open photograph: ${p.en}`}
              >
                <Photo
                  slug={p.slug}
                  small
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/88 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 text-left font-mono text-[0.625rem] leading-relaxed tracking-[0.06em] text-cashew-200 uppercase opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.en}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* --- lightbox --- */}
      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.en}
          className="fixed inset-0 z-[60] flex flex-col bg-forest-950/97 backdrop-blur-xl"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-4">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
              {String((open ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(visible.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/18 text-cream transition-colors hover:border-gold-400 hover:text-gold-400"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--gutter)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="absolute left-2 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-forest-900/70 text-cream transition-colors hover:text-gold-400 sm:left-4"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>

            <Image
              key={current.slug}
              src={src(current.slug)}
              alt={current.en}
              width={1800}
              height={Math.round((1800 * current.h) / current.w)}
              placeholder="blur"
              blurDataURL={current.blur}
              sizes="90vw"
              className="max-h-full w-auto max-w-full object-contain"
            />

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="absolute right-2 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-forest-900/70 text-cream transition-colors hover:text-gold-400 sm:right-4"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </div>

          <p className="px-[var(--gutter)] py-5 text-center text-[0.8125rem] text-cashew-200">
            {current.en}
          </p>
        </div>
      ) : null}
    </section>
  );
}

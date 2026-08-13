"use client";

import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import type { ImageSlug } from "@/data/images";

/**
 * The photo essay: the company's own frames with factual captions.
 *
 * This carries the architecture the art direction called for, minus the
 * testimonials it was meant to hold. No customer quotes were supplied
 * and inventing them is out of the question, so the frames speak instead.
 */
const FRAMES: { slug: ImageSlug; caption: string }[] = [
  {
    slug: "warehouse-sack-relay",
    caption: "Sacks moving hand to hand across the warehouse floor.",
  },
  {
    slug: "warehouse-stacking",
    caption: "Building the stack, one lot at a time.",
  },
  {
    slug: "depot-fleet-aerial",
    caption: "Sheeted trailers lined up in the yard before departure.",
  },
  {
    slug: "quay-cranes-wide",
    caption: "The quay at Bissau on a loading day.",
  },
  {
    slug: "crane-sling-lift",
    caption: "A sling of sacks going up and over the rail.",
  },
  {
    slug: "vessel-hold",
    caption: "The hold filling from the bottom up.",
  },
  {
    slug: "director-waterfront",
    caption: "On the Bissau waterfront, a short walk from the quay.",
  },
];

export function PhotoEssay() {
  const [index, setIndex] = useState(0);
  const frame = FRAMES[index];

  const go = (delta: number) =>
    setIndex((i) => (i + delta + FRAMES.length) % FRAMES.length);

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
        <div className="overflow-hidden rounded-2xl">
          <Photo
            key={frame.slug}
            slug={frame.slug}
            sizes="(min-width: 1024px) 60vw, 92vw"
            className="photo-graded aspect-[3/2] w-full object-cover"
          />
        </div>

        <div>
          {/* Announced, so the caption change reaches a screen reader. */}
          <p
            aria-live="polite"
            className="text-lg leading-relaxed text-[color:var(--color-bone)]/80"
          >
            {frame.caption}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
            <span className="ml-2 text-sm tabular-nums text-[color:var(--color-bone)]/40">
              {String(index + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Overlapping thumbnail rail. */}
      <ul className="mt-10 flex flex-wrap items-center">
        {FRAMES.map((f, i) => (
          <li key={f.slug} className={i > 0 ? "-ml-4" : undefined}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photograph ${i + 1}: ${f.caption}`}
              aria-current={i === index}
              className={`block overflow-hidden rounded-xl border-2 transition-all duration-500 ${
                i === index
                  ? "z-10 border-[color:var(--color-gold)] opacity-100"
                  : "border-[color:var(--color-ink)] opacity-45 hover:opacity-80"
              }`}
            >
              <Photo
                slug={f.slug}
                sizes="80px"
                className="photo-graded h-16 w-20 object-cover sm:h-20 sm:w-28"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useRef } from "react";
import { bySlug } from "@/data/photos";
import { Heading, Photo } from "@/components/ui";

const SLUGS = [
  "warehouse-team-stacking",
  "founder-truck-green",
  "truck-convoy-road",
  "weighbridge-arrival",
  "port-cargo-net",
  "team-duo-fleet",
  "port-quay-stacks",
  "port-lifting-sling",
  "founder-portrait-quay",
  "port-fleet-quay",
  "bissau-monument-wide",
  "team-woman-quay",
];

/**
 * The shoot, as a rail you swipe or scroll sideways. Native scroll snapping
 * does the physics; the two buttons are a convenience for mouse users.
 */
export function Gallery() {
  const rail = useRef<HTMLUListElement>(null);
  const page = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="defer section bg-raised">
      <div className="shell flex items-end justify-between gap-6">
        <Heading id="gallery-title" className="max-w-[16ch]">
          Our cashew export operation in Bissau
        </Heading>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => page(d)}
              aria-label={d < 0 ? "Previous photos" : "Next photos"}
              className="grid size-11 place-items-center rounded-full bg-sunken text-ink transition-colors hover:bg-line-strong"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={d < 0 ? "M14.5 6 8.5 12l6 6" : "m9.5 6 6 6-6 6"} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={rail}
        className="rail mt-12 flex gap-4 overflow-x-auto px-[var(--gutter)] [scroll-padding-inline:var(--gutter)] lg:px-[max(var(--gutter),calc((100vw-var(--max-w))/2+var(--gutter)))] lg:[scroll-padding-inline:max(var(--gutter),calc((100vw-var(--max-w))/2+var(--gutter)))]"
      >
        {SLUGS.map((slug) => {
          const p = bySlug(slug);
          return (
            <li key={slug} className="shrink-0">
              <figure>
                <Photo
                  slug={slug}
                  sizes="(max-width: 640px) 80vw, 420px"
                  className={
                    "h-[26rem] rounded-[22px] sm:h-[30rem] " +
                    (p.portrait ? "w-[18rem] sm:w-[20rem]" : "w-[80vw] sm:w-[40rem]")
                  }
                />
                <figcaption className="mt-3 max-w-[36ch] text-[0.875rem] text-muted">{p.en}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

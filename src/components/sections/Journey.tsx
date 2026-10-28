import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/content";
import { Heading, Photo } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Eight stages, told the way a product page tells a feature: the text
 * scrolls, the photograph holds still and changes to match the stage you
 * are reading. On small screens each stage simply carries its own photo.
 */
export function Journey() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = stepsRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-step")));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="journey" aria-labelledby="journey-title" className="section">
      <div className="shell">
        <Heading id="journey-title">{journey.heading}</Heading>
        <p className="t-lead mt-6 max-w-[38rem]">{journey.lead}</p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="sticky top-28 hidden h-[calc(100svh-9rem)] max-h-[44rem] self-start lg:block">
            <div className="relative h-full overflow-hidden rounded-[28px]">
              {journey.steps.map((s, i) => (
                <div
                  key={s.photo}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Photo slug={s.photo} sizes="45vw" className="h-full" />
                </div>
              ))}
              <p
                aria-hidden
                className="num absolute bottom-5 left-5 rounded-full bg-white/85 px-3.5 py-1.5 text-[0.875rem] font-medium backdrop-blur-md"
              >
                Stage {active + 1} of {journey.steps.length}
              </p>
            </div>
          </div>

          <ol ref={stepsRef} className="flex flex-col">
            {journey.steps.map((s, i) => (
              <li
                key={s.n}
                data-step={i}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  // The active stage is marked by a navy rule rather than by
                  // fading the others, so every stage keeps full contrast.
                  "border-t-2 py-10 transition-colors duration-500 lg:flex lg:min-h-[52svh] lg:flex-col lg:justify-center lg:py-14",
                  i === active ? "border-line lg:border-navy" : "border-line",
                )}
              >
                <Photo
                  slug={s.photo}
                  sizes="100vw"
                  className="mb-7 aspect-[3/2] rounded-[20px] lg:hidden"
                />
                <p className="num text-[0.9375rem] font-medium text-shell">
                  {s.n} · {s.sub}
                </p>
                <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.035em]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

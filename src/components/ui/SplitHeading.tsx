"use client";

import { useEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  /** One entry per visual line — the copy decides its own line breaks. */
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Renders the given line in the accent colour. */
  accentLine?: number;
};

/**
 * Masked line-by-line heading reveal. Each line sits in an overflow-hidden
 * box and slides up from below, which is the cleanest way to make display
 * type feel deliberate rather than merely faded in.
 */
export function SplitHeading({
  lines,
  className,
  lineClassName,
  as: Tag = "h2",
  delay = 0,
  accentLine,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelectorAll<HTMLElement>(".split-line > span");

    if (prefersReducedMotion()) {
      gsap.set(inner, { yPercent: 0, opacity: 1 });
      gsap.set(el, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        inner,
        { yPercent: 118, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          delay,
          ease: ease.out,
          stagger: 0.085,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} data-reveal className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className={cn("split-line", lineClassName)}>
          <span className={i === accentLine ? "text-gold-400" : undefined}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

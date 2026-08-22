"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Direction the element travels in from. */
  from?: "up" | "down" | "left" | "right" | "scale" | "none";
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number;
  as?: "div" | "section" | "ul" | "li" | "p" | "span";
};

const OFFSETS = {
  up: { y: 46 },
  down: { y: -46 },
  left: { x: -46 },
  right: { x: 46 },
  scale: { scale: 0.94 },
  none: {},
} as const;

/**
 * The site's one reveal primitive. Everything that fades in on scroll goes
 * through here so timing and easing stay identical across every section.
 */
export function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  stagger,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      // In stagger mode the children are the animation targets, so the
      // wrapper has to be un-hidden explicitly — the base CSS starts every
      // [data-reveal] at opacity 0 to avoid a flash before GSAP takes over.
      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { opacity: 0, ...OFFSETS[from] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.05,
          delay,
          ease: ease.out,
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [from, delay, stagger]);

  return (
    <Tag
      // @ts-expect-error — the ref type varies with the polymorphic tag.
      ref={ref}
      data-reveal
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

/** Refresh helper for sections that mount content asynchronously. */
export const refreshScroll = () => ScrollTrigger.refresh();

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getGsap } from "@/lib/motion/gsap";

/**
 * Scrubbed word reveal. Words start faint and resolve one after another
 * as the passage is scrolled through.
 *
 * The text is real, complete markup: the animation only lowers opacity
 * and raises it again, so with no JavaScript or under reduced motion the
 * passage simply reads.
 */
export function TextReveal({ children }: { children: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap, ScrollTrigger } = getGsap();
    const root = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-word]"),
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <p
      ref={ref}
      className="max-w-5xl text-2xl font-medium leading-[1.35] tracking-[-0.015em] sm:text-3xl lg:text-[2.75rem] lg:leading-[1.28]"
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word className="inline-block">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

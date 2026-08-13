"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getGsap } from "@/lib/motion/gsap";

/**
 * The Bafata emblem, engraved then inked.
 *
 * The source artwork is a single compound path with an even-odd fill, so
 * the usual trick of drawing separate branch strokes does not apply.
 * Instead the same path is first stroked and drawn on with a dash
 * offset, which traces the tree, the laurel and the yantra as one
 * continuous line, and then cross-faded to its solid fill. On an emblem
 * this ornate the tracing reads as engraving.
 */
export function EmblemMark({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [markup, setMarkup] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/logo/bafata-emblem.svg")
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setMarkup(text);
      })
      .catch(() => {
        /* The static fallback below stays in place. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!markup || reduced || !wrapRef.current) return;
    const path = wrapRef.current.querySelector("path");
    if (!path) return;

    const { gsap } = getGsap();
    const length = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(path, {
        fill: "transparent",
        stroke: "currentColor",
        strokeWidth: 1.1,
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap
        .timeline()
        .to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
        })
        .to(
          path,
          { fill: "currentColor", duration: 0.7, ease: "power1.out" },
          "-=0.35",
        )
        .to(path, { strokeWidth: 0, duration: 0.5 }, "<");
    }, wrapRef);

    return () => ctx.revert();
  }, [markup, reduced]);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={
        markup
          ? { __html: markup }
          : {
              __html:
                '<svg viewBox="0 0 780 520" width="100%" height="100%"></svg>',
            }
      }
    />
  );
}

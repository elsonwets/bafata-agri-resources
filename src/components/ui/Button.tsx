"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";

const BASE =
  "group relative inline-flex cursor-pointer items-center justify-center gap-2.5 " +
  "overflow-hidden rounded-full px-6 py-3.5 text-[0.8125rem] font-medium " +
  "tracking-[0.02em] transition-colors duration-200 select-none " +
  "min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-3";

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold-400 text-ink hover:bg-gold-300",
  outline:
    "border border-white/25 text-cream hover:border-leaf-400/70 hover:text-leaf-200",
  ghost: "text-cream/80 hover:text-cream",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * Magnetic CTA. The button leans toward the cursor within its hit area,
 * which reads as responsiveness rather than decoration — and it is disabled
 * outright under reduced motion.
 */
export function Button({
  children,
  href,
  variant = "gold",
  className,
  icon,
  external,
  onClick,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.28;
    const y = (e.clientY - r.top - r.height / 2) * 0.34;
    gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
    gsap.to(labelRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
  };

  const onLeave = () => {
    if (prefersReducedMotion()) return;
    gsap.to([ref.current, labelRef.current], {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: "elastic.out(1, 0.45)",
    });
  };

  const content = (
    <>
      {/* Sheen sweeps across on hover — 200ms, once, never looping. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span ref={labelRef} className="relative inline-flex items-center gap-2.5">
        {children}
        {icon}
      </span>
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);

  if (href) {
    return (
      <a
        // @ts-expect-error — shared ref across anchor and button.
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      // @ts-expect-error — shared ref across anchor and button.
      ref={ref}
      type={type}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={classes}
    >
      {content}
    </button>
  );
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point. Importing gsap from anywhere else in the app
 * risks registering the plugin twice, which silently breaks refresh order.
 */
if (typeof window !== "undefined") {
  // registerPlugin is idempotent, so a double import is harmless.
  gsap.registerPlugin(ScrollTrigger);

  // Pinned sections must not fight the browser's scroll restoration.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Shared easing vocabulary. Every animation on the site pulls from here so
 * the whole page moves with one rhythm instead of a dozen competing ones.
 */
export const ease = {
  out: "expo.out",
  inOut: "power4.inOut",
  soft: "power2.out",
  back: "back.out(1.6)",
} as const;

export const dur = {
  micro: 0.28,
  base: 0.7,
  slow: 1.15,
  epic: 1.8,
} as const;

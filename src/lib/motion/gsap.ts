"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers ScrollTrigger exactly once. Importing gsap directly in a
 * component and registering there means the plugin gets registered on
 * every mount, which GSAP warns about and which makes refresh ordering
 * unpredictable.
 */
let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };

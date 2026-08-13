"use client";

import { useEffect, useState } from "react";

/**
 * Single source of truth for the motion gate.
 *
 * Starts at `true` deliberately. Rendering the reduced state first and
 * relaxing it after mount means a visitor who asked for reduced motion
 * never sees a frame of animation, and it keeps server and first client
 * render identical.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

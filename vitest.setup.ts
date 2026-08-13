import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * Testing Library only registers its own auto-cleanup when Vitest runs
 * with `globals: true`. This suite imports its helpers explicitly, so the
 * unmount has to be wired up here, or rendered trees accumulate in the
 * document and `screen` queries start matching several elements.
 */
afterEach(() => {
  cleanup();
  setReducedMotion(false);
});

/**
 * jsdom does not implement matchMedia, which every motion-gated component
 * calls. Default to "no preference" so components render their animated
 * branch under test; individual tests override this to assert the
 * reduced-motion path.
 */
const listeners = new Set<(e: MediaQueryListEvent) => void>();

export function setReducedMotion(matches: boolean) {
  currentMatches = matches;
  for (const l of listeners) {
    l({ matches } as MediaQueryListEvent);
  }
}

let currentMatches = false;

vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return query.includes("prefers-reduced-motion") ? currentMatches : false;
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, l: (e: MediaQueryListEvent) => void) =>
      listeners.add(l),
    removeEventListener: (_: string, l: (e: MediaQueryListEvent) => void) =>
      listeners.delete(l),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);

import { describe, expect, it } from "vitest";
import { buildTwinkleLayers, pickSubset, seededRandom } from "./twinkle";

const items = Array.from({ length: 100 }, (_, i) => i);

describe("seededRandom", () => {
  it("produces the same stream for the same seed", () => {
    const a = seededRandom(42);
    const b = seededRandom(42);
    for (let i = 0; i < 20; i++) expect(a()).toBe(b());
  });

  it("produces a different stream for a different seed", () => {
    const a = seededRandom(1);
    const b = seededRandom(2);
    const sa = Array.from({ length: 20 }, a);
    const sb = Array.from({ length: 20 }, b);
    expect(sa).not.toEqual(sb);
  });

  it("stays within the unit interval", () => {
    const r = seededRandom(7);
    for (let i = 0; i < 500; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("pickSubset", () => {
  it("is deterministic for a given seed", () => {
    expect(pickSubset(items, 10, 5)).toEqual(pickSubset(items, 10, 5));
  });

  it("returns the requested count", () => {
    expect(pickSubset(items, 10, 5)).toHaveLength(10);
  });

  it("never repeats an item", () => {
    const picked = pickSubset(items, 40, 3);
    expect(new Set(picked).size).toBe(picked.length);
  });

  it("clamps to the pool size instead of looping forever", () => {
    const picked = pickSubset(items, 500, 3);
    expect(picked).toHaveLength(items.length);
    expect(new Set(picked).size).toBe(items.length);
  });

  it("does not mutate the input", () => {
    const before = [...items];
    pickSubset(items, 20, 9);
    expect(items).toEqual(before);
  });
});

describe("buildTwinkleLayers", () => {
  it("builds the requested number of layers", () => {
    const layers = buildTwinkleLayers(items, {
      layers: 4,
      fraction: 0.1,
      seed: 11,
    });
    expect(layers).toHaveLength(4);
    for (const l of layers) expect(l).toHaveLength(10);
  });

  it("gives each layer a different scatter, so the flicker is not a pattern", () => {
    const layers = buildTwinkleLayers(items, {
      layers: 3,
      fraction: 0.2,
      seed: 11,
    });
    expect(layers[0]).not.toEqual(layers[1]);
    expect(layers[1]).not.toEqual(layers[2]);
  });

  it("is stable across calls, so server and client render identically", () => {
    const o = { layers: 3, fraction: 0.15, seed: 2026 };
    expect(buildTwinkleLayers(items, o)).toEqual(buildTwinkleLayers(items, o));
  });

  it("always yields at least one dot per layer", () => {
    const layers = buildTwinkleLayers([1, 2, 3], {
      layers: 2,
      fraction: 0.01,
      seed: 1,
    });
    for (const l of layers) expect(l.length).toBeGreaterThanOrEqual(1);
  });
});

/**
 * Mulberry32. Small, fast, and deterministic across runs and platforms.
 *
 * Determinism matters here: the twinkle layers are computed during render
 * and must come out identical on the server and the client, or React
 * hydration reports a mismatch and the map flashes.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic subset without repeats, used to build a twinkle layer. */
export function pickSubset<T>(items: T[], count: number, seed: number): T[] {
  const rng = seededRandom(seed);
  const pool = [...items];
  const out: T[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
  }
  return out;
}

/**
 * Builds the twinkle layers.
 *
 * The reference implementation ships several sibling groups of faint
 * dots and cycles between them, which is what makes the coverage look
 * alive rather than printed. Each layer here is an independent random
 * subset, so cycling opacity across layers reads as scattered flicker
 * rather than a marching pattern.
 */
export function buildTwinkleLayers<T>(
  items: T[],
  opts: { layers: number; fraction: number; seed: number },
): T[][] {
  const count = Math.max(1, Math.round(items.length * opts.fraction));
  return Array.from({ length: opts.layers }, (_, i) =>
    pickSubset(items, count, opts.seed + i * 1013),
  );
}

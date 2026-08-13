import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { redactRegions } from "./redact-livery.mjs";

/** Left half: hard 1px vertical stripes. Right half: flat grey. */
async function makeStriped(path, w = 200, h = 100) {
  const raw = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      const v = x < w / 2 ? (x % 2 === 0 ? 0 : 255) : 128;
      raw[i] = raw[i + 1] = raw[i + 2] = v;
    }
  }
  await sharp(raw, { raw: { width: w, height: h, channels: 3 } })
    .png()
    .toFile(path);
}

async function readPixels(path) {
  const { data, info } = await sharp(path)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return {
    at: (x, y) => data[(y * info.width + x) * info.channels],
    info,
  };
}

describe("redactRegions", () => {
  it("destroys high-frequency detail inside the region", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");
    await makeStriped(src);

    await redactRegions(src, [{ x: 0, y: 0, w: 0.5, h: 1 }], out);

    const { at } = await readPixels(out);
    // Adjacent pixels started 255 apart. After the blur they must have
    // converged far enough that no letterform could survive.
    expect(Math.abs(at(40, 50) - at(41, 50))).toBeLessThan(12);
  });

  it("leaves everything outside the region untouched", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");
    await makeStriped(src);

    await redactRegions(src, [{ x: 0, y: 0, w: 0.4, h: 1 }], out);

    const { at } = await readPixels(out);
    expect(at(180, 50)).toBe(128);
  });

  it("preserves the image dimensions", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");
    await makeStriped(src);

    await redactRegions(src, [{ x: 0.1, y: 0.1, w: 0.2, h: 0.2 }], out);

    const { info } = await readPixels(out);
    expect([info.width, info.height]).toEqual([200, 100]);
  });

  it("handles a region flush against the image edge", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");
    await makeStriped(src);

    // Zero padding is available here, so the implementation must clamp
    // rather than ask sharp to extract outside the image.
    await expect(
      redactRegions(src, [{ x: 0, y: 0, w: 0.1, h: 0.1 }], out),
    ).resolves.toBeUndefined();
  });

  it("feathers the edge instead of leaving a hard rectangle", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");
    // Uniform noise everywhere, so any hard edge shows up as a step in
    // local variance rather than as a change in average brightness.
    const w = 400, h = 400;
    const raw = Buffer.alloc(w * h * 3);
    for (let i = 0; i < w * h; i++) {
      const v = (i * 2654435761) % 256;
      raw[i * 3] = raw[i * 3 + 1] = raw[i * 3 + 2] = v;
    }
    await sharp(raw, { raw: { width: w, height: h, channels: 3 } })
      .png()
      .toFile(src);

    await redactRegions(src, [{ x: 0.4, y: 0.4, w: 0.2, h: 0.2 }], out);

    const { at } = await readPixels(out);
    // Local variance sampled along a horizontal line crossing the left
    // boundary of the region, which sits at x = 160.
    const variance = (x) => {
      const vals = [at(x - 1, 200), at(x, 200), at(x + 1, 200)];
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      return vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length;
    };
    // A hard edge would put full-detail noise immediately beside fully
    // smoothed pixels. With a feather, variance decays gradually, so no
    // single step across the boundary dominates the whole transition.
    const outside = variance(120);
    const edge = variance(158);
    const inside = variance(200);

    expect(inside).toBeLessThan(outside);
    // The boundary sample must sit between the two extremes rather than
    // snapping straight from one to the other.
    expect(edge).toBeLessThan(outside);
    expect(edge).toBeGreaterThan(inside);
  });

  it("copies the file through untouched when there are no regions", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");
    await makeStriped(src);

    await redactRegions(src, [], out);

    const { at } = await readPixels(out);
    expect(Math.abs(at(40, 50) - at(41, 50))).toBe(255);
  });
});

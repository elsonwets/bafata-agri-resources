import { describe, expect, it } from "vitest";
import { ALT, IMAGES, fallbackSrc, srcSet, type ImageSlug } from "./images";

const slugs = Object.keys(IMAGES) as ImageSlug[];

describe("image data", () => {
  it("has hand-written alt text for every generated image", () => {
    for (const slug of slugs) {
      expect(ALT[slug], `missing alt for ${slug}`).toBeTruthy();
    }
  });

  it("writes alt text that describes rather than labels", () => {
    for (const slug of slugs) {
      // A bare label like "warehouse" helps nobody using a screen reader.
      expect(ALT[slug].length, `alt for ${slug} is too short`).toBeGreaterThan(
        40,
      );
      expect(ALT[slug]).not.toMatch(/^(image|photo|picture) of/i);
    }
  });

  it("builds an avif srcset with a width descriptor per entry", () => {
    const set = srcSet("crane-sling-lift", "avif");
    const entries = set.split(", ");
    expect(entries.length).toBe(IMAGES["crane-sling-lift"].avifWidths.length);
    for (const e of entries) expect(e).toMatch(/^\/images\/.+\.avif \d+w$/);
  });

  it("caps webp below avif, because the pipeline stops webp at 1600", () => {
    for (const slug of slugs) {
      const maxWebp = Math.max(...IMAGES[slug].webpWidths);
      expect(maxWebp).toBeLessThanOrEqual(1600);
      expect(Math.max(...IMAGES[slug].avifWidths)).toBeGreaterThanOrEqual(
        maxWebp,
      );
    }
  });

  it("falls back to a real webp rendition", () => {
    for (const slug of slugs) {
      expect(fallbackSrc(slug)).toMatch(/^\/images\/.+-\d+\.webp$/);
    }
  });
});

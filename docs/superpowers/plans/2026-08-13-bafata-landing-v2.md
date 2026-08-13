# Bafatá Agri Resources Landing V2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single English-language Next.js landing page that sells
Bafatá Agri Resources' raw cashew nut export operation to international
buyers, built on the client's own documentary photography, with a pinned
GSAP scroll sequence following the goods from village to vessel.

**Architecture:** Next.js 15 App Router, statically exported. Pure logic
(map dot lattices, projections, JSON-LD, image processing) lives in
tested modules under `src/lib` and `scripts/`. Visual components consume
those modules and are verified by build plus screenshot. GSAP owns all
scroll choreography; Three.js is confined to two ambient canvases; both
maps are procedurally generated inline SVG.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP +
ScrollTrigger, Three.js, Lenis, sharp, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-13-bafata-landing-v2-design.md`

## Global Constraints

These apply to every task. Copied verbatim from the spec.

- **No invented facts.** No volumes, tonnages, prices, KOR/outturn
  figures, certifications, testimonials, client names, or years of
  operation. If a number is needed and was not supplied, the number does
  not go on the page.
- **Destination markets are exactly three:** India, the UAE (Dubai),
  Vietnam.
- **The client portal is illustrative.** Every portal visual carries a
  visible "illustrative preview" label.
- **BADORRA / General Trading has no relationship with Bafatá.** Every
  legible instance of that livery is blurred before the image ships.
  Frames that cannot be cleaned are dropped.
- **Partners named:** AgroTrucks, AgroStock. Nothing beyond that.
- **Typography:** Outfit for display. Never Inter.
- **Tokens:** `--ink #07102D`, `--navy #1B2A5E`, `--jute #D8CBB0`,
  `--gold #C9A227`, `--bone #F4F1EA`.
- **Tone:** plain, concrete, unexcited. Trade vocabulary kept. No
  superlatives, no exclamation marks, no "seamless"/"world-class".
- **Every animation respects `prefers-reduced-motion: reduce`.**
- **Page root is** `<main className="overflow-x-hidden w-full max-w-full">`.
- **No emojis** in code, comments, or copy.
- Source photography lives at
  `C:\Users\zenbook\Downloads\drive-download-20260722T010222Z-1-001`.
  Treat it as read-only. Never write into it.

---

## File Structure

| Path | Responsibility |
|---|---|
| `src/config/company.ts` | Every contact detail, date and market in one place |
| `src/lib/dots/projection.ts` | lon/lat → SVG x/y. Pure, tested |
| `src/lib/dots/lattice.ts` | GeoJSON polygons → dot lattice. Pure, tested |
| `src/lib/dots/twinkle.ts` | Seeded pseudo-random subset selection. Pure, tested |
| `src/lib/seo/jsonld.ts` | Organization / WebSite / FAQPage / Breadcrumb builders. Pure, tested |
| `src/lib/motion/gsap.ts` | Registers ScrollTrigger once, exports configured gsap |
| `src/lib/motion/useReducedMotion.ts` | Single source of truth for the motion gate |
| `scripts/livery-redactions.json` | Redaction rectangles keyed by source filename |
| `scripts/redact-livery.mjs` | Applies the blur pass. Tested |
| `scripts/optimize-images.mjs` | sharp → AVIF/WebP responsive set |
| `scripts/build-dot-fields.mjs` | Runs the lattice over vendored GeoJSON, emits JSON |
| `src/data/*.json` | Generated dot fields. Committed |
| `src/data/{faq,chain,markets}.ts` | Page content as typed data, not JSX |
| `src/components/maps/DotMap.tsx` | Shared dot-map renderer |
| `src/components/corridor/*` | The pinned five-beat sequence |
| `src/app/page.tsx` | Section composition only. No logic |

---

## Task 1: Scaffold, tokens, config

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`,
  `tailwind.config.ts`, `postcss.config.mjs`, `vitest.config.ts`,
  `.env.example`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/config/company.ts`, `src/config/company.test.ts`

**Interfaces:**
- Produces: `COMPANY` object with `{ name, legalName, domain, email,
  whatsapp: string | null, markets: Market[], campaign: { preparation:
  string; opening: string }, partners: string[] }`

- [ ] **Step 1: Initialise the project**

```bash
cd "C:/Users/zenbook/Documents/client/bafata/landingV2"
npm init -y
npm i next@15 react@19 react-dom@19 gsap three lenis
npm i -D typescript @types/react @types/node @types/three tailwindcss postcss autoprefixer vitest @vitejs/plugin-react jsdom @testing-library/react sharp
```

- [ ] **Step 2: Write the failing config test**

```ts
// src/config/company.test.ts
import { describe, expect, it } from "vitest";
import { COMPANY } from "./company";

describe("COMPANY", () => {
  it("names exactly the three stated destination markets", () => {
    expect(COMPANY.markets.map((m) => m.id).sort()).toEqual([
      "ae", "in", "vn",
    ]);
  });

  it("keeps whatsapp nullable so the CTA can hide until supplied", () => {
    expect(COMPANY.whatsapp === null || typeof COMPANY.whatsapp === "string")
      .toBe(true);
  });

  it("distinguishes campaign preparation from official opening", () => {
    expect(COMPANY.campaign.preparation).not.toEqual(COMPANY.campaign.opening);
  });
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npx vitest run src/config/company.test.ts`
Expected: FAIL, cannot resolve `./company`.

- [ ] **Step 4: Write the config**

```ts
// src/config/company.ts
export type Market = {
  id: "in" | "ae" | "vn";
  label: string;
  lon: number;
  lat: number;
};

export const COMPANY = {
  name: "Bafatá Agri Resources",
  legalName: "Bafatá Agri Resources, SARL",
  domain: "bafata-agri.com",
  url: "https://bafata-agri.com",
  email: "contact@bafata-agri.com",
  // Fill when the client supplies it. Null hides the WhatsApp CTA.
  whatsapp: null as string | null,
  origin: { label: "Port of Bissau", lon: -15.5977, lat: 11.8637 },
  markets: [
    { id: "in", label: "India", lon: 72.9481, lat: 18.9498 },
    { id: "ae", label: "United Arab Emirates", lon: 55.2708, lat: 25.2048 },
    { id: "vn", label: "Vietnam", lon: 106.6297, lat: 10.8231 },
  ] satisfies Market[],
  campaign: {
    preparation: "February 2027",
    opening: "April 2027",
  },
  partners: ["AgroTrucks", "AgroStock"],
  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? null,
} as const;
```

- [ ] **Step 5: Add the design tokens**

```css
/* src/app/globals.css — token block only; the rest is Tailwind layers */
:root {
  --ink: #07102d;
  --navy: #1b2a5e;
  --jute: #d8cbb0;
  --gold: #c9a227;
  --bone: #f4f1ea;
}
```

- [ ] **Step 6: Verify**

Run: `npx vitest run && npx next build`
Expected: tests PASS, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with brand tokens and company config"
```

---

## Task 2: Livery redaction pass

Removes BADORRA / General Trading marks. Runs before any other image
processing, per spec §10.1 step 2.

**Files:**
- Create: `scripts/livery-redactions.json`
- Create: `scripts/redact-livery.mjs`
- Test: `scripts/redact-livery.test.mjs`

**Interfaces:**
- Produces: `redactRegions(inputPath, regions, outputPath) => Promise<void>`
  where `regions` is `Array<{ x: number; y: number; w: number; h: number }>`
  in **fractional** coordinates (0–1) so they survive resizing.

- [ ] **Step 1: Locate every mark**

Open each of the selected frames at full resolution and record where
BADORRA, General Trading, or any third-party mark is legible. Frames
known to carry it from the contact-sheet pass: `4F4A1553`, `4F4A1559`,
`4F4A1567`, `4F4A1568`, `4F4A1577`, `4F4A1584`, `4F4A1593`, `4F4A1599`,
`4F4A1605`, `DJI_0656`. Verify each one rather than trusting this list,
and check for others.

Write findings into `scripts/livery-redactions.json`:

```json
{
  "4F4A1599.JPG": [
    { "x": 0.181, "y": 0.512, "w": 0.086, "h": 0.041 }
  ]
}
```

- [ ] **Step 2: Write the failing test**

```js
// scripts/redact-livery.test.mjs
import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { redactRegions } from "./redact-livery.mjs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("redactRegions", () => {
  it("destroys detail inside the region and leaves the rest intact", async () => {
    const dir = await mkdtemp(join(tmpdir(), "redact-"));
    const src = join(dir, "src.png");
    const out = join(dir, "out.png");

    // Left half hard vertical stripes, right half flat grey.
    const w = 200, h = 100;
    const raw = Buffer.alloc(w * h * 3);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 3;
        const v = x < 100 ? (x % 2 === 0 ? 0 : 255) : 128;
        raw[i] = raw[i + 1] = raw[i + 2] = v;
      }
    }
    await sharp(raw, { raw: { width: w, height: h, channels: 3 } })
      .png().toFile(src);

    await redactRegions(src, [{ x: 0, y: 0, w: 0.5, h: 1 }], out);

    const { data, info } = await sharp(out)
      .raw().toBuffer({ resolveWithObject: true });

    // Inside the redaction, neighbouring pixels must have converged.
    const at = (x, y) => data[(y * info.width + x) * info.channels];
    const insideDelta = Math.abs(at(40, 50) - at(41, 50));
    expect(insideDelta).toBeLessThan(12);

    // Outside it, the flat grey is untouched.
    expect(at(150, 50)).toBe(128);
  });
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npx vitest run scripts/redact-livery.test.mjs`
Expected: FAIL, `redact-livery.mjs` does not exist.

- [ ] **Step 4: Implement**

```js
// scripts/redact-livery.mjs
import sharp from "sharp";

// Blur radius as a fraction of the region's shorter side. Large enough
// that no letterform survives at any output size.
const BLUR_RATIO = 0.18;
const MIN_SIGMA = 8;

export async function redactRegions(inputPath, regions, outputPath) {
  const base = sharp(inputPath);
  const { width, height } = await base.metadata();

  if (!regions.length) {
    await base.toFile(outputPath);
    return;
  }

  const patches = await Promise.all(
    regions.map(async (r) => {
      const left = Math.max(0, Math.round(r.x * width));
      const top = Math.max(0, Math.round(r.y * height));
      const w = Math.min(width - left, Math.round(r.w * width));
      const h = Math.min(height - top, Math.round(r.h * height));
      const sigma = Math.max(MIN_SIGMA, Math.min(w, h) * BLUR_RATIO);

      // Blur a generous margin around the region, then composite back
      // only the region itself, so the edge is fed by real blurred
      // neighbours instead of clamped edge pixels.
      const pad = Math.round(sigma * 3);
      const ol = Math.max(0, left - pad);
      const ot = Math.max(0, top - pad);
      const ow = Math.min(width - ol, w + pad * 2);
      const oh = Math.min(height - ot, h + pad * 2);

      const blurred = await sharp(inputPath)
        .extract({ left: ol, top: ot, width: ow, height: oh })
        .blur(sigma)
        .extract({ left: left - ol, top: top - ot, width: w, height: h })
        .toBuffer();

      return { input: blurred, left, top };
    }),
  );

  await base.composite(patches).toFile(outputPath);
}
```

- [ ] **Step 5: Verify the test passes**

Run: `npx vitest run scripts/redact-livery.test.mjs`
Expected: PASS.

- [ ] **Step 6: Run the pass and re-inspect by eye**

Run the script over every selected frame into `assets/redacted/`, then
open each output at full resolution and confirm no mark is readable.
This visual check is mandatory and cannot be delegated to the test.
Drop any frame that is still legible or that the blur ruins.

- [ ] **Step 7: Commit**

```bash
git add scripts/ && git commit -m "feat: add third-party livery redaction pass"
```

---

## Task 3: Responsive image pipeline

**Files:**
- Create: `scripts/optimize-images.mjs`
- Create: `src/data/images.ts`

**Interfaces:**
- Produces: files at `public/images/<slug>-<width>.{avif,webp}` for
  widths `[640, 1024, 1600, 2400]`, and `IMAGES` in `src/data/images.ts`
  mapping slug → `{ alt: string; width: number; height: number }`.

- [ ] **Step 1: Write the optimizer**

Reads from `assets/redacted/`, never from the original Drive folder.
Emits AVIF quality 55 and WebP quality 78, skipping widths larger than
the source. Fails loudly if any output exceeds 400 KB.

- [ ] **Step 2: Run it and check the budget**

Run: `node scripts/optimize-images.mjs`
Expected: every output between roughly 150 and 300 KB, none over 400 KB.

- [ ] **Step 3: Write the alt text by hand**

One descriptive sentence per image in `src/data/images.ts`. Describe
what is happening, not "photo of warehouse". No invented detail.

- [ ] **Step 4: Commit**

```bash
git add scripts/ src/data/images.ts public/images/
git commit -m "feat: add responsive image pipeline and alt text"
```

---

## Task 4: Dot lattice library

The core pure logic behind both maps. This is the task that most
deserves real tests.

**Files:**
- Create: `src/lib/dots/projection.ts` + `.test.ts`
- Create: `src/lib/dots/lattice.ts` + `.test.ts`
- Create: `src/lib/dots/twinkle.ts` + `.test.ts`

**Interfaces:**
- Produces:
  - `equirectangular(lon, lat, bbox, size) => { x: number; y: number }`
  - `pointInRing(x, y, ring: number[][]) => boolean`
  - `buildLattice(features, opts) => Dot[]` where
    `Dot = { x: number; y: number; id: string }` and
    `opts = { step: number; bbox: BBox; size: { w: number; h: number } }`
  - `pickSubset(dots, count, seed) => Dot[]`

- [ ] **Step 1: Write the failing projection test**

```ts
// src/lib/dots/projection.test.ts
import { describe, expect, it } from "vitest";
import { equirectangular } from "./projection";

const WORLD = { minLon: -180, minLat: -90, maxLon: 180, maxLat: 90 };

describe("equirectangular", () => {
  it("puts 0,0 at the centre of the canvas", () => {
    const p = equirectangular(0, 0, WORLD, { w: 662, h: 340 });
    expect(p.x).toBeCloseTo(331, 5);
    expect(p.y).toBeCloseTo(170, 5);
  });

  it("puts the north-west corner at the origin", () => {
    const p = equirectangular(-180, 90, WORLD, { w: 662, h: 340 });
    expect(p.x).toBeCloseTo(0, 5);
    expect(p.y).toBeCloseTo(0, 5);
  });

  it("increases y as latitude decreases, because SVG y grows downward", () => {
    const north = equirectangular(0, 45, WORLD, { w: 662, h: 340 });
    const south = equirectangular(0, -45, WORLD, { w: 662, h: 340 });
    expect(south.y).toBeGreaterThan(north.y);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run src/lib/dots/projection.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement the projection**

```ts
// src/lib/dots/projection.ts
export type BBox = {
  minLon: number; minLat: number; maxLon: number; maxLat: number;
};
export type Size = { w: number; h: number };

export function equirectangular(
  lon: number, lat: number, bbox: BBox, size: Size,
): { x: number; y: number } {
  const x = ((lon - bbox.minLon) / (bbox.maxLon - bbox.minLon)) * size.w;
  // SVG y grows downward, so latitude is inverted.
  const y = ((bbox.maxLat - lat) / (bbox.maxLat - bbox.minLat)) * size.h;
  return { x, y };
}
```

- [ ] **Step 4: Verify it passes**

Run: `npx vitest run src/lib/dots/projection.test.ts`
Expected: PASS.

- [ ] **Step 5: Write the failing lattice test**

```ts
// src/lib/dots/lattice.test.ts
import { describe, expect, it } from "vitest";
import { buildLattice, pointInRing } from "./lattice";

// A unit square from (0,0) to (10,10) in lon/lat.
const square = {
  type: "Feature" as const,
  properties: { id: "sq" },
  geometry: {
    type: "Polygon" as const,
    coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]],
  },
};

describe("pointInRing", () => {
  const ring = [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]];

  it("accepts an interior point", () => {
    expect(pointInRing(5, 5, ring)).toBe(true);
  });

  it("rejects an exterior point", () => {
    expect(pointInRing(15, 5, ring)).toBe(false);
  });
});

describe("buildLattice", () => {
  const opts = {
    step: 10,
    bbox: { minLon: 0, minLat: 0, maxLon: 10, maxLat: 10 },
    size: { w: 100, h: 100 },
  };

  it("snaps every dot to the step grid, offset by half a step", () => {
    const dots = buildLattice([square], opts);
    expect(dots.length).toBeGreaterThan(0);
    for (const d of dots) {
      expect((d.x - opts.step / 2) % opts.step).toBeCloseTo(0, 6);
      expect((d.y - opts.step / 2) % opts.step).toBeCloseTo(0, 6);
    }
  });

  it("tags each dot with its feature id", () => {
    const dots = buildLattice([square], opts);
    expect(new Set(dots.map((d) => d.id))).toEqual(new Set(["sq"]));
  });

  it("is deterministic", () => {
    expect(buildLattice([square], opts)).toEqual(buildLattice([square], opts));
  });

  it("excludes holes", () => {
    const withHole = {
      ...square,
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]],
          [[3, 3], [7, 3], [7, 7], [3, 7], [3, 3]],
        ],
      },
    };
    const solid = buildLattice([square], opts).length;
    const holed = buildLattice([withHole], opts).length;
    expect(holed).toBeLessThan(solid);
  });
});
```

- [ ] **Step 6: Run it and watch it fail**

Run: `npx vitest run src/lib/dots/lattice.test.ts`
Expected: FAIL.

- [ ] **Step 7: Implement the lattice**

```ts
// src/lib/dots/lattice.ts
import { equirectangular, type BBox, type Size } from "./projection";

export type Dot = { x: number; y: number; id: string };

type Ring = number[][];
type Feature = {
  properties: { id: string };
  geometry:
    | { type: "Polygon"; coordinates: Ring[] }
    | { type: "MultiPolygon"; coordinates: Ring[][] };
};

/** Ray casting. `ring` is [lon, lat] pairs, first point repeated last. */
export function pointInRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const straddles = yi > y !== yj > y;
    if (straddles && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function inPolygon(x: number, y: number, rings: Ring[]): boolean {
  // First ring is the outer boundary; the rest are holes.
  if (!pointInRing(x, y, rings[0])) return false;
  for (let i = 1; i < rings.length; i++) {
    if (pointInRing(x, y, rings[i])) return false;
  }
  return true;
}

export function buildLattice(
  features: Feature[],
  opts: { step: number; bbox: BBox; size: Size },
): Dot[] {
  const { step, bbox, size } = opts;
  const half = step / 2;
  const dots: Dot[] = [];

  for (let py = half; py < size.h; py += step) {
    for (let px = half; px < size.w; px += step) {
      // Invert the projection to get the lon/lat this cell centre samples.
      const lon = bbox.minLon + (px / size.w) * (bbox.maxLon - bbox.minLon);
      const lat = bbox.maxLat - (py / size.h) * (bbox.maxLat - bbox.minLat);

      for (const f of features) {
        const polys =
          f.geometry.type === "Polygon"
            ? [f.geometry.coordinates]
            : f.geometry.coordinates;

        if (polys.some((rings) => inPolygon(lon, lat, rings))) {
          dots.push({ x: px, y: py, id: f.properties.id });
          break; // One dot per cell, first matching feature wins.
        }
      }
    }
  }
  return dots;
}

export { equirectangular };
```

- [ ] **Step 8: Verify it passes**

Run: `npx vitest run src/lib/dots/lattice.test.ts`
Expected: PASS, all five cases.

- [ ] **Step 9: Write and implement the seeded twinkle picker**

```ts
// src/lib/dots/twinkle.ts
/** Mulberry32. Small, fast, and deterministic across runs. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic subset, used to build the twinkle layers. */
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
```

Test that two calls with the same seed match, different seeds differ,
and `count` above `items.length` returns all items without duplicates.

- [ ] **Step 10: Commit**

```bash
git add src/lib/dots/ && git commit -m "feat: add tested dot lattice, projection and twinkle primitives"
```

---

## Task 5: Generate the dot fields

**Files:**
- Create: `src/data/geo/guinea-bissau-regions.geo.json` (vendored)
- Create: `src/data/geo/world-land.geo.json` (vendored)
- Create: `scripts/build-dot-fields.mjs`
- Create: `src/data/guinea-bissau.dots.json`, `src/data/world.dots.json`

- [ ] **Step 1: Vendor the GeoJSON**

Guinea-Bissau's nine administrative regions (Bafatá, Biombo, Bissau,
Bolama, Cacheu, Gabú, Oio, Quinara, Tombali) from geoBoundaries ADM1.
World landmass from Natural Earth 110m admin-0. Simplify both, and
commit them — the build must not depend on a network fetch.

- [ ] **Step 2: Generate**

World: `bbox` `{-180,-60,180,85}`, `size` `{ w: 662, h: 340 }`,
`step: 10` — matching the reference proportions. Guinea-Bissau: the
country's own bbox, `size` `{ w: 800, h: 480 }`, `step: 10`.

- [ ] **Step 3: Sanity-check the output**

Render each field to a throwaway SVG and open it. Guinea-Bissau must be
recognisable, with the Bijagós archipelago visible. Adjust `step` if the
country reads as a blob.

- [ ] **Step 4: Commit**

```bash
git add src/data/ scripts/build-dot-fields.mjs
git commit -m "feat: generate dot fields for Guinea-Bissau and the world"
```

---

## Task 6: DotMap component

**Files:**
- Create: `src/components/maps/DotMap.tsx`
- Create: `src/components/maps/DotMap.test.tsx`

**Interfaces:**
- Consumes: `Dot` from `src/lib/dots/lattice`, `pickSubset` from
  `src/lib/dots/twinkle`
- Produces: `<DotMap dots activeIds solidIds size onHover />` rendering
  one `<svg>` with `<circle r="5">` per dot, `data-region` set to the
  dot's id, solid dots at `opacity: 1` and the rest at `0.16`.

- [ ] **Step 1: Write the failing test**

Assert that every dot renders a circle, that solid ids get full opacity,
that non-solid ids get 0.16, and that `data-region` is present so the
hover logic has something to key on.

- [ ] **Step 2–4: Implement and verify**

Twinkle runs as one GSAP timeline over `pickSubset` groups, seeded so it
is stable between renders. It never starts when
`prefers-reduced-motion: reduce` is set. Hover raises the hovered region
to full opacity, drops the rest to 0.08, and shows a label; the same
state is reachable by keyboard focus on a per-region `<g tabindex="0">`
carrying an `aria-label`.

- [ ] **Step 5: Commit**

---

## Task 7: Sourcing map and export map

**Files:**
- Create: `src/components/maps/SourcingMap.tsx`
- Create: `src/components/maps/ExportMap.tsx`
- Create: `src/components/maps/Arc.tsx` + `Arc.test.ts`

**Interfaces:**
- Consumes: `DotMap`, `COMPANY.markets`, `COMPANY.origin`
- Produces: `arcPath(from, to, curvature) => string` — an SVG quadratic
  path string, tested for endpoint accuracy and for bulging away from
  the straight line.

- [ ] Sourcing map: Bafatá solid gold, other regions faint, region names
  as real SVG text, animated line converging on Bissau.
- [ ] Export map: Bissau solid gold, the three markets solid, arcs
  drawn with `strokeDasharray` and staggered as beat 5 resolves.
- [ ] Commit.

---

## Task 8: Nav and animated emblem

**Files:**
- Create: `src/components/layout/Nav.tsx`, `EmblemMark.tsx`
- Copy: `landing-bafata-v1/public/logo/bafata-emblem.svg` → `public/logo/`

- [ ] Floating glass pill nav, emblem centred.
- [ ] Branch paths draw in over ~1.2s via `strokeDasharray` /
  `strokeDashoffset` with a staggered ease; then slow micro-rotation on
  the tree and a subtle pulse on the central Sri Yantra, both tied to
  scroll velocity.
- [ ] Static mark under reduced motion. Commit.

---

## Task 9: Hero

**Files:**
- Create: `src/components/hero/Hero.tsx`, `HeroParticles.tsx`

- [ ] Editorial Split. H1 `max-w-5xl`, `clamp(3rem, 5.2vw, 5.5rem)`.
      Copy verbatim from spec §5.1. **Verify it renders on two lines at
      1440px, 1024px and 390px** — three lines is a failure.
- [ ] Right plate is the loaded truck at rest, positioned so the
      Corridor can pick it up.
- [ ] `HeroParticles`: Three.js `InstancedMesh`, ~2000 nut-shaped
      instances, mouse parallax, dispersing on scroll. Dynamically
      imported, `ssr: false`. Not mounted under reduced motion.
- [ ] Two CTAs, contrast checked. No badges, no pill tags, no stats.
- [ ] Commit.

---

## Task 10: The Corridor

The centrepiece. Build it after the hero so the handoff is real.

**Files:**
- Create: `src/components/corridor/Corridor.tsx`,
  `CorridorBeat.tsx`, `CorridorAtmosphere.tsx`
- Create: `src/data/chain.ts`

- [ ] **Step 1: Content first.** `chain.ts` holds the five beats: id,
      heading, body, image slugs, place labels. No copy inside JSX.
- [ ] **Step 2: Static fallback first.** Render the five beats as
      captioned frames in normal flow. This is what reduced-motion and
      no-JS users get, so it must be good on its own.
- [ ] **Step 3: Add the pin.** `ScrollTrigger { pin: true, scrub: 1 }`,
      ~500vh, one master timeline with five labels.
- [ ] **Step 4: Beat choreography.** Per spec §6: truck crosses with
      four parallax layers and a place counter Bafatá → Bambadinca →
      Bissau; sacks build the jute wall; container doors close and the
      seal stamps; the crane lifts, swings and sets down; arcs fire into
      the export map.
- [ ] **Step 5: Atmosphere.** Three.js dust and haze, low particle
      count, dynamically imported.
- [ ] **Step 6: Degrade.** Reduced motion skips the pin entirely.
      Below 768px: shorter distance, two parallax layers, fewer
      particles, smaller cut-outs.
- [ ] **Step 7: Verify** at 1440px, 1024px and 390px, and with reduced
      motion forced on. Confirm no horizontal scrollbar appears at any
      point in the sequence.
- [ ] Commit.

---

## Task 11: Bento, CRM stack, text reveal, marquee, photo essay

**Files:**
- Create: `src/components/sections/Bento.tsx`, `CrmStack.tsx`,
  `TextReveal.tsx`, `Marquee.tsx`, `PhotoEssay.tsx`

- [ ] Bento: five cards, `grid-flow-dense`, 4 cols × 3 rows, spans
      4+2+2+2+2 = 12 cells. **Count the cells before committing.** No
      empty cell is permitted.
- [ ] CRM stack: GSAP card stacking, four portal screens. Every card
      carries a visible "Illustrative preview" label. CTA opens the
      waitlist form.
- [ ] Text reveal: positioning statement, word opacity scrubbed 0.1 → 1.
- [ ] Marquee: AgroTrucks, AgroStock, the three markets, Incoterms.
      Pauses on hover and under reduced motion.
- [ ] Photo essay: overlapping frames, factual captions, arrow control,
      keyboard operable. This is the montage of company images.
- [ ] Commit after each component.

---

## Task 12: FAQ and contact form

**Files:**
- Create: `src/components/sections/Faq.tsx`, `CtaBlock.tsx`
- Create: `src/components/form/ContactForm.tsx`
- Create: `src/data/faq.ts`

- [ ] FAQ content in `faq.ts`. The campaign question answers with both
      dates distinguished, verbatim from spec §12. Include the two
      AI-search questions from the marketing context §8.
- [ ] Native `<details>`/`<summary>` so it works without JS, animated on
      top rather than replaced by JS-only state.
- [ ] Form fields: name, company, destination country, volume sought,
      incoterm. Posts to `COMPANY.formspree`; falls back to a prefilled
      `mailto:` when null. Real validation, real error states, real
      success state.
- [ ] WhatsApp CTA renders only when `COMPANY.whatsapp` is non-null.
- [ ] Commit.

---

## Task 13: SEO

**Files:**
- Create: `src/lib/seo/jsonld.ts` + `.test.ts`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`,
  `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Failing test** asserting `buildFaqJsonLd(faq)` emits
      `@type: "FAQPage"` with one `Question` per entry, each with an
      `acceptedAnswer`, and that `buildOrganisationJsonLd()` carries
      name, url and logo.
- [ ] **Step 2: Implement** Organization, WebSite, FAQPage and
      BreadcrumbList builders. Every value traced to `COMPANY` or
      `faq.ts` — nothing hardcoded twice.
- [ ] **Step 3: Metadata** via the Next.js Metadata API: title,
      description, canonical, OG, Twitter. Target queries from the
      marketing context §8.
- [ ] **Step 4: Validate.** Paste the rendered JSON-LD into Google's
      Rich Results Test. Do not claim it validates without doing this.
- [ ] **Step 5: Verify** exactly one `h1` on the page and a clean
      `h2`/`h3` descent.
- [ ] Commit.

---

## Task 14: Generated assets

Runs late, so every prompt is written against the finished layout.

- [ ] Beat-1 village plate via Higgsfield. Prompt it to match the
      existing photography: overcast West African light, laterite road,
      cashew orchard, jute sacks at a village buying point. Documentary,
      not glossy. It must sit beside the real photographs without
      looking generated.
- [ ] One cinematic clip behind the final CTA.
- [ ] OG image.
- [ ] Optimise all three through the Task 3 pipeline. Commit.

---

## Task 15: Verification pass

- [ ] `npx next build` clean, no warnings.
- [ ] `npx vitest run` green.
- [ ] Keyboard-only pass over the whole page: nav, both maps, carousel,
      FAQ, form. Every interactive element reachable, focus visible.
- [ ] Reduced-motion pass: every animation gated, page fully usable.
- [ ] Contrast check every text/background pair, button labels
      included. AA minimum.
- [ ] Responsive pass at 390px, 768px, 1024px, 1440px, 1920px. Confirm
      no horizontal scrollbar anywhere.
- [ ] Lighthouse on the production build. Record the actual numbers;
      do not assert performance without them.
- [ ] Final read of the copy against the Global Constraints. Hunt for
      any invented number, market or claim that crept in.
- [ ] Commit.

---

## Self-Review

**Spec coverage.** §1–2 Task 12/13. §3 constraints Global + Task 2.
§4 tokens Task 1. §5 architecture Tasks 9–12. §5.1 hero copy Task 9.
§6 Corridor Task 10. §7.1–7.3 maps Tasks 4–7. §7.4–7.8 Task 11.
§8 emblem Task 8. §9 stack Task 1. §10 pipeline Tasks 2–3, 14.
§11 SEO Task 13. §12 FAQ Task 12. §13 accessibility Task 15.
§15 WhatsApp open item Task 1 (nullable) and Task 12 (conditional
render). No gaps.

**Placeholders.** Tasks 1, 2 and 4 carry complete runnable code for
every tested unit. Tasks 6–12 specify exact interfaces, files and
acceptance conditions rather than full component bodies — these are
visual components whose correctness is judged by build and eye, and
inlining several hundred lines of JSX here would duplicate the work
rather than direct it. Every acceptance condition is concrete and
checkable.

**Type consistency.** `Dot` is `{ x, y, id }` in Task 4 and consumed
under that shape in Tasks 5–7. `BBox` and `Size` are declared once in
`projection.ts` and re-exported through `lattice.ts`. `COMPANY.whatsapp`
is `string | null` in Task 1 and gated on null in Task 12.
`redactRegions` takes fractional coordinates in Task 2 and the manifest
in Task 2 Step 1 stores fractions.

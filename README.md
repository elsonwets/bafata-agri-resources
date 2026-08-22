# Bafata Agri Resources, SARL

Marketing site for a raw cashew nut (RCN) exporter based in Bissau,
Guinea-Bissau. Built to turn an international buyer's first visit into a
WhatsApp conversation about the next campaign.

**Stack** — Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP
ScrollTrigger · Lenis · Three.js · Framer Motion · deployed on Netlify.

---

## Quick start

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run build:map` | Regenerates the world and Guinea-Bissau map data |

---

## Where to change things

Almost everything the client will want to edit lives in three files. **You
should not need to touch a component to change copy, contact details or
specifications.**

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Company facts, phone number, WhatsApp links, campaign year, nav |
| `src/data/content.ts` | Every headline, paragraph, table row and FAQ answer |
| `src/data/photos.ts` | The photo manifest (auto-generated — see below) |

### Phone number and WhatsApp

Change `site.phone` and `site.whatsapp` in `src/data/site.ts`. Every button on
the page, and the pre-filled message each one sends, is derived from there.

### The 2027 campaign

`site.campaign` drives the hero meta row, the CTA section, the footer badge
and one of the FAQ answers. Change the year and month in one place.

### Specifications (KOR, moisture, nut count)

`quality.table.rows` and `origin.stats` in `src/data/content.ts`.

> ⚠️ **Confirm these figures before going live.** They are written as typical
> ranges for Guinea-Bissau origin, not as contractual guarantees, and the page
> says so — but they should still match what the business actually delivers.

---

## The brand mark

`public/brand/logo-mark.svg` is a vector reconstruction of the company's
embossed navy seal — tree of life, laurel wreath, arc of stars, Sri Yantra
medallion with sun rays, and cashew apples in the crown.

It is generated procedurally so it can be regenerated deterministically, and
it is authored as **filled paths only** so Three.js can extrude it into real
geometry for the hero.

### Replacing it with the original artwork

Drop the client's own file in as `public/brand/logo-mark.svg`. For the 3D hero
to keep working, the SVG needs:

1. **Filled paths only** — no `stroke`-based artwork (`SVGLoader` extrudes
   fills). Run it through "outline stroke" in Illustrator or Figma first.
2. **Group ids** matching the ones the scene styles per-material:
   `wreath`, `stars`, `canopy`, `tree`, `rays`, `fruit`, `yantra`.
   Anything in an unrecognised group falls back to the `tree` material.
3. `fill-rule="evenodd"` if the mark has knockouts (the yantra does).

If the artwork is raster-only (PNG/JPG), the 3D hero cannot use it — swap
`LogoTree3D` for a static `<Image>` in `src/components/sections/Hero.tsx`, or
have the mark vectorised first.

`src/components/brand/Glyph.tsx` is a separate, reduced mark used in the
header and footer, because the full seal turns to mud below about 48px.

---

## Photographs

All 49 images are the client's own campaign photography, converted to WebP at
two sizes (1800px and 700px) with base64 blur placeholders.

`src/data/photos.ts` is generated. Each entry carries a slug, a category
(`warehouse`, `logistics`, `weighbridge`, `port`, `vessel`, `team`, `bissau`)
and **bilingual captions** — `fr` and `en`. The English caption is the alt
text; the French one is already in place should the site gain a French
version.

To add photographs: drop the WebP derivatives in `public/photos/` and add
matching entries to `src/data/photos.ts`.

---

## Maps

Two generated datasets, both baked at build time so no geo library ships to
the browser:

- **`public/map/world-dots.svg`** + `src/data/map-points.ts` — the dotted
  world basemap and the projected shipping destinations.
- **`src/data/guinea-bissau.ts`** — the nine administrative regions of
  Guinea-Bissau as SVG paths, from `scripts/data/gnb-adm1.geojson`.

Regenerate both with `npm run build:map`.

Boundary data is **geoBoundaries / OpenStreetMap, ODbL v1.0**. The attribution
rendered under the map on the site is a licence requirement — do not remove it.

---

## Motion

- **Lenis** drives the scroll and **GSAP's ticker drives Lenis**, so pinned
  sections stay in lockstep with the smoothed position.
- Two sections pin: `Journey` (horizontal track) and `QualityWall`. Both drop
  the pin below their breakpoint in favour of native scrolling — pinning
  content that does not fit a small viewport only hides it.
- Every animation respects `prefers-reduced-motion`; the page must read as a
  finished document with motion disabled.
- The forest background is a single fullscreen fragment shader — one draw
  call, paused when the tab is hidden.

---

## Deployment (Netlify)

`netlify.toml` is committed with the build command, the Next.js runtime plugin
and cache headers.

1. Connect the repository in Netlify — it detects Next.js automatically.
2. Set **`NEXT_PUBLIC_SITE_URL`** (or update `site.url` in
   `src/data/site.ts`) to the production domain, so canonical URLs, Open
   Graph tags and the sitemap point at the real host.
3. Deploy.

---

## Licence

Site code © Bafata Agri Resources, SARL. Boundary data ODbL (see above).

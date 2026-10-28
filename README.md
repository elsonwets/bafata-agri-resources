# Bafata Agri Resources, SARL

Marketing site for a raw cashew nut (RCN) exporter based in Bissau,
Guinea-Bissau. Built to turn an international buyer's first visit into a
WhatsApp conversation about the next campaign.

**Stack** — TanStack Start (Vite, React 19) · TypeScript · Tailwind CSS v4 ·
deployed on Netlify. The page is prerendered to static HTML at build time and
ships no animation, 3D or smooth-scroll library.

---

## Quick start

The project uses **pnpm** only — do not add a `package-lock.json`.

```bash
pnpm install
pnpm dev
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server on http://localhost:3000 |
| `pnpm build` | Production build, prerenders `/` to `dist/client/index.html` |
| `pnpm start` | Serves the production build locally |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm build:map` | Regenerates the world and Guinea-Bissau map data |

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

It is used as-is in the header and footer and as the favicon. To replace it,
drop the client's own file in as `public/brand/logo-mark.svg`.

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
  At build time `scripts/site-files.ts` turns them into
  `/map/guinea-bissau.svg`, which the page loads as an image — the path data
  never reaches the browser's JavaScript.

Regenerate both with `pnpm build:map`.

Boundary data is **geoBoundaries / OpenStreetMap, ODbL v1.0**. The attribution
rendered under the map on the site is a licence requirement — do not remove it.

---

## SEO and AI answer engines

The page is written so search engines and AI assistants (ChatGPT, Perplexity,
Google AI Overviews, Claude) can identify the company and quote it:

- **Headings carry the search intent** ("Raw cashew nut sourcing in
  Guinea-Bissau", "How to buy raw cashew nuts from Guinea-Bissau"), and the
  hero opens with an entity sentence: who the company is, what it does, where.
- **"At a glance" block** (`src/components/sections/Facts.tsx`) — the company's
  facts in one table, derived from the data files.
- **FAQ** written as the questions buyers and assistants ask, mirrored in
  `FAQPage` JSON-LD.
- **JSON-LD graph** in `src/data/schema.ts`: Organization + LocalBusiness
  (with contact point and product specification), WebSite, WebPage
  (`dateModified`), HowTo and FAQPage. Everything is derived from
  `src/data/`, so it never claims what the page doesn't.
- **`/llms.txt`** — a plain-text company brief with links for AI assistants,
  generated at build time from the same data (`scripts/site-files.ts`).
- **`robots.txt`** explicitly welcomes AI crawlers; `sitemap.xml` lists the
  page, its photos and `lastmod`.
- **`og-image.jpg`** (1200×630 JPEG) for link previews in WhatsApp, LinkedIn
  and email.

When content changes, bump `site.updated` in `src/data/site.ts` and the
`<lastmod>` in `public/sitemap.xml`. Add each official profile (LinkedIn,
Google Business Profile, directory listings) to `site.sameAs`.

---

## Design and motion

- Light, mineral palette defined as tokens at the top of `src/styles.css`:
  limestone canvas, white surfaces, the logo's navy for every action and the
  brown of a raw cashew shell for crop figures.
- One typeface, Hanken Grotesk (self-hosted via Fontsource).
- One orchestrated motion: the hero photograph opens from an inset rounded
  frame to full width as you scroll — a CSS scroll-driven animation, no
  JavaScript. Browsers without support show the framed photo.
- The Journey section keeps its photo pinned (CSS `position: sticky`) and
  swaps it as each stage scrolls past (one `IntersectionObserver`).
- Everything respects `prefers-reduced-motion`.

---

## Deployment (Netlify)

`netlify.toml` is committed with the build command and cache headers;
`@netlify/vite-plugin-tanstack-start` configures the build output.

1. Connect the repository in Netlify.
2. The production domain is `bafata-agri.com`; if it changes, update `site.url` in `src/data/site.ts` (and `public/robots.txt`,
   `public/sitemap.xml`) to the production domain, so canonical URLs and Open
   Graph tags point at the real host.
3. Deploy.

---

## Licence

Site code © Bafata Agri Resources, SARL. Boundary data ODbL (see above).

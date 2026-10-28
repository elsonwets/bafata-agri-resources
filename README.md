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
| `src/data/site.ts` | Company facts, phone, email, campaign dates, Incoterms, regions |
| `src/i18n/en.ts` | Every English headline, paragraph, table row and FAQ answer (the reference) |
| `src/i18n/fr.ts`, `src/i18n/pt.ts` | The French and Portuguese versions — same shape, enforced by TypeScript |
| `src/data/guides.ts` | The three English buyer guides |
| `src/data/photos.ts` | The photo manifest (auto-generated — see below); Portuguese alt text in `src/i18n/photo-alt-pt.ts` |

### Languages

The home page exists at `/` (English), `/fr/` and `/pt/`, with `hreflang`
links between them. Change a text in all three dictionaries. The French and
Portuguese copy should be reviewed by a native speaker before it is relied on.

### Buyer guides

`/raw-cashew-nuts-guinea-bissau/`, `/cashew-export-documentation/` and
`/buy-raw-cashew-nuts/` are rendered from `src/data/guides.ts` by
`src/components/GuidePage.tsx`. To add one: add an entry, create
`src/routes/<slug>/index.tsx` like the others, and add the path to
`prerender.pages` in `vite.config.ts`.

### Phone number and WhatsApp

Change `site.phone` and `site.whatsapp` in `src/data/site.ts`. Every button on
the page, and the pre-filled message each one sends, is derived from there.

### The 2027 campaign

`site.campaign` holds the year and dates; the month names are in each
dictionary (`campaign.prep`, `campaign.opening`).

### Specifications (KOR, moisture, nut count)

`quality.table.rows` and `origin.stats` in each dictionary. They were
confirmed by the client; any change must come from the client too.

---

## The brand mark

The client's logo, cut out of their artwork onto a transparent background:

- `public/brand/logo-mark-96.webp` — the emblem, header size
- `public/brand/logo-mark.webp` / `logo-mark.png` — the emblem, full size (the PNG is the logo in structured data)
- `public/brand/logo-lockup.webp` — emblem with the company name, footer
- `public/favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `site.webmanifest` — site icons

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
- **`robots.txt`** explicitly welcomes AI crawlers; **`sitemap.xml`** is
  generated at build time with every page and its `hreflang` alternates.
- **`og-image.jpg`** (1200×630 JPEG) for link previews in WhatsApp, LinkedIn
  and email.

When content changes, bump `site.updated` in `src/data/site.ts` — it feeds
the sitemap, structured data and the guides' "Updated" date. Add each official profile (LinkedIn,
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

The site is fully prerendered, so it deploys as **plain static files** from
`dist/client` — no server function. Unknown URLs get `public/404.html`.

```bash
pnpm build
npx netlify-cli deploy --no-build --dir dist/client          # preview URL
npx netlify-cli deploy --no-build --dir dist/client --prod   # bafata-agri.com
```

`--no-build` matters: the Netlify site still has the Next.js runtime plugin
enabled in its UI settings from the previous site, and a Netlify-side build
tries to install it. For Git-triggered builds, remove that plugin in
Site configuration → Build & deploy, set the production branch to the one
holding this code, and keep `netlify.toml` (pnpm build, publish
`dist/client`).

---

## Licence

Site code © Bafata Agri Resources, SARL. Boundary data ODbL (see above).

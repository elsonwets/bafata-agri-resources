# Bafatá Agri Resources — Landing V2

Design spec. Written 2026-08-13.

## 1. Purpose

A single English-language landing page that convinces international raw
cashew nut (RCN) buyers to open a conversation with Bafatá Agri
Resources, SARL before the 2027 campaign, and that shows the physical
chain the company actually operates: buying in Guinea-Bissau villages,
grading, warehousing, truck haulage, container stuffing, and vessel
loading at the port of Bissau for export to India, the UAE and Vietnam.

Primary conversion: start a commercial conversation.
Secondary conversion: request access to the client portal waitlist.

## 2. Audience

International RCN buyers, importers and trading houses preparing a
sourcing campaign in West Africa. Secondary: local collectors,
producers and logistics partners.

## 3. Non-negotiable content constraints

Carried over from `landing-bafata-v1/PRODUCT.md` and reaffirmed here.

- No invented volumes, tonnages, prices, KOR/outturn figures,
  certifications, testimonials, client names, or years of operation.
- Destination markets are limited to India, the UAE (Dubai) and Vietnam
  — the three the client stated.
- The client portal is illustrative until real interfaces are supplied.
  Every portal visual carries a visible "illustrative preview" label.
- The trucks photographed in the asset set carry BADORRA / General
  Trading livery. The page makes no claim about fleet ownership, and
  cut-out framing avoids presenting third-party branding as Bafatá's.
- Partners named: AgroTrucks, AgroStock. Nothing beyond that.

## 4. Brand and art direction

| Token | Value | Source |
|---|---|---|
| `--ink` | `#07102D` | logo navy, darkest |
| `--navy` | `#1B2A5E` | logo emblem blue |
| `--jute` | `#D8CBB0` | the sacks in the photographs |
| `--gold` | `#C9A227` | accent, CTA fill |
| `--bone` | `#F4F1EA` | light surfaces |

Display typeface: **Outfit**. Body: a neutral grotesque. Never Inter.

Photography is processed to read as one system rather than a stock
library: `mix-blend-luminosity` over navy, `contrast-125`, controlled
warm grade. The documentary photographs are the backbone of the page;
generated imagery is the exception, not the rule.

### Art-direction lock (gpt-taste RNG, seed 1143 → 8001)

```
HERO       -> Editorial Split
TYPOGRAPHY -> Outfit
COMPONENTS -> Horizontal Accordion | Infinite Marquee | Feedback Carousel
GSAP       -> Card Stacking | Scrubbing Text Reveal
```

Two documented deviations, both required by constraints that outrank
the RNG:

1. **Feedback Carousel** keeps its architecture (overlapping portraits,
   minimal type, subtle arrows) but carries the real photo-essay with
   factual captions. Fabricated testimonials are forbidden by §3.
2. **Horizontal Accordion is dropped.** It was to carry the five chain
   links; the Corridor sequence (§6) does that far better, and keeping
   both would be redundant. This is a direct user instruction, which
   outranks the RNG.

## 5. Page architecture (AIDA)

1. **Nav** — floating glass pill, centred animated emblem.
2. **Attention** — Hero, Editorial Split.
3. **Interest** — gapless bento of the operation.
4. **Desire** — Corridor sequence, Guinea-Bissau map, CRM card stack,
   scrubbing text reveal, export globe, photo-essay carousel, marquee.
5. **Action** — full-bleed CTA, contact form, FAQ, footer.

Section rhythm: `py-32 md:py-48` between major sections.
Page root: `<main className="overflow-x-hidden w-full max-w-full">`.

## 6. The Corridor — centrepiece scroll sequence

One pinned section, `ScrollTrigger { pin: true, scrub: 1 }`, roughly
500vh of scroll distance, driving one master GSAP timeline with five
labelled beats. Built from alpha-channel cut-outs of the real
photographs moved in 2.5D, plus a Three.js overlay for dust and haze.
This is the United Carriers technique, applied to Bafatá's own chain.

| Beat | Scene | Plates |
|---|---|---|
| 1 | Village buying point, laterite road, cashew orchard | Higgsfield-generated — the one plate with no photographic source |
| 2 | Truck crosses the frame, four parallax landscape layers, laterite dust, place counter Bafatá → Bambadinca → Bissau | cut-out truck from `4F4A1553` / `4F4A1599` |
| 3 | Camera pushes into the warehouse; sacks fly in and build the jute wall; lot tags print on | `4F4A1515`, `4F4A1531`, `4F4A1534`, `DJI_0634` |
| 4 | Loading and sheeting; container doors close; seal number stamps | `4F4A1536`, `4F4A1538`, `DJI_0641` |
| 5 | Yellow crane lifts, swings, sets the load on the vessel; ship pulls out; export arcs fire | `4F4A1621`, `4F4A1628`, `4F4A1657`, `4F4A1672`, `DJI_0675` |

**Hero continuity.** The hero's right-hand plate is the same loaded
truck at rest. On first scroll it does not cross-fade out — it pulls
away and enters beat 2. Hero and Corridor read as one continuous shot.

**Handoff.** Beat 5's arcs resolve directly into the Three.js export
globe, so the Corridor and the globe are one narrative move.

**Degradation.**
- `prefers-reduced-motion: reduce` → the pin is not created; the
  sequence renders as five captioned static frames in normal flow.
- Below `768px` → shorter scroll distance, parallax layers reduced from
  four to two, particle count cut, cut-outs served at smaller widths.
- No JS → the five frames and their captions are in the HTML and
  readable.

## 7. Other set-pieces

**Guinea-Bissau map.** Inline SVG built from real GeoJSON of the nine
administrative regions. Bafatá emphasised. Hover reveals region name
and role in sourcing. Animated route line converging on the port of
Bissau. SVG rather than Three.js: crisper, keyboard-accessible, and the
region names are indexable text.

**CRM card stack.** GSAP card stacking of portal screens — stock, lots,
contracts, shipment milestones. Every card visibly labelled as an
illustrative preview. CTA opens the portal waitlist form.

**Scrubbing text reveal.** The positioning statement, word opacity
scrubbed `0.1 → 1`.

**Export globe.** Three.js sphere with great-circle arcs from Bissau to
India, the UAE and Vietnam. Only those three.

**Infinite marquee.** AgroTrucks, AgroStock, destination markets,
Incoterms.

**Photo-essay carousel.** The montage of company images: overlapping
frames, factual captions, arrow control.

**Bento grid.** Five cards, `grid-flow-dense`, 4 columns × 3 rows = 12
cells filled exactly by spans of 4+2+2+2+2. No empty cells.

## 8. Header logo animation

Source: the existing vector at
`landing-bafata-v1/public/logo/bafata-emblem.svg`.

On load, branch paths draw in via `strokeDasharray` / `strokeDashoffset`
over ~1.2s with a staggered ease. Once drawn, the tree holds a slow
continuous micro-rotation and the central Sri Yantra pulses subtly,
both tied to scroll velocity. Collapses to the static mark under
`prefers-reduced-motion`.

## 9. Stack

- **Next.js 15**, App Router, static export target.
- **GSAP** + ScrollTrigger for all scroll choreography.
- **Three.js** for the hero particle field, Corridor atmosphere layer,
  and export globe. Loaded dynamically, client-only.
- **Lenis** for smooth scroll, matching v1.
- **Tailwind** for layout; design tokens as CSS variables.
- Form posts to **Formspree** via `NEXT_PUBLIC_FORMSPREE_ENDPOINT`,
  falling back to `mailto:` when unset.
- All contact details centralised in `src/config/company.ts`.

## 10. Asset pipeline

Source: 60 JPGs, 3–7 MB each, in
`Downloads/drive-download-20260722T010222Z-1-001`. Unusable as shipped.

1. Select ~20 frames.
2. `sharp` → AVIF + WebP, widths 640/1024/1600/2400, target 150–300 KB.
3. Output to `public/images/`, served through `next/image`.
4. Cut-out plates for the Corridor produced via Higgsfield
   `remove_background`, stored as PNG with alpha.
5. Every image gets hand-written descriptive `alt` text.

**Higgsfield budget** (963 credits available): the beat-1 village
plate, background cut-out passes, one cinematic clip behind the final
CTA, and one OG image. Nothing that duplicates existing photography.

## 11. SEO

- Next.js Metadata API: title, description, canonical, OG, Twitter.
- JSON-LD: `Organization`, `WebSite`, `FAQPage`, `BreadcrumbList`.
- `sitemap.ts` and `robots.ts`.
- Single `h1`, clean `h2`/`h3` descent, semantic landmarks.
- Target queries: *raw cashew nut exporter Guinea-Bissau*, *RCN
  supplier Bissau*, *buy raw cashew nuts West Africa*, *RCN outturn
  Guinea-Bissau*, *cashew nut export Bissau port*.
- Core Web Vitals: hero image preloaded and `priority`; Three.js and
  GSAP dynamically imported so they stay off the critical path; CLS
  guarded by explicit media dimensions.

## 12. FAQ — campaign dates

The FAQ answers the campaign-start question with the distinction the
client approved, rather than a single date:

- **February 2027** — campaign preparation opens. Volume reservation,
  logistics planning, and contract and document framing begin.
- **April 2027** — the official Guinea-Bissau campaign opens and
  village-level buying starts, once the government sets the reference
  price.

Both dates are marked up in `FAQPage` JSON-LD.

## 13. Accessibility

Full keyboard operation, visible focus, `prefers-reduced-motion`
respected across every animation, AA contrast on all text including
button labels, and complete usability on mobile over a constrained
connection.

## 14. Out of scope

A real authenticated portal, a CMS, multi-language routing, and any
backend beyond the form endpoint.

## 15. Open item

The WhatsApp number is not yet supplied. It lives as a single constant
in `src/config/company.ts` and is filled when provided; until then the
WhatsApp CTA is not rendered.

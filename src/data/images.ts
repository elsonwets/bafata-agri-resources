import generated from "./images.generated.json";

export type ImageSlug = keyof typeof generated;

type ImageMeta = {
  width: number;
  height: number;
  aspect: number;
  avifWidths: number[];
  webpWidths: number[];
  source: string;
};

/**
 * Alt text is written by hand, one image at a time, describing what is
 * actually happening in the frame. No invented detail: nothing here
 * claims a tonnage, a destination or an owner that the photograph does
 * not show.
 */
export const ALT: Record<ImageSlug, string> = {
  "warehouse-sack-relay":
    "A line of workers passing a filled jute sack hand to hand inside the " +
    "warehouse, standing on loose cashew nuts, with stacked sacks rising " +
    "on every side.",
  "warehouse-jute-wall":
    "The inside of the warehouse, where jute sacks of raw cashew nuts are " +
    "stacked into a wall several metres high while a crew works across " +
    "the slope of the pile.",
  "warehouse-stacking":
    "Workers climbing the stacked sacks to build the pile higher, with " +
    "loose sacks and spilled nuts across the warehouse floor below.",
  "warehouse-truck-load":
    "Two workers carrying sacks on their heads onto a flatbed trailer " +
    "backed into the warehouse door.",
  "warehouse-sack-carry":
    "A worker carrying a filled jute sack on his shoulder past a stack " +
    "waiting to be loaded.",
  "truck-loaded-yard":
    "A loaded trailer in the yard, sheeted in blue tarpaulin and roped " +
    "down, with sacks stacked above the headboard.",
  "team-fleet":
    "The Bafata Agri Resources team gathered in front of the loaded " +
    "trucks, with the company's own consignment placards in the " +
    "windscreens.",
  "team-fleet-wide":
    "A wider view of the team in front of the fleet, trucks sheeted and " +
    "ready to run down to Bissau.",
  "truck-weighbridge":
    "A loaded articulated truck standing on the weighbridge, its trailer " +
    "sheeted end to end.",
  "truck-weighbridge-cab":
    "The cab of a loaded truck on the weighbridge, waiting for its ticket.",
  "truck-weighbridge-loaded":
    "A trailer under canvas on the weighbridge, loaded to the headboard.",
  "quay-trailer-unload":
    "A loaded trailer at the quay in Bissau being unloaded by hand, with " +
    "a cargo net laid out on the concrete ready for lifting.",
  "quay-cranes-wide":
    "The quay at Bissau seen wide, with a yellow harbour crane and a " +
    "mobile crane working alongside a vessel and sacks stacked on the " +
    "apron.",
  "crane-sling-lift":
    "The yellow harbour crane lifting a sling of jute sacks clear of the " +
    "quay against an open sky, with the vessel alongside.",
  "vessel-hold":
    "Looking down into the open hold of the vessel, its floor covered " +
    "with jute sacks as a crew works across them.",
  "quay-truck-line":
    "A line of loaded trucks waiting on the quay at Bissau beside the " +
    "harbour cranes and the vessel.",
  "director-fleet":
    "The director of Bafata Agri Resources standing on the quay in front " +
    "of the loaded fleet, with the ship's crane behind him.",
  "warehouse-door-aerial":
    "The warehouse door seen from above, with trucks drawn up and sacks " +
    "moving in and out.",
  "depot-warehouse-row":
    "The row of warehouses at the depot seen from the air, with the yard " +
    "and access road in front.",
  "quay-truck-alongside":
    "A loaded truck standing on the quay directly under the ship's side, " +
    "waiting its turn at the crane.",
  "director-waterfront":
    "The director of Bafata Agri Resources holding his son on the Bissau " +
    "waterfront, with the port and the estuary behind them.",
  "director-bissau-square":
    "The director standing in a public square in Bissau beneath a stone " +
    "monument, under a heavy overcast sky.",
  "director-street":
    "The director leaning against a pickup on a Bissau street lined with " +
    "colonial-era buildings.",
  "depot-aerial-wide":
    "The depot seen from the air: warehouses with blue roofs, a red " +
    "laterite yard, and the town beyond.",
  "depot-fleet-aerial":
    "An aerial view of the depot yard with a row of sheeted trailers " +
    "parked in line and a flatbed being loaded at the warehouse door.",
  "warehouse-door-truck":
    "A truck backed up to the open warehouse door with sacks visible in " +
    "the shade inside, seen from above.",
  "depot-yard-aerial":
    "The depot yard from above, with a sheeted trailer being roped down " +
    "and warehouse doors open along one side.",
  "depot-overview":
    "The full depot from the air, showing the warehouse rows, the yard " +
    "and the surrounding neighbourhood.",
  "quay-truck-vessel":
    "A sheeted trailer standing on the quay directly alongside the hull " +
    "of the vessel it will be loaded into.",
  "village-buying-point":
    "A village buying point under cashew trees: filled jute sacks standing " +
    "on red laterite beside a mechanical platform scale, with a heap of " +
    "loose raw cashew nuts in the foreground.",
};

/**
 * Images that were generated rather than photographed. Only the village
 * buying point qualifies: no frame in the client's set covers the start
 * of the chain. Kept as data so the page can label it if that is ever
 * required, and so the distinction is not lost in a comment.
 */
export const GENERATED_SLUGS: ImageSlug[] = ["village-buying-point"];

export const IMAGES = generated as Record<ImageSlug, ImageMeta>;

/**
 * Builds a srcset for one encoding. The pipeline caps WebP at 1600, so
 * the two lists differ and must not be assumed identical.
 */
export function srcSet(slug: ImageSlug, format: "avif" | "webp"): string {
  const widths =
    format === "avif" ? IMAGES[slug].avifWidths : IMAGES[slug].webpWidths;
  return widths.map((w) => `/images/${slug}-${w}.${format} ${w}w`).join(", ");
}

/** Smallest rendition, used as the plain `src` fallback. */
export function fallbackSrc(slug: ImageSlug): string {
  const widths = IMAGES[slug].webpWidths;
  const w = widths[widths.length - 1] ?? IMAGES[slug].avifWidths[0];
  return `/images/${slug}-${w}.webp`;
}

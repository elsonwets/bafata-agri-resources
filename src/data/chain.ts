import type { ImageSlug } from "./images";

/**
 * The five beats of the Corridor.
 *
 * Content lives here rather than inside JSX so the same source drives
 * the pinned sequence, the reduced-motion fallback and the no-JS markup.
 * Every claim describes something the photographs actually show.
 */
export type Beat = {
  id: string;
  /** Short label used by the progress rail. */
  step: string;
  heading: string;
  body: string;
  slug: ImageSlug;
  /** Place names that tick over during the road beat. */
  places?: string[];
};

export const CHAIN: Beat[] = [
  {
    id: "village",
    step: "Buying",
    heading: "We buy where the nuts are grown",
    body:
      "Purchasing happens at village level across the interior, lot by lot, " +
      "on the scale and in front of the grower. Nothing is bought sight " +
      "unseen from an intermediary.",
    slug: "village-buying-point",
    places: ["Bafatá", "Bambadinca", "Bissau"],
  },
  {
    id: "haul",
    step: "Haulage",
    heading: "Then it moves, sheeted and roped, to Bissau",
    body:
      "Loaded trailers run the corridor from the interior down to the " +
      "capital. Each load is sheeted and roped before it leaves the yard, " +
      "and weighed before it goes anywhere.",
    slug: "truck-weighbridge",
    places: ["Bafatá", "Bambadinca", "Bissau"],
  },
  {
    id: "warehouse",
    step: "Grading and storage",
    heading: "Graded, tagged and stacked under our own roof",
    body:
      "Lots are received, graded and stacked in the warehouse. The wall of " +
      "jute is the stock, and it is ours to account for until it ships.",
    slug: "warehouse-jute-wall",
  },
  {
    id: "stuffing",
    step: "Stuffing",
    heading: "Stuffed and sealed for the vessel",
    body:
      "Sacks are moved from the stack to the trailer and on to the quay, " +
      "counted at each handover.",
    slug: "quay-truck-line",
  },
  {
    id: "vessel",
    step: "Loading",
    heading: "And lifted into the hold at the port of Bissau",
    body:
      "The harbour crane takes the sling off the quay and sets it into the " +
      "hold. From there the cargo is on the water.",
    slug: "crane-sling-lift",
  },
];

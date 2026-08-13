/**
 * The nine administrative regions of Guinea-Bissau.
 *
 * `id` matches the shapeName in the vendored geoBoundaries file, which
 * is what the dot field is keyed by. The notes describe geography and
 * the company's own operation. No production figures appear here: none
 * were supplied, and none may be invented.
 */
export type Region = {
  id: string;
  label: string;
  note: string;
};

export const REGIONS: Region[] = [
  {
    id: "Bafatá",
    label: "Bafatá",
    note: "The company's home region and the centre of its buying.",
  },
  {
    id: "Gabu",
    label: "Gabú",
    note: "The eastern interior, the country's largest region by area.",
  },
  {
    id: "Oio",
    label: "Oio",
    note: "North of the Geba, on the road corridor down to Bissau.",
  },
  {
    id: "Cacheu",
    label: "Cacheu",
    note: "The north-west, along the Cacheu river toward the coast.",
  },
  {
    id: "Tombali",
    label: "Tombali",
    note: "The southern region, bordering Guinea.",
  },
  {
    id: "Quinara",
    label: "Quinara",
    note: "South of the Geba estuary.",
  },
  {
    id: "Bolama",
    label: "Bolama",
    note: "The Bijagós archipelago and its islands.",
  },
  {
    id: "Biombo",
    label: "Biombo",
    note: "The coastal region wrapping the capital.",
  },
  {
    id: "Bissau",
    label: "Bissau",
    note: "The capital and the port every container leaves through.",
  },
];

/** The region the company is named for and buys from first. */
export const HOME_REGION = "Bafatá";

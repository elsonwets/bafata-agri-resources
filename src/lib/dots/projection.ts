export type BBox = {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
};

export type Size = { w: number; h: number };

/**
 * Equirectangular projection: longitude maps linearly to x, latitude
 * linearly to y. Chosen deliberately over Mercator. The dot map is a
 * graphic device rather than a navigational chart, and Mercator would
 * inflate the high latitudes into a band of noise while squashing the
 * equatorial region where every location on this page actually sits.
 */
export function equirectangular(
  lon: number,
  lat: number,
  bbox: BBox,
  size: Size,
): { x: number; y: number } {
  const x = ((lon - bbox.minLon) / (bbox.maxLon - bbox.minLon)) * size.w;
  // SVG y grows downward, so latitude is inverted.
  const y = ((bbox.maxLat - lat) / (bbox.maxLat - bbox.minLat)) * size.h;
  return { x, y };
}

/** Inverse of {@link equirectangular}, used to sample the dot lattice. */
export function unproject(
  x: number,
  y: number,
  bbox: BBox,
  size: Size,
): { lon: number; lat: number } {
  const lon = bbox.minLon + (x / size.w) * (bbox.maxLon - bbox.minLon);
  const lat = bbox.maxLat - (y / size.h) * (bbox.maxLat - bbox.minLat);
  return { lon, lat };
}

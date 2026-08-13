// Explicit extension so this module also loads under raw Node ESM in
// scripts/build-dot-fields.mjs, not only through the bundler.
import { unproject, type BBox, type Size } from "./projection.ts";

export type Dot = { x: number; y: number; id: string };

export type Ring = number[][];

export type LatticeFeature = {
  properties: { id: string };
  geometry:
    | { type: "Polygon"; coordinates: Ring[] }
    | { type: "MultiPolygon"; coordinates: Ring[][] };
};

/**
 * Ray casting. `ring` holds [lon, lat] pairs with the first point
 * repeated as the last. Points exactly on an edge are not guaranteed
 * either way, which does not matter here: the lattice samples cell
 * centres, so an edge hit is vanishingly unlikely and a single dot
 * either way is invisible.
 */
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

/** First ring is the outer boundary; any remaining rings are holes. */
function inPolygon(x: number, y: number, rings: Ring[]): boolean {
  if (!rings.length || !pointInRing(x, y, rings[0])) return false;
  for (let i = 1; i < rings.length; i++) {
    if (pointInRing(x, y, rings[i])) return false;
  }
  return true;
}

function polygonsOf(feature: LatticeFeature): Ring[][] {
  return feature.geometry.type === "Polygon"
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
}

/**
 * Samples a regular lattice over the canvas and keeps the cells whose
 * centre falls inside a feature.
 *
 * Generating the field from real geometry rather than sampling a bitmap
 * is what makes the map crisp at any size, themeable, and free of an
 * image payload.
 */
export function buildLattice(
  features: LatticeFeature[],
  opts: { step: number; bbox: BBox; size: Size },
): Dot[] {
  const { step, bbox, size } = opts;
  const half = step / 2;
  const dots: Dot[] = [];

  // Precompute polygon rings and their bounding boxes. Without the bbox
  // rejection this is O(cells * rings * vertices), which is minutes for
  // a world coastline.
  const prepared = features.map((f) => {
    const polys = polygonsOf(f).map((rings) => {
      let minLon = Infinity;
      let minLat = Infinity;
      let maxLon = -Infinity;
      let maxLat = -Infinity;
      for (const [lon, lat] of rings[0]) {
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
      return { rings, minLon, minLat, maxLon, maxLat };
    });
    return { id: f.properties.id, polys };
  });

  for (let py = half; py < size.h; py += step) {
    for (let px = half; px < size.w; px += step) {
      const { lon, lat } = unproject(px, py, bbox, size);

      for (const feature of prepared) {
        let hit = false;
        for (const p of feature.polys) {
          if (
            lon < p.minLon ||
            lon > p.maxLon ||
            lat < p.minLat ||
            lat > p.maxLat
          ) {
            continue;
          }
          if (inPolygon(lon, lat, p.rings)) {
            hit = true;
            break;
          }
        }
        if (hit) {
          // One dot per cell. The first matching feature wins, which
          // keeps borders from doubling up.
          dots.push({ x: px, y: py, id: feature.id });
          break;
        }
      }
    }
  }

  return dots;
}

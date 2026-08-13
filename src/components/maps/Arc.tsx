import { equirectangular, type BBox, type Size } from "@/lib/dots/projection";

export type Point = { x: number; y: number };

/**
 * A quadratic curve between two points, bulging perpendicular to the
 * straight line between them.
 *
 * A true great circle would be more correct geographically and worse
 * here: on an equirectangular canvas it produces a shallow S that reads
 * as a mistake. A clean arc communicates "shipped from here to there",
 * which is the whole job.
 */
export function arcPath(from: Point, to: Point, curvature = 0.22): string {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy);

  // Perpendicular, normalised, then scaled by distance so long routes
  // bow more than short ones.
  const nx = -dy / (distance || 1);
  const ny = dx / (distance || 1);
  const lift = distance * curvature;

  const cx = mx + nx * lift;
  const cy = my + ny * lift;

  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

export function projectPoint(
  lon: number,
  lat: number,
  bbox: BBox,
  size: Size,
): Point {
  return equirectangular(lon, lat, bbox, size);
}

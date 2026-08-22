/**
 * Pulls a single country's polygon out of the GeoJSON that dotted-map bundles.
 *
 * We only need the Guinea-Bissau outline, and shipping a second geo dataset
 * to get it would be absurd — so this reads the feature straight out of the
 * dependency's source at build time.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

export function extractCountry(iso) {
  // The package restricts its "exports" map, so resolve the entry point and
  // walk to the sibling ESM bundle that carries the geometry.
  const entry = require.resolve("dotted-map");
  const file = join(dirname(entry), "index.mjs");
  const src = readFileSync(file, "utf8");

  const marker = `"id": "${iso}"`;
  const at = src.indexOf(marker);
  if (at < 0) throw new Error(`Country ${iso} not found in dotted-map data`);

  // Walk back to the opening brace of the enclosing Feature object.
  let start = -1;
  let depth = 0;
  for (let i = at; i >= 0; i--) {
    const c = src[i];
    if (c === "}") depth++;
    else if (c === "{") {
      if (depth === 0) {
        start = i;
        break;
      }
      depth--;
    }
  }
  if (start < 0) throw new Error(`Could not find start of ${iso} feature`);

  // Then balance forward to its closing brace.
  depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error(`Could not find end of ${iso} feature`);

  return JSON.parse(src.slice(start, end));
}

/**
 * Projects lon/lat rings into an SVG viewBox using an equirectangular
 * projection with a cos(lat) correction. Accurate enough for one small
 * country and it keeps the aspect ratio honest.
 */
export function toSvgPath(feature, { width = 1000, padding = 0 } = {}) {
  const rings =
    feature.geometry.type === "Polygon"
      ? feature.geometry.coordinates
      : feature.geometry.coordinates.flat();

  const pts = rings.flat();
  const lngs = pts.map((p) => p[0]);
  const lats = pts.map((p) => p[1]);
  const bounds = {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
  };

  const midLat = (bounds.minLat + bounds.maxLat) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);

  const spanX = (bounds.maxLng - bounds.minLng) * kx;
  const spanY = bounds.maxLat - bounds.minLat;

  const inner = width - padding * 2;
  const scale = inner / spanX;
  const height = Math.round(spanY * scale + padding * 2);

  const project = (lng, lat) => [
    padding + (lng - bounds.minLng) * kx * scale,
    // SVG y grows downward; latitude grows upward.
    padding + (bounds.maxLat - lat) * scale,
  ];

  const d = rings
    .map((ring) => {
      const [first, ...rest] = ring.map(([lng, lat]) => project(lng, lat));
      return (
        `M${first[0].toFixed(2)} ${first[1].toFixed(2)}` +
        rest.map((p) => `L${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join("") +
        "Z"
      );
    })
    .join("");

  return { d, width, height, project, bounds };
}

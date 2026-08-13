/**
 * Turns vendored GeoJSON into the dot fields both maps render.
 *
 * Runs at build time, not in the browser: the lattice is a fixed
 * function of fixed geometry, so there is no reason to make every
 * visitor recompute it. The output is committed and reviewed.
 *
 * Node 24 strips TypeScript types natively, so this imports the same
 * lattice module the app uses rather than duplicating the algorithm.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildLattice } from "../src/lib/dots/lattice.ts";
import { equirectangular } from "../src/lib/dots/projection.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const GEO = join(ROOT, "src/data/geo");
const OUT = join(ROOT, "src/data");

/**
 * World canvas proportions follow the reference map so the dot grid
 * reads at the same density. The latitude band is clipped at 60S because
 * Antarctica is a distraction on a trade map and nothing below it ships
 * cashew.
 */
const WORLD = {
  bbox: { minLon: -180, minLat: -60, maxLon: 180, maxLat: 85 },
  size: { w: 1320, h: 680 },
  step: 10,
};

/**
 * Guinea-Bissau gets its own bbox, padded slightly so the coastline and
 * the Bijagos archipelago are not flush against the canvas edge.
 */
const GUINEA_BISSAU = {
  bbox: { minLon: -16.9, minLat: 10.7, maxLon: -13.5, maxLat: 12.8 },
  size: { w: 1360, h: 840 },
  step: 10,
};

async function load(name) {
  return JSON.parse(await readFile(join(GEO, name), "utf8")).features;
}

function summarise(dots) {
  const byId = new Map();
  for (const d of dots) byId.set(d.id, (byId.get(d.id) ?? 0) + 1);
  return [...byId.entries()].sort((a, b) => b[1] - a[1]);
}

async function main() {
  const gnbFeatures = await load("guinea-bissau-regions.geo.json");
  const gnbDots = buildLattice(gnbFeatures, GUINEA_BISSAU);
  await writeFile(
    join(OUT, "guinea-bissau.dots.json"),
    JSON.stringify({ ...GUINEA_BISSAU, dots: gnbDots }) + "\n",
  );
  console.log(`Guinea-Bissau: ${gnbDots.length} dots`);
  for (const [id, n] of summarise(gnbDots)) {
    console.log(`  ${String(n).padStart(4)}  ${id}`);
  }

  const worldFeatures = await load("world-land.geo.json");
  const worldDots = buildLattice(worldFeatures, WORLD);
  await writeFile(
    join(OUT, "world.dots.json"),
    JSON.stringify({ ...WORLD, dots: worldDots }) + "\n",
  );
  console.log(`\nWorld: ${worldDots.length} dots`);
  const top = summarise(worldDots).slice(0, 6);
  for (const [id, n] of top) {
    console.log(`  ${String(n).padStart(4)}  ${id}`);
  }

  // The four marked locations are drawn as explicit solid dots at their
  // projected coordinates, independently of the lattice. What actually
  // has to hold is that each marker lands on visible land rather than
  // floating in empty canvas. Checking proximity rather than demanding
  // the country itself carry lattice dots keeps the grid coarse: the
  // UAE is too small to catch a cell centre at this step, but it sits on
  // a well-dotted Arabian peninsula, so the marker reads correctly.
  const reach = WORLD.step * 2.5;
  const markers = [
    { label: "Bissau", lon: -15.5977, lat: 11.8637 },
    { label: "India", lon: 72.9481, lat: 18.9498 },
    { label: "United Arab Emirates", lon: 55.2708, lat: 25.2048 },
    { label: "Vietnam", lon: 106.6297, lat: 10.8231 },
  ];

  const stranded = markers.filter((m) => {
    const p = equirectangular(m.lon, m.lat, WORLD.bbox, WORLD.size);
    return !worldDots.some((d) => Math.hypot(d.x - p.x, d.y - p.y) <= reach);
  });

  if (stranded.length) {
    console.error(
      `\nMarkers with no land within ${reach}px: ` +
        stranded.map((m) => m.label).join(", "),
    );
    process.exit(1);
  }
  console.log(`\nAll four markers sit on dotted land.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

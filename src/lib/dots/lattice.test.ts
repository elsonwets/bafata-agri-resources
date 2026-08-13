import { describe, expect, it } from "vitest";
import { buildLattice, pointInRing, type LatticeFeature } from "./lattice";

const OUTER = [
  [0, 0],
  [10, 0],
  [10, 10],
  [0, 10],
  [0, 0],
];

const square: LatticeFeature = {
  properties: { id: "sq" },
  geometry: { type: "Polygon", coordinates: [OUTER] },
};

const opts = {
  step: 10,
  bbox: { minLon: 0, minLat: 0, maxLon: 10, maxLat: 10 },
  size: { w: 100, h: 100 },
};

describe("pointInRing", () => {
  it("accepts an interior point", () => {
    expect(pointInRing(5, 5, OUTER)).toBe(true);
  });

  it("rejects a point outside on each side", () => {
    expect(pointInRing(-1, 5, OUTER)).toBe(false);
    expect(pointInRing(11, 5, OUTER)).toBe(false);
    expect(pointInRing(5, -1, OUTER)).toBe(false);
    expect(pointInRing(5, 11, OUTER)).toBe(false);
  });

  it("handles a concave ring, where a naive convex test would fail", () => {
    // A C shape opening to the right.
    const c = [
      [0, 0],
      [10, 0],
      [10, 3],
      [3, 3],
      [3, 7],
      [10, 7],
      [10, 10],
      [0, 10],
      [0, 0],
    ];
    expect(pointInRing(1, 5, c)).toBe(true);
    // Inside the convex hull, but in the mouth of the C.
    expect(pointInRing(7, 5, c)).toBe(false);
  });
});

describe("buildLattice", () => {
  it("snaps every dot to the step grid, offset by half a step", () => {
    const dots = buildLattice([square], opts);
    expect(dots.length).toBeGreaterThan(0);
    for (const d of dots) {
      expect((d.x - opts.step / 2) % opts.step).toBeCloseTo(0, 6);
      expect((d.y - opts.step / 2) % opts.step).toBeCloseTo(0, 6);
    }
  });

  it("tags each dot with the id of the feature that contains it", () => {
    const dots = buildLattice([square], opts);
    expect(new Set(dots.map((d) => d.id))).toEqual(new Set(["sq"]));
  });

  it("is deterministic", () => {
    expect(buildLattice([square], opts)).toEqual(buildLattice([square], opts));
  });

  it("excludes holes", () => {
    const withHole: LatticeFeature = {
      properties: { id: "sq" },
      geometry: {
        type: "Polygon",
        coordinates: [
          OUTER,
          [
            [3, 3],
            [7, 3],
            [7, 7],
            [3, 7],
            [3, 3],
          ],
        ],
      },
    };
    const solid = buildLattice([square], opts).length;
    const holed = buildLattice([withHole], opts).length;
    expect(holed).toBeLessThan(solid);
    expect(holed).toBeGreaterThan(0);
  });

  it("supports MultiPolygon, which every real coastline needs", () => {
    const islands: LatticeFeature = {
      properties: { id: "isles" },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [0, 0],
              [3, 0],
              [3, 3],
              [0, 3],
              [0, 0],
            ],
          ],
          [
            [
              [7, 7],
              [10, 7],
              [10, 10],
              [7, 10],
              [7, 7],
            ],
          ],
        ],
      },
    };
    const dots = buildLattice([islands], opts);
    expect(dots.length).toBeGreaterThan(0);
    // Nothing should land in the empty middle of the canvas.
    expect(dots.some((d) => d.x === 55 && d.y === 55)).toBe(false);
  });

  it("assigns a shared cell to the first matching feature only", () => {
    const a: LatticeFeature = {
      properties: { id: "a" },
      geometry: { type: "Polygon", coordinates: [OUTER] },
    };
    const b: LatticeFeature = { ...a, properties: { id: "b" } };
    const dots = buildLattice([a, b], opts);
    expect(new Set(dots.map((d) => d.id))).toEqual(new Set(["a"]));
  });

  it("returns nothing when the features fall outside the bbox", () => {
    const elsewhere: LatticeFeature = {
      properties: { id: "far" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100, 100],
            [110, 100],
            [110, 110],
            [100, 110],
            [100, 100],
          ],
        ],
      },
    };
    expect(buildLattice([elsewhere], opts)).toEqual([]);
  });
});

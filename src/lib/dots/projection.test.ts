import { describe, expect, it } from "vitest";
import { equirectangular, unproject, type BBox } from "./projection";

const WORLD: BBox = { minLon: -180, minLat: -90, maxLon: 180, maxLat: 90 };
const SIZE = { w: 662, h: 340 };

describe("equirectangular", () => {
  it("puts the null island at the centre of the canvas", () => {
    const p = equirectangular(0, 0, WORLD, SIZE);
    expect(p.x).toBeCloseTo(331, 5);
    expect(p.y).toBeCloseTo(170, 5);
  });

  it("puts the north-west corner at the origin", () => {
    const p = equirectangular(-180, 90, WORLD, SIZE);
    expect(p.x).toBeCloseTo(0, 5);
    expect(p.y).toBeCloseTo(0, 5);
  });

  it("puts the south-east corner at the far corner", () => {
    const p = equirectangular(180, -90, WORLD, SIZE);
    expect(p.x).toBeCloseTo(SIZE.w, 5);
    expect(p.y).toBeCloseTo(SIZE.h, 5);
  });

  it("increases y as latitude falls, because SVG y grows downward", () => {
    const north = equirectangular(0, 45, WORLD, SIZE);
    const south = equirectangular(0, -45, WORLD, SIZE);
    expect(south.y).toBeGreaterThan(north.y);
  });

  it("places Bissau in the western tropics of the canvas", () => {
    const p = equirectangular(-15.5977, 11.8637, WORLD, SIZE);
    expect(p.x).toBeLessThan(SIZE.w / 2);
    expect(p.y).toBeLessThan(SIZE.h / 2);
    expect(p.y).toBeGreaterThan(SIZE.h / 3);
  });
});

describe("unproject", () => {
  it("round-trips with equirectangular", () => {
    for (const [lon, lat] of [
      [-15.5977, 11.8637],
      [72.9481, 18.9498],
      [106.6297, 10.8231],
      [0, 0],
    ]) {
      const p = equirectangular(lon, lat, WORLD, SIZE);
      const back = unproject(p.x, p.y, WORLD, SIZE);
      expect(back.lon).toBeCloseTo(lon, 6);
      expect(back.lat).toBeCloseTo(lat, 6);
    }
  });
});

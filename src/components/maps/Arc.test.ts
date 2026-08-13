import { describe, expect, it } from "vitest";
import { arcPath } from "./Arc";

const from = { x: 0, y: 100 };
const to = { x: 200, y: 100 };

function controlPointOf(d: string) {
  const m = d.match(/Q ([-\d.]+) ([-\d.]+)/);
  if (!m) throw new Error(`no control point in ${d}`);
  return { x: Number(m[1]), y: Number(m[2]) };
}

describe("arcPath", () => {
  it("starts and ends exactly on the given points", () => {
    const d = arcPath(from, to);
    expect(d.startsWith("M 0 100")).toBe(true);
    expect(d.endsWith("200 100")).toBe(true);
  });

  it("bulges away from the straight line", () => {
    const c = controlPointOf(arcPath(from, to));
    expect(c.y).not.toBeCloseTo(100, 3);
    // Control point sits above the midpoint on this orientation.
    expect(c.x).toBeCloseTo(100, 6);
  });

  it("bows longer routes more than short ones", () => {
    const near = controlPointOf(arcPath({ x: 0, y: 0 }, { x: 10, y: 0 }));
    const far = controlPointOf(arcPath({ x: 0, y: 0 }, { x: 500, y: 0 }));
    expect(Math.abs(far.y)).toBeGreaterThan(Math.abs(near.y));
  });

  it("scales the bow with the curvature argument", () => {
    const flat = controlPointOf(arcPath(from, to, 0.05));
    const round = controlPointOf(arcPath(from, to, 0.5));
    expect(Math.abs(round.y - 100)).toBeGreaterThan(Math.abs(flat.y - 100));
  });

  it("does not divide by zero when both points coincide", () => {
    const d = arcPath({ x: 5, y: 5 }, { x: 5, y: 5 });
    expect(d).not.toMatch(/NaN/);
  });
});

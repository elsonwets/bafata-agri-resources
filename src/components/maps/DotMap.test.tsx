import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DotMap } from "./DotMap";
import type { Dot } from "@/lib/dots/lattice";

const dots: Dot[] = [
  { x: 5, y: 5, id: "a" },
  { x: 15, y: 5, id: "a" },
  { x: 25, y: 5, id: "b" },
  { x: 35, y: 5, id: "b" },
  { x: 45, y: 5, id: "c" },
];

const size = { w: 100, h: 50 };

const regions = [
  { id: "a", label: "Bafata", note: "Primary sourcing region" },
  { id: "b", label: "Gabu" },
];

function setup(props: Partial<React.ComponentProps<typeof DotMap>> = {}) {
  return render(
    <DotMap dots={dots} size={size} title="Test map" {...props} />,
  );
}

describe("DotMap", () => {
  it("renders one circle per dot", () => {
    const { container } = setup();
    expect(container.querySelectorAll("circle")).toHaveLength(dots.length);
  });

  it("groups dots by region id so hover can key on the group", () => {
    const { container } = setup();
    expect(container.querySelectorAll("[data-region]")).toHaveLength(3);
    expect(container.querySelector('[data-region="a"] circle')).toBeTruthy();
  });

  it("draws solid regions at full opacity and the rest faint", () => {
    const { container } = setup({ solidIds: ["a"] });
    const solid = container.querySelector('[data-region="a"] circle')!;
    const faint = container.querySelector('[data-region="c"] circle')!;
    expect(Number(solid.getAttribute("opacity"))).toBe(1);
    expect(Number(faint.getAttribute("opacity"))).toBeCloseTo(0.16, 5);
  });

  it("never marks a solid dot as a twinkle target", () => {
    const { container } = setup({ solidIds: ["a"] });
    const solidDots = container.querySelectorAll('[data-region="a"] circle');
    for (const d of solidDots) {
      expect(d.getAttribute("data-twinkle")).toBeNull();
    }
  });

  it("exposes an accessible name built from label and note", () => {
    setup({ regions, onActivate: vi.fn() });
    expect(
      screen.getByLabelText("Bafata. Primary sourcing region"),
    ).toBeTruthy();
    expect(screen.getByLabelText("Gabu")).toBeTruthy();
  });

  it("makes interactive regions reachable by keyboard", () => {
    setup({ regions, onActivate: vi.fn() });
    const group = screen.getByLabelText("Gabu");
    expect(group.getAttribute("tabindex")).toBe("0");
  });

  it("activates a region on focus, not only on hover", () => {
    const onActivate = vi.fn();
    setup({ regions, onActivate });
    fireEvent.focus(screen.getByLabelText("Gabu"));
    expect(onActivate).toHaveBeenCalledWith("b");
  });

  it("activates on hover and clears on leaving the map", () => {
    const onActivate = vi.fn();
    const { container } = setup({ regions, onActivate });
    fireEvent.mouseEnter(screen.getByLabelText("Gabu"));
    expect(onActivate).toHaveBeenCalledWith("b");
    fireEvent.mouseLeave(container.querySelector("svg")!);
    expect(onActivate).toHaveBeenCalledWith(null);
  });

  it("dims the other regions while one is active", () => {
    const { container } = setup({ regions, onActivate: vi.fn(), activeId: "a" });
    const active = container.querySelector('[data-region="a"] circle')!;
    const other = container.querySelector('[data-region="c"] circle')!;
    expect(Number(active.getAttribute("opacity"))).toBe(1);
    expect(Number(other.getAttribute("opacity"))).toBeCloseTo(0.07, 5);
  });

  it("leaves regions without metadata non-interactive", () => {
    const { container } = setup({ regions, onActivate: vi.fn() });
    const c = container.querySelector('[data-region="c"]')!;
    expect(c.getAttribute("tabindex")).toBeNull();
  });

  it("renders identically for the same seed, so hydration matches", () => {
    const a = setup({ seed: 7 }).container.innerHTML;
    const b = setup({ seed: 7 }).container.innerHTML;
    expect(a).toBe(b);
  });
});

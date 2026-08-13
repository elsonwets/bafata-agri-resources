"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Dot } from "@/lib/dots/lattice";
import { buildTwinkleLayers } from "@/lib/dots/twinkle";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getGsap } from "@/lib/motion/gsap";

export type DotMapRegion = {
  id: string;
  label: string;
  /** Optional one-line description revealed on hover or focus. */
  note?: string;
};

export type DotMapProps = {
  dots: Dot[];
  size: { w: number; h: number };
  /** Regions drawn solid, in brand gold. Everything else stays faint. */
  solidIds?: string[];
  /** Regions that can be hovered or focused. */
  regions?: DotMapRegion[];
  activeId?: string | null;
  onActivate?: (id: string | null) => void;
  /** Seeds the twinkle so the layout is identical on server and client. */
  seed?: number;
  className?: string;
  title: string;
};

const FAINT = 0.16;
const DIMMED = 0.07;
const SOLID = 1;
const DOT_RADIUS = 4;

/**
 * The shared dot-map renderer.
 *
 * Both maps on the page use this: the same visual grammar at two scales,
 * so the sourcing map and the export map read as one system rather than
 * two unrelated graphics.
 */
export function DotMap({
  dots,
  size,
  solidIds = [],
  regions = [],
  activeId = null,
  onActivate,
  seed = 2027,
  className,
  title,
}: DotMapProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<SVGSVGElement>(null);
  const solid = useMemo(() => new Set(solidIds), [solidIds]);

  const grouped = useMemo(() => {
    const map = new Map<string, Dot[]>();
    for (const d of dots) {
      const list = map.get(d.id);
      if (list) list.push(d);
      else map.set(d.id, [d]);
    }
    return [...map.entries()];
  }, [dots]);

  /** Faint dots only. Solid markers never flicker away. */
  const twinkleTargets = useMemo(
    () => dots.filter((d) => !solid.has(d.id)),
    [dots, solid],
  );

  const layers = useMemo(
    () => buildTwinkleLayers(twinkleTargets, { layers: 5, fraction: 0.06, seed }),
    [twinkleTargets, seed],
  );

  /**
   * Dot key to layer index. Built once rather than searched per dot:
   * the Guinea-Bissau field is 4677 dots, and scanning five layers for
   * each of them on every render is 23k lookups for no reason.
   */
  const layerOf = useMemo(() => {
    const map = new Map<string, number>();
    layers.forEach((layer, i) => {
      for (const d of layer) map.set(`${d.x}:${d.y}`, i);
    });
    return map;
  }, [layers]);

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const { gsap } = getGsap();
    const root = rootRef.current;

    const ctx = gsap.context(() => {
      // Each layer brightens and fades on its own offset cycle. Because
      // the layers are independent random scatters, the combined effect
      // reads as scattered flicker rather than a marching pattern.
      layers.forEach((_, i) => {
        const nodes = root.querySelectorAll(`[data-twinkle="${i}"]`);
        if (!nodes.length) return;
        gsap.to(nodes, {
          opacity: FAINT * 3.2,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.42,
          stagger: { each: 0.012, from: "random" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, layers]);

  const hasFocusTargets = regions.length > 0 && Boolean(onActivate);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className={className}
      role="img"
      aria-label={title}
      onMouseLeave={() => onActivate?.(null)}
    >
      <title>{title}</title>

      {grouped.map(([id, groupDots]) => {
        const region = regions.find((r) => r.id === id);
        const isSolid = solid.has(id);
        const isActive = activeId === id;
        const dimmed = activeId !== null && !isActive && !isSolid;

        const baseOpacity = isSolid
          ? SOLID
          : isActive
            ? SOLID
            : dimmed
              ? DIMMED
              : FAINT;

        const interactive = Boolean(region) && hasFocusTargets;

        return (
          <g
            key={id}
            data-region={id}
            tabIndex={interactive ? 0 : undefined}
            role={interactive ? "button" : undefined}
            aria-label={
              region
                ? region.note
                  ? `${region.label}. ${region.note}`
                  : region.label
                : undefined
            }
            onMouseEnter={interactive ? () => onActivate?.(id) : undefined}
            onFocus={interactive ? () => onActivate?.(id) : undefined}
            onBlur={interactive ? () => onActivate?.(null) : undefined}
            style={interactive ? { cursor: "pointer" } : undefined}
          >
            {groupDots.map((d) => {
              const key = `${d.x}:${d.y}`;
              const layerIndex = isSolid ? undefined : layerOf.get(key);

              return (
                <circle
                  key={key}
                  cx={d.x}
                  cy={d.y}
                  r={DOT_RADIUS}
                  fill={isSolid || isActive ? "var(--color-gold)" : "var(--color-bone)"}
                  opacity={baseOpacity}
                  data-twinkle={
                    layerIndex !== undefined && !isActive
                      ? layerIndex
                      : undefined
                  }
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * The brand mark as real geometry.
 *
 * The tree-of-life seal is extruded out of its SVG paths, lit like the
 * embossed navy print it comes from, and shaken gently so that raw cashew
 * nuts fall out of the canopy and pile up at the roots.
 *
 * Swapping the client's own artwork in is a one-file change: replace
 * `public/brand/logo-mark.svg` and keep the group ids (wreath / stars /
 * canopy / tree / rays / fruit / yantra).
 */

const NUT_COUNT = 55;
const FLOOR_Y = -1.55;

/* --------------------------------------------------------------- cashew */

/**
 * The kernel silhouette: a kidney arc of roughly 175°, thick at the heel and
 * tapering to a blunt point. A wider sweep reads as a croissant, not a nut.
 */
function cashewGeometry() {
  const shape = new THREE.Shape();
  const A0 = THREE.MathUtils.degToRad(-8);
  const A1 = THREE.MathUtils.degToRad(167);
  const steps = 30;

  // Body thickness along the arc: fat at the heel (t=0), tapering to the tip.
  const thickness = (t: number) =>
    0.38 * (1 - Math.pow(t, 1.7) * 0.68) * (0.5 + 0.5 * Math.sin(Math.min(1, t * 3.2) * Math.PI * 0.5));

  const at = (t: number, side: number) => {
    const a = A0 + (A1 - A0) * t;
    const r = 1 + side * thickness(t);
    return new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r * 0.94);
  };

  const p0 = at(0, 1);
  shape.moveTo(p0.x, p0.y);
  for (let i = 1; i <= steps; i++) {
    const p = at(i / steps, 1);
    shape.lineTo(p.x, p.y);
  }
  for (let i = steps; i >= 0; i--) {
    const p = at(i / steps, -1);
    shape.lineTo(p.x, p.y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.34,
    bevelSize: 0.2,
    bevelSegments: 4,
    curveSegments: 4,
  });
  geo.center();
  // Kernels are flattened, not round in section.
  geo.scale(0.046, 0.046, 0.032);
  geo.computeVertexNormals();
  return geo;
}

/* ------------------------------------------------------------------ mark */

type GroupName = "wreath" | "stars" | "canopy" | "tree" | "rays" | "fruit" | "yantra";

/**
 * Depth and finish per group, so the seal reads as a struck medal.
 *
 * Metalness is deliberately low: there is no environment map in this scene,
 * and a metallic surface with nothing to reflect renders as flat grey. The
 * sheen comes from the three lights plus a little emissive lift instead.
 */
const GROUP_STYLE: Record<
  GroupName,
  { depth: number; z: number; color: number; metal: number; rough: number; glow: number }
> = {
  wreath: { depth: 5, z: -6, color: 0xd9c7a0, metal: 0.22, rough: 0.44, glow: 0.05 },
  stars: { depth: 7, z: -2, color: 0xf0cf86, metal: 0.28, rough: 0.3, glow: 0.22 },
  rays: { depth: 3, z: -10, color: 0xc8963e, metal: 0.24, rough: 0.4, glow: 0.16 },
  canopy: { depth: 6, z: 0, color: 0x74c48c, metal: 0.06, rough: 0.68, glow: 0.04 },
  tree: { depth: 11, z: 4, color: 0xf3ead6, metal: 0.14, rough: 0.5, glow: 0.03 },
  fruit: { depth: 9, z: 8, color: 0xdcae55, metal: 0.2, rough: 0.42, glow: 0.12 },
  yantra: { depth: 13, z: 12, color: 0xf6efdd, metal: 0.16, rough: 0.34, glow: 0.14 },
};

// The canopy holds ~700 leaf paths. Extruding every one costs more than it
// shows at hero scale, so we take a deterministic slice of them.
const CANOPY_STRIDE = 3;

export function LogoTree3D({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = prefersReducedMotion();
    let disposed = false;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const size = () => ({ w: host.clientWidth, h: host.clientHeight });
    let { w, h } = size();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    /* --- lighting: warm key from upper left, cool forest fill ---------- */

    scene.add(new THREE.AmbientLight(0x6f9c80, 0.34));

    const key = new THREE.DirectionalLight(0xfff4dd, 3.6);
    key.position.set(-3.2, 4.4, 5.2);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x8ccfa0, 1.9);
    rim.position.set(4.2, 1.4, -3.6);
    scene.add(rim);

    const bounce = new THREE.PointLight(0xc8963e, 18, 14, 2);
    bounce.position.set(1.4, -2.4, 2.6);
    scene.add(bounce);

    /* --- the mark ------------------------------------------------------ */

    const markGroup = new THREE.Group();
    scene.add(markGroup);

    // Bounds of the canopy in local space, so nuts fall from the leaves.
    const canopyBox = new THREE.Box3();

    const loader = new SVGLoader();
    loader.load("/brand/logo-mark.svg", (data) => {
      if (disposed) return;

      const buckets = new Map<GroupName, THREE.BufferGeometry[]>();

      data.paths.forEach((path, index) => {
        const node = path.userData?.node as SVGElement | undefined;
        const id = (node?.parentElement?.id ?? "tree") as GroupName;
        const style = GROUP_STYLE[id] ?? GROUP_STYLE.tree;

        if (id === "canopy" && index % CANOPY_STRIDE !== 0) return;

        // fill-rule="evenodd" on the source keeps the yantra holes correct.
        const shapes = SVGLoader.createShapes(path);
        for (const shape of shapes) {
          const geo = new THREE.ExtrudeGeometry(shape, {
            depth: style.depth,
            bevelEnabled: true,
            bevelThickness: 1.6,
            bevelSize: 1.2,
            bevelSegments: 1,
            curveSegments: 3,
          });
          geo.translate(0, 0, style.z);
          const list = buckets.get(id) ?? [];
          list.push(geo);
          buckets.set(id, list);
        }
      });

      // One merged mesh per group: 7 draw calls instead of ~1200.
      const meshes: THREE.Mesh[] = [];
      for (const [id, geos] of buckets) {
        if (!geos.length) continue;
        const merged = mergeGeometries(geos, false);
        geos.forEach((g) => g.dispose());
        if (!merged) continue;
        merged.computeVertexNormals();

        const style = GROUP_STYLE[id] ?? GROUP_STYLE.tree;
        const mesh = new THREE.Mesh(
          merged,
          new THREE.MeshStandardMaterial({
            color: style.color,
            metalness: style.metal,
            roughness: style.rough,
            emissive: new THREE.Color(style.color),
            emissiveIntensity: style.glow,
            side: THREE.DoubleSide,
          }),
        );
        mesh.name = id;
        meshes.push(mesh);
        markGroup.add(mesh);
      }

      // SVG y grows downward; flip, centre and normalise to ~3 units tall.
      markGroup.scale.set(1, -1, 1);
      const box = new THREE.Box3().setFromObject(markGroup);
      const dims = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const k = 3.05 / Math.max(dims.x, dims.y);
      markGroup.scale.multiplyScalar(k);
      markGroup.position.sub(centre.multiplyScalar(k));

      const canopyMesh = meshes.find((m) => m.name === "canopy");
      if (canopyMesh) canopyBox.setFromObject(canopyMesh);
      else canopyBox.setFromObject(markGroup);

      setReady(true);
    });

    /* --- falling nuts --------------------------------------------------- */

    const nutGeo = cashewGeometry();
    const nutMat = new THREE.MeshStandardMaterial({
      color: 0xe4cfa6,
      metalness: 0.12,
      roughness: 0.72,
    });
    const nuts = new THREE.InstancedMesh(nutGeo, nutMat, NUT_COUNT);
    nuts.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(nuts);

    type Nut = {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      rot: THREE.Euler;
      spin: THREE.Vector3;
      scale: number;
      resting: boolean;
      rest: number;
    };

    const nutState: Nut[] = [];
    const dummy = new THREE.Object3D();

    const spawn = (n: Nut, initial = false) => {
      // Nuts detach from somewhere inside the canopy, never from thin air.
      const spread = canopyBox.isEmpty() ? 1.2 : (canopyBox.max.x - canopyBox.min.x) * 0.42;
      const top = canopyBox.isEmpty() ? 1.1 : canopyBox.max.y * 0.72;
      n.pos.set(
        (Math.random() - 0.5) * spread * 2,
        initial ? Math.random() * 2.4 - 0.4 : top + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.9,
      );
      n.vel.set((Math.random() - 0.5) * 0.22, -Math.random() * 0.25, (Math.random() - 0.5) * 0.12);
      n.rot.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
      n.spin.set(
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
      );
      n.scale = 0.72 + Math.random() * 0.4;
      n.resting = false;
      n.rest = 0;
    };

    for (let i = 0; i < NUT_COUNT; i++) {
      const n: Nut = {
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        rot: new THREE.Euler(),
        spin: new THREE.Vector3(),
        scale: 1,
        resting: false,
        rest: 0,
      };
      spawn(n, true);
      nutState.push(n);
    }

    /* --- input ---------------------------------------------------------- */

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      ({ w, h } = size());
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // The host is aspect-square, but its height is 0 on the first frame.
    // Without this the canvas locks to a wrong aspect and the mark squashes.
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    // Stop rendering entirely once the hero has scrolled away.
    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    /* --- loop ------------------------------------------------------------ */

    const clock = new THREE.Clock();
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || document.visibilityState !== "visible") return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      if (!reduced) {
        // A slow breathing sway, plus a tilt that follows the cursor.
        markGroup.rotation.y = current.x * 0.42 + Math.sin(t * 0.32) * 0.09;
        markGroup.rotation.x = -current.y * 0.28 + Math.sin(t * 0.24) * 0.05;
        markGroup.rotation.z = Math.sin(t * 0.19) * 0.022;
      }

      for (let i = 0; i < NUT_COUNT; i++) {
        const n = nutState[i];

        if (!n.resting && !reduced) {
          n.vel.y -= 2.35 * dt;
          // A little lateral drift, as if the same wind moves the canopy.
          n.vel.x += Math.sin(t * 0.7 + i) * 0.06 * dt;
          n.pos.addScaledVector(n.vel, dt);
          n.rot.x += n.spin.x * dt;
          n.rot.y += n.spin.y * dt;
          n.rot.z += n.spin.z * dt;

          // The heap is tallest under the trunk and thins towards the edges,
          // so nuts do not all come to rest on one flat line.
          const heap = FLOOR_Y + 0.19 * Math.exp(-(n.pos.x * n.pos.x) / 0.7);

          if (n.pos.y <= heap) {
            n.pos.y = heap;
            if (Math.abs(n.vel.y) < 0.55) {
              // Settle: kernels lie on their side, splayed at random angles.
              n.resting = true;
              n.rest = t;
              n.rot.set(Math.PI * 0.5 + (Math.random() - 0.5) * 0.5, Math.random() * 6.28, 0);
              n.spin.set(0, 0, 0);
            } else {
              n.vel.y *= -0.3;
              n.vel.x *= 0.62;
              n.spin.multiplyScalar(0.5);
            }
          }
        } else if (n.resting && t - n.rest > 2.6 + (i % 7)) {
          // Recycle so the pile keeps turning over instead of freezing.
          spawn(n);
        }

        dummy.position.copy(n.pos);
        dummy.rotation.copy(n.rot);
        dummy.scale.setScalar(n.scale);
        dummy.updateMatrix();
        nuts.setMatrixAt(i, dummy.matrix);
      }
      nuts.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-label="Animated three-dimensional Bafata Agri Resources tree mark dropping raw cashew nuts"
      role="img"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 900ms var(--ease-out-expo)" }}
    />
  );
}

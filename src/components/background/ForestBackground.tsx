"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * The living forest the whole site sits inside.
 *
 * A single fullscreen quad renders layered canopy silhouettes, light shafts
 * filtering through the leaves and drifting pollen. Scroll position drives
 * the depth of the canopy and the colour temperature, so moving down the
 * page reads as moving deeper into the grove.
 *
 * One draw call, no geometry, no textures — it costs a fragment shader and
 * nothing else, which is what keeps it viable behind a page this heavy.
 */

const VERT = /* glsl */ `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uScroll;   // 0 at page top, 1 at page bottom
uniform vec2  uMouse;    // -1..1
uniform float uOctaves;  // trimmed on low-power devices

/* ------------------------------------------------------------------ noise */

float hash(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    if (float(i) >= uOctaves) break;
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

/* ------------------------------------------------------------- foliage */

/**
 * One canopy layer. Larger scale pushes it back: further layers are finer,
 * darker and move less, which is what sells the parallax.
 */
float canopy(vec2 p, float scale, float t, float sway) {
  vec2 q = p * scale;
  // Branches drift as if a slow wind were moving through them.
  q.x += sin(q.y * 0.7 + t * 0.22) * sway;
  q.y += cos(q.x * 0.5 + t * 0.17) * sway * 0.6;
  float n = fbm(q);
  // A second, finer pass breaks the silhouette into leaf-sized clusters.
  n += 0.35 * fbm(q * 3.1 + n);
  return n;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float t = uTime;
  vec2 par = uMouse * 0.045;

  /* --- atmosphere ------------------------------------------------------ */

  // Understorey below, filtered daylight breaking through the canopy above.
  vec3 deep  = vec3(0.020, 0.079, 0.052);
  vec3 mid   = vec3(0.055, 0.171, 0.111);
  vec3 light = vec3(0.148, 0.331, 0.204);

  // Descending the page sinks the horizon: you go deeper into the grove.
  float horizon = 0.30 - uScroll * 0.40;
  float g = smoothstep(-0.70, 0.78, p.y - horizon);
  vec3 col = mix(deep, mid, smoothstep(0.0, 0.55, g));
  col = mix(col, light, smoothstep(0.45, 1.0, g) * 0.9);

  /* --- three canopy layers, far to near -------------------------------- */

  // Far layer reads LIGHTER than the ground behind it: backlit haze, the
  // thing that actually makes a forest look like a forest and not a wall.
  float far = canopy(p * 0.85 + par * 0.3 + vec2(0.0, uScroll * 0.20), 2.3, t, 0.10);
  float mFar = smoothstep(0.44, 0.82, far);
  col = mix(col, vec3(0.106, 0.263, 0.169), mFar * 0.60);

  // Mid layer: the body of the forest, a touch darker than the haze.
  float midL = canopy(p * 1.15 + par * 0.7 + vec2(0.4, uScroll * 0.42), 3.4, t * 1.25, 0.16);
  float mMid = smoothstep(0.50, 0.80, midL);
  col = mix(col, vec3(0.038, 0.132, 0.088), mMid * 0.78);

  /* --- light shafts, cast after the haze so they sit inside it --------- */

  vec2 lightDir = normalize(vec2(-0.42, 1.0));
  float along  = dot(p - vec2(0.32, 0.9), lightDir);
  float across = dot(p - vec2(0.32, 0.9), vec2(lightDir.y, -lightDir.x));
  float shaft = fbm(vec2(across * 4.6, along * 0.7 - t * 0.05));
  shaft = smoothstep(0.36, 0.92, shaft);
  // Shafts fade as they descend and as the page sinks into the understorey.
  shaft *= smoothstep(-0.9, 0.75, p.y) * (1.0 - uScroll * 0.45);
  col += vec3(0.40, 0.50, 0.26) * shaft * 0.55;

  // Near layer last: hard dark leaf shapes silhouetted against the light.
  float near = canopy(p * 1.6 + par * 1.4 + vec2(-0.7, uScroll * 0.78), 4.6, t * 1.6, 0.24);
  float mNear = smoothstep(0.58, 0.86, near);
  // Held to the edges so the middle of the screen stays readable for text.
  float edge = smoothstep(0.16, 0.70, abs(p.x) * 1.05 + abs(p.y) * 0.42);
  col = mix(col, vec3(0.008, 0.038, 0.026), mNear * edge * 0.94);

  /* --- pollen drifting in the shafts ----------------------------------- */

  float motes = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec2 mp = p * (7.0 + fi * 5.0);
    mp.y += t * (0.055 + fi * 0.035) - uScroll * (0.9 + fi);
    mp.x += sin(t * 0.3 + fi * 2.1 + mp.y * 0.6) * 0.22;
    vec2 cell = floor(mp);
    vec2 f = fract(mp) - 0.5;
    float rndm = hash(cell + fi * 41.0);
    // Only a small fraction of cells hold a mote, or it reads as static.
    float on = step(0.965 - fi * 0.006, rndm);
    float d = length(f - (vec2(hash(cell + 7.0), hash(cell + 19.0)) - 0.5) * 0.6);
    motes += on * smoothstep(0.09, 0.0, d) * (0.55 + 0.45 * sin(t * 1.4 + rndm * 30.0));
  }
  col += vec3(0.72, 0.86, 0.58) * motes * 0.5;

  /* --- finishing ------------------------------------------------------- */

  // Warm rim at the very top so the hero never sits on flat colour.
  col += vec3(0.10, 0.09, 0.04) * smoothstep(0.55, 1.0, uv.y) * (1.0 - uScroll);

  // Vignette pulls focus to the centre column where the copy lives.
  float vig = 1.0 - 0.62 * pow(length(p * vec2(0.72, 0.95)), 2.1);
  col *= vig;

  // Dither: large flat greens band badly on 8-bit displays without it.
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.006;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ForestBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = prefersReducedMotion();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL: the CSS gradient underneath is already a valid background.
      return;
    }

    const lowPower = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOctaves: { value: lowPower ? 3 : 5 },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        depthTest: false,
        depthWrite: false,
      }),
    );
    scene.add(mesh);

    /* --- inputs -------------------------------------------------------- */

    const target = { scroll: 0, mx: 0, my: 0 };
    const current = { scroll: 0, mx: 0, my: 0 };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.scroll = max > 0 ? window.scrollY / max : 0;
    };

    const onPointer = (e: PointerEvent) => {
      target.mx = (e.clientX / window.innerWidth) * 2 - 1;
      target.my = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (!lowPower) window.addEventListener("pointermove", onPointer, { passive: true });

    /* --- loop ---------------------------------------------------------- */

    // Pause entirely when the tab is hidden or the canvas is off-screen.
    let visible = true;
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;

      // Critically damped follow keeps parallax from snapping.
      current.scroll += (target.scroll - current.scroll) * 0.08;
      current.mx += (target.mx - current.mx) * 0.045;
      current.my += (target.my - current.my) * 0.045;

      uniforms.uScroll.value = current.scroll;
      uniforms.uMouse.value.set(current.mx, current.my);
      // Reduced motion still gets the scene, just without the drift.
      if (!reduced) uniforms.uTime.value = clock.getElapsedTime();

      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // Painted before WebGL initialises, and the fallback if it never does.
        background:
          "radial-gradient(120% 80% at 30% 0%, #123a27 0%, #071c13 45%, #04120c 100%)",
      }}
    />
  );
}

# Project notes for agents

- Framework: **TanStack Start** (`@tanstack/react-start`) on Vite — not Next.js.
  Routes live in `src/routes/` (file-based); `src/routeTree.gen.ts` is generated
  by the Vite plugin (commit it; do not edit it). The bundled guide is at
  `node_modules/@tanstack/react-start/skills/react-start/SKILL.md`.
- Package manager: **pnpm** only. Never add `package-lock.json` — mixing lockfiles
  makes pnpm move packages to `node_modules/.ignored`.
- All copy, contact details and specs live in `src/data/`; components should not
  hard-code them.
- Design tokens are at the top of `src/styles.css`. Keep the page light; keep
  the navy for actions and the shell brown for crop figures.
- Performance budget: no 3D, animation or smooth-scroll libraries. Prefer CSS
  (scroll-driven animations, `position: sticky`, `<details>`) over JavaScript.

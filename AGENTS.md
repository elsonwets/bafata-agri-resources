# Project notes for agents

- Framework: **TanStack Start** (`@tanstack/react-start`) on Vite — not Next.js.
  Routes live in `src/routes/` (file-based); `src/routeTree.gen.ts` is generated
  by the Vite plugin (commit it; do not edit it). The bundled guide is at
  `node_modules/@tanstack/react-start/skills/react-start/SKILL.md`.
- Package manager: **pnpm** only. Never add `package-lock.json` — mixing lockfiles
  makes pnpm move packages to `node_modules/.ignored`.
- Copy lives in `src/i18n/{en,fr,pt}.ts` (same shape, `Dict` type) and
  `src/data/guides.ts`; facts in `src/data/site.ts`. Components read copy via
  `useDict()` and never hard-code text.
- Facts must come from the client: no invented figures, certifications, client
  names or volumes.
- Design tokens are at the top of `src/styles.css`. Keep the page light; keep
  the navy for actions and the shell brown for crop figures.
- Performance budget: no 3D, animation or smooth-scroll libraries. Prefer CSS
  (scroll-driven animations, `position: sticky`, `<details>`) over JavaScript.

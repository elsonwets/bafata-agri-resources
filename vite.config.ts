import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { siteFiles } from "./scripts/site-files.ts";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // The site is one marketing page: prerender it to static HTML so the
    // first byte comes from the CDN, not a function cold start.
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false },
    }),
    react(),
    siteFiles(),
    // No edge functions in this project; their local Deno emulation only
    // adds startup time and a CLI-version error.
    netlify({ dev: { edgeFunctions: { enabled: false } } }),
  ],
});

import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { siteFiles } from "./scripts/site-files.ts";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // The site is one marketing page: prerender it to static HTML and
    // deploy dist/client as a plain static site — no server function, so
    // nothing can cold-start or crash, and unknown URLs get /404.html.
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false },
      pages: [
        { path: "/" },
        { path: "/fr/" },
        { path: "/pt/" },
        { path: "/raw-cashew-nuts-guinea-bissau/" },
        { path: "/cashew-export-documentation/" },
        { path: "/buy-raw-cashew-nuts/" },
      ],
    }),
    react(),
    siteFiles(),
  ],
});

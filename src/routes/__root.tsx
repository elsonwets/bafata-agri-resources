import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router";

import appCss from "@/styles.css?url";
import fontUrl from "@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2?url";
import { site } from "@/data/site";
import { langFromPath } from "@/i18n";

/**
 * Only what is identical on every page lives here. Titles, descriptions,
 * canonical and hreflang links, Open Graph and JSON-LD come from each route
 * (see src/lib/seo.ts).
 */
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f3f4f0" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: site.name },
      { name: "geo.region", content: site.countryCode },
      { name: "geo.placename", content: site.city },
      { name: "geo.position", content: `${site.geo.lat};${site.geo.lng}` },
    ],
    links: [
      // The font is discovered only after the stylesheet parses; preloading
      // it removes one round trip from first paint.
      { rel: "preload", href: fontUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      // A tight crop of the tree, hardened for 16–96 px (the full emblem with
      // its wreath turns to a blur at favicon size). Google search uses the
      // 96 px PNG.
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { rel: "icon", href: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { rel: "icon", href: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "LLM summary" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const lang = useRouterState({ select: (s) => langFromPath(s.location.pathname) });

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

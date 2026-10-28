import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "@/styles.css?url";
import { site } from "@/data/site";
import { seo } from "@/data/content";
import { structuredData } from "@/data/schema";

const ogImage = `${site.url}/og-image.jpg`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "author", content: site.name },
      { name: "geo.region", content: site.countryCode },
      { name: "geo.placename", content: site.city },
      { name: "geo.position", content: `${site.geo.lat};${site.geo.lng}` },
      { name: "theme-color", content: "#f3f4f0" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:url", content: site.url },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: seo.ogAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${site.url}/` },
      { rel: "icon", href: "/brand/logo-mark.svg", type: "image/svg+xml" },
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "LLM summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        // Static, author-controlled content — no user input reaches this string.
        children: JSON.stringify(structuredData),
      },
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
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    // Prerendered pages are written as /fr/index.html, which Netlify serves at
    // /fr/ — keep the router on the same URLs.
    trailingSlash: "always",
    defaultPreload: "intent",
  });
}

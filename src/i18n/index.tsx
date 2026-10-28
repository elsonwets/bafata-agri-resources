import { createContext, useContext, type ReactNode } from "react";
import { en, type Dict } from "./en.ts";
import { fr } from "./fr.ts";
import { pt } from "./pt.ts";

export type { Dict };
export type Lang = "en" | "fr" | "pt";

export const LANGS: Lang[] = ["en", "fr", "pt"];
export const dicts: Record<Lang, Dict> = { en, fr, pt };

/** Home page path of each language. English lives at the root. */
export const homePath = (lang: Lang) => (lang === "en" ? "/" : `/${lang}/`);

/** The language a pathname belongs to. */
export const langFromPath = (pathname: string): Lang =>
  pathname.startsWith("/fr/") || pathname === "/fr"
    ? "fr"
    : pathname.startsWith("/pt/") || pathname === "/pt"
      ? "pt"
      : "en";

const Ctx = createContext<Dict>(en);

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <Ctx.Provider value={dicts[lang]}>{children}</Ctx.Provider>;
}

export const useDict = () => useContext(Ctx);
export const useLang = () => useContext(Ctx).lang as Lang;

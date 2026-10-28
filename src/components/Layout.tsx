import type { ReactNode } from "react";
import { I18nProvider, dicts, type Lang } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** Language context, skip link, header and footer around every page. */
export function Layout({
  lang,
  alternates,
  children,
}: {
  lang: Lang;
  alternates?: Partial<Record<Lang, string>>;
  children: ReactNode;
}) {
  return (
    <I18nProvider lang={lang}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
      >
        {dicts[lang].ui.skip}
      </a>
      <Header alternates={alternates} />
      <main id="main">{children}</main>
      <Footer />
    </I18nProvider>
  );
}

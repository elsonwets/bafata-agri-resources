import { LANGS, dicts, homePath, type Lang } from "@/i18n";
import { homeGraph } from "@/data/schema";
import { pageHead } from "@/lib/seo";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/sections/Hero";
import { Origin } from "@/components/sections/Origin";
import { Operation } from "@/components/sections/Operation";
import { Journey } from "@/components/sections/Journey";
import { Quality } from "@/components/sections/Quality";
import { Paperwork } from "@/components/sections/Paperwork";
import { Markets } from "@/components/sections/Markets";
import { Pillars } from "@/components/sections/Pillars";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Gallery } from "@/components/sections/Gallery";
import { Facts } from "@/components/sections/Facts";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const alternates = Object.fromEntries(LANGS.map((l) => [l, homePath(l)])) as Record<Lang, string>;

/** <head> of the home page in one language. */
export const homeHead = (lang: Lang) =>
  pageHead({
    lang,
    path: homePath(lang),
    title: dicts[lang].meta.title,
    description: dicts[lang].meta.description,
    alternates,
    jsonLd: homeGraph(lang),
  });

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <Layout lang={lang} alternates={alternates}>
      <Hero />
      <Origin />
      <Operation />
      <Journey />
      <Quality />
      <Paperwork />
      <Markets />
      <Pillars />
      <HowToBuy />
      <Gallery />
      <Facts />
      <Faq />
      <Contact />
    </Layout>
  );
}

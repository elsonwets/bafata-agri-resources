import { Hero } from "@/components/sections/Hero";
import { Origin } from "@/components/sections/Origin";
import { Operation } from "@/components/sections/Operation";
import { Journey } from "@/components/sections/Journey";
import { QualityWall } from "@/components/sections/QualityWall";
import { Paperwork } from "@/components/sections/Paperwork";
import { Markets } from "@/components/sections/Markets";
import { Pillars } from "@/components/sections/Pillars";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Gallery } from "@/components/sections/Gallery";
import { MapBissau } from "@/components/sections/MapBissau";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Origin />
      <Operation />
      <Journey />
      <QualityWall />
      <Paperwork />
      <Pillars />
      <Markets />
      <HowToBuy />
      <Gallery />
      <MapBissau />
      <Faq />
      <Contact />
    </>
  );
}

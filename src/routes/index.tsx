import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Header />
      <main id="main">
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
      </main>
      <Footer />
    </>
  );
}

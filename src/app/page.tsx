import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/hero/Hero";
import { Corridor } from "@/components/corridor/Corridor";
import { SourcingMap } from "@/components/maps/SourcingMap";
import { ExportMap } from "@/components/maps/ExportMap";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />

        <Corridor />

        <section id="sourcing" className="py-32 md:py-48">
          <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
            <h2 className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Every lot starts on a village scale in the interior.
            </h2>
            <div className="mt-16">
              <SourcingMap />
            </div>
          </div>
        </section>

        <section id="markets" className="py-32 md:py-48">
          <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
            <h2 className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              And leaves Bissau for three markets.
            </h2>
            <div className="mt-16">
              <ExportMap />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

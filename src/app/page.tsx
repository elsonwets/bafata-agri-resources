import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { Corridor } from "@/components/corridor/Corridor";
import { SourcingMap } from "@/components/maps/SourcingMap";
import { ExportMap } from "@/components/maps/ExportMap";
import { Bento } from "@/components/sections/Bento";
import { CrmStack } from "@/components/sections/CrmStack";
import { TextReveal } from "@/components/sections/TextReveal";
import { Marquee } from "@/components/sections/Marquee";
import { PhotoEssay } from "@/components/sections/PhotoEssay";
import { Faq } from "@/components/sections/Faq";
import { ContactForm } from "@/components/form/ContactForm";
import { buildAllJsonLd } from "@/lib/seo/jsonld";
import { COMPANY } from "@/config/company";

const section = "py-28 md:py-44";
const container = "mx-auto max-w-[100rem] px-6 sm:px-10";
const h2 =
  "max-w-4xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAllJsonLd()) }}
      />

      <Nav />

      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />

        <Corridor />

        <section className={section}>
          <div className={container}>
            <TextReveal>
              Buying raw cashew nuts in West Africa usually means trusting a
              counterparty you cannot see. We would rather show you the
              warehouse, the lots and the quay, and let the chain make the
              argument.
            </TextReveal>
          </div>
        </section>

        <section id="operation" className={section}>
          <div className={container}>
            <h2 className={h2}>What you get from one counterparty.</h2>
            <div className="mt-14">
              <Bento />
            </div>
          </div>
        </section>

        <Marquee />

        <section id="sourcing" className={section}>
          <div className={container}>
            <h2 className={h2}>
              Every lot starts on a village scale in the interior.
            </h2>
            <div className="mt-16">
              <SourcingMap />
            </div>
          </div>
        </section>

        <section id="markets" className={section}>
          <div className={container}>
            <h2 className={h2}>And leaves Bissau for three markets.</h2>
            <div className="mt-16">
              <ExportMap />
            </div>
          </div>
        </section>

        <section id="portal" className={section}>
          <div className={container}>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h2 className={h2}>Control your stock from anywhere.</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-[color:var(--color-bone)]/70">
                  A client portal for stock, lots, contracts and shipment
                  milestones. It is in preparation, so what follows is a
                  preview rather than the live product.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-block rounded-full border border-[color:var(--color-bone)]/35 px-7 py-3.5 font-medium transition-colors hover:border-[color:var(--color-bone)] hover:bg-white/5"
                >
                  Request portal access
                </a>
              </div>
              <CrmStack />
            </div>
          </div>
        </section>

        <section id="essay" className={section}>
          <div className={container}>
            <h2 className={h2}>The operation, photographed.</h2>
            <div className="mt-14">
              <PhotoEssay />
            </div>
          </div>
        </section>

        <section id="faq" className={section}>
          <div className={container}>
            <h2 className={h2}>Questions buyers ask first.</h2>
            <div className="mt-14">
              <Faq />
            </div>
          </div>
        </section>

        <section id="contact" className={`${section} relative`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(90% 70% at 50% 0%, rgba(201,162,39,0.16) 0%, transparent 60%)",
            }}
          />
          <div className={container}>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
              <div>
                <h2 className={h2}>
                  The {COMPANY.campaign.opening.split(" ")[1]} campaign is
                  decided before it opens.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-[color:var(--color-bone)]/70">
                  Preparation opens in {COMPANY.campaign.preparation} and the
                  official campaign in {COMPANY.campaign.opening}. Tell us
                  what you need and we will come back with what we can commit
                  to.
                </p>
                <p className="mt-8 text-[color:var(--color-bone)]/50">
                  Or write to{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-[color:var(--color-gold)] underline underline-offset-4"
                  >
                    {COMPANY.email}
                  </a>
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

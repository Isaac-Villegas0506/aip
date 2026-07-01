import { AboutInstitution } from "@/components/AboutInstitution";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InfoSections } from "@/components/InfoSections";
import { NewsSection } from "@/components/NewsSection";
import { OfficialLinks } from "@/components/OfficialLinks";
import { ProjectSection } from "@/components/ProjectSection";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";

export default function Home() {
  return (
    <main id="contenido" className="min-h-screen overflow-x-clip bg-cream">
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-aip-green focus:px-4 focus:py-3 focus:font-extrabold focus:text-white focus:shadow-soft"
      >
        Saltar al contenido
      </a>
      <Header />
      <div className="overflow-hidden pt-[90px] md:pt-[104px]">
        <Hero />

        <section className="aip-shell grid gap-5 py-8 lg:grid-cols-2">
          <NewsSection />
          <ProjectSection />
        </section>

        <ProjectsShowcase />
        <InfoSections />
        <OfficialLinks />
        <AboutInstitution />
        <Footer />
      </div>
    </main>
  );
}

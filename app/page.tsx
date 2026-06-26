import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InfoSections } from "@/components/InfoSections";
import { NewsSection } from "@/components/NewsSection";
import { ProjectSection } from "@/components/ProjectSection";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { TeacherCard } from "@/components/TeacherCard";

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
      <div className="mx-auto max-w-[1500px] overflow-hidden">
        <Hero />
        <section className="grid gap-4 md:gap-6 px-5 py-6 md:px-10 lg:grid-cols-3 lg:px-12 mt-4">
          <NewsSection />
          <ProjectSection />
          <TeacherCard />
        </section>

        <ProjectsShowcase />
        <InfoSections />
        <Footer />
      </div>
    </main>
  );
}

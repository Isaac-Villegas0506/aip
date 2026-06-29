import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectMediaCarousel } from "@/components/ProjectMediaCarousel";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ArrowLeft, CheckCircle2, Clock3, GraduationCap, Tag, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Aula AIP"
    };
  }

  return {
    title: `${project.title} | Aula AIP`,
    description: project.shortDescription
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-cream">
      <Header />

      <section className="relative overflow-hidden px-5 pb-12 pt-8 md:px-10 lg:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-aip-greenSoft" />
          <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-aip-yellowSoft" />
          <div className="absolute bottom-10 left-[38%] h-24 w-24 rounded-full bg-aip-red/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px]">
          <Link
            href="/#proyectos"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-aip-green bg-white px-4 text-sm font-extrabold text-aip-greenDark shadow-card transition hover:bg-aip-greenSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.75fr)] lg:items-start">
            <ProjectMediaCarousel project={project} />

            <aside className="rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8">
              <span className={`inline-flex rounded-lg border px-4 py-1 text-sm font-extrabold ${badgeClass(project.tone)}`}>
                {project.grade}
              </span>
              <h1 className="mt-5 text-3xl font-black leading-tight text-aip-greenDark md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg font-semibold leading-relaxed text-ink">
                {project.description}
              </p>

              <div className="mt-6 grid gap-3">
                <InfoPill icon={<GraduationCap className="h-5 w-5" />} label="Equipo" value={project.team} />
                <InfoPill icon={<Clock3 className="h-5 w-5" />} label="Duración" value={project.duration} />
                <InfoPill icon={<Users className="h-5 w-5" />} label="Participación" value="Trabajo colaborativo" />
              </div>

              <div className="mt-7">
                <h2 className="text-xl font-black text-aip-greenDark">Objetivo</h2>
                <p className="mt-2 text-base font-semibold leading-relaxed text-muted">{project.objective}</p>
              </div>

              <div className="mt-7">
                <h2 className="text-xl font-black text-aip-greenDark">Herramientas</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="inline-flex items-center gap-2 rounded-md border border-aip-green bg-aip-greenSoft px-3 py-1 text-sm font-extrabold text-aip-greenDark">
                      <Tag className="h-3.5 w-3.5" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ProjectListCard title="Proceso del proyecto" items={project.process} />
            <ProjectListCard title="Resultados logrados" items={project.results} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoPill({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-aip-greenSoft text-aip-greenDark">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-black uppercase tracking-wide text-muted">{label}</span>
        <span className="block text-sm font-extrabold text-ink">{value}</span>
      </span>
    </div>
  );
}

function ProjectListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6 shadow-card md:p-8">
      <h2 className="text-2xl font-black text-aip-greenDark">{title}</h2>
      <ul className="mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base font-semibold leading-relaxed text-ink">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aip-green" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function badgeClass(tone: "green" | "yellow" | "red") {
  if (tone === "red") {
    return "border-aip-red bg-red-50 text-aip-red";
  }

  if (tone === "yellow") {
    return "border-aip-yellow bg-aip-yellowSoft text-aip-greenDark";
  }

  return "border-aip-green bg-aip-greenSoft text-aip-greenDark";
}

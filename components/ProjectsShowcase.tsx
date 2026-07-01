"use client";

import { filters, projects, type ProjectTone, type ProjectVisual as ProjectVisualName } from "@/lib/projects";
import { ArrowRight, CirclePlay, Smartphone, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState(() => {
    if (typeof window === "undefined") return "Todos";

    const grade = new URLSearchParams(window.location.search).get("grado");
    return grade && filters.includes(grade) ? grade : "Todos";
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (activeFilter === "Todos") {
      params.delete("grado");
    } else {
      params.set("grado", activeFilter);
    }

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [activeFilter]);

  const visibleProjects = useMemo(
    () => activeFilter === "Todos" ? projects : projects.filter((project) => project.grade === activeFilter),
    [activeFilter]
  );

  return (
    <section id="proyectos" className="section-anchor aip-shell py-10">
      <div>
        <h2 className="text-3xl font-black leading-tight text-ink md:text-4xl">Proyectos</h2>
        <p className="mt-2 text-base font-semibold text-muted">Creatividad, tecnología y trabajo en equipo.</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3" aria-label="Filtrar proyectos por grado">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={`min-h-10 cursor-pointer rounded-lg border px-5 text-sm font-black transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
              activeFilter === filter
                ? "border-aip-green bg-aip-green text-white shadow-card"
                : "border-aip-green bg-white text-aip-greenDark hover:bg-aip-greenSoft"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visibleProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/proyectos/${project.slug}`}
            className="motion-card group overflow-hidden rounded-2xl border border-line bg-white shadow-card hover:border-aip-green/35 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green focus-visible:ring-offset-4"
          >
            <ProjectVisual visual={project.visual} tone={project.tone} grade={project.grade} />
            <div className="p-5">
              <h3 className="text-xl font-black leading-tight text-aip-greenDark">{project.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm font-semibold leading-relaxed text-muted">
                {project.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-black ${badgeClass(project.tone)}`}>
                    <Tag className="size-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-aip-greenDark">
                Ver proyecto
                <ArrowRight className="motion-arrow size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProjectVisual({ visual, tone, grade }: { visual: ProjectVisualName; tone: ProjectTone; grade: string }) {
  const color = tone === "red" ? "bg-aip-red" : tone === "yellow" ? "bg-aip-yellow text-aip-greenDark" : "bg-aip-green";

  return (
    <div className="relative min-h-[190px] overflow-hidden bg-white">
      <span className={`absolute right-5 top-5 z-10 rounded-lg px-3 py-1 text-xs font-black text-white ${color}`}>
        {grade}
      </span>
      <div className="absolute inset-3 overflow-hidden rounded-xl bg-aip-yellowSoft">
        {visual === "app" ? <AppMockup /> : visual === "print" ? <PrinterMockup /> : <RobotMockup />}
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-aip-green/82 text-white shadow-soft transition duration-200 group-hover:scale-110">
          <CirclePlay className="size-9" />
        </span>
      </div>
    </div>
  );
}

function RobotMockup() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#F7EAC1]">
      <div className="relative h-24 w-48 rounded-xl bg-aip-green shadow-soft">
        <div className="absolute -top-10 left-11 h-14 w-24 rounded-lg border-4 border-aip-greenDark bg-[#19331F]" />
        <div className="absolute left-4 top-14 size-12 rounded-full border-8 border-aip-yellow bg-ink" />
        <div className="absolute right-4 top-14 size-12 rounded-full border-8 border-aip-yellow bg-ink" />
        <div className="absolute left-20 top-8 size-6 rounded-full bg-white" />
      </div>
    </div>
  );
}

function AppMockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#FFF2C8]">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-32 w-16 rounded-xl border-[3px] border-aip-greenDark bg-white p-1.5 shadow-soft">
          <div className="h-4 rounded bg-aip-green" />
          <div className="mt-2 grid gap-1.5">
            <span className="h-5 rounded bg-aip-greenSoft" />
            <span className="h-5 rounded bg-aip-yellowSoft" />
            <span className="h-5 rounded bg-aip-greenSoft" />
          </div>
        </div>
      ))}
      <Smartphone className="absolute left-8 top-8 size-12 text-aip-greenDark" />
    </div>
  );
}

function PrinterMockup() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#F6F1E6]">
      <div className="relative h-36 w-52 rounded-xl border-8 border-neutral-800 bg-neutral-700">
        <div className="absolute bottom-4 left-1/2 size-16 -translate-x-1/2 rounded-[42%_58%_48%_52%] bg-aip-red" />
        <div className="absolute left-5 right-5 top-5 h-4 rounded bg-neutral-500" />
      </div>
    </div>
  );
}

function badgeClass(tone: ProjectTone) {
  if (tone === "red") return "border-aip-red bg-red-50 text-aip-red";
  if (tone === "yellow") return "border-aip-yellow bg-aip-yellowSoft text-aip-greenDark";
  return "border-aip-green bg-aip-greenSoft text-aip-greenDark";
}

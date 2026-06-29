"use client";

import { filters, projects, type ProjectTone, type ProjectVisual as ProjectVisualName } from "@/lib/projects";
import { CirclePlay, Lightbulb, Rocket, Smartphone, Star, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState(() => {
    if (typeof window === "undefined") {
      return "Todos";
    }

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
    <section id="proyectos" className="section-anchor relative overflow-hidden px-5 py-14 md:px-10 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-56 w-72 rounded-[55%_45%_58%_42%] bg-aip-greenSoft" />
        <div className="absolute -right-16 top-8 h-52 w-52 rounded-full bg-aip-yellowSoft" />
        <Rocket className="absolute right-12 top-24 hidden h-20 w-20 rotate-45 text-aip-greenDark md:block" strokeWidth={2.1} />
        <Lightbulb className="absolute right-[30%] top-16 hidden h-14 w-14 text-aip-yellow md:block" strokeWidth={2.1} />
        <Star className="absolute left-[29%] top-8 hidden h-10 w-10 text-aip-green md:block" />
        <Star className="absolute left-[31%] top-28 hidden h-7 w-7 text-aip-red md:block" />
        <svg className="doodle-dash absolute left-16 top-24 hidden h-32 w-72 text-aip-yellow md:block" viewBox="0 0 300 130" fill="none">
          <path d="M7 92C50 30 114 92 147 48C177 8 190 38 164 55C126 80 266 29 291 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <svg className="doodle-dash absolute right-28 top-12 hidden h-32 w-72 text-aip-green md:block" viewBox="0 0 300 130" fill="none">
          <path d="M8 45C70 5 113 64 72 78C28 94 102 139 171 69C230 8 261 54 294 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="text-center">
          <h2 className="font-sans text-6xl font-black leading-none text-aip-greenDark md:text-7xl">Proyectos</h2>
          <div className="mx-auto mt-2 h-2 w-64 max-w-full rounded-full bg-aip-yellow" />
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-ink">
            Descubre los proyectos desarrollados en el Aula AIP.
            <br />
            Creatividad, tecnología y trabajo en equipo.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4" aria-label="Filtrar proyectos por grado">
          <span className="text-lg font-extrabold text-aip-greenDark">Filtrar por grado:</span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-10 cursor-pointer rounded-lg border px-6 text-sm font-extrabold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
                activeFilter === filter
                  ? "border-aip-green bg-aip-green text-white shadow-card"
                  : "border-aip-green bg-white text-aip-greenDark hover:bg-aip-greenSoft"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5" aria-live="polite">
          {visibleProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/proyectos/${project.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green focus-visible:ring-offset-4 md:grid-cols-[43%_57%]"
            >
              <ProjectVisual visual={project.visual} tone={project.tone} />
              <div className="p-6 md:p-8">
                <span className={`inline-flex rounded-lg border px-4 py-1 text-sm font-extrabold ${badgeClass(project.tone)}`}>
                  {project.grade}
                </span>
                <h3 className="mt-4 text-3xl font-black leading-tight text-aip-greenDark">{project.title}</h3>
                <p className="mt-3 text-base font-semibold leading-relaxed text-ink">{project.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm font-extrabold ${badgeClass(project.tone)}`}>
                      <Tag className="h-3.5 w-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-aip-red px-5 text-sm font-extrabold text-white shadow-card transition group-hover:bg-aip-redDark">
                  Ver proyecto
                  <Rocket className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ visual, tone }: { visual: ProjectVisualName; tone: ProjectTone }) {
  const color = tone === "red" ? "bg-aip-red" : tone === "yellow" ? "bg-aip-yellow" : "bg-aip-green";

  return (
    <div className="relative min-h-[220px] overflow-hidden bg-aip-greenDark md:min-h-[260px]">
      <div className={`absolute inset-y-0 left-0 w-4 ${color}`} />
      <div className="absolute inset-4 overflow-hidden rounded-lg bg-gradient-to-br from-aip-greenSoft via-aip-yellowSoft to-white">
        {visual === "app" ? <AppMockup /> : visual === "print" ? <PrinterMockup /> : <RobotMockup />}
        <div className="absolute inset-0 bg-black/10" />
        <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-aip-greenDark/70 text-white shadow-soft transition duration-200 group-hover:scale-105">
          <CirclePlay className="h-14 w-14" />
        </span>
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-xs font-bold text-white">
          <span>0:00 / {visual === "app" ? "1:35" : visual === "print" ? "2:10" : "1:45"}</span>
          <span className="h-1 flex-1 rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  );
}

function RobotMockup() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-28 w-52 rounded-xl bg-aip-green shadow-soft">
        <div className="absolute -top-12 left-12 h-16 w-28 rounded-lg border-4 border-aip-greenDark bg-[#19331F]" />
        <div className="absolute left-5 top-16 h-14 w-14 rounded-full border-8 border-aip-yellow bg-ink" />
        <div className="absolute right-5 top-16 h-14 w-14 rounded-full border-8 border-aip-yellow bg-ink" />
        <div className="absolute left-20 top-9 h-7 w-7 rounded-full bg-white" />
        <div className="absolute right-20 top-9 h-7 w-7 rounded-full bg-white" />
      </div>
    </div>
  );
}

function AppMockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-44 w-24 rounded-2xl border-4 border-aip-greenDark bg-white p-2 shadow-soft">
          <div className="h-5 rounded bg-aip-green" />
          <div className="mt-3 grid gap-2">
            <span className="h-6 rounded bg-aip-greenSoft" />
            <span className="h-6 rounded bg-aip-yellowSoft" />
            <span className="h-6 rounded bg-aip-greenSoft" />
            <span className="h-6 rounded bg-aip-yellowSoft" />
          </div>
        </div>
      ))}
      <Smartphone className="absolute left-9 top-9 h-16 w-16 text-aip-greenDark" />
    </div>
  );
}

function PrinterMockup() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#1A221C]">
      <div className="absolute left-10 right-10 top-10 h-6 rounded bg-neutral-700" />
      <div className="absolute bottom-10 h-24 w-24 rounded-[42%_58%_48%_52%] bg-aip-green shadow-soft" />
      <div className="absolute bottom-8 left-14 right-14 h-3 rounded bg-neutral-600" />
    </div>
  );
}

function badgeClass(tone: ProjectTone) {
  if (tone === "red") {
    return "border-aip-red bg-red-50 text-aip-red";
  }

  if (tone === "yellow") {
    return "border-aip-yellow bg-aip-yellowSoft text-aip-greenDark";
  }

  return "border-aip-green bg-aip-greenSoft text-aip-greenDark";
}

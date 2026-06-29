"use client";

import type { AipProject, ProjectMedia } from "@/lib/projects";
import { ChevronLeft, ChevronRight, ImageIcon, Play, Video } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export function ProjectMediaCarousel({ project }: { project: AipProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = project.media[activeIndex];
  const activeLabel = `${activeMedia.type === "video" ? "Video" : "Imagen"} ${activeIndex + 1} de ${project.media.length}`;

  const progress = useMemo(
    () => `${((activeIndex + 1) / project.media.length) * 100}%`,
    [activeIndex, project.media.length]
  );

  const goToPrevious = () => {
    setActiveIndex((index) => index === 0 ? project.media.length - 1 : index - 1);
  };

  const goToNext = () => {
    setActiveIndex((index) => index === project.media.length - 1 ? 0 : index + 1);
  };

  return (
    <section aria-label={`Galería del proyecto ${project.title}`} className="rounded-2xl border border-line bg-white p-3 shadow-soft md:p-4">
      <div className="relative overflow-hidden rounded-xl bg-aip-greenDark">
        <div className="aspect-[4/3] md:aspect-video">
          <MediaStage media={activeMedia} project={project} />
        </div>

        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-black text-aip-greenDark shadow-card md:left-4 md:top-4 md:px-4 md:py-2 md:text-sm">
          {activeMedia.type === "video" ? <Video className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
          {activeLabel}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-white">
          <h2 className="text-xl font-black leading-tight md:text-2xl">{activeMedia.title}</h2>
          <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-white/88">{activeMedia.caption}</p>
        </div>

        <button
          type="button"
          aria-label="Ver medio anterior"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-aip-greenDark shadow-card transition hover:bg-aip-yellowSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-yellow md:h-11 md:w-11"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Ver medio siguiente"
          onClick={goToNext}
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-aip-greenDark shadow-card transition hover:bg-aip-yellowSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-yellow md:h-11 md:w-11"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-aip-greenSoft" aria-hidden="true">
        <div className="h-full rounded-full bg-aip-yellow transition-all duration-300" style={{ width: progress }} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {project.media.map((media, index) => (
          <button
            key={media.title}
            type="button"
            aria-label={`Mostrar ${media.title}`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={`min-h-20 rounded-xl border p-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
              activeIndex === index
                ? "border-aip-green bg-aip-greenSoft"
                : "border-line bg-cream hover:border-aip-yellow"
            }`}
          >
            <span className="flex items-center gap-2 text-xs font-black text-aip-greenDark">
              {media.type === "video" ? <Video className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
              {media.type === "video" ? "Video" : "Imagen"}
            </span>
            <span className="mt-1 block text-sm font-black leading-tight text-ink">{media.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function MediaStage({ media, project }: { media: ProjectMedia; project: AipProject }) {
  if (media.src) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={media.src}
          alt={media.title}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className="relative grid h-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_28%_18%,#FFF3BF_0_16%,transparent_17%),linear-gradient(135deg,#004D24,#006B2E)]">
        <ProjectMockup visual={project.visual} />
        <button
          type="button"
          aria-label={`Reproducir ${media.title}`}
          className="absolute grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-aip-red text-white shadow-soft transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-yellow md:h-24 md:w-24"
        >
          <Play className="ml-1 h-10 w-10 md:h-12 md:w-12" fill="currentColor" />
        </button>
        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-xs font-bold text-white">
          <span>0:00</span>
          <span className="h-1.5 flex-1 rounded-full bg-white/75" />
          <span>{project.visual === "app" ? "1:35" : project.visual === "print" ? "2:10" : "1:45"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid h-full place-items-center overflow-hidden bg-gradient-to-br from-aip-greenSoft via-aip-yellowSoft to-white">
      <ProjectMockup visual={project.visual} />
    </div>
  );
}

function ProjectMockup({ visual }: { visual: AipProject["visual"] }) {
  if (visual === "app") {
    return (
      <div className="flex items-center justify-center gap-4 opacity-95">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-56 w-28 rounded-3xl border-4 border-aip-greenDark bg-white p-3 shadow-soft">
            <div className="h-7 rounded-lg bg-aip-green" />
            <div className="mt-4 grid gap-3">
              <span className="h-8 rounded-lg bg-aip-greenSoft" />
              <span className="h-8 rounded-lg bg-aip-yellowSoft" />
              <span className="h-8 rounded-lg bg-aip-greenSoft" />
              <span className="h-8 rounded-lg bg-aip-yellowSoft" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visual === "print") {
    return (
      <div className="relative h-64 w-72 rounded-2xl border-4 border-neutral-700 bg-[#17221A] shadow-soft">
        <div className="absolute left-8 right-8 top-8 h-5 rounded bg-neutral-500" />
        <div className="absolute bottom-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-[42%_58%_48%_52%] bg-aip-green shadow-card" />
        <div className="absolute bottom-8 left-10 right-10 h-3 rounded bg-neutral-600" />
      </div>
    );
  }

  return (
    <div className="relative h-40 w-72 rounded-2xl bg-aip-green shadow-soft">
      <div className="absolute -top-16 left-1/2 h-20 w-36 -translate-x-1/2 rounded-xl border-4 border-aip-greenDark bg-[#19331F]" />
      <div className="absolute left-6 top-24 h-16 w-16 rounded-full border-8 border-aip-yellow bg-ink" />
      <div className="absolute right-6 top-24 h-16 w-16 rounded-full border-8 border-aip-yellow bg-ink" />
      <div className="absolute left-24 top-12 h-8 w-8 rounded-full bg-white" />
      <div className="absolute right-24 top-12 h-8 w-8 rounded-full bg-white" />
    </div>
  );
}

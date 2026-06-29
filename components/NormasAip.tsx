"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Armchair,
  DoorOpen,
  Download,
  Hand,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed
} from "lucide-react";

type NormTone = "green" | "red";

const norms = [
  {
    title: "Orden al ingresar",
    fullTitle: "Ingresar de manera ordenada",
    text: "Entra con calma y respeta el turno de tus compañeros.",
    image: "/images/normas/norma1.png",
    icon: DoorOpen,
    tone: "green"
  },
  {
    title: "Aula limpia",
    fullTitle: "Mantener el AIP limpia",
    text: "Cuida el espacio de trabajo y deja tu lugar listo para el grupo.",
    image: "/images/normas/norma2.png",
    icon: Sparkles,
    tone: "green"
  },
  {
    title: "Mobiliario cuidado",
    fullTitle: "No escribir o manchar el mobiliario del AIP",
    text: "Las mesas, sillas y equipos son de todos; cuídalos.",
    image: "/images/normas/norma3.png",
    icon: Armchair,
    tone: "green"
  },
  {
    title: "No comer en AIP",
    fullTitle: "No comer en AIP",
    text: "Evita alimentos y bebidas para proteger los equipos.",
    image: "/images/normas/norma4.png",
    icon: UtensilsCrossed,
    tone: "red"
  },
  {
    title: "Manos limpias y secas",
    fullTitle: "Tener las manos limpias y secas al utilizar los equipos",
    text: "Antes de usar los equipos, asegúrate de tener las manos limpias y secas.",
    image: "/images/normas/norma5.png",
    icon: Hand,
    tone: "green"
  },
  {
    title: "Descargas autorizadas",
    fullTitle: "Descargar únicamente archivos autorizados por el docente",
    text: "Usa únicamente recursos indicados por el docente.",
    image: "/images/normas/norma6.png",
    icon: Download,
    tone: "red"
  }
] as const;

export function NormasAip() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeNorm = norms[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % norms.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  const activeDescription = useMemo(
    () => `${activeNorm.fullTitle}. ${activeNorm.text}`,
    [activeNorm]
  );

  return (
    <section id="normas" className="section-anchor relative overflow-hidden py-8 md:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute -left-24 top-24 size-64 rounded-full bg-aip-greenSoft/90" />
        <div className="absolute -right-16 bottom-14 size-52 rounded-full bg-aip-greenSoft/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] rounded-2xl border border-aip-green/20 bg-white p-3 shadow-soft md:p-5 xl:max-w-[1360px] xl:p-6">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-[#FFF8E8]">
          <div className="relative min-h-[390px] md:min-h-[310px] xl:min-h-[405px]">
            <div className="absolute inset-y-0 right-0 w-full overflow-hidden md:w-[72%]">
              <Image
                key={activeNorm.image}
                src={activeNorm.image}
                alt={`Ilustración educativa: ${activeNorm.fullTitle}`}
                fill
                priority={activeIndex === 1}
                sizes="(min-width: 1024px) 980px, 100vw"
                className="norm-hero-image object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-[#FFF8E8]/92 md:bg-gradient-to-r md:from-[#FFF8E8] md:from-0% md:via-[#FFF8E8]/96 md:via-[31%] md:to-[#FFF8E8]/0 md:to-[55%]" />

            <div className="relative z-10 flex min-h-[390px] max-w-[500px] flex-col justify-center px-6 py-7 md:min-h-[310px] md:px-8 lg:px-10 xl:min-h-[405px] xl:max-w-[520px] xl:px-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-aip-greenSoft px-4 py-2 text-xs font-black text-aip-greenDark shadow-sm xl:text-sm">
                <ShieldCheck className="size-3.5 xl:size-4" aria-hidden="true" />
                Aula AIP
              </span>
              <h2 className="mt-5 max-w-[440px] text-5xl font-black leading-[0.95] text-aip-greenDark md:text-[3.9rem] xl:mt-6 xl:text-[4.55rem]">
                Normas del Aula AIP
              </h2>
              <div className="mt-5 h-1.5 w-24 rounded-full bg-aip-green xl:mt-6" />
              <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-muted md:text-lg xl:mt-6 xl:text-xl">
                Reglas simples para cuidar los equipos, trabajar con respeto y mantener el Aula AIP lista para todos.
              </p>
              <p className="sr-only" aria-live="polite">
                {activeDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:mt-5 xl:gap-5">
          {norms.map((norm, index) => {
            const Icon = norm.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={norm.fullTitle}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={`group relative min-h-[210px] rounded-2xl border bg-white p-6 text-left shadow-card transition duration-200 hover:-translate-y-1 hover:border-aip-green hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green xl:min-h-[238px] xl:p-7 ${
                  isActive ? "border-aip-green bg-aip-greenSoft/25" : "border-line"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-12 place-items-center rounded-full text-xl font-black tabular-nums text-white shadow-card xl:size-14 xl:text-2xl ${
                      norm.tone === "red" ? "bg-aip-red" : "bg-aip-green"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`grid size-16 place-items-center rounded-full border transition duration-200 group-hover:scale-105 xl:size-[5.25rem] ${
                      norm.tone === "red"
                        ? "border-red-100 bg-red-50 text-aip-red"
                        : "border-aip-green/10 bg-aip-greenSoft text-aip-greenDark"
                    }`}
                  >
                    <Icon className="size-8 xl:size-10" aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-6 text-[1.45rem] font-black leading-tight text-aip-greenDark xl:mt-7 xl:text-[1.7rem]">
                  {norm.title}
                </h3>
                <p className="mt-3 max-w-sm text-base font-medium leading-relaxed text-muted xl:text-lg">
                  {norm.text}
                </p>
                <span
                  className={`mt-5 block h-1 w-14 rounded-full ${
                    norm.tone === "red" ? "bg-aip-red" : "bg-aip-green"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

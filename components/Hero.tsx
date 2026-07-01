import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section id="inicio" className="section-anchor aip-shell pb-6 pt-8 md:pt-10">
      <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="aip-soft-enter">

          <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.08] text-aip-greenDark md:text-[2.8rem] lg:text-[3rem]">
            Aula de Innovación Pedagógica
          </h1>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-muted">
            Espacio educativo destinado al uso responsable de herramientas tecnológicas, recursos digitales y proyectos de aprendizaje para estudiantes y docentes.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#proyectos"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-aip-green px-6 text-sm font-black text-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-aip-greenDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green focus-visible:ring-offset-4"
            >
              Ver proyectos
              <ArrowRight className="motion-arrow size-4" />
            </a>
            <a
              href="#horarios"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-aip-green bg-white px-6 text-sm font-black text-aip-greenDark transition duration-200 hover:-translate-y-0.5 hover:bg-aip-greenSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green focus-visible:ring-offset-4"
            >
              <CalendarDays className="size-4" />
              Consultar horarios
            </a>
          </div>
        </div>

        <div className="aip-float relative overflow-hidden rounded-[28px] border border-line bg-white p-2 shadow-soft">
          <Image
            src="/images/d31d5023-4f75-49fe-8fb9-4989757ea411.png"
            alt="Estudiantes usando laptop en el Aula AIP"
            width={1536}
            height={1152}
            priority
            className="aspect-[1.92/1] w-full rounded-[22px] object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

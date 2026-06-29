import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DecorativeDoodles } from "./DecorativeDoodles";

export function Hero() {
  return (
    <section id="inicio" className="section-anchor relative overflow-hidden px-5 pb-4 pt-4 md:px-10 lg:px-14">
      <div className="hero-blob absolute right-0 top-0 -z-10 h-72 w-[76%] bg-aip-yellowSoft/85" />
      <DecorativeDoodles />

      <div className="relative grid min-h-[330px] items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 max-w-xl py-6 md:py-8">
          <h1 className="font-display text-[4rem] font-normal leading-[1.05] tracking-normal text-aip-greenDark sm:text-8xl lg:text-9xl">
            Aula AIP
          </h1>
          <p className="mt-5 max-w-lg text-lg font-extrabold leading-relaxed text-ink md:text-2xl">
            Ideas que inspiran, tecnología que transforma, juntos creamos el futuro.
          </p>
          <a
            href="#proyectos"
            className="mt-7 inline-flex min-h-14 items-center gap-4 rounded-lg bg-aip-red px-7 text-lg font-extrabold text-white shadow-lg shadow-aip-red/20 transition duration-200 ease-out hover:-translate-y-1 hover:bg-aip-redDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-red focus-visible:ring-offset-4"
          >
            Ver proyectos
            <ArrowRight className="h-6 w-6" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[690px] self-end overflow-hidden">
          <Image
            src="/images/d31d5023-4f75-49fe-8fb9-4989757ea411.png"
            alt="Estudiantes colaborando con una laptop en el Aula AIP"
            width={1536}
            height={1152}
            priority
            className="relative z-10 h-auto max-h-[390px] max-w-full object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

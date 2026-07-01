import { ArrowRight, CirclePlay, Star } from "lucide-react";

export function ProjectSection() {
  return (
    <article className="motion-card flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card hover:border-aip-green/35 hover:shadow-soft">
      <h2 className="flex items-center gap-3 text-xl font-black text-aip-greenDark">
        <Star className="size-5 text-aip-green" />
        Proyecto destacado
      </h2>

      <div className="mt-6 grid flex-1 gap-5 sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-40 overflow-hidden rounded-2xl border border-line bg-aip-yellowSoft">
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            {[0, 1, 2].map((item) => (
              <span key={item} className="h-28 w-16 rounded-xl border-[3px] border-aip-greenDark bg-white p-1.5 shadow-sm">
                <span className="block h-4 rounded bg-aip-green" />
                <span className="mt-2 block h-5 rounded bg-aip-greenSoft" />
                <span className="mt-2 block h-5 rounded bg-aip-yellowSoft" />
                <span className="mt-2 block h-5 rounded bg-aip-greenSoft" />
              </span>
            ))}
          </div>
          <span className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full border-4 border-white bg-aip-green/82 text-white shadow-soft">
            <CirclePlay className="size-10" />
          </span>
        </div>

        <div>
          <h3 className="text-lg font-black leading-tight text-aip-greenDark">App Escolar: Conectando Ideas</h3>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-muted">
            Aplicación móvil para mejorar la comunicación y organización en nuestra institución.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Desarrollo Mobile", "Diseño UI/UX", "Innovación"].map((tag) => (
              <span key={tag} className="rounded-md border border-aip-yellow bg-aip-yellowSoft px-2.5 py-1 text-[11px] font-black text-aip-greenDark">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a href="#proyectos" className="group mt-6 inline-flex items-center gap-2 text-sm font-black text-aip-greenDark">
        Ver todos los proyectos
        <ArrowRight className="motion-arrow size-4" />
      </a>
    </article>
  );
}

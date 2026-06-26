import { ArrowRight, Sparkles, UsersRound } from "lucide-react";

export function ProjectSection() {
  return (
    <article className="flex flex-col h-full justify-between rounded-3xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-aip-greenDark">Proyecto destacado</h2>
        </div>
        
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col items-center justify-center text-center mb-6">
          <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
             <UsersRound className="h-8 w-8 text-aip-green" strokeWidth={2} />
          </div>
          <h3 className="text-base font-bold text-gray-800">App Escolar: Conectando Ideas</h3>
          <p className="mt-2 text-xs font-medium text-gray-500 leading-relaxed max-w-[200px]">
            Proyecto colaborativo para mejorar nuestra comunidad educativa.
          </p>
        </div>
      </div>

      <a
        href="#proyectos"
        className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-aip-green hover:text-aip-greenDark transition-colors"
      >
        Ver todos los proyectos
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

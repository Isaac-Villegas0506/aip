import { Mail, Globe2, UserRound, ArrowRight } from "lucide-react";

export function TeacherCard() {
  return (
    <article className="flex flex-col h-full justify-between rounded-3xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <h2 className="text-xl font-bold text-aip-greenDark mb-6">Docente responsable</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-green-50 text-aip-green">
            <UserRound className="h-8 w-8" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">Prof. Diego Ramos</h3>
            <p className="text-xs font-medium text-gray-500 mt-1">
              Apasionado por la tecnología y la educación.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
          <a href="mailto:diego.ramos@colegio.edu.pe" className="flex items-center gap-3 hover:text-aip-green transition-colors">
            <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
               <Mail className="h-4 w-4" />
            </div>
            <span className="truncate">diego.ramos@colegio.edu.pe</span>
          </a>
          <a href="#recursos" className="flex items-center gap-3 hover:text-aip-green transition-colors">
            <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
               <Globe2 className="h-4 w-4" />
            </div>
            <span>Plataforma AIP</span>
          </a>
        </div>
      </div>

      <a
        href="#contacto"
        className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-aip-green hover:text-aip-greenDark transition-colors"
      >
        Contactar docente
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

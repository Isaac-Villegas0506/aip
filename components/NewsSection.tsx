import { ArrowRight, CalendarDays } from "lucide-react";

const news = [
  ["Taller Robótica Educativa", "16 de mayo, 2024"],
  ["Nuevo repositorio de guías", "8 de mayo, 2024"],
  ["Concurso: STEM Innovar 2024", "2 de mayo, 2024"]
] as const;

export function NewsSection() {
  return (
    <article id="noticias" className="flex flex-col h-full justify-between rounded-3xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <h2 className="text-xl font-bold text-aip-greenDark mb-6">Noticias destacadas</h2>
        <ul className="grid gap-5">
          {news.map(([title, date]) => (
            <li key={title} className="flex gap-4 items-start">
              <div className="mt-1 bg-green-50 p-2 rounded-lg text-aip-green">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 leading-snug">{title}</h3>
                <p className="mt-0.5 text-xs font-medium text-gray-500">{date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#noticias-detalle"
        className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-aip-green hover:text-aip-greenDark transition-colors"
      >
        Ver todas las noticias
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

import { ArrowRight, Bell, CalendarDays } from "lucide-react";

const news = [
  ["Taller Robótica Educativa", "16 de mayo, 2024"],
  ["Nuevo repositorio de guías", "8 de mayo, 2024"],
  ["Concurso: STEM Innovar 2024", "2 de mayo, 2024"]
] as const;

export function NewsSection() {
  return (
    <article id="noticias" className="motion-card section-anchor flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card hover:border-aip-green/35 hover:shadow-soft">
      <h2 className="flex items-center gap-3 text-xl font-black text-aip-greenDark">
        <Bell className="size-5 text-aip-green" />
        Noticias y actividades recientes
      </h2>
      <ul className="mt-6 grid gap-4">
        {news.map(([title, date]) => (
          <li key={title} className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-aip-greenSoft text-aip-green">
              <CalendarDays className="size-5" />
            </span>
            <span>
              <strong className="block text-sm font-black leading-snug text-ink">{title}</strong>
              <span className="mt-1 block text-xs font-bold text-muted">{date}</span>
            </span>
          </li>
        ))}
      </ul>
      <a href="#noticias-detalle" className="group mt-auto inline-flex items-center gap-2 pt-7 text-sm font-black text-aip-greenDark">
        Ver todas las noticias
        <ArrowRight className="motion-arrow size-4" />
      </a>
    </article>
  );
}

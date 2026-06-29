import { BookOpenCheck, Camera, CheckCircle2, Clock3, MonitorPlay } from "lucide-react";
import { HorariosAip } from "./HorariosAip";
import { NormasAip } from "./NormasAip";

const sections = [
  {
    id: "horarios",
    title: "Horarios",
    icon: Clock3,
    text: "Disponibilidad organizada por bloques para clases, talleres, investigación y producción multimedia.",
    items: ["Turno mañana: 07:15 AM - 12:45 PM", "Turno tarde: 01:05 PM - 06:35 PM", "Reservas actualizadas por API"]
  },
  {
    id: "recursos",
    title: "Recursos",
    icon: BookOpenCheck,
    text: "Materiales listos para docentes y estudiantes: guías, plantillas, rúbricas y enlaces de apoyo.",
    items: ["Guías de video y presentaciones", "Plantillas para proyectos STEM", "Banco de herramientas digitales"]
  },
  {
    id: "galeria",
    title: "Galería",
    icon: Camera,
    text: "Momentos del aula: robótica, presentaciones, producción audiovisual y ferias de innovación.",
    items: ["Talleres de robótica", "Muestras de proyectos", "Sesiones de creación digital"]
  }
] as const;

export function InfoSections() {
  return (
    <section id="noticias-detalle" className="px-5 py-8 md:px-10 lg:px-12">
      <HorariosAip />
      <NormasAip />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ id, title, icon: Icon, text, items }) => (
          <article key={id} id={id} className="section-anchor rounded-2xl border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-aip-greenSoft text-aip-greenDark">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-extrabold text-aip-greenDark">{title}</h2>
            </div>
            <p className="mt-4 font-medium leading-relaxed text-muted">{text}</p>
            <ul className="mt-5 grid gap-2 text-sm font-bold text-muted">
              {items.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-aip-green" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article id="laboratorio-ideas" className="section-anchor rounded-2xl border border-line bg-gradient-to-br from-aip-yellowSoft to-white p-6 shadow-card md:col-span-2">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-aip-red text-white">
              <MonitorPlay className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-extrabold text-aip-greenDark">Laboratorio de ideas</h2>
          </div>
          <p className="mt-4 max-w-3xl font-medium leading-relaxed text-muted">
            La web queda preparada para crecer con páginas de detalle, proyectos por grado, galerías por evento y paneles conectados a Supabase.
          </p>
        </article>
      </div>
    </section>
  );
}

import { ArrowRight, Globe2, Mail, UserRound } from "lucide-react";

export function TeacherCard() {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
      <h2 className="flex items-center gap-3 text-xl font-black text-aip-greenDark">
        <UserRound className="size-5 text-aip-green" />
        Docente responsable
      </h2>

      <div className="mt-6 flex items-center gap-4">
        <span className="grid size-20 shrink-0 place-items-center rounded-full bg-aip-greenSoft text-aip-greenDark">
          <UserRound className="size-10" />
        </span>
        <span>
          <strong className="block text-lg font-black text-ink">JOHN VALENZUELA TORRES</strong>
          <span className="mt-1 block text-sm font-semibold leading-relaxed text-muted">
            Responsable del Aula de Innovación Pedagógica.
          </span>
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm font-bold text-muted">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream text-muted">
            <Mail className="size-4" />
          </span>
          <span className="truncate">Plataforma informativa Aula AIP</span>
        </span>
        <a href="#enlaces-institucionales" className="flex items-center gap-3 hover:text-aip-greenDark">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream text-muted">
            <Globe2 className="size-4" />
          </span>
          Recursos institucionales
        </a>
      </div>

      <a href="#contacto" className="group mt-auto inline-flex items-center gap-2 pt-7 text-sm font-black text-aip-greenDark">
        Contactar docente
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </a>
    </article>
  );
}

import { Building2, Cpu, GraduationCap, Info, MapPin, UserRound } from "lucide-react";
import type { ReactNode } from "react";

const institutionRows = [
  { label: "Institución Educativa", value: "Nicolás La Torre García", icon: Building2 },
  { label: "Nivel", value: "Secundaria", icon: GraduationCap },
  { label: "Distrito", value: "José Leonardo Ortiz", icon: MapPin },
  { label: "Provincia", value: "Chiclayo", icon: MapPin },
  { label: "Región", value: "Lambayeque", icon: MapPin },
  { label: "Área", value: "Aula de Innovación Pedagógica", icon: Cpu },
  { label: "Responsable", value: "JOHN VALENZUELA TORRES", icon: UserRound }
] as const;

export function AboutInstitution() {
  return (
    <section id="sobre-nosotros" className="section-anchor aip-shell py-10">
      <div className="aip-soft-enter overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <article className="relative border-b border-line bg-aip-green p-7 text-white lg:border-b-0 lg:border-r md:p-9">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white px-4 py-2 text-xs font-black text-aip-green">
              <Info className="size-4" />
              Plataforma informativa interna
            </span>
            <h2 className="mt-6 text-3xl font-black leading-tight md:text-4xl">Sobre el Aula AIP</h2>
            <p className="mt-5 max-w-xl text-base font-bold leading-relaxed text-white md:text-lg">
              El Aula de Innovación Pedagógica es un espacio de apoyo educativo donde los estudiantes desarrollan actividades con computadoras, internet, recursos digitales y herramientas tecnológicas.
            </p>
            <p className="mt-4 max-w-xl text-sm font-bold leading-relaxed text-white">
              Su finalidad es fortalecer el aprendizaje mediante proyectos, investigación, creatividad y trabajo colaborativo.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <MiniStat label="Código modular" value="0452854" />
              <MiniStat label="Gestión" value="Pública directa" />
            </div>
          </article>

          <article className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-3 text-2xl font-black text-aip-greenDark">
                <span className="grid size-11 place-items-center rounded-2xl bg-aip-greenSoft text-aip-green">
                  <Building2 className="size-6" />
                </span>
                Información institucional
              </h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {institutionRows.map(({ label, value, icon: Icon }) => (
                <InfoTile key={label} label={label} value={value} icon={<Icon className="size-4" />} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="motion-card rounded-2xl border border-white/45 bg-white p-4 text-aip-green hover:bg-white">
      <span className="block text-xs font-bold text-aip-green">{label}</span>
      <strong className="mt-1 block text-lg font-black text-ink">{value}</strong>
    </div>
  );
}

function InfoTile({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="motion-card rounded-2xl border border-line bg-white p-4 hover:border-aip-green/35 hover:bg-aip-greenSoft">
      <div className="flex items-center gap-2 text-aip-green">
        {icon}
        <span className="text-xs font-black text-muted">{label}</span>
      </div>
      <strong className="mt-2 block text-sm font-black leading-snug text-ink">{value}</strong>
    </div>
  );
}

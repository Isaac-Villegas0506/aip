import { ArrowRight, ExternalLink, Link2, ShieldCheck } from "lucide-react";
import Image from "next/image";

const links = [
  {
    title: "MINEDU",
    logo: "/images/institutional/minedu.png",
    description: "Portal oficial del Ministerio de Educación del Perú.",
    href: "https://www.gob.pe/minedu",
    panel: "bg-white"
  },
  {
    title: "PerúEduca",
    logo: "/images/institutional/perueduca.svg",
    description: "Materiales educativos digitales para docentes, estudiantes y familias.",
    href: "https://www.perueduca.pe",
    panel: "bg-aip-greenDark"
  },
  {
    title: "SIAGIE",
    logo: "/images/institutional/siagie.png",
    description: "Sistema del MINEDU para gestión académica y administrativa.",
    href: "https://siagie.minedu.gob.pe",
    panel: "bg-white"
  },
  {
    title: "ESCALE",
    logo: "/images/institutional/escale.png",
    description: "Consulta de servicios educativos y padrón de instituciones.",
    href: "https://escale.minedu.gob.pe/PadronWeb/info/ce?cod_mod=412b5e51ceb7cd86b3044b3efc956034&anexo=e5b2cd081051c13812069b7b77f0b41c",
    panel: "bg-white"
  }
] as const;

export function OfficialLinks() {
  return (
    <section id="enlaces-institucionales" className="section-anchor aip-shell py-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-aip-greenSoft text-aip-green">
              <Link2 className="size-6" />
            </span>
            <h2 className="text-2xl font-black text-ink md:text-3xl">
              Enlaces institucionales y recursos educativos
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-muted">
            Accesos de consulta a portales educativos externos para apoyar el trabajo del Aula AIP.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-aip-green/20 bg-white px-4 py-2 text-xs font-black text-aip-greenDark shadow-sm">
          <ShieldCheck className="size-4 text-aip-green" />
          Recursos de consulta
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card hover:border-aip-green/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green"
          >
            <div className={`relative grid h-28 place-items-center border-b border-line px-6 ${link.panel}`}>
              <Image
                src={link.logo}
                alt={`Logo ${link.title}`}
                width={220}
                height={86}
                className="max-h-16 w-full object-contain transition duration-200 group-hover:scale-[1.03]"
              />
              <ExternalLink className="absolute right-4 top-4 size-4 text-muted transition group-hover:text-aip-green" />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-black text-aip-greenDark">{link.title}</h3>
              <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-muted">{link.description}</p>
              <span className="mt-5 inline-flex items-center justify-between rounded-xl bg-aip-greenSoft px-4 py-3 text-sm font-black text-aip-greenDark">
                Ir al recurso
                <ArrowRight className="motion-arrow size-4" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold leading-relaxed text-muted shadow-card">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-aip-green" />
        <p>
          <strong className="text-ink">Nota:</strong> Esta página no reemplaza ni representa a los sistemas oficiales del MINEDU; solo organiza enlaces de consulta para la comunidad educativa del Aula AIP.
        </p>
      </div>
    </section>
  );
}

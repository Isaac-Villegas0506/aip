import { Camera, Clock3, Folder, Rocket, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "horarios",
    title: "Horarios",
    text: "¿Cuándo está disponible el aula?",
    icon: Clock3,
    color: "bg-aip-greenSoft",
    accent: "bg-aip-green"
  },
  {
    id: "recursos",
    title: "Recursos",
    text: "Guías, plantillas y materiales útiles.",
    icon: Folder,
    color: "bg-aip-yellowSoft",
    accent: "bg-aip-yellow"
  },
  {
    id: "proyectos",
    title: "Proyectos",
    text: "Descubre proyectos increíbles.",
    icon: Rocket,
    color: "bg-aip-greenSoft",
    accent: "bg-aip-red"
  },
  {
    id: "normas",
    title: "Normas",
    text: "Convivencia y buen uso del aula.",
    icon: ShieldCheck,
    color: "bg-aip-yellowSoft",
    accent: "bg-aip-red"
  },
  {
    id: "galeria",
    title: "Galería",
    text: "Fotos y momentos increíbles.",
    icon: Camera,
    color: "bg-aip-greenSoft",
    accent: "bg-aip-green"
  }
] as const;

export function FeatureCards() {
  return (
    <section className="relative z-20 -mt-6 mb-4">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 pb-6 pt-2 px-5 md:px-10 lg:px-12 max-w-7xl mx-auto">
        {features.map(({ id, title, text, icon: Icon, color }) => (
          <a
            key={id}
            href={`#${id}`}
            className="w-auto group flex items-center gap-3 md:gap-4 rounded-full border border-green-100/60 bg-white/80 backdrop-blur-md p-2 md:p-2.5 pr-6 md:pr-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-300 hover:bg-white"
          >
            <div className={`grid h-10 w-10 md:h-12 md:w-12 shrink-0 place-items-center rounded-full ${color} text-aip-greenDark transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
              <Icon className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm md:text-base font-extrabold text-aip-greenDark leading-tight">{title}</span>
              <span className="text-[11px] md:text-xs font-medium text-gray-500 leading-tight mt-0.5 whitespace-nowrap">{text}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

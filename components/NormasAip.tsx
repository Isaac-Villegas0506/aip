type NormTone = "green" | "red" | "yellow";

const norms = [
  {
    title: "Orden al ingresar",
    text: "Entra con calma y respeta el turno de tus compañeros.",
    tone: "green"
  },
  {
    title: "Aula limpia",
    text: "Cuida el espacio de trabajo y deja tu lugar listo para el grupo.",
    tone: "green"
  },
  {
    title: "Mobiliario cuidado",
    text: "Las mesas, sillas y equipos son de todos; cuídalos siempre.",
    tone: "green"
  },
  {
    title: "No comer en AIP",
    text: "Evita alimentos y bebidas para proteger los equipos.",
    tone: "red"
  },
  {
    title: "Manos limpias y secas",
    text: "Antes de usar los equipos, asegúrate de tener las manos limpias y secas.",
    tone: "green"
  },
  {
    title: "Descargas autorizadas",
    text: "Usa únicamente recursos indicados por el docente.",
    tone: "yellow"
  }
] as const;

export function NormasAip() {
  return (
    <section id="normas" className="section-anchor aip-shell py-6">
      <div>
        <h2 className="text-3xl font-black text-ink md:text-4xl">Normas del Aula AIP</h2>
        <p className="mt-2 text-sm font-semibold text-muted">
          Reglas simples para cuidar los equipos, mantener el orden y trabajar con respeto.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {norms.map((norm, index) => {
          const tone = toneClass(norm.tone);

          return (
            <article
              key={norm.title}
              className="motion-card group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card hover:border-aip-green/35 hover:shadow-soft"
            >
              <div className="flex items-center gap-4">
                <span className={`grid size-12 place-items-center rounded-xl text-lg font-black tabular-nums text-white shadow-sm ${tone.badge}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-black leading-tight text-aip-greenDark">{norm.title}</h3>
              </div>
              <p className="mt-4 flex-grow text-sm font-semibold leading-relaxed text-muted">{norm.text}</p>
              <span className={`mt-5 block h-1.5 w-12 rounded-full ${tone.line} opacity-60 transition-opacity group-hover:opacity-100`} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function toneClass(tone: NormTone) {
  if (tone === "red") {
    return {
      badge: "bg-aip-red",
      line: "bg-aip-red"
    };
  }

  if (tone === "yellow") {
    return {
      badge: "bg-aip-yellow text-aip-greenDark",
      line: "bg-aip-yellow"
    };
  }

  return {
    badge: "bg-aip-green",
    line: "bg-aip-green"
  };
}

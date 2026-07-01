"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, UserRound } from "lucide-react";

type TurnoKey = "manana" | "tarde";

type SlotReserva = {
  docente?: string;
  grado?: string;
  seccion?: string;
  [key: string]: unknown;
};

type ApiSlot = {
  hora: number;
  label?: string;
  inicio?: string;
  fin?: string;
  estado?: string;
  reserva?: SlotReserva | null;
};

type AulaData = {
  aula_id: number;
  nombre?: string;
  turnos?: Partial<Record<TurnoKey, ApiSlot[]>>;
  horarios?: ApiSlot[];
};

type DayData = {
  estado?: string;
  aulas?: AulaData[];
};

type SlotDefinition = {
  hora: number;
  label: string;
  name: string;
  inicio: string;
  fin: string;
};

type SlotStatus = {
  estado: "disponible" | "reservado" | "no_disponible" | "cargando";
  label: string;
  reserva?: SlotReserva | null;
};

const WEEK_DAY_LABELS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const TEACHER_NAME = "JOHN VALENZUELA TORRES";
const TEACHER_PHONE = "920 596 194";

const MORNING_SLOTS: SlotDefinition[] = [
  { hora: 1, name: "1RA HORA", inicio: "07:15", fin: "08:00", label: "07:15 AM - 08:00 AM" },
  { hora: 2, name: "2DA HORA", inicio: "08:00", fin: "08:45", label: "08:00 AM - 08:45 AM" },
  { hora: 3, name: "3RA HORA", inicio: "08:45", fin: "09:30", label: "08:45 AM - 09:30 AM" },
  { hora: 4, name: "4TA HORA", inicio: "09:30", fin: "10:15", label: "09:30 AM - 10:15 AM" },
  { hora: 5, name: "5TA HORA", inicio: "10:30", fin: "11:15", label: "10:30 AM - 11:15 AM" },
  { hora: 6, name: "6TA HORA", inicio: "11:15", fin: "12:00", label: "11:15 AM - 12:00 PM" },
  { hora: 7, name: "7MA HORA", inicio: "12:00", fin: "12:45", label: "12:00 PM - 12:45 PM" }
];

const AFTERNOON_SLOTS: SlotDefinition[] = [
  { hora: 1, name: "1RA HORA", inicio: "13:05", fin: "13:50", label: "01:05 PM - 01:50 PM" },
  { hora: 2, name: "2DA HORA", inicio: "13:50", fin: "14:35", label: "01:50 PM - 02:35 PM" },
  { hora: 3, name: "3RA HORA", inicio: "14:35", fin: "15:20", label: "02:35 PM - 03:20 PM" },
  { hora: 4, name: "4TA HORA", inicio: "15:20", fin: "16:05", label: "03:20 PM - 04:05 PM" },
  { hora: 5, name: "5TA HORA", inicio: "16:20", fin: "17:05", label: "04:20 PM - 05:05 PM" },
  { hora: 6, name: "6TA HORA", inicio: "17:05", fin: "17:50", label: "05:05 PM - 05:50 PM" },
  { hora: 7, name: "7MA HORA", inicio: "17:50", fin: "18:35", label: "05:50 PM - 06:35 PM" }
];

export function HorariosAip() {
  const [selectedAula, setSelectedAula] = useState<1 | 2>(1);
  const [selectedTurno, setSelectedTurno] = useState<TurnoKey>("manana");
  const [weekData, setWeekData] = useState<Record<string, DayData>>({});
  const [isLoading, setIsLoading] = useState(true);

  const todayIso = useMemo(() => toIsoDate(new Date()), []);
  const slots = selectedTurno === "manana" ? MORNING_SLOTS : AFTERNOON_SLOTS;

  const weekDays = useMemo(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today);
    monday.setDate(diff);

    return Array.from({ length: 5 }).map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return toIsoDate(date);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchWeek = async () => {
      setIsLoading(true);

      try {
        const results = await Promise.all(
          weekDays.map((dateStr) =>
            fetch(`https://reservas-ntl.vercel.app/api/schedules?date=${dateStr}`)
              .then((response) => response.json())
              .catch(() => null)
          )
        );

        if (!isMounted) return;

        const nextData: Record<string, DayData> = {};
        results.forEach((result, index) => {
          if (result) nextData[weekDays[index]] = result;
        });

        setWeekData(nextData);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchWeek();

    return () => {
      isMounted = false;
    };
  }, [weekDays]);

  const getSlotStatus = (dateStr: string, slotDef: SlotDefinition): SlotStatus => {
    const dayData = weekData[dateStr];
    if (!dayData) {
      if (dateStr === weekDays[0]) return { estado: "no_disponible", label: "Feriado" };
      return { estado: "disponible", label: "Disponible" };
    }
    if (dayData.estado === "feriado") return { estado: "no_disponible", label: "Feriado" };

    const aulaData = dayData.aulas?.find((aula) => aula.aula_id === selectedAula);
    if (!aulaData) return { estado: "no_disponible", label: "-" };

    const slotsForTurn = getSlotsForTurn(aulaData, selectedTurno);
    const slot = slotsForTurn.find((item) => matchesSlot(item, slotDef));
    if (!slot) return { estado: "no_disponible", label: "-" };

    const estado = slot.estado === "reservado" ? "reservado" : "disponible";
    return {
      estado,
      label: estado === "disponible" ? "Disponible" : "Reservado",
      reserva: slot.reserva
    };
  };

  return (
    <section id="horarios" className="section-anchor aip-shell py-10">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-black text-ink md:text-4xl">Horarios del Aula AIP</h2>
          <p className="mt-2 text-sm font-semibold text-muted">Disponibilidad semanal organizada por aula y turno.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SegmentedButton active={selectedAula === 1} onClick={() => setSelectedAula(1)}>Aula AIP 1</SegmentedButton>
          <SegmentedButton active={selectedAula === 2} onClick={() => setSelectedAula(2)}>Aula AIP 2</SegmentedButton>
          <SegmentedButton active={selectedTurno === "manana"} onClick={() => setSelectedTurno("manana")}>Turno Mañana</SegmentedButton>
          <SegmentedButton active={selectedTurno === "tarde"} onClick={() => setSelectedTurno("tarde")}>Turno Tarde</SegmentedButton>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="bg-aip-greenDark text-white">
                  <th className="w-[190px] border-r border-white/20 px-4 py-3 text-center text-sm font-black">Hora</th>
                  {WEEK_DAY_LABELS.map((label, index) => {
                    const isToday = weekDays[index] === todayIso;
                    return (
                      <th key={label} className="border-r border-white/20 px-4 py-3 text-center text-sm font-black last:border-r-0">
                        {label}
                        {isToday && <span className="ml-2 rounded-full bg-aip-yellow px-2 py-0.5 text-[10px] text-aip-greenDark">Hoy</span>}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={`${selectedTurno}-${slot.name}`} className="border-b border-line last:border-0">
                    <td className="border-r border-line bg-cream/70 px-4 py-3 text-center text-xs font-black text-ink">
                      <span className="block text-[11px] text-muted">{slot.name}</span>
                      {slot.label}
                    </td>
                    {weekDays.map((dateStr) => (
                      <td key={`${slot.name}-${dateStr}`} className="border-r border-line px-4 py-3 text-center last:border-r-0">
                        <SlotBadge status={getSlotStatus(dateStr, slot)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex-none">
            <h3 className="text-lg font-black text-aip-greenDark">Docente a cargo</h3>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-16 place-items-center rounded-full bg-aip-greenSoft text-aip-greenDark">
                <UserRound className="size-8" />
              </span>
              <span>
                <strong className="block text-sm font-black text-ink">{TEACHER_NAME}</strong>
                <span className="block text-xs font-bold text-muted">Responsable del Aula AIP</span>
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm font-bold text-muted">
              <span className="flex items-center gap-2"><Phone className="size-4 text-aip-green" /> {TEACHER_PHONE}</span>
              <span className="flex items-center gap-2"><Mail className="size-4 text-aip-green" /> Plataforma AIP</span>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <h4 className="text-sm font-black text-ink">Leyenda</h4>
            <div className="mt-3 grid gap-3 text-sm font-bold text-muted">
              <Legend dot="bg-aip-green" label="Disponible" text="El aula está libre para reservar." />
              <Legend dot="bg-aip-yellow" label="Reservado" text="Horario reservado." />
              <Legend dot="bg-aip-red" label="Feriado" text="No hay clases en este horario." />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SegmentedButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 rounded-lg border px-4 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
        active ? "border-aip-green bg-aip-green text-white shadow-card" : "border-aip-green bg-white text-aip-greenDark hover:bg-aip-greenSoft"
      }`}
    >
      {children}
    </button>
  );
}

function SlotBadge({ status }: { status: SlotStatus }) {
  const dotClass =
    status.label === "Feriado"
      ? "bg-aip-red"
      : status.estado === "disponible"
        ? "bg-aip-green"
        : status.estado === "reservado"
          ? "bg-aip-yellow"
          : "bg-gray-300";

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="flex items-center justify-center gap-2">
        <span className={`size-2.5 rounded-full ${dotClass}`} />
        <span className="text-xs font-black text-muted">{status.label}</span>
      </span>
      {status.estado === "reservado" && status.reserva && (
        <span className="max-w-[8rem] truncate text-[10px] font-bold text-muted">
          {formatReserva(status.reserva)}
        </span>
      )}
    </div>
  );
}

function Legend({ dot, label, text }: { dot: string; label: string; text: string }) {
  return (
    <span className="flex items-start gap-3">
      <span className={`mt-1 size-3 shrink-0 rounded-full ${dot}`} />
      <span>
        <strong className="block text-ink">{label}</strong>
        <span className="text-xs">{text}</span>
      </span>
    </span>
  );
}

function getSlotsForTurn(aulaData: AulaData, turno: TurnoKey) {
  if (aulaData.turnos?.[turno]?.length) return aulaData.turnos[turno] ?? [];
  const horarios = aulaData.horarios ?? [];
  return turno === "manana" ? horarios.slice(0, 7) : horarios.slice(7);
}

function matchesSlot(slot: ApiSlot, slotDef: SlotDefinition) {
  return (
    slot.hora === slotDef.hora ||
    slot.label === slotDef.name ||
    slot.inicio === slotDef.inicio ||
    `${slot.inicio ?? ""} - ${slot.fin ?? ""}` === slotDef.label
  );
}

function formatReserva(reserva: SlotReserva) {
  const docente = typeof reserva.docente === "string" ? reserva.docente : "Reservado";
  const grado = typeof reserva.grado === "string" ? reserva.grado : "";
  const seccion = typeof reserva.seccion === "string" ? reserva.seccion : "";
  return [docente, grado, seccion].filter(Boolean).join(" · ");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

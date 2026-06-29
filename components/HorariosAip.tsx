"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CalendarClock, Info, Loader2, Phone, Rocket, Sparkles, Sun, User } from "lucide-react";

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
  { hora: 1, name: "1ra Hora", inicio: "07:15", fin: "08:00", label: "07:15 AM - 08:00 AM" },
  { hora: 2, name: "2da Hora", inicio: "08:00", fin: "08:45", label: "08:00 AM - 08:45 AM" },
  { hora: 3, name: "3ra Hora", inicio: "08:45", fin: "09:30", label: "08:45 AM - 09:30 AM" },
  { hora: 4, name: "4ta Hora", inicio: "09:30", fin: "10:15", label: "09:30 AM - 10:15 AM" },
  { hora: 5, name: "5ta Hora", inicio: "10:30", fin: "11:15", label: "10:30 AM - 11:15 AM" },
  { hora: 6, name: "6ta Hora", inicio: "11:15", fin: "12:00", label: "11:15 AM - 12:00 PM" },
  { hora: 7, name: "7ma Hora", inicio: "12:00", fin: "12:45", label: "12:00 PM - 12:45 PM" }
];

const AFTERNOON_SLOTS: SlotDefinition[] = [
  { hora: 1, name: "1ra Hora", inicio: "13:05", fin: "13:50", label: "01:05 PM - 01:50 PM" },
  { hora: 2, name: "2da Hora", inicio: "13:50", fin: "14:35", label: "01:50 PM - 02:35 PM" },
  { hora: 3, name: "3ra Hora", inicio: "14:35", fin: "15:20", label: "02:35 PM - 03:20 PM" },
  { hora: 4, name: "4ta Hora", inicio: "15:20", fin: "16:05", label: "03:20 PM - 04:05 PM" },
  { hora: 5, name: "5ta Hora", inicio: "16:20", fin: "17:05", label: "04:20 PM - 05:05 PM" },
  { hora: 6, name: "6ta Hora", inicio: "17:05", fin: "17:50", label: "05:05 PM - 05:50 PM" },
  { hora: 7, name: "7ma Hora", inicio: "17:50", fin: "18:35", label: "05:50 PM - 06:35 PM" }
];

export function HorariosAip() {
  const [selectedAula, setSelectedAula] = useState<1 | 2>(1);
  const [weekData, setWeekData] = useState<Record<string, DayData>>({});
  const [isLoading, setIsLoading] = useState(true);

  const todayIso = useMemo(() => toIsoDate(new Date()), []);

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

        if (!isMounted) {
          return;
        }

        const nextData: Record<string, DayData> = {};
        results.forEach((result, index) => {
          if (result) {
            nextData[weekDays[index]] = result;
          }
        });

        setWeekData(nextData);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWeek();

    return () => {
      isMounted = false;
    };
  }, [weekDays]);

  const getSlotStatus = (dateStr: string, slotDef: SlotDefinition, turno: TurnoKey): SlotStatus => {
    const dayData = weekData[dateStr];
    if (!dayData) {
      return { estado: isLoading ? "cargando" : "no_disponible", label: isLoading ? "..." : "-" };
    }

    if (dayData.estado === "fin_de_semana") {
      return { estado: "no_disponible", label: "-" };
    }

    if (dayData.estado === "feriado") {
      return { estado: "no_disponible", label: "Feriado" };
    }

    const aulaData = dayData.aulas?.find((aula) => aula.aula_id === selectedAula);
    if (!aulaData) {
      return { estado: "no_disponible", label: "-" };
    }

    const slots = getSlotsForTurn(aulaData, turno);
    const slot = slots.find((item) => matchesSlot(item, slotDef));

    if (!slot) {
      return { estado: "no_disponible", label: "-" };
    }

    const estado = slot.estado === "reservado" ? "reservado" : "disponible";

    return {
      estado,
      label: estado === "disponible" ? "Disponible" : "Reservado",
      reserva: slot.reserva
    };
  };

  return (
    <div className="relative mb-12 w-full" id="horarios-seccion">
      <div className="absolute left-8 top-8 hidden text-yellow-400 opacity-50 md:block">
        <Sparkles size={32} />
      </div>
      <div className="absolute right-10 top-4 hidden h-24 w-24 items-center justify-center rounded-full bg-yellow-100 opacity-60 md:flex">
        <Rocket size={48} className="rotate-12 text-red-500" />
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-green-50 opacity-60" />

      <div className="relative z-10 mb-8 text-center">
        <h2 className="mb-4 inline-block border-b-4 border-green-600 pb-2 text-4xl font-extrabold text-[#0e5c20] md:text-5xl">
          Horarios del Aula AIP
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-sm font-medium text-gray-600 md:text-base">
          Conoce la disponibilidad y organización del Aula de Innovación Pedagógica en los turnos de mañana y tarde.
        </p>

        <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full bg-gray-100 p-1.5">
          {[1, 2].map((aula) => (
            <button
              key={aula}
              type="button"
              onClick={() => setSelectedAula(aula as 1 | 2)}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
                selectedAula === aula
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              AIP {aula}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        <ScheduleTurn
          title="Turno Mañana"
          icon={<Sun className="h-6 w-6 shrink-0 text-yellow-400 md:h-8 md:w-8" />}
          timeRange="07:15 AM - 12:45 PM"
          tone="green"
          turno="manana"
          slots={MORNING_SLOTS}
          weekDays={weekDays}
          todayIso={todayIso}
          isLoading={isLoading}
          getSlotStatus={getSlotStatus}
        />

        <ScheduleTurn
          title="Turno Tarde"
          icon={<CalendarClock className="h-6 w-6 shrink-0 text-[#f59e0b] md:h-8 md:w-8" />}
          timeRange="01:05 PM - 06:35 PM"
          tone="yellow"
          turno="tarde"
          slots={AFTERNOON_SLOTS}
          weekDays={weekDays}
          todayIso={todayIso}
          isLoading={isLoading}
          getSlotStatus={getSlotStatus}
        />
      </div>

      <div className="relative z-10 mb-4 mt-8">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 rounded-2xl border border-green-200 bg-white px-6 py-3 shadow-card md:rounded-full">
          <div className="shrink-0 rounded-full bg-green-700 p-1 text-white">
            <Info size={14} />
          </div>
          <p className="text-center text-sm font-semibold leading-relaxed text-gray-700">
            Los horarios se actualizan desde la API de reservas e incluyen disponibilidad de mañana y tarde.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScheduleTurn({
  title,
  icon,
  timeRange,
  tone,
  turno,
  slots,
  weekDays,
  todayIso,
  isLoading,
  getSlotStatus
}: {
  title: string;
  icon: ReactNode;
  timeRange: string;
  tone: "green" | "yellow";
  turno: TurnoKey;
  slots: SlotDefinition[];
  weekDays: string[];
  todayIso: string;
  isLoading: boolean;
  getSlotStatus: (dateStr: string, slotDef: SlotDefinition, turno: TurnoKey) => SlotStatus;
}) {
  const isGreen = tone === "green";
  const borderColor = isGreen ? "border-green-100" : "border-yellow-200";
  const bgColor = isGreen ? "bg-[#f2fbf4]" : "bg-[#fffdf2]";
  const headerBg = isGreen ? "bg-[#0e5c20] text-white" : "bg-[#f59e0b] text-gray-900";

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${borderColor} ${bgColor} shadow-sm`}>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
          <Loader2 className="mb-2 h-10 w-10 animate-spin text-green-600" />
          <span className="text-sm font-bold text-green-800">Cargando disponibilidad...</span>
        </div>
      )}

      <div className={`flex flex-col items-center justify-between gap-4 border-b ${borderColor} bg-white/50 p-4 md:p-6 xl:flex-row`}>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-3 xl:w-auto xl:justify-start">
          {icon}
          <h3 className="shrink-0 text-lg font-bold text-[#0e5c20] md:text-xl">{title}</h3>
          <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${isGreen ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#b45309]"}`}>
            {timeRange}
          </span>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 md:gap-3 sm:flex-row xl:w-auto xl:min-w-[430px]">
          <TeacherInfo tone={tone} />
          <ContactInfo tone={tone} />
        </div>
      </div>

      <div className={`flex items-center justify-center gap-2 border-b px-4 py-1.5 text-center text-xs font-medium xl:hidden ${isGreen ? "border-green-100 bg-green-50/50 text-green-700" : "border-yellow-100 bg-yellow-50/50 text-yellow-700"}`}>
        <span>Desliza lateralmente para ver todos los días</span>
        <span aria-hidden="true">→</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className={headerBg}>
              <th className="w-[190px] border-r border-white/20 px-4 py-3 text-center text-sm font-semibold">Hora</th>
              {WEEK_DAY_LABELS.map((label, index) => {
                const isToday = weekDays[index] === todayIso;
                return (
                  <th
                    key={label}
                    className={`border-r border-white/20 px-4 py-3 text-center text-sm font-semibold last:border-r-0 ${
                      isToday ? "ring-2 ring-inset ring-aip-yellow" : ""
                    }`}
                  >
                    <span>{label}</span>
                    {isToday && <span className="ml-2 rounded-full bg-aip-yellow px-2 py-0.5 text-[10px] font-black text-aip-greenDark">Hoy</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={bgColor}>
            {slots.map((slot) => (
              <tr
                key={`${turno}-${slot.name}`}
                className={`border-b last:border-0 hover:bg-white ${isGreen ? "border-green-100" : "border-yellow-100"} transition-colors`}
              >
                <td className={`border-r px-4 py-3 text-center text-xs font-bold text-gray-700 ${isGreen ? "border-green-100" : "border-yellow-100"} bg-white/60`}>
                  <span className="block text-[11px] uppercase tracking-wide text-gray-500">{slot.name}</span>
                  {slot.label}
                </td>
                {weekDays.map((dateStr) => {
                  const status = getSlotStatus(dateStr, slot, turno);
                  const isToday = dateStr === todayIso;

                  return (
                    <td
                      key={`${slot.name}-${dateStr}`}
                      className={`border-r px-4 py-3 text-center last:border-r-0 ${isGreen ? "border-green-100" : "border-yellow-100"} ${
                        isToday ? "bg-aip-yellowSoft/80" : ""
                      }`}
                    >
                      <SlotBadge status={status} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeacherInfo({ tone }: { tone: "green" | "yellow" }) {
  return (
    <div className={`flex flex-1 items-center gap-3 rounded-xl border bg-white px-3 py-2 ${tone === "green" ? "border-green-50" : "border-yellow-100"}`}>
      <div className={`shrink-0 rounded-full p-1.5 text-white md:p-2 ${tone === "green" ? "bg-[#16a34a]" : "bg-[#eab308]"}`}>
        <User size={18} className="md:h-5 md:w-5" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-medium text-gray-500">Docente a cargo</span>
        <span className="truncate text-sm font-bold leading-tight text-[#0e5c20]">{TEACHER_NAME}</span>
      </div>
    </div>
  );
}

function ContactInfo({ tone }: { tone: "green" | "yellow" }) {
  return (
    <div className={`flex flex-1 items-center gap-3 rounded-xl border bg-white px-3 py-2 ${tone === "green" ? "border-green-50" : "border-yellow-100"}`}>
      <div className={`shrink-0 rounded-full border-2 p-1 md:p-1.5 ${tone === "green" ? "border-[#16a34a] text-[#16a34a]" : "border-[#eab308] text-[#eab308]"}`}>
        <Phone size={16} className="md:h-[18px] md:w-[18px]" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Contacto</span>
        <span className="text-sm font-bold leading-tight text-gray-800">{TEACHER_PHONE}</span>
      </div>
    </div>
  );
}

function SlotBadge({ status }: { status: SlotStatus }) {
  const dotClass =
    status.estado === "disponible"
      ? "bg-green-500"
      : status.estado === "reservado"
        ? "bg-red-500"
        : "bg-gray-300";

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="flex items-center justify-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${dotClass}`} />
        <span className={`text-xs font-semibold ${status.estado === "reservado" ? "text-red-700" : "text-gray-600"}`}>
          {status.label}
        </span>
      </div>
      {status.estado === "reservado" && status.reserva && (
        <span className="max-w-[9rem] truncate text-[10px] font-bold text-gray-500">
          {formatReserva(status.reserva)}
        </span>
      )}
    </div>
  );
}

function getSlotsForTurn(aulaData: AulaData, turno: TurnoKey) {
  if (aulaData.turnos?.[turno]?.length) {
    return aulaData.turnos[turno] ?? [];
  }

  const horarios = aulaData.horarios ?? [];
  return turno === "manana"
    ? horarios.slice(0, 7)
    : horarios.slice(7);
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

"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Sun, BookOpen, User, Phone, Info, Sparkles, Lightbulb, Rocket, Loader2 } from 'lucide-react';

const MORNING_SLOTS = [
  { hora: 1, label: "07:15 AM - 08:00 AM" },
  { hora: 2, label: "08:00 AM - 08:45 AM" },
  { hora: 3, label: "08:45 AM - 09:30 AM" },
  { hora: 4, label: "09:30 AM - 10:15 AM" },
  { hora: 5, label: "10:30 AM - 11:15 AM" },
  { hora: 6, label: "11:15 AM - 12:00 PM" },
  { hora: 7, label: "12:00 PM - 12:45 PM" },
];

export function HorariosAip() {
  const [selectedAula, setSelectedAula] = useState<1 | 2>(1);
  const [weekData, setWeekData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Obtener fechas de Lunes a Viernes de la semana actual
  const weekDays = useMemo(() => {
    const today = new Date();
    const day = today.getDay(); // 0 es Domingo, 1 es Lunes
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Ajustar al lunes
    const monday = new Date(today.setDate(diff));
    
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const isoDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      return isoDate;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const fetchWeek = async () => {
      setIsLoading(true);
      try {
        // Hacemos las llamadas en paralelo una sola vez al cargar para evitar consultas a cada rato
        const promises = weekDays.map(dateStr => 
          fetch(`https://reservas-ntl.vercel.app/api/schedules?date=${dateStr}`)
            .then(res => res.json())
            .catch(() => null)
        );
        const results = await Promise.all(promises);
        
        if (isMounted) {
          const newData: Record<string, any> = {};
          results.forEach((res, i) => {
            if (res) newData[weekDays[i]] = res;
          });
          setWeekData(newData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchWeek();
    return () => { isMounted = false; };
  }, [weekDays]);

  // Helper para obtener el estado de un bloque en un día específico
  const getSlotStatus = (dateStr: string, horaId: number) => {
    const dayData = weekData[dateStr];
    if (!dayData) return { estado: 'cargando', label: '...' };
    if (dayData.estado === 'fin_de_semana') return { estado: 'no_disponible', label: '-' };
    if (dayData.estado === 'feriado') return { estado: 'no_disponible', label: 'Feriado' };
    
    const aulaData = dayData.aulas?.find((a: any) => a.aula_id === selectedAula);
    if (!aulaData) return { estado: 'no_disponible', label: '-' };

    const slot = aulaData.horarios?.find((h: any) => h.hora === horaId);
    if (!slot) return { estado: 'no_disponible', label: '-' };

    return {
      estado: slot.estado, // 'disponible' o 'reservado'
      label: slot.estado === 'disponible' ? 'Disponible' : 'Reservado'
    };
  };

  return (
    <div className="relative w-full mb-12" id="horarios-seccion">
      {/* Decorative background elements */}
      <div className="absolute top-8 left-8 text-yellow-400 opacity-50 hidden md:block">
        <Sparkles size={32} />
      </div>
      <div className="absolute top-12 left-40 text-green-500 opacity-40 hidden md:block">
        <Lightbulb size={32} />
      </div>
      <div className="absolute top-4 right-10 w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center opacity-60 hidden md:flex">
        <Rocket size={48} className="text-red-500 rotate-12" />
      </div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-50 rounded-full opacity-60 pointer-events-none"></div>
      
      {/* Header section */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0e5c20] mb-4 inline-block border-b-4 border-green-600 pb-2">
          Horarios del Aula AIP
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-medium mb-6">
          Conoce la disponibilidad y organización del Aula de Innovación Pedagógica en los turnos de mañana y tarde.
        </p>

        {/* Selector de Aula */}
        <div className="flex justify-center items-center gap-2 bg-gray-100 p-1.5 rounded-full w-fit mx-auto">
          <button 
            onClick={() => setSelectedAula(1)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              selectedAula === 1 
                ? 'bg-green-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            AIP 1
          </button>
          <button 
            onClick={() => setSelectedAula(2)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              selectedAula === 2 
                ? 'bg-green-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            AIP 2
          </button>
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        {/* Turno Mañana */}
        <div className="bg-[#f2fbf4] rounded-2xl border border-green-100 shadow-sm overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-2" />
              <span className="text-sm font-bold text-green-800">Cargando disponibilidad...</span>
            </div>
          )}

          <div className="flex flex-col xl:flex-row items-center justify-between p-4 md:p-6 gap-4 border-b border-green-100 bg-white/50">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 md:gap-3 w-full xl:w-auto">
              <Sun className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 shrink-0" />
              <h3 className="text-lg md:text-xl font-bold text-[#0e5c20] shrink-0">Turno Mañana</h3>
              <span className="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                07:15 AM - 12:45 PM
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full xl:w-auto">
              <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-green-50 flex-1">
                <div className="bg-[#16a34a] p-1.5 md:p-2 rounded-full text-white shrink-0">
                  <User size={18} className="md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-gray-500 font-medium">Docente a cargo</span>
                  <span className="text-sm font-bold text-[#0e5c20] leading-tight truncate">VALENZUELA TORRES</span>
                  <span className="text-[10px] text-gray-600 font-medium leading-tight truncate">NOMBRES: JOHN ROBERTDH</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-green-50 flex-1">
                <div className="border-2 border-[#16a34a] p-1 md:p-1.5 rounded-full text-[#16a34a] shrink-0">
                  <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Contacto</span>
                  <span className="text-sm font-bold text-gray-800 leading-tight">9999999999</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50/50 py-1.5 px-4 text-center text-xs text-green-700 font-medium xl:hidden border-b border-green-100 flex items-center justify-center gap-2">
            <span>Desliza lateralmente para ver todos los días</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
          
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#0e5c20] text-white">
                  <th className="py-3 px-4 text-center text-sm font-semibold border-r border-green-700 w-[180px]">Hora</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold border-r border-green-700">Lunes</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold border-r border-green-700">Martes</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold border-r border-green-700">Miércoles</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold border-r border-green-700">Jueves</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">Viernes</th>
                </tr>
              </thead>
              <tbody className="bg-[#f2fbf4]">
                {MORNING_SLOTS.map((slot, idx) => (
                  <tr key={idx} className="border-b border-green-100 last:border-0 hover:bg-white transition-colors">
                    <td className="py-3 px-4 text-center text-xs font-bold text-gray-700 border-r border-green-100 bg-white/60">
                      {slot.label}
                    </td>
                    {weekDays.map((dateStr, colIdx) => {
                      const status = getSlotStatus(dateStr, slot.hora);
                      return (
                        <td key={colIdx} className="py-3 px-4 text-center border-r border-green-100 last:border-r-0">
                          <div className="flex items-center justify-center gap-1.5">
                            {status.estado === 'disponible' && (
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            )}
                            {status.estado === 'reservado' && (
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            )}
                            {(status.estado === 'no_disponible' || status.estado === 'cargando') && (
                              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            )}
                            <span className={`text-xs font-medium ${status.estado === 'reservado' ? 'text-red-600' : 'text-gray-600'}`}>
                              {status.label}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Turno Tarde (Estático por ahora) */}
        <div className="bg-[#fffdf2] rounded-2xl border border-yellow-200 shadow-sm overflow-hidden">
          <div className="flex flex-col xl:flex-row items-center justify-between p-4 md:p-6 gap-4 border-b border-yellow-200 bg-white/50">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 md:gap-3 w-full xl:w-auto">
              <BookOpen className="text-[#f59e0b] w-6 h-6 md:w-8 md:h-8 shrink-0" />
              <h3 className="text-lg md:text-xl font-bold text-gray-800 shrink-0">Turno Tarde</h3>
              <span className="bg-[#fef3c7] text-[#b45309] px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                1:15 PM - 6:00 PM
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full xl:w-auto">
              <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-yellow-100 flex-1">
                <div className="bg-[#eab308] p-1.5 md:p-2 rounded-full text-white shrink-0">
                  <User size={18} className="md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-gray-500 font-medium">Docente a cargo</span>
                  <span className="text-sm font-bold text-gray-800 leading-tight truncate">-</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-yellow-100 flex-1">
                <div className="border-2 border-[#eab308] p-1 md:p-1.5 rounded-full text-[#eab308] shrink-0">
                  <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Contacto</span>
                  <span className="text-sm font-bold text-gray-800 leading-tight">9999999999</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50/50 py-1.5 px-4 text-center text-xs text-yellow-700 font-medium xl:hidden border-b border-yellow-100 flex items-center justify-center gap-2">
            <span>Desliza lateralmente para ver todos los días</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
          
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-transparent">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#f59e0b] text-gray-900">
                  <th className="py-3 px-4 text-center text-sm font-bold border-r border-yellow-500/30 w-[180px]">Hora</th>
                  <th className="py-3 px-4 text-center text-sm font-bold border-r border-yellow-500/30">Lunes</th>
                  <th className="py-3 px-4 text-center text-sm font-bold border-r border-yellow-500/30">Martes</th>
                  <th className="py-3 px-4 text-center text-sm font-bold border-r border-yellow-500/30">Miércoles</th>
                  <th className="py-3 px-4 text-center text-sm font-bold border-r border-yellow-500/30">Jueves</th>
                  <th className="py-3 px-4 text-center text-sm font-bold">Viernes</th>
                </tr>
              </thead>
              <tbody className="bg-[#fffdf2]">
                {[
                  "1:15 PM - 2:45 PM",
                  "2:45 PM - 4:15 PM",
                  "4:30 PM - 6:00 PM"
                ].map((time, idx) => (
                  <tr key={idx} className="border-b border-yellow-100 last:border-0 hover:bg-white transition-colors">
                    <td className="py-3 px-4 text-center text-xs font-bold text-gray-700 border-r border-yellow-100 bg-white/60">
                      {time}
                    </td>
                    {Array.from({ length: 5 }).map((_, colIdx) => (
                      <td key={colIdx} className="py-3 px-4 text-center border-r border-yellow-100 last:border-r-0">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-xs font-medium text-gray-600">Disponible</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <div className="bg-[#f3fbf4] border border-green-100 rounded-full py-3 px-6 max-w-3xl mx-auto flex items-center justify-center gap-3">
          <div className="bg-green-700 p-1 rounded-full text-white shrink-0">
            <Info size={14} />
          </div>
          <p className="text-xs md:text-sm text-gray-700 font-medium text-center">
            Los horarios pueden estar sujetos a cambios. Para reservar el aula, asegúrate de verificar la disponibilidad en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
}

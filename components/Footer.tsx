import { Facebook, Instagram, Mail, MapPin, Phone, UserRound, Youtube } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

const quickLinks = [
  ["Inicio", "#inicio"],
  ["Horarios", "#horarios"],
  ["Recursos", "#recursos"],
  ["Proyectos", "#proyectos"],
  ["Noticias", "#noticias"],
  ["Normas", "#normas"],
  ["Galería", "#galeria"]
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-[#123523] text-white">
      <div className="aip-shell grid gap-8 py-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white shadow-sm">
              <Image src="/images/logo-aip.png" alt="Logo Aula AIP" width={58} height={58} className="size-14 object-contain" />
            </span>
            <span>
              <strong className="block text-2xl font-black text-white">Aula AIP</strong>
              <span className="text-sm font-bold text-white/90">Aula de Innovación Pedagógica</span>
            </span>
          </div>
          <p className="mt-5 max-w-[12rem] text-sm font-black leading-relaxed text-white">Crear hoy, mejorar mañana.</p>
          <div className="mt-4 flex gap-3">
            <SocialIcon label="Facebook"><Facebook className="size-4" /></SocialIcon>
            <SocialIcon label="Instagram"><Instagram className="size-4" /></SocialIcon>
            <SocialIcon label="YouTube"><Youtube className="size-4" /></SocialIcon>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-white">Enlaces rápidos</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-bold text-white/90">
            {quickLinks.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:translate-x-1 hover:text-white">{label}</a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-white">Contacto</h2>
          <div className="mt-4 grid gap-2 text-sm font-bold text-white/90">
            <span className="flex items-center gap-2"><Phone className="size-4 text-white" /> 920 596 194</span>
            <span className="flex items-center gap-2"><UserRound className="size-4 text-white" /> JOHN VALENZUELA TORRES</span>
            <span className="flex items-center gap-2"><Mail className="size-4 text-white" /> Plataforma informativa Aula AIP</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-white">Ubicación</h2>
          <p className="mt-4 flex gap-2 text-sm font-bold leading-relaxed text-white/90">
            <MapPin className="mt-0.5 size-4 shrink-0 text-white" />
            <span>I.E. Nicolás La Torre García<br />Av. Sáenz Peña 1815<br />José Leonardo Ortiz, Chiclayo</span>
          </p>
        </div>
      </div>
      <div className="border-t border-white/20 bg-[#0B2618] py-3 text-center text-xs font-black text-white">
        © {currentYear} Aula AIP - Todos los derechos reservados.
      </div>
    </footer>
  );
}

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid size-8 place-items-center rounded-full border border-white/70 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#123523] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {children}
    </a>
  );
}

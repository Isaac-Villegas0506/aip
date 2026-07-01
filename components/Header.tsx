"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  ["Inicio", "#inicio"],
  ["Horarios", "#horarios"],
  ["Recursos", "#recursos"],
  ["Proyectos", "#proyectos"],
  ["Noticias", "#noticias"],
  ["Normas", "#normas"],
  ["Galería", "#galeria"]
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 12);
      const scrollPosition = window.scrollY + 130;

      const current = navItems.reduce(
        (active, [, href]) => {
          const section = document.querySelector(href);
          if (!section) return active;

          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          return sectionTop <= scrollPosition && sectionTop >= active.top
            ? { href, top: sectionTop }
            : active;
        },
        { href: "#inicio", top: 0 }
      ).href;

      setActiveHref(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open ? "px-3 pt-3 md:px-5" : "px-0 pt-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled || open
            ? "max-w-[1200px] rounded-[28px] border border-line bg-cream/90 px-4 py-2.5 shadow-soft backdrop-blur-md"
            : "max-w-full rounded-none border-b border-line bg-cream/96 px-4 py-3 shadow-sm md:px-8"
        }`}
      >
        <a
          href={isHome ? "#inicio" : "/#inicio"}
          className="flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green focus-visible:ring-offset-4"
        >
          <Image
            src="/images/logo-aip.png"
            alt="Logo institucional Aula AIP"
            width={64}
            height={64}
            priority
            className="aip-logo-breathe size-12 object-contain md:size-14"
          />
          <span className="min-w-0">
            <span className="block text-xl font-black leading-tight text-aip-greenDark md:text-3xl">
              Aula AIP
            </span>
            <span className="block truncate text-[11px] font-extrabold leading-tight text-aip-green md:text-sm">
              Aula de Innovación Pedagógica
            </span>
          </span>
        </a>

        <nav
          aria-label="Secciones principales"
          className="hidden items-center gap-1 rounded-full border border-line bg-white/88 p-1.5 text-sm font-black shadow-sm lg:flex"
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={isHome ? href : `/${href}`}
              aria-current={activeHref === href ? "page" : undefined}
              onClick={() => setActiveHref(href)}
              className={`rounded-full px-4 py-2.5 transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
                activeHref === href
                  ? "bg-aip-green text-white shadow-card"
                  : "text-aip-greenDark hover:bg-aip-greenSoft"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl bg-aip-green text-white shadow-card transition hover:bg-aip-greenDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-yellow lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-[1200px] rounded-3xl border border-line bg-white p-3 shadow-soft lg:hidden">
          <nav aria-label="Secciones principales móvil" className="grid gap-1 text-base font-extrabold">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={isHome ? href : `/${href}`}
                aria-current={activeHref === href ? "page" : undefined}
                className={`rounded-2xl px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
                  activeHref === href ? "bg-aip-green text-white" : "text-aip-greenDark hover:bg-aip-greenSoft"
                }`}
                onClick={() => {
                  setActiveHref(href);
                  setOpen(false);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

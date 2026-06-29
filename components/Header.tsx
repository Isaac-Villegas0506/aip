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
      setScrolled(window.scrollY > 8);

      const scrollPosition = window.scrollY + 150;
      const current = navItems.reduce(
        (active, [, href]) => {
          const section = document.querySelector(href);

          if (!section) {
            return active;
          }

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

  const elevated = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,padding] duration-300 ease-out ${
        elevated ? "bg-transparent px-3 py-2.5 md:px-8 md:py-4" : "bg-cream/95 px-0 py-0"
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-[1500px] items-center justify-between gap-4 transition-all duration-300 ease-out ${
          elevated
            ? "rounded-2xl border border-line bg-cream/92 px-4 py-2.5 shadow-[0_18px_40px_rgba(0,77,36,0.16)] backdrop-blur-md md:rounded-full md:px-6 md:py-2"
            : "border-b border-line/70 bg-cream/95 px-4 py-3 md:px-10 md:py-3 lg:px-12"
        }`}
      >
        <a
          href={isHome ? "#inicio" : "/#inicio"}
          className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green focus-visible:ring-offset-4 md:min-w-max"
        >
          <Image
            src="/images/logo-aip.png"
            alt="Logo institucional Aula AIP"
            width={82}
            height={82}
            priority
            className="h-11 w-11 object-contain drop-shadow-sm transition-all duration-300 md:h-12 md:w-12"
          />
          <span className="min-w-0">
            <span className="block text-lg font-black leading-tight tracking-normal text-aip-greenDark md:text-2xl">
              Aula AIP
            </span>
            <span className="block text-[10px] font-extrabold leading-tight text-aip-green md:text-xs">
              Aula de Innovación Pedagógica
            </span>
          </span>
        </a>

        <nav aria-label="Secciones principales" className="hidden items-center gap-2 rounded-full border border-line bg-white/75 px-3 py-2 text-sm font-black shadow-card lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={isHome ? href : `/${href}`}
              aria-current={activeHref === href ? "page" : undefined}
              onClick={() => setActiveHref(href)}
              className={`relative rounded-full px-4 py-2 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
                activeHref === href
                  ? "bg-aip-green text-white shadow-sm"
                  : "text-aip-greenDark hover:bg-aip-yellowSoft hover:text-aip-greenDark"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-lg bg-aip-green text-white shadow-card transition-colors duration-200 hover:bg-aip-greenDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-yellow lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-line bg-cream p-4 shadow-soft lg:hidden">
            <nav aria-label="Secciones principales móvil" className="grid gap-1 text-base font-bold">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={isHome ? href : `/${href}`}
                  aria-current={activeHref === href ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aip-green ${
                    activeHref === href
                      ? "bg-aip-green text-white"
                      : "text-ink hover:bg-aip-greenSoft"
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
      </div>
    </header>
  );
}

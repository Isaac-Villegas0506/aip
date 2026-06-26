import { Instagram, Music2, Youtube } from "lucide-react";
import { DecorativeDoodles } from "./DecorativeDoodles";

export function Footer() {
  return (
    <footer className="relative mt-2 h-28 overflow-hidden rounded-b-2xl">
      <div className="footer-wave absolute inset-0 bg-aip-green" />
      <DecorativeDoodles variant="footer" />
      <div className="relative z-10 flex h-full items-end justify-between gap-4 px-8 pb-5 text-white md:px-14">
        <div className="w-24" />
        <p className="text-center text-base font-extrabold md:text-lg">Crear hoy, mejorar mañana.</p>
        <div className="flex w-24 justify-end gap-5">
          <a aria-label="TikTok" href="#" className="rounded-md focus:outline-none focus:ring-2 focus:ring-white">
            <Music2 className="h-6 w-6" />
          </a>
          <a aria-label="Instagram" href="#" className="rounded-md focus:outline-none focus:ring-2 focus:ring-white">
            <Instagram className="h-6 w-6" />
          </a>
          <a aria-label="YouTube" href="#" className="rounded-md focus:outline-none focus:ring-2 focus:ring-white">
            <Youtube className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

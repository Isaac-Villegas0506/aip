import type { Metadata } from "next";
import { Knewave, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-rounded",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap"
});

const knewave = Knewave({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Aula AIP | Aula de Innovacion Pedagogica",
  description:
    "Landing escolar para horarios, recursos, proyectos, noticias y galeria del Aula AIP."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${knewave.variable}`}>
        {children}
      </body>
    </html>
  );
}

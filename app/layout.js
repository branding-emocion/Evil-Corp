import { Inter } from "next/font/google";
import "./globals.css";
import Main from "./Main";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nosotros - R-CORPORACIÓN | Líderes en Maquinaria Industrial",
  description:
    "Conoce R-CORPORACIÓN, empresa líder con +6 años de experiencia en maquinaria y herramientas para minería y construcción en Perú. Más de 500 clientes satisfechos y +1000 proyectos realizados con garantía, calidad y eficiencia.",
  keywords:
    "R-CORPORACIÓN, maquinaria industrial, minería, construcción, Perú, servicio técnico, ingeniería, proyectos industriales, herramientas industriales",
  openGraph: {
    title: "Nosotros - R-CORPORACIÓN | Líderes en Maquinaria Industrial",
    description:
      "Empresa líder con +6 años de experiencia en maquinaria industrial para minería y construcción. Tu socio estratégico de confianza en Perú.",
    type: "website",
    locale: "es_PE",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Main>{children}</Main>

        <Toaster />
      </body>
    </html>
  );
}

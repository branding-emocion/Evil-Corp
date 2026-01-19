"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ItemMenu from "./ItemMenu";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Smartphone, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const MenuPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Íconos de WhatsApp flotantes en la esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-[100]">
        <motion.a
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          title="WhatsApp - 960 040 522"
          aria-label="WhatsApp Alternativo"
          href="https://api.whatsapp.com/send/?phone=%2B51960040522&text=Hola,%20me%20interesa%20obtener%20información%20sobre%20sus%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300 group"
        >
          <Phone className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </motion.a>
      </div>

      {/* Barra superior con información de contacto */}
      <div className="bg-green-900 text-white py-2 px-4 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a
              href="mailto:VENTAS@CORPORACIONRYL.COM"
              className="flex items-center space-x-2 hover:text-[#e7b617] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>VENTAS@CORPORACIONRYL.COM</span>
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="tel:+51960040522"
                className="flex items-center space-x-1 hover:text-[#e7b617] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>960 040 522</span>
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="tel:+51967447382"
                className="hover:text-[#e7b617] transition-colors"
              >
                967 447 382
              </a>
            </div>
          </div>
          <div className="text-[#e7b617] font-medium">
            GARANTÍA • CALIDAD • EFICIENCIA
          </div>
        </div>
      </div>

      {/* Menú principal */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="sticky z-50 top-0 bg-[#10603e] text-white shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link className="flex items-center" href="/" title="Ir a inicio">
              <div className="flex items-center  ">
                <div className="w-[200px]  h-[51px] relative ">
                  <Image
                    src="/logoBlanco1.png"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>

            {/* Menú Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <ItemMenu
                ruta="/"
                setIsOpen={setIsOpen}
                border={pathname === "/" ? true : false}
              >
                Inicio
              </ItemMenu>
              <ItemMenu
                ruta="/Productos"
                setIsOpen={setIsOpen}
                border={pathname === "/Productos" ? true : false}
              >
                Productos
              </ItemMenu>
              <ItemMenu
                ruta="/Nosotros"
                setIsOpen={setIsOpen}
                border={pathname === "/Nosotros" ? true : false}
              >
                Nosotros
              </ItemMenu>
              <ItemMenu
                ruta="/Contacto"
                setIsOpen={setIsOpen}
                border={pathname === "/Contacto" ? true : false}
              >
                Contacto
              </ItemMenu>
            </div>

            {/* Botón de contacto y teléfono - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/Contacto">
                <Button className="bg-[#e7b617] hover:bg-[#e7b617] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                  Cotizar Ahora
                </Button>
              </Link>

              <a
                href="tel:+51960040522"
                className="flex items-center space-x-2 text-[#e7b617] hover:text-orange-200 transition-colors"
              >
                <div className="bg-[#e7b617] p-2 rounded-lg">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase font-medium">Llámanos</p>
                  <p className="text-lg font-bold">960 040 522</p>
                </div>
              </a>
            </div>

            {/* Botón menú móvil */}
            <button
              name="Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menú móvil */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col space-y-2 pt-4 border-t border-green-700">
              <ItemMenu
                ruta="/"
                setIsOpen={setIsOpen}
                border={pathname === "/" ? true : false}
                mobile={true}
              >
                Inicio
              </ItemMenu>
              <ItemMenu
                ruta="/Productos"
                setIsOpen={setIsOpen}
                border={pathname === "/Productos" ? true : false}
                mobile={true}
              >
                Productos
              </ItemMenu>
              <ItemMenu
                ruta="/Nosotros"
                setIsOpen={setIsOpen}
                border={pathname === "/Nosotros" ? true : false}
                mobile={true}
              >
                Nosotros
              </ItemMenu>
              <ItemMenu
                ruta="/Contacto"
                setIsOpen={setIsOpen}
                border={pathname === "/Contacto" ? true : false}
                mobile={true}
              >
                Contacto
              </ItemMenu>

              {/* Información de contacto móvil */}
              <div className="pt-4 border-t border-green-700 space-y-3">
                <Link href="/Contacto" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#e7b617] hover:bg-[#e7b617] text-white font-semibold py-3 rounded-lg">
                    Cotizar Ahora
                  </Button>
                </Link>

                <div className="flex justify-between">
                  <a
                    href="tel:+51960040522"
                    className="flex items-center space-x-2 text-[#e7b617]"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">960 040 522</span>
                  </a>
                  <a
                    href="tel:+51967447382"
                    className="flex items-center space-x-2 text-[#e7b617]"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">967 447 382</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default MenuPrincipal;

"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  ArrowRight,
  Award,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const enlaces = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Productos", href: "/Productos" },
    { nombre: "Nosotros", href: "/Nosotros" },
    { nombre: "Contacto", href: "/Contacto" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Información de la empresa */}
          <motion.div variants={fadeInVariants} className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-[250px]  h-[101px] relative ">
                  <Image
                    src="/logoBlanco1.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Más de 6 años de experiencia en el mercado peruano, siendo tu
              socio estratégico de confianza en maquinaria industrial para
              minería y construcción.
            </p>

            {/* Valores */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Award className="w-6 h-6 text-[#e7b617] mx-auto mb-1" />
                <p className="text-xs font-medium">GARANTÍA</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-[#e7b617] mx-auto mb-1" />
                <p className="text-xs font-medium">CALIDAD</p>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-[#e7b617] mx-auto mb-1" />
                <p className="text-xs font-medium">EFICIENCIA</p>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/corporacionrlservice"
                className="w-10 h-10 bg-gray-800 hover:bg-[#e7b617] rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/corporacionrlservice/"
                className="w-10 h-10 bg-gray-800 hover:bg-[#e7b617] rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@corporacionrlservice"
                className="w-10 h-10 bg-gray-800 hover:bg-[#e7b617] rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div variants={fadeInVariants}>
            <h4 className="text-lg font-bold mb-6 text-white">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {enlaces.map((enlace, index) => (
                <li key={index}>
                  <Link
                    href={enlace.href}
                    className="text-gray-300 hover:text-[#e7b617] transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    {enlace.nombre}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Horarios */}
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4 text-white">
                Horarios de Atención
              </h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#e7b617]" />
                  <span className="text-sm">Lun - Vie: 8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#e7b617]" />
                  <span className="text-sm">Sáb: 8:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#e7b617]" />
                  <span className="text-sm">Dom: Cerrado</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Información de contacto */}
          <motion.div variants={fadeInVariants}>
            <h4 className="text-lg font-bold mb-6 text-white">Contacto</h4>

            <div className="space-y-4">
              {/* Dirección */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#e7b617] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Dirección</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    CAL. MARTINEZ DE COMPAÑON 578
                    <br />
                    URB SAN ANDRES
                    <br />
                    LA LIBERTAD, TRUJILLO
                    <br />
                    Perú
                  </p>
                </div>
              </div>

              {/* Teléfonos */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Teléfonos</p>
                  <div className="space-y-1">
                    <a
                      href="tel:+51960040522"
                      className="block text-gray-300 hover:text-[#e7b617] transition-colors text-sm"
                    >
                      +51 960 040 522
                    </a>
                    <a
                      href="tel:+51967447382"
                      className="block text-gray-300 hover:text-[#e7b617] transition-colors text-sm"
                    >
                      +51 967 447 382
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a
                    href="mailto:VENTAS@CORPORACIONRYL.COM"
                    className="text-gray-300 hover:text-[#e7b617] transition-colors text-sm"
                  >
                    VENTAS@CORPORACIONRYL.COM
                  </a>
                </div>
              </div>
            </div>

            {/* Botón de WhatsApp */}
            <div className="mt-6">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B51960040522&text=Hola,%20me%20interesa%20obtener%20información%20sobre%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-center  items-center space-y-4 md:space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                &copy; {new Date().getFullYear()} Corporación R&L. Todos los
                derechos reservados.
              </p>
              <p className="mt-1">
                Desarrollado con ❤️ para la industria peruana
              </p>
            </div>

            {/* <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link
                href="/privacidad"
                className="text-gray-400 hover:text-[#e7b617] transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-gray-400 hover:text-[#e7b617] transition-colors"
              >
                Términos de Uso
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-[#e7b617] transition-colors"
              >
                Política de Cookies
              </Link>
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Elemento decorativo */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-[#e7b617] to-red-600"></div>
    </footer>
  );
};

export default Footer;

"use client";
import { motion } from "framer-motion";
import {
  Award,
  Shield,
  Zap,
  Target,
  Briefcase,
  CheckCircle,
  Users,
  Building,
  Wrench,
  TrendingUp,
} from "lucide-react";

export default function NosotrosPage() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const servicios = [
    {
      icon: Wrench,
      titulo: "Servicio Técnico",
      descripcion:
        "Mantenimiento preventivo, reparación de averías y calibración de equipos",
    },
    {
      icon: Building,
      titulo: "Ingeniería y Proyectos",
      descripcion:
        "Planificación, diseño y construcción de soluciones industriales completas",
    },
    {
      icon: Users,
      titulo: "Atención Personalizada",
      descripcion: "Equipo especializado para brindar soporte técnico 24/7",
    },
  ];

  const estadisticas = [
    {
      numero: "+6",
      texto: "Años de Experiencia",
      descripcion: "En el mercado peruano",
    },
    {
      numero: "+500",
      texto: "Clientes Satisfechos",
      descripcion: "En todo el país",
    },
    {
      numero: "+1000",
      texto: "Proyectos Realizados",
      descripcion: "Con éxito garantizado",
    },
    {
      numero: "24/7",
      texto: "Soporte Técnico",
      descripcion: "Disponible siempre",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-700 via-orange-600 to-red-600 py-24">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nosotros
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Más de 6 años de experiencia nos convierten en tu socio
              estratégico de confianza en maquinaria industrial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quienes Somos - Mejorado */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Imagen y badge */}
              <motion.div variants={fadeInVariants} className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JYifqY6jT5MoziZXVEf7EeliFdvDsq.png"
                    alt="Corporación R&L - Instalaciones y Maquinaria"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Badge de experiencia */}
                <div className="absolute -bottom-8 -right-8 bg-green-800 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <p className="text-3xl font-bold">+6</p>
                    <p className="text-sm font-medium">Años de</p>
                    <p className="text-sm font-medium">Experiencia</p>
                  </div>
                </div>

                {/* Elementos decorativos */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500 rounded-full opacity-20"></div>
                <div className="absolute top-1/2 -right-6 w-16 h-16 bg-green-800 rounded-full opacity-30"></div>
              </motion.div>

              {/* Contenido */}
              <motion.div variants={fadeInVariants} className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    ¿Quiénes <span className="text-orange-500">Somos?</span>
                  </h2>
                  <div className="w-20 h-1 bg-orange-500 mb-6"></div>
                </div>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Somos una{" "}
                    <strong className="text-gray-800">empresa líder</strong> con
                    más de 6 años de experiencia en el mercado peruano, lo que
                    nos convierte en un{" "}
                    <strong className="text-orange-600">
                      socio estratégico de confianza
                    </strong>{" "}
                    en el abastecimiento de maquinarias y herramientas para la
                    minería y construcción.
                  </p>

                  <p>
                    Contamos con{" "}
                    <strong className="text-gray-800">
                      precios competitivos
                    </strong>
                    , tiempos óptimos de respuesta para los requerimientos, así
                    como una atención personalizada de postventa garantizando
                    satisfacer las necesidades de nuestros clientes.
                  </p>
                </div>

                {/* Características destacadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        Compromiso con la calidad
                      </h4>
                      <p className="text-sm text-gray-600">
                        Productos y servicios de primer nivel
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        Crecimiento sostenible
                      </h4>
                      <p className="text-sm text-gray-600">
                        Expansión responsable en el mercado
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estadísticas mejoradas */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {estadisticas.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors">
                    {stat.numero}
                  </div>
                  <p className="text-lg font-semibold mb-1">{stat.texto}</p>
                  <p className="text-sm text-gray-300">{stat.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Misión y Visión mejoradas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Misión y <span className="text-orange-500">Visión</span>
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestro propósito y objetivos que guían cada decisión que
                tomamos para servir mejor a nuestros clientes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                variants={fadeInVariants}
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-800 to-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Misión
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Expandir de manera sostenible y rentable en el ámbito de la
                    industria y minera en todas sus formas, generando valor para
                    nuestros colaboradores, entidades tanto privadas como
                    públicas, clientes y proveedores, y apoyando el desarrollo
                    de nuestro país.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInVariants}
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Visión
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Ser el aliado y proveedor clave en el ámbito industrial y
                    minero, seleccionado tanto por entidades gubernamentales
                    como por clientes privados, para la realización de sus
                    proyectos, estableciendo una relación de confianza duradera.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores mejorados */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Nuestros <span className="text-orange-500">Valores</span>
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Los principios fundamentales que definen nuestra forma de
                trabajar y relacionarnos con nuestros clientes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              <motion.div
                variants={fadeInVariants}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-16 h-16 text-orange-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  GARANTÍA
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Respaldamos todos nuestros productos y servicios con garantía
                  completa, asegurando su funcionamiento óptimo y durabilidad a
                  largo plazo.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInVariants}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="w-16 h-16 text-green-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  CALIDAD
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Trabajamos con los más altos estándares internacionales para
                  ofrecer productos y servicios que superen las expectativas de
                  nuestros clientes.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInVariants}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Zap className="w-16 h-16 text-yellow-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  EFICIENCIA
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimizamos nuestros procesos para ofrecer soluciones rápidas
                  y efectivas, maximizando el valor y minimizando los tiempos de
                  respuesta.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Nuestros <span className="text-orange-500">Servicios</span>
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ofrecemos servicios integrales para garantizar el óptimo
                funcionamiento de tu maquinaria industrial
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {servicios.map((servicio, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <servicio.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {servicio.descripcion}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

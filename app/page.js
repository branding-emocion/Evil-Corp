// "use client";
// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import { motion } from "framer-motion";
// import Link from "next/link";

// import { Phone, ShoppingBag, Users } from "lucide-react";

// const HomgePage = () => {
//   const BannerInicio = [
//     {
//       imagen: "/Banner/CanInicioBan.jpg",
//     },
//     {
//       imagen: "/Banner/Banner2.jpg",
//     },
//   ];
//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   };

//   return (
//     <div>
//       <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
//         {BannerInicio?.map((banner, index) => (
//           <div key={index} className="relative w-full h-full sm:h-[93vh]">
//             <img
//               src={banner.imagen}
//               className="h-full w-full object-contain lg:object-cover overflow-hidden  "
//               alt={`slider ${index}`}
//             />

//             <motion.div
//               className="absolute top-0 left-0 w-full h-full text-white bg-black/40 hidden lg:block "
//               initial="hidden"
//               animate="visible"
//               variants={fadeInVariants}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="flex   justify-start items-end -mt-20 max-w-[883px] h-full pl-2 sm:text-3xl sm:pl-20">
//                 <div className="max-w-[40rem] space-y-1 sm:space-y-4">
//                   <motion.section
//                     className="sm:p-2 font-bold bg-Secundario border border-Secundario text-xl uppercase rounded-3xl rounded-br-none rounded-tl-none outline-none shadow-lg hover:shadow-xl hover:opacity-90 duration-200 w-[10.5rem] text-white"
//                     initial="hidden"
//                     animate="visible"
//                     variants={fadeInVariants}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                   >
//                     Perfección
//                   </motion.section>
//                   <motion.p
//                     className="text-start text-base sm:text-4xl font-extrabold"
//                     initial="hidden"
//                     animate="visible"
//                     variants={fadeInVariants}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                   >
//                     Arte y<span className=" uppercase"> Confección</span>
//                   </motion.p>

//                   <Link href={"/Productos"} className="flex justify-start">
//                     <motion.div
//                       className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-start cursor-pointer sm:h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-transparent text-white border-Secundario   hover:bg-Secundario"
//                       initial="hidden"
//                       animate="visible"
//                       variants={fadeInVariants}
//                       transition={{ duration: 0.8, delay: 0.6 }}
//                     >
//                       <strong className="font-bold uppercase">Productos</strong>
//                       <span className="absolute bg-Secundario bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]" />
//                     </motion.div>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         ))}
//       </Carousel>

//       {/* <CarrouselVideo VideoCarrousel={BannerInicio || []} /> */}

//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Link href="/Productos" className="group">
//               <div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
//                 <ShoppingBag className="w-12 h-12 text-cyan-600 mb-4" />
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//                   Productos
//                 </h2>
//                 <p className="text-gray-600">
//                   Explora nuestra amplia gama de productos para tus proyectos
//                   creativos y del hogar.
//                 </p>
//                 <div className="mt-4">
//                   <span className="text-cyan-600 font-semibold group-hover:underline">
//                     Ver productos
//                   </span>
//                 </div>
//               </div>
//             </Link>

//             <Link href="/Nosotros" className="group">
//               <div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
//                 <Users className="w-12 h-12 text-cyan-600 mb-4" />
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//                   Nosotros
//                 </h2>
//                 <p className="text-gray-600">
//                   Conoce más sobre nuestra historia, valores y el equipo detrás
//                   de Reanda.
//                 </p>
//                 <div className="mt-4">
//                   <span className="text-cyan-600 font-semibold group-hover:underline">
//                     Conócenos
//                   </span>
//                 </div>
//               </div>
//             </Link>

//             <Link href="/Contacto" className="group">
//               <div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
//                 <Phone className="w-12 h-12 text-cyan-600 mb-4" />
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//                   Contacto
//                 </h2>
//                 <p className="text-gray-600">
//                   ¿Tienes preguntas? Estamos aquí para ayudarte. Contáctanos
//                   para más información.
//                 </p>
//                 <div className="mt-4">
//                   <span className="text-cyan-600 font-semibold group-hover:underline">
//                     Contáctanos
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomgePage;

"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  ShoppingBag,
  Users,
  Award,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

const HomePage = () => {
  const BannerInicio = [
    {
      imagen: "/Banner/CanInicioBan.jpg",
    },
    {
      imagen: "/Banner/Banner2.jpg",
    },
  ];

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

  const productos = [
    {
      titulo: "Grupos Electrógenos",
      descripcion:
        "Generadores diesel trifásicos PRAMAC de alta calidad y eficiencia",
      potencias: "60 KVA - 1400 KVA",
    },
    {
      titulo: "Compresores Eléctricos",
      descripcion:
        "Compresores de tornillo con variador de frecuencia Atlas Copco",
      potencias: "30 HP - 160 HP",
    },
    {
      titulo: "Maquinaria Pesada",
      descripcion: "Retroexcavadoras, montacargas y equipos para construcción",
      potencias: "Diversas capacidades",
    },
  ];

  return (
    <div>
      {/* Carousel Section */}
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        showStatus={false}
        interval={5000}
      >
        {BannerInicio?.map((banner, index) => (
          <div key={index} className="relative w-full h-full sm:h-[93vh]">
            <img
              src={banner.imagen || "/placeholder.svg"}
              className="h-full w-full object-contain lg:object-cover overflow-hidden"
              alt={`slider ${index}`}
            />

            <motion.div
              className="absolute top-0 left-0 w-full h-full text-white bg-black/50 hidden lg:block"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex justify-start items-center h-full max-w-7xl mx-auto px-4 sm:px-20">
                <div className="max-w-2xl space-y-6">
                  <motion.div
                    className="inline-block px-6 py-3 bg-orange-500 text-white font-bold text-lg uppercase rounded-lg shadow-lg"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Corporación R&L
                  </motion.div>

                  <motion.h1
                    className="text-4xl sm:text-6xl font-extrabold leading-tight"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Maquinaria Industrial
                    <span className="block text-orange-400">de Calidad</span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-200 max-w-lg"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Más de 6 años de experiencia en el mercado peruano.
                    Garantía, Calidad y Eficiencia en cada proyecto.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link href="/Productos">
                      <div className="group inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                        <span>Ver Productos</span>
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    <Link href="/Contacto">
                      <div className="group inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold rounded-lg transition-all duration-300">
                        <span>Cotizar Ahora</span>
                        <Phone className="ml-2 w-5 h-5" />
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Carousel>

      {/* Valores Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold">GARANTÍA</h3>
              <p className="text-gray-200">
                Respaldamos todos nuestros productos con garantía completa
              </p>
            </motion.div>

            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold">CALIDAD</h3>
              <p className="text-gray-200">
                Productos de las mejores marcas internacionales
              </p>
            </motion.div>

            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold">EFICIENCIA</h3>
              <p className="text-gray-200">
                Soluciones rápidas y efectivas para tu industria
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de maquinaria industrial para satisfacer
              las necesidades de tu empresa
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {productos.map((producto, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt={producto.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {producto.titulo}
                  </h3>
                  <p className="text-gray-600 mb-3">{producto.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600">
                      {producto.potencias}
                    </span>
                    <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <Link href="/Productos">
              <div className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                <span>Ver Todos los Productos</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-orange-500 mb-2">+6</div>
              <p className="text-gray-600">Años de Experiencia</p>
            </motion.div>
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-orange-500 mb-2">
                +500
              </div>
              <p className="text-gray-600">Clientes Satisfechos</p>
            </motion.div>
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-orange-500 mb-2">
                +1000
              </div>
              <p className="text-gray-600">Proyectos Realizados</p>
            </motion.div>
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-orange-500 mb-2">
                24/7
              </div>
              <p className="text-gray-600">Soporte Técnico</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navegación a otras páginas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Explora Más
            </h2>
            <p className="text-gray-600">
              Descubre todo lo que Corporación R&L tiene para ofrecerte
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants}>
              <Link href="/Productos" className="group block">
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                    <ShoppingBag className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Productos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explora nuestra amplia gama de maquinaria industrial: grupos
                    electrógenos, compresores, equipos de construcción y más.
                  </p>
                  <div className="flex items-center text-orange-500 font-semibold group-hover:text-orange-600">
                    <span>Ver productos</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Link href="/Nosotros" className="group block">
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-800 transition-colors">
                    <Users className="w-8 h-8 text-green-800 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Nosotros
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Conoce más sobre nuestra historia, misión, visión y los
                    valores que nos han convertido en líderes del sector.
                  </p>
                  <div className="flex items-center text-green-800 font-semibold group-hover:text-green-900">
                    <span>Conócenos</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Link href="/Contacto" className="group block">
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                    <Phone className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Contacto
                  </h3>
                  <p className="text-gray-600 mb-6">
                    ¿Necesitas una cotización o tienes preguntas? Nuestro equipo
                    está listo para ayudarte con tu proyecto.
                  </p>
                  <div className="flex items-center text-orange-500 font-semibold group-hover:text-orange-600">
                    <span>Contáctanos</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

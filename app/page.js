// "use client";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { db } from "@/firebase/firebaseClient";
// import Image from "next/image";
// import {
//   Phone,
//   ShoppingBag,
//   Users,
//   Award,
//   Shield,
//   Zap,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";

// const HomePage = () => {
//   const [productosDestacados, setProductosDestacados] = useState([]);
//   const [categorias, setCategorias] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const BannerInicio = [
//     {
//       imagen: "/Banner.webp",
//     },
//     {
//       imagen: "/Banner2.webp",
//     },
//   ];

//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   // Obtener productos recomendados y categorías desde Firebase
//   useEffect(() => {
//     const categoriasRef = collection(db, "Categorias");
//     const productosRef = collection(db, "Productos");

//     // Query para obtener solo productos recomendados y activos
//     const productosRecomendadosQuery = query(
//       productosRef,
//       where("Recomendado", "==", true),
//       where("Estado", "==", "Activo")
//     );

//     const unsubscribeCategorias = onSnapshot(categoriasRef, (snapshot) => {
//       const categoriasData = snapshot?.docs?.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setCategorias(categoriasData);
//     });

//     const unsubscribeProductos = onSnapshot(
//       productosRecomendadosQuery,
//       (snapshot) => {
//         const productosData = snapshot?.docs?.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProductosDestacados(productosData);
//         setIsLoading(false);
//       }
//     );

//     return () => {
//       unsubscribeCategorias();
//       unsubscribeProductos();
//     };
//   }, []);

//   // Función para obtener el nombre de la categoría
//   const getNombreCategoria = (categoriaId) => {
//     const categoria = categorias.find((cat) => cat.id === categoriaId);
//     return categoria?.NombreCategoria || "Sin categoría";
//   };

//   // Función para obtener la imagen del producto
//   const getImagenProducto = (producto) => {
//     if (producto?.ImagenesGenerales?.length > 0) {
//       return producto.ImagenesGenerales[0];
//     }
//     if (producto?.Variantes?.length > 0) {
//       return producto.Variantes[0]?.url;
//     }
//     return "/placeholder.svg?height=200&width=300";
//   };

//   return (
//     <div>
//       {/* Carousel Section */}
//       <Carousel
//         infiniteLoop
//         autoPlay
//         showThumbs={false}
//         showStatus={false}
//         interval={5000}
//       >
//         {BannerInicio?.map((banner, index) => (
//           <div key={index} className="relative w-full h-full sm:h-[93vh]">
//             <img
//               src={banner.imagen || "/placeholder.svg"}
//               className="h-full w-full object-contain lg:object-cover overflow-hidden"
//               alt={`slider ${index}`}
//             />

//             <motion.div
//               className="absolute top-0 left-0 w-full h-full text-white bg-black/50 hidden lg:block"
//               initial="hidden"
//               animate="visible"
//               variants={fadeInVariants}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="flex justify-start items-center h-full max-w-7xl mx-auto px-4 sm:px-20">
//                 <div className="max-w-2xl space-y-6">
//                   <motion.div
//                     className="inline-block px-6 py-3 bg-orange-500 text-white font-bold text-lg uppercase rounded-lg shadow-lg"
//                     initial="hidden"
//                     animate="visible"
//                     variants={fadeInVariants}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                   >
//                     Corporación R&L
//                   </motion.div>

//                   <motion.h1
//                     className="text-4xl sm:text-6xl font-extrabold leading-tight"
//                     initial="hidden"
//                     animate="visible"
//                     variants={fadeInVariants}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                   >
//                     Maquinaria Industrial
//                     <span className="block text-orange-400">de Calidad</span>
//                   </motion.h1>

//                   <motion.p
//                     className="text-xl text-gray-200 max-w-lg"
//                     initial="hidden"
//                     animate="visible"
//                     variants={fadeInVariants}
//                     transition={{ duration: 0.8, delay: 0.5 }}
//                   >
//                     Más de 6 años de experiencia en el mercado peruano.
//                     Garantía, Calidad y Eficiencia en cada proyecto.
//                   </motion.p>

//                   <motion.div
//                     className="flex flex-col sm:flex-row gap-4"
//                     initial="hidden"
//                     animate="visible"
//                     variants={fadeInVariants}
//                     transition={{ duration: 0.8, delay: 0.6 }}
//                   >
//                     <Link href="/Productos">
//                       <div className="group inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
//                         <span>Ver Productos</span>
//                         <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </Link>

//                     <Link href="/Contacto">
//                       <div className="group inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold rounded-lg transition-all duration-300">
//                         <span>Cotizar Ahora</span>
//                         <Phone className="ml-2 w-5 h-5" />
//                       </div>
//                     </Link>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         ))}
//       </Carousel>

//       {/* Valores Section */}
//       <section className="py-16 bg-green-800 text-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <motion.div variants={fadeInVariants} className="space-y-4">
//               <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
//                 <Award className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold">GARANTÍA</h3>
//               <p className="text-gray-200">
//                 Respaldamos todos nuestros productos con garantía completa
//               </p>
//             </motion.div>

//             <motion.div variants={fadeInVariants} className="space-y-4">
//               <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
//                 <Shield className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold">CALIDAD</h3>
//               <p className="text-gray-200">
//                 Productos de las mejores marcas internacionales
//               </p>
//             </motion.div>

//             <motion.div variants={fadeInVariants} className="space-y-4">
//               <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
//                 <Zap className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold">EFICIENCIA</h3>
//               <p className="text-gray-200">
//                 Soluciones rápidas y efectivas para tu industria
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Productos Destacados */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center mb-12"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInVariants}
//           >
//             <h2 className="text-4xl font-bold text-gray-800 mb-4">
//               Productos Destacados
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Descubre nuestra selección de maquinaria industrial recomendada
//               para tu empresa
//             </p>
//           </motion.div>

//           {isLoading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="text-center">
//                 <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
//                 <p className="text-gray-600">
//                   Cargando productos destacados...
//                 </p>
//               </div>
//             </div>
//           ) : productosDestacados.length > 0 ? (
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={staggerContainer}
//             >
//               {productosDestacados?.slice(0, 6).map((producto, index) => (
//                 <motion.div
//                   key={producto.id}
//                   variants={fadeInVariants}
//                   className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
//                 >
//                   <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
//                     <Image
//                       src={getImagenProducto(producto) || "/placeholder.svg"}
//                       alt={producto.NombreProducto}
//                       width={300}
//                       height={200}
//                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute top-3 right-3">
//                       <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                         Destacado
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="mb-2">
//                       <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
//                         {getNombreCategoria(producto.Categoria)}
//                       </span>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
//                       {producto.NombreProducto}
//                     </h3>
//                     {producto.ITEM && (
//                       <p className="text-sm text-gray-600 mb-2">
//                         <span className="font-semibold">ITEM:</span>{" "}
//                         {producto.ITEM}
//                       </p>
//                     )}
//                     {producto.Description && (
//                       <div
//                         className="text-gray-600 mb-3 line-clamp-3 text-sm"
//                         dangerouslySetInnerHTML={{
//                           __html:
//                             producto.Description.replace(
//                               /\n/g,
//                               "<br>"
//                             ).substring(0, 120) + "...",
//                         }}
//                       />
//                     )}
//                     <div className="flex items-center justify-between">
//                       <Link href={`/Productos?${producto.id}`}>
//                         <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center group">
//                           Ver detalles
//                           <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                         </button>
//                       </Link>
//                       <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <ShoppingBag className="h-16 w-16 mx-auto" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                 No hay productos destacados
//               </h3>
//               <p className="text-gray-500">
//                 Los productos destacados aparecerán aquí cuando estén
//                 disponibles
//               </p>
//             </div>
//           )}

//           <motion.div
//             className="text-center mt-12"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInVariants}
//           >
//             <Link href="/Productos">
//               <div className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
//                 <span>Ver Todos los Productos</span>
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </div>
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* Estadísticas */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <motion.div variants={fadeInVariants}>
//               <div className="text-4xl font-bold text-orange-500 mb-2">+6</div>
//               <p className="text-gray-600">Años de Experiencia</p>
//             </motion.div>
//             <motion.div variants={fadeInVariants}>
//               <div className="text-4xl font-bold text-orange-500 mb-2">
//                 +500
//               </div>
//               <p className="text-gray-600">Clientes Satisfechos</p>
//             </motion.div>
//             <motion.div variants={fadeInVariants}>
//               <div className="text-4xl font-bold text-orange-500 mb-2">
//                 +1000
//               </div>
//               <p className="text-gray-600">Proyectos Realizados</p>
//             </motion.div>
//             <motion.div variants={fadeInVariants}>
//               <div className="text-4xl font-bold text-orange-500 mb-2">
//                 24/7
//               </div>
//               <p className="text-gray-600">Soporte Técnico</p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Navegación a otras páginas */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center mb-12"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInVariants}
//           >
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Explora Más
//             </h2>
//             <p className="text-gray-600">
//               Descubre todo lo que Corporación R&L tiene para ofrecerte
//             </p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <motion.div variants={fadeInVariants}>
//               <Link href="/Productos" className="group block">
//                 <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
//                   <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
//                     <ShoppingBag className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4 text-gray-800">
//                     Productos
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Explora nuestra amplia gama de maquinaria industrial: grupos
//                     electrógenos, compresores, equipos de construcción y más.
//                   </p>
//                   <div className="flex items-center text-orange-500 font-semibold group-hover:text-orange-600">
//                     <span>Ver productos</span>
//                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>

//             <motion.div variants={fadeInVariants}>
//               <Link href="/Nosotros" className="group block">
//                 <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
//                   <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-800 transition-colors">
//                     <Users className="w-8 h-8 text-green-800 group-hover:text-white transition-colors" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4 text-gray-800">
//                     Nosotros
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Conoce más sobre nuestra historia, misión, visión y los
//                     valores que nos han convertido en líderes del sector.
//                   </p>
//                   <div className="flex items-center text-green-800 font-semibold group-hover:text-green-900">
//                     <span>Conócenos</span>
//                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>

//             <motion.div variants={fadeInVariants}>
//               <Link href="/Contacto" className="group block">
//                 <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
//                   <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
//                     <Phone className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4 text-gray-800">
//                     Contacto
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     ¿Necesitas una cotización o tienes preguntas? Nuestro equipo
//                     está listo para ayudarte con tu proyecto.
//                   </p>
//                   <div className="flex items-center text-orange-500 font-semibold group-hover:text-orange-600">
//                     <span>Contáctanos</span>
//                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import Image from "next/image";
import {
  Phone,
  ShoppingBag,
  Users,
  Award,
  Shield,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";
import BannerPrincipal from "@/components/BannerPrincipal";

// Importar nuestro nuevo componente de carrusel

const HomePage = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Nuevo estado para el carrusel administrable
  const [carouselItems, setCarouselItems] = useState([]);

  // Mantener el banner original como fallback
  const BannerInicio = [
    {
      imagen: "/Banner.webp",
    },
    {
      imagen: "/Banner2.webp",
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

  // Obtener productos recomendados y categorías desde Firebase
  useEffect(() => {
    const categoriasRef = collection(db, "Categorias");
    const productosRef = collection(db, "Productos");

    // Query para obtener solo productos recomendados y activos
    const productosRecomendadosQuery = query(
      productosRef,
      where("Recomendado", "==", true),
      where("Estado", "==", "Activo")
    );

    const unsubscribeCategorias = onSnapshot(categoriasRef, (snapshot) => {
      const categoriasData = snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorias(categoriasData);
    });

    const unsubscribeProductos = onSnapshot(
      productosRecomendadosQuery,
      (snapshot) => {
        const productosData = snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductosDestacados(productosData);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribeCategorias();
      unsubscribeProductos();
    };
  }, []);

  // Cargar elementos del carrusel administrable
  useEffect(() => {
    const loadCarouselItems = async () => {
      try {
        const stored = localStorage.getItem("carouselItems");
        if (stored) {
          const items = JSON.parse(stored);
          setCarouselItems(items.sort((a, b) => a.order - b.order));
        }
      } catch (error) {
        console.error("Error loading carousel items:", error);
      }
    };

    loadCarouselItems();
  }, []);

  // Función para obtener el nombre de la categoría
  const getNombreCategoria = (categoriaId) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria?.NombreCategoria || "Sin categoría";
  };

  // Función para obtener la imagen del producto
  const getImagenProducto = (producto) => {
    if (producto?.ImagenesGenerales?.length > 0) {
      return producto.ImagenesGenerales[0];
    }
    if (producto?.Variantes?.length > 0) {
      return producto.Variantes[0]?.url;
    }
    return "/placeholder.svg?height=200&width=300";
  };

  return (
    <div>
      {/* Carousel Section - Reemplazado con nuestro nuevo componente */}
      {carouselItems.length > 0 ? (
        <BannerPrincipal items={carouselItems} />
      ) : (
        // Fallback al carrusel original si no hay elementos administrables
        <div className="relative w-full h-[93vh]">
          <img
            src={BannerInicio[0].imagen || "/placeholder.svg"}
            className="h-full w-full object-contain lg:object-cover overflow-hidden"
            alt="slider fallback"
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
                  Más de 6 años de experiencia en el mercado peruano. Garantía,
                  Calidad y Eficiencia en cada proyecto.
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
      )}

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
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de maquinaria industrial recomendada
              para tu empresa
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  Cargando productos destacados...
                </p>
              </div>
            </div>
          ) : productosDestacados.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {productosDestacados?.slice(0, 6).map((producto, index) => (
                <motion.div
                  key={producto.id}
                  variants={fadeInVariants}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                    <Image
                      src={getImagenProducto(producto) || "/placeholder.svg"}
                      alt={producto.NombreProducto}
                      width={300}
                      height={200}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Destacado
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                        {getNombreCategoria(producto.Categoria)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {producto.NombreProducto}
                    </h3>
                    {producto.ITEM && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">ITEM:</span>{" "}
                        {producto.ITEM}
                      </p>
                    )}
                    {producto.Description && (
                      <div
                        className="text-gray-600 mb-3 line-clamp-3 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            producto.Description.replace(
                              /\n/g,
                              "<br>"
                            ).substring(0, 120) + "...",
                        }}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <Link href={`/Productos?${producto.id}`}>
                        <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center group">
                          Ver detalles
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                      <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <ShoppingBag className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No hay productos destacados
              </h3>
              <p className="text-gray-500">
                Los productos destacados aparecerán aquí cuando estén
                disponibles
              </p>
            </div>
          )}

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

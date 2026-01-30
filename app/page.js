"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
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
import ModalShowProducto from "@/components/ModalShowProducto";

const HomePage = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselItems, setCarouselItems] = useState([]);
  const [showModalProductos, setShowModalProductos] = useState({
    Visible: false,
    Producto: {},
  });

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

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        const categoriasSnapshot = await getDocs(collection(db, "Categorias"));
        const categoriasData = categoriasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategorias(categoriasData);

        const productosQuery = query(
          collection(db, "Productos"),
          where("Recomendado", "==", true),
          where("Estado", "==", "Activo")
        );
        const productosSnapshot = await getDocs(productosQuery);
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductosDestacados(productosData);

        const carouselQuery = query(
          collection(db, "carousel"),
          orderBy("order", "asc")
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselData = carouselSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarouselItems(carouselData);
      } catch (error) {
        console.error("Error loading data:", error);
        setCategorias([]);
        setProductosDestacados([]);
        setCarouselItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  const getNombreCategoria = (categoriaId) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria?.NombreCategoria || "Sin categoría";
  };

  const getImagenProducto = (producto) => {
    if (producto?.ImagenesGenerales?.length > 0) {
      return producto.ImagenesGenerales[0];
    }
    if (producto?.Variantes?.length > 0) {
      return producto.Variantes[0]?.url;
    }
    return "";
  };

  const handleVerDetalles = (producto) => {
    setShowModalProductos({
      Visible: true,
      Producto: producto,
    });
  };

  return (
    <div>
      {/* Carousel Section */}
      <div className="relative w-full h-[85vh] md:h-[90vh] lg:h-[93vh] overflow-hidden">
        {carouselItems.length > 0 ? (
          <BannerPrincipal items={carouselItems} />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-[#e7b617] mx-auto mb-4" />
              <p className="text-gray-600">Cargando banner...</p>
            </div>
          </div>
        )}
      </div>

      {/* Valores Section */}
      <section className="py-16 bg-[#10603e] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="w-20 h-20 bg-[#e7b617] rounded-full flex items-center justify-center mx-auto">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold">GARANTÍA</h3>
              <p className="text-gray-200">
                Respaldamos todos nuestros productos con garantía completa
              </p>
            </motion.div>
            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="w-20 h-20 bg-[#e7b617] rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold">CALIDAD</h3>
              <p className="text-gray-200">
                Productos de las mejores marcas internacionales
              </p>
            </motion.div>
            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="w-20 h-20 bg-[#e7b617] rounded-full flex items-center justify-center mx-auto">
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
                <Loader2 className="h-12 w-12 animate-spin text-[#e7b617] mx-auto mb-4" />
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
                      <span className="bg-[#e7b617] text-white text-xs font-bold px-2 py-1 rounded-full">
                        Destacado
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-[#e7b617] uppercase tracking-wide">
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
                      <button
                        onClick={() => handleVerDetalles(producto)}
                        className="text-[#e7b617] hover:text-[#d4a615] font-semibold text-sm flex items-center group"
                      >
                        Ver detalles
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <ArrowRight className="w-5 h-5 text-[#e7b617] group-hover:translate-x-1 transition-transform" />
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
              <div className="inline-flex items-center px-8 py-4 bg-[#e7b617] hover:bg-[#d4a615] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
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
              <div className="text-4xl font-bold text-[#e7b617] mb-2">+6</div>
              <p className="text-gray-600">Años de Experiencia</p>
            </motion.div>
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-[#e7b617] mb-2">+500</div>
              <p className="text-gray-600">Clientes Satisfechos</p>
            </motion.div>
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-[#e7b617] mb-2">
                +1000
              </div>
              <p className="text-gray-600">Proyectos Realizados</p>
            </motion.div>
            <motion.div variants={fadeInVariants}>
              <div className="text-4xl font-bold text-[#e7b617] mb-2">24/7</div>
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
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#e7b617] transition-colors">
                    <ShoppingBag className="w-8 h-8 text-[#e7b617] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Productos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explora nuestra amplia gama de maquinaria industrial: grupos
                    electrógenos, compresores, equipos de construcción y más.
                  </p>
                  <div className="flex items-center text-[#e7b617] font-semibold group-hover:text-[#d4a615]">
                    <span>Ver productos</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Link href="/Nosotros" className="group block">
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#10603e] transition-colors">
                    <Users className="w-8 h-8 text-[#10603e] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Nosotros
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Conoce más sobre nuestra historia, misión, visión y los
                    valores que nos han convertido en líderes del sector.
                  </p>
                  <div className="flex items-center text-[#10603e] font-semibold group-hover:text-green-900">
                    <span>Conócenos</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Link href="/Contacto" className="group block">
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#e7b617] transition-colors">
                    <Phone className="w-8 h-8 text-[#e7b617] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Contacto
                  </h3>
                  <p className="text-gray-600 mb-6">
                    ¿Necesitas una cotización o tienes preguntas? Nuestro equipo
                    está listo para ayudarte con tu proyecto.
                  </p>
                  <div className="flex items-center text-[#e7b617] font-semibold group-hover:text-[#d4a615]">
                    <span>Contáctanos</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal de Producto */}
      <ModalShowProducto
        product={showModalProductos.Producto}
        ShowModalProductos={showModalProductos}
        setShowModalProductos={setShowModalProductos}
        categories={categorias}
      />
    </div>
  );
};

export default HomePage;

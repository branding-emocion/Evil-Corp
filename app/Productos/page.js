import TitleSection from "@/components/TitleSection";
import React from "react";
import { dbAdmin } from "@/firebase/firebaseAdmin";
import GetProductos from "@/lib/GetProductos";
import StoreComponent from "./StoreComponent";

// export const revalidate = 86400; // revalidate at most every hour
// export const metadata = {
//   title: "Tienda REANDA",
//   description:
//     "Descubre en REANDA productos de alta calidad para costura y confección, diseñados para inspirar creatividad y sostenibilidad. Ofrecemos opciones para todos los niveles, con un servicio personalizado que garantiza una experiencia excepcional. Transformamos tus ideas en realidad, caminando juntos hacia un futuro creativo.",

//   openGraph: {
//     title: "Tienda REANDA",
//   },
// };

const Productos = async () => {
  try {
    const [categoriasResult, productosResult] = await Promise.all([
      dbAdmin?.collection("Categorias").get(),
      GetProductos(),
    ]);

    // Procesar las categorías
    const categoriasSerializable = categoriasResult?.empty
      ? []
      : categoriasResult.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

    // Convertir categorías a datos serializables
    const categorias = JSON.parse(JSON.stringify(categoriasSerializable));

    // Convertir productos a datos serializables
    const productos = JSON.parse(JSON.stringify(productosResult));

    return (
      <div>
        <TitleSection title={"Productos"} image="/Banner.webp" />

        <StoreComponent products={productos} categories={categorias} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products or categories:", error);
    return <p>Error loading products and categories.</p>;
  }
};

export default Productos;

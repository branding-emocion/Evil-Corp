import TitleSection from "@/components/TitleSection";
import React from "react";
import { dbAdmin } from "@/firebase/firebaseAdmin";
import GetProductos from "@/lib/GetProductos";
import StoreComponent from "./StoreComponent";

export const revalidate = 86400; // revalidate at most every hour

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

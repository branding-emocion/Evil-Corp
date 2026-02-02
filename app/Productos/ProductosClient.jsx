"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import StoreComponent from "./StoreComponent";
import { Loader2 } from "lucide-react";

export default function ProductosClient() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Cargar categorías
        const categoriasSnapshot = await getDocs(collection(db, "Categorias"));
        const categoriasData = categoriasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategorias(categoriasData);

        // Cargar productos activos
        const productosQuery = query(
          collection(db, "Productos"),
          where("Estado", "==", "Activo")
        );
        const productosSnapshot = await getDocs(productosQuery);
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error loading data:", error);
        setProductos([]);
        setCategorias([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#e7b617] mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return <StoreComponent products={productos} categories={categorias} />;
}

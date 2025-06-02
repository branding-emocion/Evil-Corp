"use client";
import React, { useEffect, useState } from "react";
import ModalCategorias from "./ModalCategorias";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePlus, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

const Categorias = () => {
  const [OpenModalCategoria, setOpenModalCategoria] = useState({
    Visible: false,
    InfoEditar: {},
  });
  const [Categorias, setCategorias] = useState([]);

  useEffect(() => {
    const categoriasRef = collection(db, "Categorias");
    const unsubscribeCategorias = onSnapshot(categoriasRef, (snapshot) => {
      setCategorias(
        snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    // Cleanup function to unsubscribe from the snapshot listener

    return () => {
      unsubscribeCategorias(); // Desuscribirse al desmontar el componente
    };
  }, []);

  return (
    <div className="space-y-6">
      {OpenModalCategoria?.Visible && (
        <ModalCategorias
          OpenModalCategoria={OpenModalCategoria}
          setOpenModalCategoria={setOpenModalCategoria}
        />
      )}

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Lista de Categorias </CardTitle>
          <div className="flex gap-2 ">
            <Button
              title="Agregar nueva Categoria"
              onClick={(e) => {
                e.preventDefault();
                setOpenModalCategoria({
                  Visible: true,
                  InfoEditar: {},
                });
              }}
              className="space-x-2"
            >
              <BadgePlus />
              <p>Agregar Nueva Categoria</p>
            </Button>

            <Button
              onClick={(e) => {
                e.preventDefault();
                setFilterByCategoria("Todos");
              }}
              title="Todos los Productos"
            >
              <EyeIcon className=" " />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4  ">
              {Categorias?.map((Categoria) => (
                <div
                  key={Categoria.id}
                  className="w-full mx-auto border  border-gray-200 bg-white rounded-lg  shadow-md"
                >
                  {Categoria?.Imagenes?.length > 0 && (
                    <section className="relative w-full h-[200px]">
                      <Image
                        className="rounded-t-lg "
                        fill
                        src={Categoria?.Imagenes[0] || ""}
                        alt="imageCategoria"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </section>
                  )}

                  <div className="p-5">
                    <div>
                      <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
                        {Categoria?.NombreCategoria}
                      </h1>
                      <p>{Categoria?.Descripcion}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-x-2 pb-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFilterByCategoria(Categoria.id);
                      }}
                      className="bg-orange-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-orange-600"
                    >
                      <EyeIcon className=" h-4 w-4" />
                    </button>
                    <button
                      title="Editar Categoria"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModalCategoria({
                          Visible: true,
                          InfoEditar: Categoria,
                        });
                      }}
                      className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      title="Eliminar Categoria"
                      onClick={async (e) => {
                        e.preventDefault();

                        const Confirm = confirm(
                          `Esta Seguro de eliminar esta Categoria: ${Categoria.NombreCategoria}`
                        );
                        if (Confirm) {
                          await deleteDoc(
                            doc(db, "Categorias", `${Categoria.id}`)
                          );

                          // Lista todos los objetos (archivos) en el directorio
                        }
                      }}
                      className="bg-red-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-red-600"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categorias;

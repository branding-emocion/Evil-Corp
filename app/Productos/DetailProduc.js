"use client";
import React, { useState } from "react";
import ModalShowProducto from "./ModalShowProducto";
import CarrouselProductosImagenes from "./CarrouselProductosImagenes";

const DetailProduc = (producto) => {
  const [ShowModalProductos, setShowModalProductos] = useState({
    Visible: false,
    Producto: {},
  });
  const Imagenes = [
    ...(producto?.ImagenesGenerales || []),
    ...(producto?.Variantes || []),
  ];

  const ImagenesFormated = Imagenes.filter(
    (imagen) => imagen.url || imagen.length > 0
  );

  return (
    <>
      {ShowModalProductos?.Visible && (
        <ModalShowProducto
          product={ShowModalProductos?.Producto}
          ShowModalProductos={ShowModalProductos}
          setShowModalProductos={setShowModalProductos}
        />
      )}
      <article
        onClick={(e) => {
          e.preventDefault();
          setShowModalProductos({
            Visible: true,
            Producto: {
              ...producto,
            },
          });
        }}
      >
        <div className="relative flex items-end overflow-hidden rounded-xl ">
          <CarrouselProductosImagenes Variantes={ImagenesFormated} />
          {/* <img className="h-48 w-full object-cover" /> */}
        </div>
        <div className="mt-1 p-2 cursor-pointer">
          <h2 className="text-base antialiased font-bold leading-relaxed text-gray-900">
            {producto?.NombreProducto}
          </h2>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex flex-col">
              <span className="font-medium">Código:</span>
              <span>{producto?.ITEM || "ITEM"}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium">Cantidad:</span>
              <span>{producto?.PCSCaja || "PCS-Caja"}</span>
            </div>
          </div>

          {/* <p className="mt-1 text-sm text-gray-500 line-clamp-3">
                                      
                                    </p> */}
          <div
            className="line-clamp-4 mt-1 text-sm text-gray-600 "
            dangerouslySetInnerHTML={{
              __html: producto?.Description || "",
            }}
          />
        </div>
      </article>
    </>
  );
};

export default DetailProduc;

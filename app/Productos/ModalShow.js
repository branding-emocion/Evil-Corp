"use client";
import React, { useRef, useState } from "react";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "./ImagenZoom";
import { formatterDolares, formatterSoles } from "@/lib/FormatMoneda";
import { FaRegFilePdf } from "react-icons/fa";
import { Download, FileText } from "lucide-react";

const ModalShow = ({ product, setShowModalProductos, Visibilidad }) => {
  const modalRef = useRef(null);
  
  // Asegurarse de que Info esté definido correctamente
  const Info = product || {};
  
  // Debug: Verificar si la ficha técnica existe
  console.log('ModalShow - Producto:', Info);
  console.log('ModalShow - FichaTecnica:', Info?.FichaTecnica);
  console.log('ModalShow - URLPDf:', Info?.FichaTecnica?.URLPDf);

  let NewArray = Info?.ImagenesGenerales || [];
  let Valor = null;
  
  if (Info?.Precio && Info?.Superficie) {
    Valor =
      parseFloat(Info?.Precio) *
      (parseFloat(Info?.Superficie) + parseFloat(Info?.SuperficieSubLote || 0));
  } else if (Info?.InfoCondomain?.PrecioDefecto && Info?.Superficie) {
    Valor =
      parseFloat(Info?.InfoCondomain?.PrecioDefecto) *
      (parseFloat(Info?.Superficie) + parseFloat(Info?.SuperficieSubLote || 0));
  }

  // Función para descargar ficha técnica
  const downloadFichaTecnica = () => {
    console.log('Intentando descargar ficha técnica...');
    console.log('URL:', Info?.FichaTecnica?.URLPDf);
    
    if (Info?.FichaTecnica?.URLPDf) {
      // Abrir en nueva pestaña
      const link = document.createElement('a');
      link.href = Info.FichaTecnica.URLPDf;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Si tiene nombre, usarlo para la descarga
      if (Info.FichaTecnica.name) {
        link.download = Info.FichaTecnica.name;
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No se encontró URL de ficha técnica');
      alert('No se pudo encontrar la ficha técnica');
    }
  };

  const handleClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModalProductos({
        Visible: false,
        Producto: {},
      });
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-950/50 transform scale-0 transition-transform duration-300 ${
          Visibilidad ? "scale-100" : ""
        } `}
      >
        {/* Modal content */}
        <div
          ref={modalRef}
          className="overflow-auto bg-white w-[95%] max-h-[95%] sm:w-[75%] p-6 rounded-lg"
        >
          {/* Título del producto */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {Info?.NombreProducto || "Producto sin nombre"}
            </h2>
            {Info?.ITEM && (
              <p className="text-sm text-gray-600 mt-1">
                Código: {Info.ITEM}
              </p>
            )}
          </div>

          {/* Carrusel de imágenes */}
          {NewArray.length > 0 && (
            <div className="mb-6">
              <Carousel
                infiniteLoop
                autoPlay
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                className="rounded-lg overflow-hidden"
              >
                {NewArray.map((img, index) => (
                  <div key={index} className="aspect-square">
                    <ImagenZoom
                      src={img || "/placeholder.svg"}
                      Info={Info}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Descripción del producto */}
          {Info?.Description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
              <div
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: Info.Description,
                }}
              />
            </div>
          )}

          {/* Precio */}
          {Info?.Precio && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">Precio</p>
              <p className="text-xl font-bold text-green-900">
                {Info.Precio}
              </p>
            </div>
          )}

          {/* SECCIÓN DE FICHA TÉCNICA - CORRECCIÓN PRINCIPAL */}
          {Info?.FichaTecnica?.URLPDf && (
            <div className="mb-6 border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Ficha Técnica
                    </h3>
                    <p className="text-sm text-blue-700">
                      {Info.FichaTecnica?.name || "Documento técnico del producto"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={downloadFichaTecnica}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Descargar
                </button>
              </div>
            </div>
          )}

          {/* Botón de cerrar */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowModalProductos({
                Visible: false,
                Producto: {},
              })}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalShow;

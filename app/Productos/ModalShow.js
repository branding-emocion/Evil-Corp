"use client";
import React, { useRef, useState } from "react";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "./ImagenZoom";
import { formatterDolares, formatterSoles } from "@/lib/FormatMoneda";
import { FaRegFilePdf } from "react-icons/fa";

const ModalShow = ({ product, setShowModalProductos, Visibilidad }) => {
  let NewArray = [];

  let Valor = null;
  if (Info?.Precio && Info?.Superficie) {
    Valor =
      parseFloat(Info?.Precio) *
      (parseFloat(Info?.Superficie) + parseFloat(Info?.SuperficieSubLote || 0));
  } else if (InfoCondomain?.PrecioDefecto && Info?.Superficie) {
    Valor =
      parseFloat(InfoCondomain?.PrecioDefecto) *
      (parseFloat(Info?.Superficie) + parseFloat(Info?.SuperficieSubLote || 0));
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-950/50 transform scale-0 transition-transform duration-300 ${
          Visible ? "scale-100" : ""
        } `}
      >
        {/* Modal content */}
        <div
          ref={modalRef}
          className="overflow-auto bg-white w-[95%] max-h-[95%]  sm:w-[75%]   p-6"
        >
          {/* <div className="flex justify-between">
            <Title className="uppercase">
              {InfoCondomain?.NombreCondominio}
            </Title>
            <XIcon
              onClick={(e) => {
                e.preventDefault();
                setModal({
                  visible: false,
                  Info: {},
                });
              }}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
          <Divider /> */}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ModalShow;

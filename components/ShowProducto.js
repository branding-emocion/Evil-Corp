import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

const ShowProducto = ({ product }) => {
  console.log("product", product);

  const Imagenes = [
    ...(product?.ImagenesGenerales || []),
    ...(product?.Variantes || []),
  ];

  const ImagenesFormated =
    Imagenes?.filter((imagen) => imagen.url || imagen.length > 0) || [];

  const [VarianteSelected, setVarianteSelected] = useState(null);

  let VarianteSelectedImage = null;

  if (VarianteSelected) {
    VarianteSelectedImage = Imagenes?.findIndex(
      (img) => img.key == VarianteSelected
    );
  }

  console.log("VarianteSelectedImage", VarianteSelectedImage);

  return (
    <div className="w-full h-full overflow-auto">
      <Breadcrumb>
        <BreadcrumbList className="capitalize">
          <Link href={"/"}>
            <BreadcrumbItem>
              <BreadcrumbLink>Reanda</BreadcrumbLink>
            </BreadcrumbItem>
          </Link>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {product?.NombreProducto || "Title Producto"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 lg:gap-x-4">
        <div className=" w-[80%] mx-auto h-full">
          <Carousel
            // opts={{
            //   loop: true,
            // }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              loop: true,
            }}
            className="w-full h-full  "
          >
            <CarouselContent className="  ">
              {ImagenesFormated?.map((image, i) => (
                <CarouselItem key={i} className="">
                  <div className="p-1">
                    <div className="flex aspect-auto lg:aspect-square items-center justify-center p-2 relative">
                      <Image
                        key={image?.key}
                        src={image?.url || image}
                        alt={product.title}
                        width={180}
                        height={200}
                        style={{
                          objectFit: "cover",
                        }}
                        className="border rounded-sm"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className=" flex justify-center flex-col items-center lg:items-start lg:justify-start mx-auto border w-full   rounded-md  p-5  space-y-2 overflow-auto">
          <h1 className="font-semibold uppercase">
            {product?.NombreProducto || "Title Producto"}
          </h1>
          <div className=" space-x-2 ">
            <Badge variant="outline">Código: {product?.ITEM || "ITEM"}</Badge>
            <Badge variant="outline">
              Cantidad: {product?.PCSCaja || "PCS-Caja"}
            </Badge>
          </div>

          {/* {product?.Variantes?.length > 0 && (
            <div className="space-y-2  ">
              <h1 className="font-semibold text-xl">Variantes</h1>
              <div className="">
                {product?.Variantes?.map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full h-full p-2 cursor-pointer  rounded-md hover:shadow-md "
                    >
                      <h1 className="capitalize  text-wrap">
                        {image?.Nombre || ""}
                      </h1>

                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={product.title}
                          width={100}
                          height={100}
                          className="border rounded-sm hover:scale-105"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                  );
                })}

                <Select
                  onValueChange={(e) => {
                    setVarianteSelected(e);
                  }}
                  className="w-full capitalize"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Lista de variantes" />
                  </SelectTrigger>
                  <SelectContent>
                    {product?.Variantes.map((option, key) => (
                      <SelectItem className="capitalize" key={key} value={key}>
                        {option.Nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {product?.FichaTecnica?.URLPDf && (
            <a
              href={product?.FichaTecnica?.URLPDf}
              target="_blank"
              title="Ficha Tecnica"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full h-full space-x-2 uppercase">
                <FileSearch className="w-6 h-6" />
                <span>Ficha Técnica</span>
              </Button>
            </a>
          )} */}

          <div
            dangerouslySetInnerHTML={{
              __html: product?.Description || "Description no dispinible",
            }}
            className="py-2 "
          />
        </div>
      </div>
    </div>
  );
};

export default ShowProducto;

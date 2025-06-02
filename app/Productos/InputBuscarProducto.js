"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/U65n2R9fQie
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ModalShowProducto from "./ModalShowProducto";

export default function InputBuscarProducto({ Productos }) {
  const [Visible, setVisible] = useState(false);
  const [ProductosVisible, setProductosVisible] = useState([]);
  const [ShowModalProductos, setShowModalProductos] = useState({
    Visible: false,
    Producto: {},
  });

  const closeOpenModalMarcas = () => {
    setVisible(false);
  };
  return (
    <>
      {ShowModalProductos.Visible && (
        <ModalShowProducto
          product={ShowModalProductos?.Producto}
          Visibilidad={ShowModalProductos?.Visible}
          setShowModalProductos={setShowModalProductos}
        />
      )}
      <div className="w-full max-w-lg mx-auto mt-4  ">
        <div
          className="relative z-10"
          onClick={(e) => {
            e.preventDefault();
            setVisible(true);
          }}
        >
          <Input
            type="text"
            placeholder="Buscar Productos "
            className="pl-4 pr-12 py-2 border rounded-full w-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute z- right-2 top-1/2 transform -translate-y-1/2"
          >
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        <Dialog open={Visible} onOpenChange={closeOpenModalMarcas}>
          <DialogContent>
            <div className="relative pt-4 z-10">
              <Input
                onChange={(e) => {
                  if (e.target.value === "") {
                    setProductosVisible([]);
                    return;
                  }
                  const newPru = Productos.filter((producto) => {
                    // Comprar si el nombre del producto incluye el texto de busqueda fomatado a minusculas y sin espacios
                    return producto?.NombreProducto.toLowerCase()
                      .replace(/\s/g, "")
                      .includes(
                        e.target.value.toLowerCase().replace(/\s/g, "")
                      );
                  });
                  // limitar los productos a 5

                  setProductosVisible(newPru.slice(0, 5));
                }}
                type="text"
                placeholder="Buscar Productos "
                className="pl-4 pr-12 py-2 border rounded-full w-full "
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <SearchIcon className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            <div className=" p-4 bg-white border rounded-lg shadow  ">
              <div className="mb-4">
                <h3 className="text-sm font-bold">Tu busqueda</h3>
                {ProductosVisible?.map((producto) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModalProductos({
                        Visible: true,
                        Producto: {
                          ...producto,
                        },
                      });
                    }}
                    key={producto.id}
                    className="flex items-center mt-2 cursor-pointer"
                  >
                    <ClockIcon className="w-4 h-4 text-muted-foreground mr-2" />
                    <span>{producto?.NombreProducto}</span>
                  </div>
                ))}
              </div>
              {/* <div>
              <h3 className="text-sm font-bold">Categorias</h3>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge variant="outline">way to celebrate disfraces</Badge>
                <Badge variant="outline">parrilla de carbón</Badge>
                <Badge variant="outline">bocadillos de queso</Badge>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
            </div> */}
            </div>
          </DialogContent>
        </Dialog>

        {/* <div className="mt-4 p-4 bg-white border rounded-lg shadow  ">
        <div className="mb-4">
          <h3 className="text-sm font-bold">Tus búsquedas recientes</h3>
          <div className="flex items-center mt-2">
            <ClockIcon className="w-4 h-4 text-muted-foreground mr-2" />
            <span>bisagras para puertas</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Tendencias</h3>
          <div className="flex flex-wrap mt-2 gap-2">
            <Badge variant="outline">way to celebrate disfraces</Badge>
            <Badge variant="outline">parrilla de carbón</Badge>
            <Badge variant="outline">bocadillos de queso</Badge>
            <Button variant="ghost" size="icon" className="ml-auto">
              <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import ModalProducto from "./ModalProducto";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   onSnapshot,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "@/firebase/firebaseClient";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   BadgePlus,
//   EyeIcon,
//   HeartIcon,
//   PencilIcon,
//   TrashIcon,
// } from "lucide-react";
// import Image from "next/image";
// import { deleteObject, listAll, ref } from "firebase/storage";

// const Productos = () => {
//   const [Productos, setProductos] = useState([]);
//   const [Categorias, setCategorias] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [FilterByCategoria, setFilterByCategoria] = useState("");
//   console.log("Productos", Productos);

//   const [OpenModalProducto, setOpenModalProducto] = useState({
//     Visible: false,
//     InfoEditar: {},
//   });

//   useEffect(() => {
//     const categoriasRef = collection(db, "Categorias");
//     const productosRef = collection(db, "Productos");

//     const unsubscribeCategorias = onSnapshot(categoriasRef, (snapshot) => {
//       setCategorias(
//         snapshot?.docs?.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     });

//     const unsubscribeProductos = onSnapshot(productosRef, (snapshot) => {
//       const data = snapshot?.docs?.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProductos(data);
//       setFilteredItems(data);
//     });

//     // Cleanup function to unsubscribe from the snapshot listener

//     return () => {
//       unsubscribeCategorias(); // Desuscribirse al desmontar el componente
//       unsubscribeProductos();
//     };
//   }, []);

//   useEffect(() => {
//     if (FilterByCategoria == "Todos") {
//       setFilteredItems(Productos);
//     } else {
//       const filteredItems = Productos.reduce((acc, item) => {
//         if (FilterByCategoria == "Adicionales") {
//           if (item.esAdicional == "Si") {
//             acc.push(item);
//           }
//         } else {
//           const Categoria =
//             !FilterByCategoria || item.Categoria == FilterByCategoria;

//           if (Categoria) {
//             acc.push(item);
//           }
//         }
//         return acc;
//       }, []);

//       setFilteredItems(filteredItems);
//     }
//   }, [FilterByCategoria, Productos]);

//   return (
//     <div>
//       {OpenModalProducto?.Visible && (
//         <ModalProducto
//           OpenModalProducto={OpenModalProducto}
//           setOpenModalProducto={setOpenModalProducto}
//           Categorias={Categorias}
//         />
//       )}
//       <Card className="shadow-md">
//         <CardHeader>
//           <CardTitle>Lista de Categorias </CardTitle>
//           <div className="flex gap-2 ">
//             {/* <Button
//               title="Agregar nueva Categoria"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setOpenModalCategoria({
//                   Visible: true,
//                   InfoEditar: {},
//                 });
//               }}
//               className="space-x-2"
//             >
//               <BadgePlus />
//               <p>Agregar Nueva Categoria</p>
//             </Button> */}

//             {/* <Button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setFilterByCategoria("Todos");
//               }}
//               title="Todos los Productos"
//             >
//               <EyeIcon className=" " />
//             </Button> */}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div>
//             <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4  ">
//               {Categorias?.map((Categoria) => (
//                 <div
//                   key={Categoria.id}
//                   className="w-full mx-auto border  border-gray-200 bg-white rounded-lg  shadow-md"
//                 >
//                   {Categoria?.Imagenes?.length > 0 && (
//                     <section className="relative w-full h-[200px]">
//                       <Image
//                         className="rounded-t-lg "
//                         fill
//                         src={Categoria?.Imagenes[0] || ""}
//                         alt="imageCategoria"
//                         style={{
//                           objectFit: "cover",
//                         }}
//                       />
//                     </section>
//                   )}

//                   <div className="p-5">
//                     <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
//                       {Categoria?.NombreCategoria}
//                     </h1>
//                   </div>

//                   <div className="flex items-center justify-center gap-x-2 pb-2">
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setFilterByCategoria(Categoria.id);
//                       }}
//                       className="bg-orange-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-[#e7b617]"
//                     >
//                       <EyeIcon className=" h-4 w-4" />
//                     </button>
//                     <button
//                       title="Editar Categoria"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setOpenModalCategoria({
//                           Visible: true,
//                           InfoEditar: Categoria,
//                         });
//                       }}
//                       className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
//                     >
//                       <PencilIcon className="w-4 h-4" />
//                     </button>
//                     <button
//                       title="Eliminar Categoria"
//                       onClick={async (e) => {
//                         e.preventDefault();

//                         const Confirm = confirm(
//                           `Esta Seguro de eliminar esta Categoria: ${Categoria.NombreCategoria}`
//                         );
//                         if (Confirm) {
//                           await deleteDoc(
//                             doc(db, "Categorias", `${Categoria.id}`)
//                           );

//                           // Lista todos los objetos (archivos) en el directorio
//                         }
//                       }}
//                       className="bg-red-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-red-600"
//                     >
//                       <TrashIcon className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md">
//         <CardHeader>
//           <CardTitle>Lista de Productos</CardTitle>
//           <div>
//             <Button
//               title="Agregar nueva Categoria"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setOpenModalProducto({
//                   Visible: true,
//                   InfoEditar: {},
//                 });
//               }}
//               className="space-x-2"
//             >
//               <BadgePlus />
//               <p>Agregar Producto</p>
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div>
//             <div className="mx-auto grid  container  grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3  ">
//               {filteredItems?.map((producto) => (
//                 <div
//                   key={producto.id}
//                   className={`w-full h-full mx-auto shadow-md border  ${
//                     producto?.Estado == "Activo"
//                       ? "bg-green-200 border-green-500 "
//                       : (producto.Estado == "Inactivo" &&
//                           "bg-red-200 border-red-500 ") ||
//                         "bg-white"
//                   }  border-gray-200 rounded-lg`}
//                 >
//                   <div className="">
//                     {(producto?.Variantes?.length > 0 ||
//                       producto?.ImagenesGenerales?.length > 0) && (
//                       <>
//                         <section className="relative w-full h-[200px]">
//                           <Image
//                             className="rounded-t-lg "
//                             fill
//                             src={
//                               (producto?.ImagenesGenerales?.length > 0 &&
//                                 producto?.ImagenesGenerales[0]) ||
//                               producto?.Variantes[0]?.url ||
//                               ""
//                             }
//                             alt="imageCategoria"
//                             style={{
//                               objectFit: "contain",
//                             }}
//                           />
//                         </section>
//                       </>
//                     )}

//                     <div className="py-2  px-5">
//                       <div className="space-y-1">
//                         <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
//                           {producto?.NombreProducto}
//                         </h1>
//                         <h1 className="capitalize">
//                           <span className="font-semibold">Categoria: </span>
//                           {Categorias.find(
//                             (categoria) => producto.Categoria == categoria.id
//                           )?.NombreCategoria || "Sin Categoria"}
//                         </h1>
//                         <p>
//                           <span className="font-semibold">ITEM:</span>
//                           {producto?.ITEM || "Sin ITEM"}
//                         </p>
//                         <p>
//                           <span className="font-semibold">PCS-Caja:</span>

//                           {producto?.PCSCaja || "Sin PCS-Caja"}
//                         </p>
//                         <p className="line-clamp-3">{producto.Descripcion}</p>

//                         {/* Precio */}

//                         {/* <p className="text-3xl m-0 font-normal text-end ">
//                             S/ {producto?.Precio || 0}
//                           </p> */}
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-center gap-x-2 pb-2">
//                       <button
//                         onClick={async (e) => {
//                           e.preventDefault();
//                           const UpdateRef = doc(
//                             db,
//                             "Productos",
//                             `${producto?.id}`
//                           );

//                           const docSnapshot = await getDoc(UpdateRef);
//                           const recomendadoActual =
//                             docSnapshot.data().Recomendado;

//                           const nuevoRecomendado = recomendadoActual
//                             ? false
//                             : true;

//                           await updateDoc(UpdateRef, {
//                             Recomendado: nuevoRecomendado,
//                           });
//                         }}
//                         className="bg-black space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:opacity-60"
//                       >
//                         <HeartIcon
//                           className={`${
//                             producto?.Recomendado && "text-green-700"
//                           } w-4 h-4`}
//                         />
//                       </button>
//                       <button
//                         title={"Editar producto"}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setOpenModalProducto({
//                             Visible: true,
//                             InfoEditar: producto,
//                           });
//                         }}
//                         className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
//                       >
//                         <PencilIcon className="w-4 h-4" />
//                       </button>

//                       <button
//                         title={`Eliminar Producto ${producto?.NombreProducto}`}
//                         onClick={async (e) => {
//                           e.preventDefault();

//                           try {
//                             const Confirm = confirm(
//                               `Esta Seguro de eliminar el producto: ${producto?.NombreProducto}`
//                             );
//                             if (Confirm) {
//                               const ImgRef = ref(
//                                 storage,
//                                 `Productos/ImagenesGenerales/${producto?.NombreProducto?.replace(
//                                   /\s+/g,
//                                   "_"
//                                 )}/`
//                               );
//                               listAll(ImgRef)
//                                 .then((res) => {
//                                   res.items.forEach((itemRef) => {
//                                     // Ahora debes borrar cada objeto (archivo)
//                                     deleteObject(itemRef).catch((error) => {
//                                       // Maneja cualquier error
//                                       alert(
//                                         ` Error al eliminar ${itemRef.fullPath}`
//                                       );
//                                       console.log(
//                                         `Error al eliminar ${itemRef.fullPath}`,
//                                         error
//                                       );
//                                     });
//                                   });
//                                 })
//                                 .catch((error) => {
//                                   // Maneja cualquier error
//                                   console.error(
//                                     "Error al listar los objetos",
//                                     error
//                                   );
//                                 });

//                               await deleteDoc(
//                                 doc(db, "Productos", `${producto?.id}`)
//                               );
//                             }
//                           } catch (error) {
//                             console.error("Error deleting document: ", error);
//                           }
//                         }}
//                         className="bg-red-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-red-600"
//                       >
//                         <TrashIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Productos;

"use client";
import React, { useEffect, useState, useMemo } from "react";
import ModalProducto from "./ModalProducto";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BadgePlus,
  EyeIcon,
  HeartIcon,
  PencilIcon,
  TrashIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { deleteObject, listAll, ref } from "firebase/storage";

const ITEMS_PER_PAGE = 9;

const Productos = () => {
  const [Productos, setProductos] = useState([]);
  const [Categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilterByCategoria, setFilterByCategoria] = useState("Todos");
  const [FilterByEstado, setFilterByEstado] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [OpenModalProducto, setOpenModalProducto] = useState({
    Visible: false,
    InfoEditar: {},
  });

  useEffect(() => {
    const categoriasRef = collection(db, "Categorias");
    const productosRef = collection(db, "Productos");

    const unsubscribeCategorias = onSnapshot(categoriasRef, (snapshot) => {
      setCategorias(
        snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    const unsubscribeProductos = onSnapshot(productosRef, (snapshot) => {
      const data = snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
      setIsLoading(false);
    });

    return () => {
      unsubscribeCategorias();
      unsubscribeProductos();
    };
  }, []);

  // Filtrado y búsqueda mejorados
  const filteredProducts = useMemo(() => {
    let filtered = Productos;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (producto) =>
          producto.NombreProducto?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) || producto.ITEM?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (FilterByCategoria !== "Todos") {
      filtered = filtered.filter(
        (producto) => producto.Categoria === FilterByCategoria
      );
    }

    // Filtro por estado
    if (FilterByEstado !== "Todos") {
      filtered = filtered.filter(
        (producto) => producto.Estado === FilterByEstado
      );
    }

    return filtered;
  }, [Productos, searchTerm, FilterByCategoria, FilterByEstado]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, FilterByCategoria, FilterByEstado]);

  const handleDeleteProduct = async (producto) => {
    try {
      const Confirm = confirm(
        `¿Está seguro de eliminar el producto: ${producto?.NombreProducto}?`
      );
      if (Confirm) {
        // Eliminar imágenes del storage
        const ImgRef = ref(
          storage,
          `Productos/ImagenesGenerales/${producto?.NombreProducto?.replace(
            /\s+/g,
            "_"
          )}/`
        );
        try {
          const res = await listAll(ImgRef);
          await Promise.all(res.items.map((itemRef) => deleteObject(itemRef)));
        } catch (error) {
          console.warn("No se encontraron imágenes para eliminar:", error);
        }

        // Eliminar documento
        await deleteDoc(doc(db, "Productos", `${producto?.id}`));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error al eliminar el producto");
    }
  };

  const toggleRecommended = async (producto) => {
    try {
      const UpdateRef = doc(db, "Productos", `${producto?.id}`);
      const docSnapshot = await getDoc(UpdateRef);
      const recomendadoActual = docSnapshot.data().Recomendado;
      const nuevoRecomendado = !recomendadoActual;

      await updateDoc(UpdateRef, {
        Recomendado: nuevoRecomendado,
      });
    } catch (error) {
      console.error("Error updating recommendation:", error);
    }
  };

  const PaginationControls = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }
      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Mostrando {startIndex + 1}-
          {Math.min(endIndex, filteredProducts.length)} de{" "}
          {filteredProducts.length} productos
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {OpenModalProducto?.Visible && (
        <ModalProducto
          OpenModalProducto={OpenModalProducto}
          setOpenModalProducto={setOpenModalProducto}
          Categorias={Categorias}
        />
      )}

      {/* Sección de Categorías */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Filter className="h-6 w-6 text-orange-500" />
            Categorías
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Categorias?.map((categoria) => (
              <div
                key={categoria.id}
                className="group relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {categoria?.Imagenes?.length > 0 && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      className="group-hover:scale-105 transition-transform duration-300"
                      fill
                      src={categoria?.Imagenes[0] || ""}
                      alt={categoria?.NombreCategoria}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-4 line-clamp-2">
                    {categoria?.NombreCategoria}
                  </h3>

                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setFilterByCategoria(categoria.id)}
                      className="bg-orange-500 hover:bg-[#e7b617] text-white"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={async () => {
                        const confirm = window.confirm(
                          `¿Está seguro de eliminar la categoría: ${categoria.NombreCategoria}?`
                        );
                        if (confirm) {
                          await deleteDoc(
                            doc(db, "Categorias", `${categoria.id}`)
                          );
                        }
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sección de Productos */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BadgePlus className="h-6 w-6 text-blue-500" />
              Productos ({filteredProducts.length})
            </CardTitle>
            <Button
              onClick={() =>
                setOpenModalProducto({
                  Visible: true,
                  InfoEditar: {},
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <BadgePlus className="h-4 w-4 mr-2" />
              Agregar Producto
            </Button>
          </div>

          {/* Filtros y búsqueda */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={FilterByCategoria}
              onValueChange={setFilterByCategoria}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todas las categorías</SelectItem>
                {Categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.NombreCategoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={FilterByEstado} onValueChange={setFilterByEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos los estados</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterByCategoria("Todos");
                setFilterByEstado("Todos");
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((producto) => (
                  <div
                    key={producto.id}
                    className={`group relative bg-white border-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                      producto?.Estado === "Activo"
                        ? "border-green-200 hover:border-green-300"
                        : producto?.Estado === "Inactivo"
                        ? "border-red-200 hover:border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Badge de estado */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge
                        variant={
                          producto?.Estado === "Activo"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          producto?.Estado === "Activo"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {producto?.Estado || "Sin estado"}
                      </Badge>
                    </div>

                    {/* Badge de recomendado */}
                    {producto?.Recomendado && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <HeartIcon className="h-3 w-3 mr-1" />
                          Recomendado
                        </Badge>
                      </div>
                    )}

                    {/* Imagen del producto */}
                    {(producto?.ImagenesGenerales?.length > 0 ||
                      producto?.Variantes?.length > 0) && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          className="group-hover:scale-105 transition-transform duration-300"
                          fill
                          src={
                            producto?.ImagenesGenerales?.[0] ||
                            producto?.Variantes?.[0]?.url ||
                            "/placeholder.svg?height=200&width=300" ||
                            "/placeholder.svg"
                          }
                          alt={producto?.NombreProducto}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    )}

                    {/* Información del producto */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {producto?.NombreProducto}
                      </h3>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-600">
                            Categoría:
                          </span>
                          <span className="text-gray-900">
                            {Categorias.find(
                              (cat) => cat.id === producto.Categoria
                            )?.NombreCategoria || "Sin categoría"}
                          </span>
                        </div>

                        {producto?.ITEM && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-600">
                              ITEM:
                            </span>
                            <span className="text-gray-900 font-mono">
                              {producto.ITEM}
                            </span>
                          </div>
                        )}
                      </div>

                      {producto?.Description && (
                        <div
                          className="text-sm text-gray-600 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              producto.Description.replace(
                                /\n/g,
                                "<br>"
                              ).substring(0, 150) + "...",
                          }}
                        />
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleRecommended(producto)}
                        className={`${
                          producto?.Recomendado
                            ? "bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <HeartIcon
                          className={`h-4 w-4 ${
                            producto?.Recomendado ? "fill-current" : ""
                          }`}
                        />
                      </Button>

                      <Button
                        size="sm"
                        onClick={() =>
                          setOpenModalProducto({
                            Visible: true,
                            InfoEditar: producto,
                          })
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(producto)}
                        className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <PaginationControls />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Productos;

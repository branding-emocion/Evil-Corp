"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FileUploaderGeneral from "./FileUploaderGeneral";
import DeleteImagenes from "@/lib/DeleteImagenes";
import DeletePdf from "@/lib/DeletePdf";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, List, ListOrdered, Link, ImageIcon } from "lucide-react";

// Editor de texto rico personalizado y moderno
const RichTextEditor = ({ value, onChange, placeholder, className }) => {
  const [content, setContent] = useState(value || "");
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (value !== content) {
      setContent(value || "");
    }
  }, [value]);

  const handleChange = (newContent) => {
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const insertText = (before, after = "") => {
    const textarea = document.getElementById("rich-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);
    handleChange(newText);

    // Restaurar el cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, action: () => insertText("**", "**"), title: "Negrita" },
    { icon: Italic, action: () => insertText("*", "*"), title: "Cursiva" },
    { icon: List, action: () => insertText("\n- "), title: "Lista" },
    {
      icon: ListOrdered,
      action: () => insertText("\n1. "),
      title: "Lista numerada",
    },
    { icon: Link, action: () => insertText("[", "](url)"), title: "Enlace" },
    {
      icon: ImageIcon,
      action: () => insertText("![alt](", ")"),
      title: "Imagen",
    },
  ];

  return (
    <div className={`border rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        {formatButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title={button.title}
          >
            <button.icon className="w-4 h-4" />
          </button>
        ))}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded transition-colors"
          >
            {isPreview ? "Editar" : "Vista previa"}
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      {isPreview ? (
        <div className="p-4 min-h-32 prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: content
                .replace(/\n/g, "<br>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>"),
            }}
          />
        </div>
      ) : (
        <Textarea
          id="rich-textarea"
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-32 border-0 resize-none focus:ring-0"
          rows={6}
        />
      )}
    </div>
  );
};

const ModalProducto = ({
  OpenModalProducto,
  setOpenModalProducto,
  Categorias,
}) => {
  const [InputValues, setInputValues] = useState({
    Variantes: OpenModalProducto?.InfoEditar?.Variantes || [],
    TextoOpcion: "",
    Description: OpenModalProducto?.InfoEditar?.Description || "",
  });
  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [Marcas, setMarcas] = useState([]);
  const [files, setFiles] = useState([]);
  const [FilePDF, setFilePDF] = useState([]);

  useEffect(() => {
    if (!Object.keys(OpenModalProducto?.InfoEditar).length > 0) {
      return;
    }
    onSnapshot(collection(db, `Marcas`), (snapshot) =>
      setMarcas(
        snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  }, [OpenModalProducto?.InfoEditar]);

  // Actualizar descripción cuando cambie la info a editar
  useEffect(() => {
    if (OpenModalProducto?.InfoEditar?.Description) {
      setInputValues((prev) => ({
        ...prev,
        Description: OpenModalProducto.InfoEditar.Description,
      }));
    }
  }, [OpenModalProducto?.InfoEditar?.Description]);

  const closeOpenModalProducto = () => {
    setOpenModalProducto({
      Visible: false,
      InfoEditar: {},
    });
    setInputValues({
      Variantes: [],
      TextoOpcion: "",
      Description: "",
    });
  };

  const HandlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImagesGenerales = async (images, name, collection) => {
    const urlLinks = await Promise.all(
      images.map(async (image, index) => {
        const extension = image.name.split(".").pop();
        const timestamp = Date.now();
        const imageRef = ref(
          storage,
          `${collection}/${name}-${timestamp}/image-${index}.${extension}`
        );
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        return url;
      })
    );
    return urlLinks;
  };

  const uploadImages = async (images, NombreCarpeta, variante) => {
    const image = images;

    if (!image) {
      return [{}];
    }

    const imageRef = ref(
      storage,
      `Productos/${NombreCarpeta}/${variante?.Nombre?.replace(
        /\s+/g,
        "_"
      )}/image.jpg`
    );

    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);

    return {
      url,
      Nombre: variante?.Nombre,
      key: variante?.id || 0,
    };
  };

  const handleUploadPdf = async (NombreProducto, name, docRefCol) => {
    const storagePath = `files/${NombreProducto}/${name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, FilePDF);

    const urlPrd = "";
    uploadTask.on(
      "state_changed",
      (snap) => {
        // Progreso de carga
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
      async () => {
        const url = await getDownloadURL(storageRef);

        await updateDoc(doc(db, docRefCol), {
          FichaTecnica:
            {
              name: FilePDF.name,
              URLPDf: url,
            } || {},
        });
        setFilePDF(null);
      }
    );

    return urlPrd;
  };

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (Object.keys(OpenModalProducto?.InfoEditar).length > 0) {
        const UpdateRef = doc(
          db,
          "Productos",
          `${OpenModalProducto?.InfoEditar?.id}`
        );

        if (Object.keys(InputValues).length > 2) {
          await updateDoc(UpdateRef, {
            ...InputValues,
          });
        }

        if (FilePDF.name) {
          const NombreAnt =
            OpenModalProducto?.InfoEditar?.NombreProducto?.replace(/\s+/g, "_");
          const NombreCarpeta =
            InputValues?.NombreProducto?.replace(/\s+/g, "_") ||
            OpenModalProducto?.InfoEditar?.NombreProducto?.replace(/\s+/g, "_");

          await DeletePdf(`files/${NombreAnt}`);
          await handleUploadPdf(
            NombreCarpeta,
            FilePDF.name,
            `Productos/${OpenModalProducto?.InfoEditar?.id}`
          );
        }

        if (files?.length > 0) {
          const NombreArchivo =
            OpenModalProducto?.InfoEditar?.NombreProducto?.replace(
              /\s+/g,
              "_"
            ) || "";
          const NombreNuevo =
            InputValues?.NombreProducto?.replace(/\s+/g, "_") || NombreArchivo;

          await DeleteImagenes(NombreArchivo, "Productos/ImagenesGenerales");

          const ImagenesGenerales = await uploadImagesGenerales(
            files,
            NombreNuevo,
            "Productos/ImagenesGenerales"
          );

          const UpdateRef = doc(
            db,
            "Productos",
            `${OpenModalProducto?.InfoEditar?.id}`
          );
          await updateDoc(UpdateRef, {
            ImagenesGenerales: ImagenesGenerales || [],
          });
        }

        if (InputValues?.Variantes?.length > 0) {
          const FilesUpload = [];

          for (const variante of InputValues?.Variantes) {
            if (variante?.Imagenes?.length > 0) {
              const ImagenesSubi = variante?.Imagenes?.find(
                (image) => image instanceof File
              );

              if (ImagenesSubi) {
                const NombreCarpeta =
                  InputValues?.NombreProducto?.replace(/\s+/g, "_") ||
                  OpenModalProducto?.InfoEditar?.NombreProducto?.replace(
                    /\s+/g,
                    "_"
                  );

                const ImagesUrl = await uploadImages(
                  ImagenesSubi,
                  NombreCarpeta,
                  variante
                );

                FilesUpload.push(ImagesUrl);
              }
            } else {
              FilesUpload.push({
                ...variante,
              });
            }
          }

          await updateDoc(UpdateRef, {
            Variantes: FilesUpload || [],
          });
        }

        closeOpenModalProducto();
        return;
      } else {
        if (Object.keys(InputValues).length > 2) {
          const FilesUpload = [];

          if (InputValues?.Variantes?.length > 0) {
            for (const variante of InputValues?.Variantes) {
              if (variante?.Imagenes?.length > 0) {
                const ImagenesSubi = variante?.Imagenes?.find(
                  (image) => image instanceof File
                );

                if (ImagenesSubi) {
                  const NombreCarpeta =
                    InputValues?.NombreProducto?.replace(/\s+/g, "_") ||
                    OpenModalProducto?.InfoEditar?.NombreProducto?.replace(
                      /\s+/g,
                      "_"
                    );

                  const ImagesUrl = await uploadImages(
                    ImagenesSubi,
                    NombreCarpeta,
                    variante
                  );

                  FilesUpload.push(ImagesUrl);
                }
              } else {
                FilesUpload.push({
                  ...variante,
                });
              }
            }
          }

          const docRef = await addDoc(collection(db, "Productos"), {
            ...InputValues,
            Variantes: FilesUpload || InputValues?.Variantes || [],
          });

          if (FilePDF.name) {
            await handleUploadPdf(
              InputValues?.NombreProducto,
              FilePDF.name,
              `Productos/${docRef?.id}`
            );
          }

          if (files?.length > 0) {
            const NombreCarpeta = InputValues?.NombreProducto?.replace(
              /\s+/g,
              "_"
            );
            const ImagenesGenerales = await uploadImagesGenerales(
              files,
              NombreCarpeta,
              "Productos/ImagenesGenerales"
            );

            await updateDoc(doc(db, "Productos", `${docRef?.id}`), {
              ImagenesGenerales: ImagenesGenerales || [],
            });
          }

          closeOpenModalProducto();
        }
      }
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: err?.error?.errorInfo?.code || "Internal Server Error",
        description: err?.error?.errorInfo?.message || "Contacte con soporte",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={OpenModalProducto?.Visible}
      onOpenChange={closeOpenModalProducto}
    >
      <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModalProducto?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            un producto
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="NombreProducto" className="">
                Nombre del producto <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="NombreProducto"
                name="NombreProducto"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalProducto?.InfoEditar?.NombreProducto}
                required
                autoComplete="off"
                autoFocus
                type="text"
              />
            </div>

            <div className="space-y-2 ">
              <Label htmlFor="Estado" className="">
                Estado
              </Label>
              <Select
                value={InputValues?.Estado}
                defaultValue={OpenModalProducto?.InfoEditar?.Estado}
                onValueChange={(e) => {
                  setInputValues({
                    ...InputValues,
                    Estado: e,
                  });
                }}
                id="Estado"
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Define estado del producto" />
                </SelectTrigger>
                <SelectContent>
                  {[{ label: "Activo" }, { label: "Inactivo" }].map(
                    (estado) => (
                      <SelectItem key={estado.label} value={estado.label}>
                        {estado.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Categoria" className="">
                Categoria
              </Label>
              <Select
                value={
                  InputValues?.Categoria ||
                  OpenModalProducto?.InfoEditar?.Categoria
                }
                onValueChange={(e) => {
                  setInputValues({
                    ...InputValues,
                    Categoria: e,
                  });
                }}
                id="Categoria"
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Define categoría del producto" />
                </SelectTrigger>
                <SelectContent>
                  {Categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.NombreCategoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ITEM" className="">
                ITEM
              </Label>
              <Input
                id="ITEM"
                name="ITEM"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalProducto?.InfoEditar?.ITEM}
                autoComplete="off"
                type="text"
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="Imagenes">
                Imagen Principal <span className="text-red-600"> (*)</span>
              </Label>
              <FileUploaderGeneral
                setFiles={setFiles}
                files={files}
                Modal={OpenModalProducto}
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="ContenidoBLog" className="">
                Contenido <span className="text-red-600">(*)</span>
              </Label>
              <RichTextEditor
                value={InputValues.Description}
                onChange={(content) => {
                  setInputValues({
                    ...InputValues,
                    Description: content,
                  });
                }}
                placeholder="Escriba aquí la descripción del producto..."
                className="mt-2"
              />
            </div>
          </div>

          <Button
            disabled={Loading}
            className="disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            {Loading ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalProducto;

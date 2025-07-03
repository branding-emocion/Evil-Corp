"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Video,
  Eye,
  Save,
  Upload,
  Link,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import BannerPrincipal from "./BannerPrincipal";

// Firebase imports
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";

const CarouselAdmin = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    buttonText: "",
    buttonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
  });

  // Cargar elementos del carrusel desde Firebase
  useEffect(() => {
    const carouselRef = collection(db, "carousel");
    const q = query(carouselRef, orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const carouselItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(carouselItems);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading carousel items:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los elementos del carrusel",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  // Subir imagen a Firebase Storage
  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `carousel/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormData((prev) => ({
        ...prev,
        imageUrl: downloadURL,
        videoUrl: "",
      }));

      toast({
        title: "Éxito",
        description: "Imagen subida correctamente",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Guardar elemento en Firebase
  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "El título es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      const itemData = {
        title: formData.title.trim(),
        description: formData.description?.trim() || "",
        imageUrl: formData.imageUrl?.trim() || "",
        videoUrl: formData.videoUrl?.trim() || "",
        buttonText: formData.buttonText?.trim() || "",
        buttonLink: formData.buttonLink?.trim() || "",
        secondaryButtonText: formData.secondaryButtonText?.trim() || "",
        secondaryButtonLink: formData.secondaryButtonLink?.trim() || "",
        updatedAt: new Date(),
      };

      if (editingItem) {
        // Actualizar elemento existente
        const docRef = doc(db, "carousel", editingItem.id);
        await updateDoc(docRef, itemData);

        toast({
          title: "Éxito",
          description: "Elemento actualizado correctamente",
        });
      } else {
        // Crear nuevo elemento
        itemData.order = items.length;
        itemData.createdAt = new Date();

        await addDoc(collection(db, "carousel"), itemData);

        toast({
          title: "Éxito",
          description: "Elemento creado correctamente",
        });
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el elemento",
        variant: "destructive",
      });
    }
  };

  // Eliminar elemento de Firebase
  const handleDelete = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este elemento?")
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "carousel", id));

      // Reordenar elementos restantes
      const remainingItems = items.filter((item) => item.id !== id);
      const updatePromises = remainingItems.map((item, index) =>
        updateDoc(doc(db, "carousel", item.id), { order: index })
      );
      await Promise.all(updatePromises);

      toast({
        title: "Éxito",
        description: "Elemento eliminado correctamente",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el elemento",
        variant: "destructive",
      });
    }
  };

  // Mover elemento hacia arriba
  const moveItemUp = async (index) => {
    if (index === 0) return;

    try {
      const currentItem = items[index];
      const previousItem = items[index - 1];

      await Promise.all([
        updateDoc(doc(db, "carousel", currentItem.id), { order: index - 1 }),
        updateDoc(doc(db, "carousel", previousItem.id), { order: index }),
      ]);

      toast({
        title: "Éxito",
        description: "Orden actualizado correctamente",
      });
    } catch (error) {
      console.error("Error reordering items:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el orden",
        variant: "destructive",
      });
    }
  };

  // Mover elemento hacia abajo
  const moveItemDown = async (index) => {
    if (index === items.length - 1) return;

    try {
      const currentItem = items[index];
      const nextItem = items[index + 1];

      await Promise.all([
        updateDoc(doc(db, "carousel", currentItem.id), { order: index + 1 }),
        updateDoc(doc(db, "carousel", nextItem.id), { order: index }),
      ]);

      toast({
        title: "Éxito",
        description: "Orden actualizado correctamente",
      });
    } catch (error) {
      console.error("Error reordering items:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el orden",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      buttonText: "",
      buttonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
    });
    setEditingItem(null);
  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      videoUrl: item.videoUrl || "",
      buttonText: item.buttonText || "",
      buttonLink: item.buttonLink || "",
      secondaryButtonText: item.secondaryButtonText || "",
      secondaryButtonLink: item.secondaryButtonLink || "",
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (previewMode) {
    return (
      <div>
        <div className="p-4 bg-gray-100 border-b">
          <Button onClick={() => setPreviewMode(false)}>
            Volver al Editor
          </Button>
        </div>
        <BannerPrincipal items={items} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Administrador de Carrusel</h1>
          <p className="text-gray-600 mt-2">
            Gestiona los elementos del banner principal
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setPreviewMode(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Elemento
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Editar Elemento" : "Agregar Elemento"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Información básica */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Ej: Maquinaria Industrial de Calidad"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Descripción que aparecerá debajo del título"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Media */}
                <div>
                  <Label className="text-base font-semibold">
                    Imagen o Video de Fondo
                  </Label>
                  <Tabs defaultValue="image" className="w-full mt-2">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="image"
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Imagen
                      </TabsTrigger>
                      <TabsTrigger
                        value="video"
                        className="flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Video
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="image" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="image-upload"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            Subir Imagen
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file);
                                setFormData((prev) => ({
                                  ...prev,
                                  videoUrl: "",
                                }));
                              }
                            }}
                            className="mt-1"
                            disabled={uploading}
                          />
                          {uploading && (
                            <p className="text-sm text-blue-600 mt-1">
                              Subiendo imagen...
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="imageUrl"
                            className="flex items-center gap-2"
                          >
                            <Link className="w-4 h-4" />O URL de Imagen
                          </Label>
                          <Input
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                imageUrl: e.target.value,
                                videoUrl: "",
                              }))
                            }
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {formData.imageUrl && (
                        <div className="mt-4">
                          <Label>Vista Previa:</Label>
                          <img
                            src={formData.imageUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border mt-2"
                          />
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="video" className="space-y-4 mt-4">
                      <div>
                        <Label
                          htmlFor="videoUrl"
                          className="flex items-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          URL del Video (YouTube o MP4)
                        </Label>
                        <Input
                          id="videoUrl"
                          value={formData.videoUrl}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              videoUrl: e.target.value,
                              imageUrl: "",
                            }))
                          }
                          placeholder="https://www.youtube.com/watch?v=... o https://ejemplo.com/video.mp4"
                          className="mt-1"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Soporta videos de YouTube y archivos MP4 directos
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Botones */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Botones de Acción
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="buttonText">Texto Botón Principal</Label>
                      <Input
                        id="buttonText"
                        value={formData.buttonText}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            buttonText: e.target.value,
                          }))
                        }
                        placeholder="Ej: Ver Productos"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buttonLink">Enlace Botón Principal</Label>
                      <Input
                        id="buttonLink"
                        value={formData.buttonLink}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            buttonLink: e.target.value,
                          }))
                        }
                        placeholder="https://ejemplo.com/productos"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="secondaryButtonText">
                        Texto Botón Secundario
                      </Label>
                      <Input
                        id="secondaryButtonText"
                        value={formData.secondaryButtonText}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            secondaryButtonText: e.target.value,
                          }))
                        }
                        placeholder="Ej: Cotizar Ahora"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="secondaryButtonLink">
                        Enlace Botón Secundario
                      </Label>
                      <Input
                        id="secondaryButtonLink"
                        value={formData.secondaryButtonLink}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            secondaryButtonLink: e.target.value,
                          }))
                        }
                        placeholder="https://ejemplo.com/cotizar"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Save className="w-4 h-4 mr-2" />
                    {editingItem ? "Actualizar" : "Crear"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando elementos...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No hay elementos en el carrusel
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comienza agregando tu primer elemento al carrusel
                  </p>
                  <Button onClick={openAddDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Primer Elemento
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            items.map((item, index) => (
              <Card key={item.id} className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItemUp(index)}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItemDown(index)}
                        disabled={index === items.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        ↓
                      </Button>
                    </div>
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-gray-500">
                        Posición: {index + 1}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Preview */}
                    <div className="space-y-2">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-24 object-cover rounded border"
                        />
                      )}
                      {item.videoUrl && (
                        <div className="flex items-center justify-center h-24 bg-gray-100 rounded border">
                          <div className="text-center">
                            <Video className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                            <p className="text-xs text-gray-500">Video</p>
                          </div>
                        </div>
                      )}
                      {!item.imageUrl && !item.videoUrl && (
                        <div className="flex items-center justify-center h-24 bg-gray-100 rounded border">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Descripción:
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.description || "Sin descripción"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Botones:
                        </p>
                        <div className="space-y-1">
                          {item.buttonText ? (
                            <p className="text-sm text-blue-600">
                              • {item.buttonText}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-400">
                              • Sin botón principal
                            </p>
                          )}
                          {item.secondaryButtonText ? (
                            <p className="text-sm text-blue-600">
                              • {item.secondaryButtonText}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-400">
                              • Sin botón secundario
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CarouselAdmin;

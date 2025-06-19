"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "./ImagenZoom";
import {
  MessageCircle,
  Phone,
  Mail,
  Tag,
  Package,
  Building,
  Star,
  Info,
} from "lucide-react";

const ModalShowProducto = ({
  product,
  ShowModalProductos,
  setShowModalProductos,
  categories,
}) => {
  const NewArray = product?.ImagenesGenerales || [];

  // Información de contacto de la empresa
  const CONTACT_INFO = {
    phone: "+51 987 654 321",
    whatsapp: "+51987654321",
    email: "ventas@r-corporacion.com",
    companyName: "R-CORPORACIÓN",
  };

  // Categoria del producto
  const categoriaProducto =
    categories.find((category) => category.id === product?.Categoria) || {};

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const message = `Hola! Estoy interesado en el producto: *${
      product?.NombreProducto
    }*${
      product?.ITEM ? ` (Código: ${product?.ITEM})` : ""
    }. ¿Podrían brindarme más información y cotización?`;
    const whatsappUrl = `https://wa.me/${
      CONTACT_INFO.whatsapp
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Función para llamar
  const makeCall = () => {
    window.open(`tel:${CONTACT_INFO.phone}`, "_self");
  };

  // Función para enviar email
  const sendEmail = () => {
    const subject = `Consulta sobre: ${product?.NombreProducto}`;
    const body = `Hola,\n\nEstoy interesado en el siguiente producto:\n\nNombre: ${
      product?.NombreProducto
    }${product?.ITEM ? `\nCódigo: ${product?.ITEM}` : ""}\nCategoría: ${
      categoriaProducto?.NombreCategoria || "Sin categoría"
    }\n\n¿Podrían brindarme más información y cotización?\n\nGracias.`;
    const emailUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, "_self");
  };

  return (
    <Dialog
      open={ShowModalProductos?.Visible}
      onOpenChange={(open) => {
        setShowModalProductos({ Visible: open, Producto: {} });
      }}
    >
      <DialogContent className="sm:max-w-6xl w-[95vw] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {product?.NombreProducto || "Producto sin nombre"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Información detallada del producto y opciones de contacto
              </DialogDescription>
            </div>
            {product?.Recomendado && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                <Star className="h-3 w-3 mr-1" />
                Recomendado
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Columna izquierda - Imagen y detalles técnicos */}
          <div className="space-y-6">
            {/* Galería de imágenes */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              {NewArray.length > 0 ? (
                <Carousel
                  infiniteLoop
                  autoPlay
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={true}
                  className="aspect-[4/3]"
                >
                  {NewArray.map((img, index) => (
                    <div key={index} className="aspect-[4/3]">
                      <ImagenZoom
                        src={img || "/placeholder.svg"}
                        Info={product}
                        CategoriaState={
                          categoriaProducto?.NombreCategoria || "Sin Categoría"
                        }
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Información técnica */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-blue-600" />
                Información técnica
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <span className="text-gray-600 text-sm font-medium block mb-2">
                    Categoría
                  </span>
                  <span className="font-semibold text-gray-900">
                    {categoriaProducto?.NombreCategoria || "Sin categoría"}
                  </span>
                </div>
                {product?.ITEM && (
                  <div className="bg-white p-4 rounded-lg border">
                    <span className="text-gray-600 text-sm font-medium block mb-2">
                      Código
                    </span>
                    <span className="font-semibold text-gray-900 font-mono">
                      {product.ITEM}
                    </span>
                  </div>
                )}
                <div className="bg-white p-4 rounded-lg border">
                  <span className="text-gray-600 text-sm font-medium block mb-2">
                    Estado
                  </span>
                  <Badge
                    variant={
                      product?.Estado === "Activo" ? "default" : "secondary"
                    }
                  >
                    {product?.Estado || "Sin estado"}
                  </Badge>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <span className="text-gray-600 text-sm font-medium block mb-2">
                    Disponibilidad
                  </span>
                  <span className="font-semibold text-green-600">
                    Disponible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Información del producto */}
          <div className="space-y-6">
            {/* Badges del producto */}
            <div className="flex flex-wrap gap-2">
              {product?.ITEM && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {product.ITEM}
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                {categoriaProducto?.NombreCategoria || "Sin categoría"}
              </Badge>
            </div>

            {/* Descripción */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Descripción
              </h3>
              {product?.Description ? (
                <div
                  className="text-gray-700 leading-relaxed prose prose-sm max-w-none max-h-32 overflow-y-auto"
                  dangerouslySetInnerHTML={{
                    __html: product.Description,
                  }}
                />
              ) : (
                <p className="text-gray-500 italic">
                  No hay descripción disponible
                </p>
              )}
            </div>

            <Separator />

            {/* Sección de contacto */}
            <div className="bg-gradient-to-br from-orange-50 via-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¿Interesado en este producto?
                </h3>
                <p className="text-gray-600">
                  Contáctanos para más información y cotización
                </p>
              </div>

              <div className="space-y-3">
                {/* WhatsApp */}
                <Button
                  onClick={openWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-16 justify-start group transition-all duration-200"
                >
                  <div className="flex items-center w-full">
                    <div className="bg-green-700 p-3 rounded-lg mr-4">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">WhatsApp</div>
                      <div className="text-sm opacity-90">
                        Respuesta inmediata
                      </div>
                    </div>
                  </div>
                </Button>

                {/* Teléfono */}
                <Button
                  onClick={makeCall}
                  variant="outline"
                  className="w-full border-2 border-blue-300 hover:bg-blue-50 h-16 justify-start"
                >
                  <div className="flex items-center w-full">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg text-blue-700">
                        Llamar ahora
                      </div>
                      <div className="text-sm text-blue-600">
                        {CONTACT_INFO.phone}
                      </div>
                    </div>
                  </div>
                </Button>

                {/* Email */}
                <Button
                  onClick={sendEmail}
                  variant="outline"
                  className="w-full border-2 border-purple-300 hover:bg-purple-50 h-16 justify-start"
                >
                  <div className="flex items-center w-full">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg text-purple-700">
                        Enviar email
                      </div>
                      <div className="text-sm text-purple-600">
                        Solicitar cotización
                      </div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Información de la empresa */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span className="font-semibold">
                      {CONTACT_INFO.companyName}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">{CONTACT_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalShowProducto;

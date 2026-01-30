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
  Info,
  Download,
  FileText,
  DollarSign,
  CheckCircle,
} from "lucide-react";

const ModalShowProducto = ({
  product,
  ShowModalProductos,
  setShowModalProductos,
  categories,
}) => {
  const NewArray = product?.ImagenesGenerales || [];

  // Debug: Ver si la ficha técnica existe
  console.log('Producto:', product);
  console.log('FichaTecnica:', product?.FichaTecnica);
  console.log('URLPDf:', product?.FichaTecnica?.URLPDf);

  // Información de contacto de la empresa - ACTUALIZADA
  const CONTACT_INFO = {
    phone: "+51 960 040 522",
    whatsapp: "+51960040522",
    email: "ventas@corporacionryl.com",
    companyName: "R-CORPORACIÓN",
  };

  // Categoria del producto
  const categoriaProducto =
    categories?.find((category) => category.id === product?.Categoria) || {};

  // Función para descargar ficha técnica
  const downloadFichaTecnica = () => {
    if (product?.FichaTecnica?.URLPDf) {
      // Abrir en nueva pestaña
      const link = document.createElement('a');
      link.href = product.FichaTecnica.URLPDf;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Si tiene nombre, usarlo para la descarga
      if (product.FichaTecnica.name) {
        link.download = product.FichaTecnica.name;
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const priceText = product?.Precio ? ` - Precio: ${product.Precio}` : "";
    const message = `Hola! Estoy interesado en el producto: *${
      product?.NombreProducto
    }*${
      product?.ITEM ? ` (Código: ${product?.ITEM})` : ""
    }${priceText}. ¿Podrían brindarme más información y cotización?`;
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
    const subject = `Consulta sobre: ${product?.NombreProducto || 'Producto'}`;
    const priceText = product?.Precio ? `%0D%0APrecio: ${product.Precio}` : "";
    const body = `Hola,%0D%0A%0D%0AEstoy interesado en el siguiente producto:%0D%0A%0D%0ANombre: ${
      product?.NombreProducto || 'Sin nombre'
    }${
      product?.ITEM ? `%0D%0ACódigo: ${product?.ITEM}` : ""
    }${priceText}%0D%0ACategoría: ${
      categoriaProducto?.NombreCategoria || "Sin categoría"
    }%0D%0A%0D%0A¿Podrían brindarme más información y cotización?%0D%0A%0D%0AGracias.`;
    
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <Dialog
      open={ShowModalProductos?.Visible}
      onOpenChange={(open) => {
        setShowModalProductos({ Visible: open, Producto: {} });
      }}
    >
      <DialogContent className="sm:max-w-6xl w-[95vw] h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {product?.NombreProducto || "Producto sin nombre"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Información detallada del producto y opciones de contacto
              </DialogDescription>
            </div>
            {product?.Estado && (
              <Badge
                variant={product?.Estado === "Activo" ? "default" : "secondary"}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-3 w-3" />
                {product.Estado}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sección superior - Imagen e Información del producto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna izquierda - Imagen */}
            <div>
              <div className="bg-gray-50 rounded-lg overflow-hidden border">
                {NewArray.length > 0 ? (
                  <Carousel
                    infiniteLoop
                    autoPlay
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                    className="aspect-square"
                  >
                    {NewArray.map((img, index) => (
                      <div key={index} className="aspect-square">
                        <ImagenZoom
                          src={img || "/placeholder.svg"}
                          Info={product}
                          CategoriaState={
                            categoriaProducto?.NombreCategoria ||
                            "Sin Categoría"
                          }
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="aspect-square flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha - Información del producto */}
            <div className="space-y-4">
              {/* Badges de información técnica */}
              <div className="flex flex-wrap gap-2">
                {product?.ITEM && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <Tag className="h-3 w-3" />
                    Código: {product.ITEM}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  <Building className="h-3 w-3" />
                  {categoriaProducto?.NombreCategoria || "Sin categoría"}
                </Badge>
                <Badge className="flex items-center gap-1 px-3 py-1 bg-green-100 text-[#10603e] hover:bg-green-200">
                  <CheckCircle className="h-3 w-3" />
                  Disponible
                </Badge>
              </div>

              {/* Precio */}
              {product?.Precio && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">
                        Precio
                      </p>
                      <p className="text-xl font-bold text-[#10603e]">
                        {product.Precio}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Descripción */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Descripción</h3>
                </div>
                {product?.Description ? (
                  <div
                    className="text-gray-700 text-sm leading-relaxed max-h-60 overflow-y-auto"
                    dangerouslySetInnerHTML={{
                      __html: product.Description,
                    }}
                  />
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No hay descripción disponible
                  </p>
                )}
              </div>

              {/* Ficha Técnica */}
              {product?.FichaTecnica?.URLPDf && (
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-900">
                          Ficha Técnica
                        </h3>
                        <p className="text-sm text-blue-700">
                          {product.FichaTecnica?.name || "Documento técnico"}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={downloadFichaTecnica}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sección inferior - Contacto horizontal */}
          <div className="border-t pt-6">
            <div className="bg-[#006039] text-white rounded-t-lg p-4 text-center">
              <h3 className="text-lg font-bold">
                ¿Interesado en este producto?
              </h3>
              <p className="text-orange-100 text-sm mt-1">
                Contáctanos para más información y cotización
              </p>
            </div>

            <div className="border border-t-0 rounded-b-lg p-6 bg-gray-50">
              {/* Botones de contacto horizontales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* WhatsApp */}
                <Button
                  onClick={openWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white justify-start h-16"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-base">WhatsApp</div>
                    <div className="text-sm opacity-90">
                      Respuesta inmediata
                    </div>
                  </div>
                </Button>

                {/* Teléfono */}
                <Button
                  onClick={makeCall}
                  variant="outline"
                  className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 justify-start h-16"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-base">Llamar ahora</div>
                    <div className="text-sm">{CONTACT_INFO.phone}</div>
                  </div>
                </Button>

                {/* Email */}
                <Button
                  onClick={sendEmail}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 justify-start h-16"
                >
                  <Mail className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold text-base">Enviar email</div>
                    <div className="text-sm">Solicitar cotización</div>
                  </div>
                </Button>
              </div>

              {/* Información de empresa y garantías */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Información de la empresa */}
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Building className="h-5 w-5 text-gray-600" />
                    <span className="font-bold text-gray-900 text-lg">
                      {CONTACT_INFO.companyName}
                    </span>
                  </div>
                  <div className="text-center space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">{CONTACT_INFO.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">{CONTACT_INFO.email}</span>
                    </div>
                  </div>
                </div>

                {/* Garantía de servicio */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-[#10603e]">
                      Garantía de servicio
                    </span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Respuesta rápida a consultas</li>
                    <li>• Asesoría técnica especializada</li>
                    <li>• Cotización sin compromiso</li>
                  </ul>
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

import TitleSection from "@/components/TitleSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Clock, FileCheck, PhoneCall } from "lucide-react";

const GarantiaProductos = () => {
  return (
    <div>
      <TitleSection
        title={"Garantía de Productos"}
        image="/Banner/BannerNosotros.jpg"
      />

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En Reanda, respaldamos la calidad de nuestros productos con
              garantías sólidas y un servicio al cliente excepcional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4 text-Secundario " />
                <CardTitle>Garantía de Calidad</CardTitle>
                <CardDescription>
                  Todos nuestros productos están respaldados por una garantía de
                  calidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  <li>Inspección rigurosa de productos</li>
                  <li>Materiales de alta calidad</li>
                  <li>Estándares de fabricación estrictos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mb-4 text-Secundario" />
                <CardTitle>Período de Cobertura</CardTitle>
                <CardDescription>
                  Garantía extendida para su tranquilidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  <li>12 meses en piezas mecánicas</li>
                  <li>6 meses en accesorios</li>
                  <li>Garantía extendida disponible</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <FileCheck className="w-12 h-12 text-primary mb-4 text-Secundario" />
                <CardTitle>Proceso de Garantía</CardTitle>
                <CardDescription>Proceso simple y transparente</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  <li>Documentación clara</li>
                  <li>Proceso rápido de reclamos</li>
                  <li>Seguimiento en línea</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <PhoneCall className="w-12 h-12 text-primary mb-4 text-Secundario" />
                <CardTitle>Soporte Técnico</CardTitle>
                <CardDescription>
                  Asistencia experta cuando la necesite
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  <li>Soporte telefónico</li>
                  <li>Asistencia por correo</li>
                  <li>Servicio técnico especializado</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Términos y Condiciones de la Garantía
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                Nuestra garantía cubre defectos de fabricación y materiales bajo
                uso normal y adecuado de los productos. Para hacer válida la
                garantía, es necesario presentar el comprobante de compra
                original y el producto debe estar en buenas condiciones
                generales.
              </p>
              <p className="mb-4">La garantía no cubre daños causados por:</p>
              <ul className="list-disc list-inside mb-4 text-muted-foreground">
                <li>Uso inadecuado o abuso del producto</li>
                <li>Modificaciones no autorizadas</li>
                <li>Desgaste normal por uso</li>
                <li>Mantenimiento inadecuado</li>
              </ul>
              <p>
                Para más información sobre nuestra garantía o para iniciar un
                reclamo, por favor contacte a nuestro departamento de servicio
                al cliente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarantiaProductos;

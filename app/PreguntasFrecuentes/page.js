import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import TitleSection from "@/components/TitleSection";

const PreguntasFrecuentes = () => {
  // Preguntas frecuentes de la página
  const Preguntas = [
    {
      pregunta: "¿Dónde se encuentra la sede de Reanda?",
      respuesta: `La sede de Reanda se encuentra en 8509, piso 5, Xinguang International, 1399 Chouzhou North Road, Yiwu City, Zhejiang Province, China. Si necesitas contactarnos directamente, puedes llamarnos al +86 159-6797-0569 o enviar un correo a manager@reanda.co.`,
    },
    {
      pregunta: "¿Cuál es la misión de Reanda?",
      respuesta:
        "Nuestra misión es proporcionar a los amantes de la costura y la confección una amplia variedad de artículos de alta calidad, apoyando su creatividad y habilidades a través de productos innovadores y un servicio al cliente excepcional.",
    },
    {
      pregunta: "¿Cuál es la visión de Reanda?",
      respuesta:
        "Nuestra visión es ser la fábrica líder en el sector de artículos para confección, reconocida por nuestra variedad, calidad y compromiso con la comunidad creativa, fomentando un espacio donde cada cliente pueda transformar sus ideas en realidad.",
    },
    {
      pregunta: "¿Qué valores representan a Reanda?",
      respuesta:
        "En Reanda valoramos la creatividad, calidad, atención al cliente, integridad, diversidad y el aprendizaje continuo. Creemos en la importancia de un servicio excepcional y en promover un ambiente inclusivo y transparente para nuestros clientes y empleados.",
    },
    {
      pregunta:
        "¿Qué tipo de productos ofrece Reanda en el área de confección?",
      respuesta:
        "En Reanda, ofrecemos una amplia gama de productos para el área de confección, incluyendo tijeras, piquetes, motores, lámparas, sets de hilo, prénsatelas, embudos, máquinas cortadoras y más. Nuestros productos están seleccionados para cumplir con altos estándares de calidad y facilitar el trabajo creativo en la confección.",
    },
    {
      pregunta: "¿Qué compromiso tiene Reanda con la sostenibilidad?",
      respuesta:
        "En Reanda, buscamos un crecimiento sostenible a largo plazo, expandiendo nuestra presencia en línea y en tiendas físicas, mientras ofrecemos productos de alta calidad que respeten el medio ambiente.",
    },
    {
      pregunta: "¿Puedo recibir asesoramiento personalizado en Reanda?",
      respuesta:
        "Sí, nuestro equipo de atención al cliente está listo para brindar asesoramiento personalizado y asistencia, asegurando que tengas una experiencia satisfactoria y enriquecedora en cada compra.",
    },
    {
      pregunta:
        "¿Cuál es el objetivo principal de Reanda en cuanto a la calidad de sus productos?",
      respuesta:
        "Nos esforzamos por ofrecer productos de alta calidad que cumplan con las expectativas de nuestros clientes y respaldar su creatividad y habilidades.",
    },
  ];

  return (
    <div className="bg-gray-50 w-full h-full">
      <TitleSection
        title={`Preguntas Frecuentes`}
        image="/Banner/BannerPreguntas.jpg"
        position="top"
      />

      <Card className="w-full h-full mx-auto max-w-7xl py-4 my-8">
        <CardContent>
          <Accordion type="single" collapsible>
            {Preguntas.map((pregunta, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{pregunta.pregunta}</AccordionTrigger>
                <AccordionContent>{pregunta.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreguntasFrecuentes;

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Award, Shield, Zap } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Contacto = () => {
  // ✅ CORREGIDO (quitado <any>)
  const [InputValues, setInputValues] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative">
        <div className="relative w-full h-[500px] z-[1] overflow-hidden bg-[#e7b617]">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Contáctanos
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8">
                Más de 6 años de experiencia en maquinaria industrial
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={sectionVariants}
          className="-mt-32 container mx-auto py-12 px-4 relative z-[2]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            {/* LLÁMANOS */}
            <motion.div variants={cardVariants}>
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <Phone className="w-8 h-8 text-[#006039] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Llámanos
                  </h3>
                  <a href="tel:+51960040522">960 040 522</a>
                  <br />
                  <a href="tel:+51967447382">967 447 382</a>
                </CardContent>
              </Card>
            </motion.div>

            {/* ESCRÍBENOS (con correos agregados) */}
            <motion.div variants={cardVariants}>
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <Mail className="w-8 h-8 text-[#006039] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Escríbenos
                  </h3>

                  <div className="space-y-2 text-sm">

                    <p className="font-semibold">Ventas 1</p>
                    <a href="mailto:ventas@corporacionryl.com">
                      ventas@corporacionryl.com
                    </a>

                    <p className="font-semibold">Ventas 2</p>
                    <a href="mailto:n.aguilar@corporacionryl.com">
                      n.aguilar@corporacionryl.com
                    </a>

                    <p className="font-semibold">Departamento de Proyectos</p>
                    <a href="mailto:dpto.proyectos@corporacionryl.com">
                      dpto.proyectos@corporacionryl.com
                    </a>

                    <p className="font-semibold">
                      Servicio Técnico Eléctrico
                    </p>
                    <a href="mailto:alexbautista.tecnicoelectrico@corporacionryl.com">
                      alexbautista.tecnicoelectrico@corporacionryl.com
                    </a>

                    <p className="font-semibold">
                      Servicio Técnico Mecánico
                    </p>
                    <a href="mailto:andre.servmantenimiento@corporacionryl.com">
                      andre.servmantenimiento@corporacionryl.com
                    </a>

                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* VISÍTANOS */}
            <motion.div variants={cardVariants}>
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <MapPin className="w-8 h-8 text-[#006039] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Visítanos
                  </h3>
                  <p>
                    CAL. MARTINEZ DE COMPAÑON 578
                    <br />
                    URB SAN ANDRES
                    <br />
                    LA LIBERTAD, TRUJILLO
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* FORMULARIO */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <form
                onSubmit={async (e) => {  // ✅ CORREGIDO (quitado : any)
                  e.preventDefault();
                  try {
                    setIsLoading(true);

                    if (!InputValues?.NumeroCelular) {
                      alert("Por favor, ingrese su número de celular");
                      return;
                    }

                    const response = await fetch("/api/SendMailContacto", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...InputValues,
                        destinationEmail: "VENTAS@CORPORACIONRYL.COM",
                      }),
                    });

                    if (!response.ok) {
                      alert("Error al enviar el mensaje");
                      return;
                    }

                    alert("Mensaje enviado con éxito");
                    setInputValues({});
                    e.target.reset();

                  } catch (err) {
                    console.log(err);
                    alert("Error al enviar el mensaje");
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <Input
                  placeholder="Nombre Completo"
                  onChange={(e) =>
                    setInputValues({
                      ...InputValues,
                      NombreCompleto: e.target.value,
                    })
                  }
                />

                <Input
                  type="email"
                  placeholder="Correo"
                  onChange={(e) =>
                    setInputValues({
                      ...InputValues,
                      Correo: e.target.value,
                    })
                  }
                />

                <PhoneInput
                  country="PE"
                  value={InputValues?.NumeroCelular}
                  onChange={(value) =>
                    setInputValues({
                      ...InputValues,
                      NumeroCelular: value,
                    })
                  }
                />

                <Textarea
                  placeholder="Mensaje"
                  onChange={(e) =>
                    setInputValues({
                      ...InputValues,
                      Descripcion: e.target.value,
                    })
                  }
                />

                <Button disabled={IsLoading}>
                  {IsLoading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Contacto;

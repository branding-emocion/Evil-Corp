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
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[500px] z-[1] overflow-hidden bg-[#ff6900]">
          {/* Espacio para imagen de fondo */}
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
              <div className="flex items-center justify-center space-x-12 text-white">
                <div className="flex flex-col items-center space-y-2">
                  <Award className="w-8 h-8" />
                  <span className="font-medium">GARANTÍA</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Shield className="w-8 h-8" />
                  <span className="font-medium">CALIDAD</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Zap className="w-8 h-8" />
                  <span className="font-medium">EFICIENCIA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={sectionVariants}
          className="-mt-32 container mx-auto py-12 px-4 relative z-[2]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <motion.div variants={cardVariants} transition={{ delay: 0.1 }}>
              <Card className="h-full bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Llámanos
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="tel:+51960040522"
                      className="block text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      960 040 522
                    </a>
                    <a
                      href="tel:+51967447382"
                      className="block text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      967 447 382
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} transition={{ delay: 0.2 }}>
              <Card className="h-full bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Escríbenos
                  </h3>
                  <a
                    href="mailto:VENTAS@CORPORACIONRYL.COM"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    VENTAS@CORPORACIONRYL.COM
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} transition={{ delay: 0.3 }}>
              <Card className="h-full bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Visítanos
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="h-full bg-green-800 text-white shadow-xl border-0">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-8">
                    Información de Contacto
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <a
                          href="mailto:VENTAS@CORPORACIONRYL.COM"
                          className="text-gray-300 hover:text-orange-400 transition-colors"
                        >
                          VENTAS@CORPORACIONRYL.COM
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Teléfonos</h4>
                        <div className="space-y-1">
                          <a
                            href="tel:+51960040522"
                            className="block text-gray-300 hover:text-orange-400 transition-colors"
                          >
                            960 040 522
                          </a>
                          <a
                            href="tel:+51967447382"
                            className="block text-gray-300 hover:text-orange-400 transition-colors"
                          >
                            967 447 382
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Dirección</h4>
                        <p className="text-gray-300 leading-relaxed">
                          CAL. MARTINEZ DE COMPAÑON 578
                          <br />
                          URB SAN ANDRES
                          <br />
                          LA LIBERTAD, TRUJILLO, TRUJILLO
                          <br />
                          Perú
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-green-700">
                    <h3 className="text-lg font-semibold mb-4">
                      Nuestros Valores
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm font-medium">GARANTÍA</p>
                      </div>
                      <div>
                        <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm font-medium">CALIDAD</p>
                      </div>
                      <div>
                        <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm font-medium">EFICIENCIA</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.5 }}
              className="lg:col-span-3"
            >
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-2 text-gray-800">
                    Envíanos un Mensaje
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Completa el formulario y nos pondremos en contacto contigo
                    lo antes posible.
                  </p>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        setIsLoading(true);
                        if (Object.keys(InputValues).length === 0) {
                          alert("Por favor, rellene todos los campos");
                          return;
                        }

                        if (!InputValues?.NumeroCelular) {
                          alert("Por favor, ingrese su número de celular");
                          return;
                        }
                        const response = await fetch("/api/SendMailContacto", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ...InputValues,
                            destinationEmail: "VENTAS@CORPORACIONRYL.COM",
                          }),
                        });

                        const responseData = await response.json();

                        if (!response.ok) {
                          alert("Error al enviar el mensaje");
                          return;
                        }

                        alert("Mensaje enviado con éxito");
                        setInputValues({});
                        e.target.reset();
                      } catch (err) {
                        console.log("Error: ", err);
                        alert("Error al enviar el mensaje");
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="NombreCompleto"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nombre Completo *
                        </Label>
                        <Input
                          id="NombreCompleto"
                          placeholder="Ingrese su nombre completo"
                          type="text"
                          autoComplete="off"
                          autoFocus
                          required
                          className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              NombreCompleto: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Correo Electrónico *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="ejemplo@correo.com"
                          autoComplete="off"
                          className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              Correo: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Número de Celular *
                      </Label>
                      <PhoneInput
                        country="PE"
                        onChange={(e) => {
                          setInputValues({
                            ...InputValues,
                            NumeroCelular: e,
                          });
                        }}
                        placeholder="Ingrese su número de celular"
                        value={InputValues?.NumeroCelular}
                        className="phone-input-custom"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700"
                      >
                        Asunto *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Motivo de la consulta"
                        type="text"
                        required
                        autoComplete="off"
                        className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        onChange={(e) => {
                          setInputValues({
                            ...InputValues,
                            Asunto: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                      >
                        Mensaje *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Describe tu consulta o requerimiento..."
                        required
                        rows={5}
                        autoComplete="off"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                        onChange={(e) => {
                          setInputValues({
                            ...InputValues,
                            Descripcion: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer"
                      disabled={IsLoading}
                    >
                      {IsLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Enviando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 ">
                          <Send className="w-5 h-5" />
                          <span>Enviar Mensaje</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contacto;

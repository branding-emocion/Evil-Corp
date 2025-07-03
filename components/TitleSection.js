"use client";
import { motion } from "framer-motion";

function TitleSection({ title, image = "", position = "bottom" }) {
  const fadeInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // <motion.section
    //   style={{
    //     backgroundImage: `url("${image}")`,
    //     backgroundPosition: position,
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //   }}
    //   initial="hidden"
    //   animate="visible"
    //   variants={fadeInVariants}
    //   transition={{ duration: 0.8, delay: 0.4 }}
    // >
    //   <div className="py-7 flex h-full w-full items-center justify-center  mx-auto px-8 lg:w-full bg-black bg-opacity-50">
    //     <div className="max-w-2xl text-center">
    //       <h1 className=" py-28 text-white lg:text-6xl font-semibold uppercase">
    //         {title}
    //       </h1>
    //     </div>
    //   </div>
    // </motion.section>
    <section className="relative bg-[#e7b617]  py-24">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Productos
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Más de 6 años de experiencia nos convierten en tu socio estratégico
            de confianza en maquinaria industrial
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TitleSection;

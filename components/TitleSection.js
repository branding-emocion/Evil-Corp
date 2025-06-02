"use client";
import { motion } from "framer-motion";

function TitleSection({ title, image = "", position = "bottom" }) {
  const fadeInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.section
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: position,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="py-7 flex h-full w-full items-center justify-center  mx-auto px-8 lg:w-full bg-black bg-opacity-50">
        <div className="max-w-2xl text-center">
          <h1 className=" py-28 text-white lg:text-6xl font-semibold uppercase">
            {title}
          </h1>
        </div>
      </div>
    </motion.section>
  );
}

export default TitleSection;

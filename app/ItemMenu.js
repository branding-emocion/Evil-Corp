"use client";

import Link from "next/link";

const ItemMenu = ({ children, ruta, setIsOpen, border, mobile = false }) => {
  return (
    <Link
      href={ruta}
      onClick={() => setIsOpen(false)}
      className={`
        relative font-medium transition-all duration-300 group
        ${
          mobile
            ? "block py-3 px-4 rounded-lg hover:bg-green-700"
            : "py-2 px-4 hover:text-[#e7b617]"
        }
        ${
          border
            ? mobile
              ? "bg-[#e7b617] text-white hover:bg-[#e7b617]"
              : "text-[#e7b617]"
            : "text-white"
        }
      `}
    >
      {children}
      {!mobile && (
        <span
          className={`
            absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#e7b617] transition-all duration-300
            ${border ? "w-full" : "w-0 group-hover:w-full"}
          `}
        />
      )}
    </Link>
  );
};

export default ItemMenu;

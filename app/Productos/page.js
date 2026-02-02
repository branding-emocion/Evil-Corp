import TitleSection from "@/components/TitleSection";
import ProductosClient from "./ProductosClient";

export default function Productos() {
  return (
    <div>
      <TitleSection title={"Productos"} image="/Banner.webp" />
      <ProductosClient />
    </div>
  );
}

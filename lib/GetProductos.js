import { dbAdmin } from "@/firebase/firebaseAdmin";

const GetProductos = async () => {
  try {
    const colectionRef = dbAdmin.collection(`Productos`);

    let snapshot = null;

    snapshot = await colectionRef.where(`Estado`, "==", "Activo").get();

    if (snapshot.empty) {
      console.log("No hay marcas activas.");
      return [];
    }

    const Data = [];
    snapshot.forEach((doc) => {
      Data.push({ id: doc.id, ...doc.data() });
    });

    return Data;
  } catch (error) {
    console.error("Error al obtener marcas activas:", error);
    throw error;
  }
};

export default GetProductos;

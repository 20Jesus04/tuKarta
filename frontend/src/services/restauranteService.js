import axios from "axios";

const API_RESTAURANTE =
  "https://backend-production-94753.up.railway.app/restaurante";

export const crearRestauranteConImagen = async (datos) => {
  const formData = new FormData();
  formData.append("nombre", datos.nombre);
  formData.append("direccion", datos.direccion);
  formData.append("telefono", datos.telefono);
  console.log("ID del dueño enviado:", datos.id_dueno);
  formData.append("id_dueno", String(datos.id_dueno));

  if (datos.imagen) {
    formData.append("imagen", datos.imagen);
  }

  const res = await axios.post(API_RESTAURANTE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

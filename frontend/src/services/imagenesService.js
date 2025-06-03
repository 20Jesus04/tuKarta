import axios from "axios";

const API_IMAGENES = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app",
});

export const subir = (formData) => {
  return API_IMAGENES.post("/imagenes-carta", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const obtenerPorCarta = (idCarta) => {
  return API_IMAGENES.get(`/imagenes-carta/carta/${idCarta}`);
};

export const eliminar = (idImagen) => {
  return API_IMAGENES.delete(`/imagenes-carta/${idImagen}`);
};

import axios from "axios";

const API_CATEGORIA = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app",
});

export const getCategorias = () => {
  return API_CATEGORIA.get("/categoria");
};

export const eliminarCategoria = (id) =>
  API_CATEGORIA.delete(`/categoria/${id}`);

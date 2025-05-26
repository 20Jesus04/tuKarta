import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app",
});

export const getPlatos = () => {
  return API.get("/plato");
};

export const eliminarPlato = (id) => API.delete(`/plato/${id}`);

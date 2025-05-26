import axios from "axios";

const API_USUARIO = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app",
});

export const getUsuarios = () => API_USUARIO.get("/usuario");

export const eliminarUsuario = (id) => API_USUARIO.delete(`/usuario/${id}`);

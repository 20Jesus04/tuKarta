import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app/favorito",
});

export const toggleFavorito = (idUsuario, idCarta) => {
  return API.post(`/toggle`, { idUsuario, idCarta });
};

export const esFavorito = (idUsuario, idCarta) => {
  return API.get(`/es-favorito/${idUsuario}/${idCarta}`);
};

export const getFavoritosPorUsuario = (idUsuario) => {
  return API.get(`/${idUsuario}`);
};

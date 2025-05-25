import axios from "axios";

const API_VALORACION = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app/valoracion",
});

export const getValoracionesPorCarta = (idCarta) => {
  return API_VALORACION.get(`/carta/${idCarta}`);
};

export const enviarValoracion = (data) => {
  return API_VALORACION.post("/", data);
};

export const getEstadisticasPorCarta = (idCarta) => {
  return API_VALORACION.get(`/estadisticas/${idCarta}`);
};

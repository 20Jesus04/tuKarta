import axios from "axios";

const API_URL = "https://backend-production-94753.up.railway.app/auth";

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
  return res.data.usuario;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsuario = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
};

export const solicitarRecuperacionPassword = async (email) => {
  const res = await axios.post(`${API_URL}/recuperar`, { email });
  return res.data;
};

export const resetPassword = async (token, nuevaPassword) => {
  const res = await axios.post(`${API_URL}/restablecer`, {
    token,
    nuevaPassword,
  });
  return res.data;
};

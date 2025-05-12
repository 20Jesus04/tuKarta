import axios from "axios";

const API_URL = "https://backend-production-94753.up.railway.app/auth";

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  localStorage.setItem("token", res.data.access_token);
  return res.data.usuario;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

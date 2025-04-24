import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app",
});

export const getCartas = () => API.get("/carta");

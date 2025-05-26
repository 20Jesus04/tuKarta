import axios from "axios";

const API_ADMIN = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app/admin",
});

export const getResumenAdmin = () => {
  return API_ADMIN.get("/resumen");
};

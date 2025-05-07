import { jwtDecode } from "jwt-decode";

export const getUsuarioActual = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Error al decodificar el token:", err);
    return null;
  }
};

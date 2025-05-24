import { jwtDecode } from "jwt-decode";

export const getUsuarioActual = () => {
  const token = localStorage.getItem("token");

  if (!token || typeof token !== "string") {
    // console.warn("Token no encontrado o inválido.");
    return null;
  }

  try {
    const decodificado = jwtDecode(token);
    // console.log("Decodificado:", decodificado);
    return decodificado;
  } catch (err) {
    console.error("Error al decodificar el token:", err);
    return null;
  }
};

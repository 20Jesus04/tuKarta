import React, { useEffect, useState } from "react";
import { getCartas } from "../services/cartasService";
import { CartaList } from "./CartaList";
import { useNavigate } from "react-router-dom";
import {getUsuarioActual} from "../utils/auth.js"


export const Home = () => {
  const [cartas, setCartas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [rolUsuario, setRolUsuario] = useState(null);

  const navigate = useNavigate();
 useEffect(() => {
    const usuario = getUsuarioActual();
    if (usuario && usuario.rol) {
      setRolUsuario(usuario.rol); // Asegúrate de que el campo se llame así en el token
    }
  }, []);



  useEffect(() => {
    getCartas()
      .then((res) => {
        setCartas(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar cartas:", err);
        setError("No se pudieron cargar las cartas");
        setCargando(false);
      });
  }, []);

  return (
    <>
      <div className="App">
        {cargando && <p>Cargando cartas...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!cargando && !error && <CartaList cartas={cartas} />}
      </div>

      {rolUsuario  === "DUENO" && (
        <button
          className="btnCrearCarta"
          onClick={() => navigate("/CrearCarta")}
          aria-label="Crear carta"
          title="Crear nueva carta"
        >
          +
        </button>
      )}
    </>
  );
};

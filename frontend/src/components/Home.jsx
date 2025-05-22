import React, { useEffect, useState } from "react";
import { getCartas, getCartaPorRestaurante } from "../services/cartasService";
import { CartaList } from "./CartaList";
import { useNavigate } from "react-router-dom";
import { getUsuarioActual } from "../utils/auth.js";
import { getRestaurantePorDueno } from "../services/restauranteService";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Home = () => {
  const [cartas, setCartas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [modoBoton, setModoBoton] = useState("Crear");

  const navigate = useNavigate();

  useEffect(() => {
    const usuario = getUsuarioActual();

    if (usuario && usuario.rol === "DUENO") {
      setRolUsuario(usuario.rol);

      /** Buscar el restaurante del dueño y comprobar si tiene una carta creada */
      getRestaurantePorDueno(usuario.sub)
        .then((res) => {
          const restauranteId = res.data.id;

          getCartaPorRestaurante(restauranteId)
            .then((res) => {
              if (res.data && res.data.id) {
                setModoBoton("Editar");
              }
            })
            .catch(() => {
              setModoBoton("Crear"); // no tiene carta
            });
        })
        .catch((err) => {
          console.error("Error al obtener restaurante:", err);
        });
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

      {rolUsuario === "DUENO" && (
        <button
          className="btnCrearCarta"
          onClick={() =>
            navigate(modoBoton === "Editar" ? "/EditarCarta" : "/CrearCarta")
          }
          aria-label={`${modoBoton} carta`}
          title={`${modoBoton} carta`}
        >
          {modoBoton === "Editar" ? (
            <>
              <i
                className="fa-solid fa-pen-to-square"
              ></i>
            </>
          ) : (
            <>
              <i
                className="fa-solid fa-plus"
              ></i>
            </>
          )}
        </button>
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import {
  getCartas,
  getCartaPorRestaurante,
  buscarCartas,
} from "../services/cartasService";
import { CartaList } from "./CartaList";
import { useNavigate } from "react-router-dom";
import { getUsuarioActual } from "../utils/auth.js";
import { getRestaurantePorDueno } from "../services/restauranteService";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Home = ({ terminoBusqueda }) => {
  const [cartas, setCartas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [modoBoton, setModoBoton] = useState("Crear");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [orden, setOrden] = useState("");

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
              setModoBoton("Crear"); // Si no tiene carta
            });
        })
        .catch((err) => {
          console.error("Error al obtener restaurante:", err);
        });
    }
  }, []);

  useEffect(() => {
    const cartasBuscadas = async () => {
      try {
        setCargando(true);

        let res;
        const hayBusqueda = terminoBusqueda?.trim();
        const hayFiltros = !!orden;

        if (hayBusqueda || hayFiltros) {
          res = await buscarCartas(terminoBusqueda, orden);
        } else {
          res = await getCartas();
        }

        const cartasRecibidas = Array.isArray(res.data) ? res.data : [];
        setCartas(cartasRecibidas);
        setError(null);
      } catch (err) {
        console.error("Error al buscar cartas:", err);
        setError("No se pudieron cargar las cartas");
      } finally {
        setCargando(false);
      }
    };

    cartasBuscadas();
  }, [terminoBusqueda, orden]);

  return (
    <>
      <div className="App">
        <button
          className="btnFiltro"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
        >
          <i className="fa-solid fa-sliders" style={{ marginRight: "8px" }}></i>
          {mostrarFiltros ? "Ocultar filtros" : "Filtrar"}
        </button>

        {mostrarFiltros && (
          <div className="filtroCaja">
            <label>
              Ordenar por:{" "}
              <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="">-- Ninguno --</option>
                <option value="valoracion">Mejor valorados</option>
                <option value="reciente">Más recientes</option>
                <option value="precio">Más baratos</option>
                <option value="precio_desc">Más caros</option>
              </select>
            </label>
          </div>
        )}

        {cargando && <span className="loader"></span>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!cargando &&
          !error &&
          (cartas.length > 0 ? (
            <CartaList cartas={cartas} />
          ) : (
            <div className="mensajeSinResultados">
              <p>La carta que buscas no se ha podido encontrar.</p>
            </div>
          ))}
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
              <i className="fa-solid fa-pen-to-square"></i>
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus"></i>
            </>
          )}
        </button>
      )}
    </>
  );
};

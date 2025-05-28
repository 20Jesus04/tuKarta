import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRestaurantePorDueno } from "../services/restauranteService";
import { getCartaPorRestaurante } from "../services/cartasService";
import { getUsuarioActual } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

export const SidebarMenu = () => {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);
  const usuario = getUsuarioActual();
  const navigate = useNavigate();
  const [modoBoton, setModoBoton] = useState(null);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenUsuario");
    navigate("/");
    window.location.reload(); // Para refrescar el estado global
  };

  useEffect(() => {
    if (usuario?.rol === "DUENO") {
      getRestaurantePorDueno(usuario.sub)
        .then((res) => {
          const restauranteId = res.data.id;
          return getCartaPorRestaurante(restauranteId);
        })
        .then((res) => {
          if (res.data && res.data.id) {
            setModoBoton("Editar");
          } else {
            setModoBoton("Crear");
          }
        })
        .catch(() => {
          setModoBoton("Crear"); // Si no tiene carta o hay error
        });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAbierto(false);
      }
    };

    if (abierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [abierto]);

  const manejarAccionCarta = () => {
    if (modoBoton === "Editar") {
      navigate("/EditarCarta");
    } else {
      navigate("/CrearCarta");
    }
    setAbierto(false);
  };

  return (
    <>
      <button className="botonMenu" onClick={() => setAbierto(true)}>
        ☰
      </button>

      {abierto && (
        <div className="overlay">
          <div className="menuLateral" ref={menuRef}>
            <button className="cerrarMenu" onClick={() => setAbierto(false)}>
              ✕
            </button>
            <ul className="listaMenu">
              <li>
                <Link to="/" onClick={() => setAbierto(false)}>
                  Inicio
                </Link>
              </li>

              {usuario?.rol === "ADMIN" && (
                <li>
                  <Link to="/admin" onClick={() => setAbierto(false)}>
                    Panel Admin
                  </Link>
                </li>
              )}

              {usuario?.rol === "DUENO" && modoBoton && (
                <li>
                  <button className="botonAuth" onClick={manejarAccionCarta}>
                    <FontAwesomeIcon
                      icon={modoBoton === "Editar" ? faPenToSquare : faPlus}
                      style={{ marginRight: "8px" }}
                    />
                    {modoBoton === "Editar" ? "Editar Carta" : "Crear Carta"}
                  </button>
                </li>
              )}

              <li>
                <button className="botonAuth" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

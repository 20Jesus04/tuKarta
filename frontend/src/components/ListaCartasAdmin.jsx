import React, { useEffect, useState } from "react";
import { getCartas, eliminarCarta } from "../services/cartasService";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";
import { getUsuarioActual } from "../utils/auth";
import { Carta } from "./Carta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const ListaCartasAdmin = () => {
   const [cartas, setCartas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const usuario = getUsuarioActual();
  const navigate = useNavigate();

  const cargarCartas = () => {
    getCartas()
      .then((res) => setCartas(res.data))
      .catch(() => setError("Error al cargar las cartas"));
  };

  useEffect(() => {
    cargarCartas();
  }, []);

  const handleEliminar = (id) => {
    setCartaSeleccionada(id);
    setMostrarModal(true);
  };

  const handleConfirm = () => {
    eliminarCarta(cartaSeleccionada)
      .then(() => {
        cargarCartas();
        setMostrarModal(false);
        setCartaSeleccionada(null);
      })
      .catch(() => alert("Error al eliminar la carta"));
  };

  return (
    <>
      <button className="btnVolverDashboard" onClick={() => navigate("/admin")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Volver al Dashboard
      </button>

      <h1 className="tituloUsuarios">Todas las cartas</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <main className="cartas-grid">
        {cartas.map((carta) => (
          <div key={carta.id}>
            <Carta carta={carta} />
            {usuario?.rol === "ADMIN" && (
              <button
                className="btnEliminar"
                onClick={() => handleEliminar(carta.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </main>

      <ConfirmModal
        visible={mostrarModal}
        modo="Eliminar"
        texto="¿Deseas eliminar esta carta?"
        onConfirm={handleConfirm}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
}

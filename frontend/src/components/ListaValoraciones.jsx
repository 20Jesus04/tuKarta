import React, { useEffect, useState } from "react";
import {
  getValoraciones,
  eliminarValoracion,
} from "../services/valoracionServices";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "./ConfirmModal";

export const ListaValoraciones = () => {
  const [valoraciones, setValoraciones] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [valoracionSeleccionada, setValoracionSeleccionada] = useState(null);
  const navigate = useNavigate();

  const cargarValoraciones = () => {
    getValoraciones()
      .then((res) => setValoraciones(res.data))
      .catch(() => setError("Error al cargar las valoraciones"));
  };

  console.log(valoraciones);

  useEffect(() => {
    cargarValoraciones();
  }, []);

  const handleEliminar = (id) => {
    setMostrarModal(true);
    setValoracionSeleccionada(id);
  };

  const handleConfirm = () => {
    eliminarValoracion(valoracionSeleccionada)
      .then(() => {
        cargarValoraciones();
        setMostrarModal(false);
        setValoracionSeleccionada(null);
      })
      .catch(() => alert("Error al eliminar la valoración"));
  };

  const renderEstrellas = (puntuacion) => {
    return Array.from({ length: puntuacion }, (_, i) => (
      <FontAwesomeIcon key={i} icon={faStarSolid} style={{ color: "gold" }} />
    ));
  };

  return (
    <>
      <button className="btnVolverDashboard" onClick={() => navigate("/admin")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Volver al Panel de control
      </button>

      <h1 className="tituloUsuarios">Valoraciones registradas</h1>

      <div className="lista">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="contenedorUsuarios">
          {valoraciones && valoraciones.length > 0 ? (
            valoraciones.map((v) => (
              <div className="usuarioCardCompact" key={v.id}>
                <div className="infoUsuario">
                  <p>
                    <strong>Puntuación:</strong> {renderEstrellas(v.puntuacion)}
                  </p>
                  <p>
                    <strong>Comentario:</strong> {v.comentario}
                  </p>
                  <p>
                    <strong>Usuario:</strong> {v.id_usuario?.nombre}
                  </p>
                  <p>
                    <strong>Carta:</strong> {v.id_carta?.nombre}
                  </p>
                  <p>
                    <strong>Restaurante:</strong>{" "}
                    {v.id_carta?.restaurante?.nombre}
                  </p>
                </div>
                <button
                  className="btnEliminar"
                  onClick={() => handleEliminar(v.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay valoraciones disponibles</p>
          )}
        </div>
      </div>

      <ConfirmModal
        visible={mostrarModal}
        modo="Eliminar"
        texto="¿Deseas eliminar esta valoración?"
        onConfirm={handleConfirm}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
};

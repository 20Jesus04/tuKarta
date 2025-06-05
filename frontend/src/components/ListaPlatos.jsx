import React, { useEffect, useState } from "react";
import { getPlatos, eliminarPlato } from "../services/platoService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";

export const ListaPlatos = () => {
  const [platos, setPlatos] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const cargarPlatos = () => {
    getPlatos()
      .then((res) => {
        setPlatos(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar platos");
      });
  };
  console.log(platos);
  useEffect(() => {
    cargarPlatos();
  }, []);

  const handleEliminar = (id) => {
    setMostrarModal(false);

    eliminarPlato(id)
      .then(() => {
        cargarPlatos();
      })
      .catch(() => {
        alert("Error al eliminar el plato.");
      });
  };

  return (
    <>
      <button className="btnVolverDashboard" onClick={() => navigate("/admin")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Volver al Panel de control
      </button>

      <h1 className="tituloUsuarios">Platos registrados</h1>

      <div className="lista">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="contenedorUsuarios">
          {platos && platos.length > 0 ? (
            platos.map((plato) => (
              <div className="usuarioCardCompact" key={plato.id}>
                <div className="infoUsuario">
                  <p>
                    <strong>Nombre del plato:</strong> {plato.nombre}
                  </p>
                  <p>
                    <strong>Descripción del plato:</strong> {plato.descripcion}
                  </p>
                  <p>
                    <strong>Precio del plato:</strong> {plato.precio}€
                  </p>
                  <p>
                    <strong>Categoría:</strong>{" "}
                    {plato.id_categoria?.nombre || "No disponible"}
                  </p>
                  <p>
                    <strong>Carta:</strong>{" "}
                    {plato.id_categoria?.id_carta?.nombre || "No disponible"}
                  </p>
                  <p>
                    <strong>Restaurante:</strong>{" "}
                    {plato.id_categoria?.id_carta?.restaurante?.nombre ||
                      "No disponible"}
                  </p>
                </div>
                <button
                  className="btnEliminar"
                  onClick={() => {
                    setMostrarModal(true);
                    setPlatoSeleccionado(plato.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay platos disponibles</p>
          )}
        </div>
      </div>
      <ConfirmModal
        visible={mostrarModal}
        modo={"Eliminar"}
        texto={"¿Deseas eliminar este plato?"}
        onConfirm={() => handleEliminar(platoSeleccionado)}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
};

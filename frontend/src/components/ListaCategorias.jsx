import React, { useEffect, useState } from "react";
import { getCategorias, eliminarCategoria } from "../services/categoriaService";
import { ConfirmModal } from "./ConfirmModal";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const cargarCategorias = () => {
    getCategorias()
      .then((res) => setCategorias(res.data))
      .catch(() => setError("Error al cargar las categorías"));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleEliminar = (id) => {
    setCategoriaSeleccionada(id);
    setMostrarModal(true);
  };

  const handleConfirm = () => {
    eliminarCategoria(categoriaSeleccionada)
      .then(() => {
        cargarCategorias();
        setMostrarModal(false);
        setCategoriaSeleccionada(null);
      })
      .catch(() => alert("Error al eliminar la categoría"));
  };

  return (
    <>
      <button className="btnVolverDashboard" onClick={() => navigate("/admin")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Volver al Panel de control
      </button>
      <h1 className="tituloUsuarios">Listado de categorías</h1>
      <div className="lista">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="contenedorUsuarios">
          {categorias.map((cat) => (
            <div key={cat.id} className="usuarioCardCompact">
              <div className="infoUsuario">
                <p>
                  <strong>Restaurante:</strong>{" "}
                  {cat.id_carta?.restaurante?.nombre || "No disponible"}
                </p>
                <p>
                  <strong>Carta:</strong> {cat.id_carta?.nombre}
                </p>
                <p>
                  <strong>Nombre Categoria:</strong> {cat.nombre}
                </p>
              </div>
              <button
                className="btnEliminar"
                onClick={() => handleEliminar(cat.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        visible={mostrarModal}
        modo="Eliminar"
        texto="¿Deseas eliminar esta categoría?"
        onConfirm={handleConfirm}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
};

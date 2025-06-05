import React, { useEffect, useState } from "react";
import { getUsuarios, eliminarUsuario } from "../services/usuariosService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "./ConfirmModal";
import { getUsuarioActual } from "../utils/auth";

export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const navigate = useNavigate();
  const usuario = getUsuarioActual();

  const cargarUsuarios = () => {
    getUsuarios()
      .then((res) => {
        setUsuarios(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar usuarios");
      });
  };

  useEffect(() => {
    if (!usuario || usuario.rol !== "ADMIN") {
      navigate("/");
      return;
    }
    cargarUsuarios();
  }, []);

  const handleEliminar = (id) => {
    setMostrarModal(false);

    eliminarUsuario(id)
      .then(() => {
        cargarUsuarios();
        setMostrarModal(false);
        setUsuarioSeleccionado(null);
      })
      .catch(() => {
        alert("Error al eliminar usuario.");
        setMostrarModal(false);
      });
  };

  return (
    <>
      <button className="btnVolverDashboard" onClick={() => navigate("/admin")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Volver al Panel de control
      </button>

      <h1 className="tituloUsuarios">Usuarios registrados</h1>

      <div className="lista">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="contenedorUsuarios">
          {usuarios && usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <div className="usuarioCardCompact" key={usuario.id}>
                <div className="infoUsuario">
                  <p>
                    <strong>Nombre:</strong> {usuario.nombre}
                  </p>
                  <p>
                    <strong>Email:</strong> {usuario.email}
                  </p>
                  <p>
                    <strong>Rol:</strong> {usuario.rol}
                  </p>
                </div>
                <button
                  className="btnEliminar"
                  onClick={() => {
                    setUsuarioSeleccionado(usuario.id);
                    setMostrarModal(true);
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay usuarios disponibles</p>
          )}
        </div>
      </div>

      <ConfirmModal
        visible={mostrarModal}
        modo="Eliminar"
        texto="¿Deseas eliminar este usuario?"
        onConfirm={() => handleEliminar(usuarioSeleccionado)}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
};

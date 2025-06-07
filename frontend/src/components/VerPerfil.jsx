import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../services/authService";
import { eliminarUsuario } from "../services/usuariosService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "./ConfirmModal";

const VerPerfil = () => {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const [mostrarModal, setMostrarModal] = useState(false);

  if (!usuario) {
    return <p>No hay información del usuario. Inicia sesión.</p>;
  }

  const traducirRol = (rol) => {
    switch (rol) {
      case "USUARIO":
        return "Usuario normal";
      case "DUENO":
        return "Dueño de un restaurante";
      case "ADMIN":
        return "Administrador";
      default:
        return rol;
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarUsuario(usuario.id);
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Hubo un error al intentar eliminar tu cuenta.");
    }
  };

  return (
    <>
      <div className="volver-wrapper">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver a inicio
        </button>
      </div>

      <div className="perfil-container">
        <h2 className="perfil-titulo">Mi Perfil</h2>

        <p className="perfil-dato">
          <span>Nombre:</span> {usuario.nombre}
        </p>
        <p className="perfil-dato">
          <span>Email:</span> {usuario.email}
        </p>
        <p className="perfil-dato">
          <span>Rol:</span> {traducirRol(usuario.rol)}
        </p>

        <button
          className="btn-editar-perfil"
          onClick={() => navigate("/EditarPerfil")}
        >
          Editar Perfil
        </button>

        <button
          className="btn-eliminar-usuario"
          onClick={() => setMostrarModal(true)}
        >
          Eliminar cuenta
        </button>
      </div>

      <ConfirmModal
        visible={mostrarModal}
        texto="¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
        modo="Eliminar"
        onConfirm={handleEliminar}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
};

export default VerPerfil;

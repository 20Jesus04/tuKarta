import React from "react";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../services/authService";

const VerPerfil = () => {
  const navigate = useNavigate();
  const usuario = getUsuario();

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

  return (
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
    </div>
  );
};

export default VerPerfil;

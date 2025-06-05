import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurantePorDueno } from "../services/restauranteService";
import { getUsuario } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const VerRestaurante = () => {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const [restaurante, setRestaurante] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      if (usuario?.id) {
        try {
          const res = await getRestaurantePorDueno(usuario.id);
          setRestaurante(res.data);
        } catch (err) {
          console.error("Error al obtener el restaurante:", err);
        }
      }
    };
    fetchDatos();
  }, [usuario]);

  if (!restaurante)
    return <p className="mensaje-cargando">Cargando restaurante...</p>;

  return (
    <>
      <div className="volver-wrapper">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver a inicio
        </button>
      </div>
          <div className="perfil-container">
   

      <h2 className="perfil-titulo">Mi Restaurante</h2>

      <p className="perfil-dato">
        <span>Nombre:</span> {restaurante.nombre}
      </p>
      <p className="perfil-dato">
        <span>Dirección:</span> {restaurante.direccion}
      </p>
      <p className="perfil-dato">
        <span>Teléfono:</span> {restaurante.telefono}
      </p>

      {restaurante.imagen_url && (
        <img
          src={restaurante.imagen_url}
          alt="Imagen del restaurante"
          className="imagen-restaurante"
        />
      )}

      <button className="btn-editar-perfil" onClick={() => navigate("/editar-restaurante")}>
        <FontAwesomeIcon icon={faPenToSquare} /> Editar datos del restaurante
      </button>
    </div>
    </>
  );
};

export default VerRestaurante;

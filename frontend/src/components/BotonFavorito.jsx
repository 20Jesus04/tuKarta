import React, { useEffect, useState } from "react";
import { toggleFavorito, esFavorito } from "../services/favoritosService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export const BotonFavorito = ({ idUsuario, idCarta }) => {
  const [favorito, setFavorito] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const comprobarFavorito = async () => {
      try {
        const res = await esFavorito(idUsuario, idCarta);
        setFavorito(res.data.esFavorito);
      } catch (error) {
        console.error("Error al comprobar favorito:", error);
      } finally {
        setCargando(false);
      }
    };
    comprobarFavorito();
  }, [idUsuario, idCarta]);

  const handleToggle = async () => {
    try {
      await toggleFavorito(idUsuario, idCarta);
      setFavorito((prev) => !prev);
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
    }
  };

  if (cargando) return <span>Cargando...</span>;

  return (
    <button
      onClick={handleToggle}
      title={favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <FontAwesomeIcon
        icon={favorito ? solidHeart : regularHeart}
        style={{ color: favorito ? "red" : "gray", fontSize: "1.5rem" }}
      />
    </button>
  );
};

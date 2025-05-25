import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEstadisticasPorCarta } from "../services/valoracionServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";



export const Carta = ({ carta }) => {
  const [estadisticas, setEstadisticas] = useState(null);
  const fechaFormateada = new Date(carta.fecha_creacion).toLocaleDateString();
  const navigate = useNavigate();

   useEffect(() => {
    getEstadisticasPorCarta(carta.id).then((res) => {
      setEstadisticas(res.data);
    });
  }, [carta.id]);

  return (
    <>
      <div className="cajaCarta"
      onClick={() => navigate(`/carta/${carta.id}`)}>
        {carta.restaurante?.imagen_url && (
          <img
            src={carta.restaurante.imagen_url}
            alt={`Imagen del restaurante ${carta.restaurante.nombre}`}
            className="imgRestaurante"
          />
        )}
        {estadisticas && estadisticas.total > 0 && (
        <p className="media-valoracion-caja">
          <FontAwesomeIcon icon={faStar} className="estrella-icono" />
          {estadisticas.media.toFixed(1)} ({estadisticas.total})
        </p>
        )}

        <h3>{ carta.restaurante?.nombre}</h3>
        <ul>
          <li>
            <strong>Fecha de creación:</strong> {fechaFormateada}
          </li>
          {carta.restaurante?.direccion && (
            <li>
              <strong>Dirección:</strong> {carta.restaurante.direccion}
            </li>
          )}
          {carta.restaurante?.telefono && (
            <li>
              <strong>Teléfono:</strong> {carta.restaurante.telefono}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

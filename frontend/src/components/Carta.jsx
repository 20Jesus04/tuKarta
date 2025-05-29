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
      <div className="cajaCarta" onClick={() => navigate(`/carta/${carta.id}`)}>
  {carta.restaurante?.imagen_url && (
    <img
      src={carta.restaurante.imagen_url}
      alt={`Imagen del restaurante ${carta.restaurante.nombre}`}
      className="imgRestaurante"
    />
  )}

  <div className="carta-contenido">
    <div className="carta-encabezado">
      <span className="nombre">{carta.restaurante?.nombre}</span>
      {estadisticas && estadisticas.total > 0 && (
        <span className="valoracion">
          <FontAwesomeIcon icon={faStar} className="estrella-icono" />
          {estadisticas.media.toFixed(1)} ({estadisticas.total})
        </span>
      )}
    </div>

    <div className="carta-datos">
      <p>
        <span>Fecha de creación:</span> {fechaFormateada}
      </p>
      {carta.restaurante?.direccion && (
        <p>
          <span>Dirección:</span> {carta.restaurante.direccion}
        </p>
      )}
      {carta.restaurante?.telefono && (
        <p>
          <span>Teléfono:</span> {carta.restaurante.telefono}
        </p>
      )}
    </div>
  </div>
</div>

    </>
  );
};

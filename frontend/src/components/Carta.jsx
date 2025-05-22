import React from "react";
import { useNavigate } from "react-router-dom";

export const Carta = ({ carta }) => {
  const fechaFormateada = new Date(carta.fecha_creacion).toLocaleDateString();
  const navigate = useNavigate();
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

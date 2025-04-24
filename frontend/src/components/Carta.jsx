import React from 'react'

export const Carta = ({carta}) => {

    const fechaFormateada = new Date(carta.fecha_creacion).toLocaleDateString();
  return (
    <>
        <div className="cajaCarta">
      <img src={carta.imagen_url} alt={carta.nombre} className="imgCarta" />
      <h3>{carta.restaurante?.nombre}</h3>
      <ul>
        <li><strong>Fecha de creación:</strong> {fechaFormateada}</li>
        <li><strong>Restaurante:</strong> {carta.restaurante?.nombre}</li>
        {carta.restaurante?.direccion && (
          <li><strong>Dirección:</strong> {carta.restaurante.direccion}</li>
        )}
        {carta.restaurante?.telefono && (
          <li><strong>Teléfono:</strong> {carta.restaurante.telefono}</li>
        )}
      </ul>
      {carta.restaurante?.imagen_url && (
        <img
          src={carta.restaurante.imagen_url}
          alt={`Imagen del restaurante ${carta.restaurante.nombre}`}
          className="imgRestaurante"
        />
      )}
    </div>
    </>
    
  )
}

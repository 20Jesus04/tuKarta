import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCartaPorId } from "../services/cartasService";
import { Valoraciones } from "./Valoraciones";

export const VistaContenidoCarta = () => {
  const { id } = useParams();
  const [carta, setCarta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getCartaPorId(id)
      .then((res) => {
        setCarta(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la carta");
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <p className="mensaje-cargando">Cargando carta...</p>;
  if (error) return <p className="mensaje-error">{error}</p>;
  if (!carta) return null;

  return (
    <>
      <div className="contenedor-carta">
        <h1 className="titulo-restaurante">{carta.restaurante?.nombre}</h1>
        <h3 className="subtitulo-carta">{carta.nombre}</h3>

        {carta.categorias.map((cat, i) => (
          <div key={i} className="bloque-categoria">
            <h2 className="nombre-categoria">{cat.nombre}</h2>
            <ul className="lista-platos">
              {cat.platos.map((plato, iplat) => (
                <li key={iplat} className="plato">
                  <div className="plato-info">
                    <span className="plato-nombre">{plato.nombre}</span>
                    <span className="plato-precio">
                      {!isNaN(plato.precio)
                        ? Number(plato.precio).toFixed(2) + " €"
                        : "Precio inválido"}
                    </span>
                  </div>
                  <p className="plato-descripcion">{plato.descripcion}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Valoraciones idCarta={carta.id} />
    </>
    
  );
};

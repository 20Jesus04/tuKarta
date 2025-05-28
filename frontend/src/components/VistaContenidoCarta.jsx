import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getCartaPorId } from "../services/cartasService";
import { Valoraciones } from "./Valoraciones";
import { getEstadisticasPorCarta } from "../services/valoracionServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

export const VistaContenidoCarta = () => {
  const { id } = useParams();
  const [carta, setCarta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);

  const valoracionesRef = useRef(null);

  const scrollToValoraciones = () => {
    valoracionesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cargarCarta = useCallback(() => {
    getCartaPorId(id)
      .then((res) => {
        setCarta(res.data);
        setCargando(false);
      })
      .catch((err) => {
        setError("No se pudo cargar la carta" + err);
        setCargando(false);
      });
  }, [id]);

  const cargarEstadisticas = useCallback(() => {
    getEstadisticasPorCarta(id).then((res) => {
      setEstadisticas(res.data);
    });
  }, [id]);

  useEffect(() => {
    cargarCarta();
    cargarEstadisticas();
  }, [id]);

  if (cargando) return <p className="mensaje-cargando">Cargando carta...</p>;
  if (error) return <p className="mensaje-error">{error}</p>;
  if (!carta) return null;

  return (
    <>
      <div className="contenedor-carta">
        <h1 className="titulo-restaurante">{carta.restaurante?.nombre}</h1>
        <h3 className="subtitulo-carta">{carta.nombre}</h3>

        {estadisticas && estadisticas.total > 0 && (
          <p className="media-valoracion" onClick={scrollToValoraciones} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faStar} className="estrella-icono" />
            {estadisticas.media.toFixed(1)} ({estadisticas.total})
          </p>
        )}

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
      <div ref={valoracionesRef}>
        <Valoraciones
          idCarta={carta.id}
          className="valorciones"
          onValoracionRealizada={cargarEstadisticas}
        />
      </div>
    </>
  );
};

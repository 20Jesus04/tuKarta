import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getCartaPorId } from "../services/cartasService";
import { Valoraciones } from "./Valoraciones";
import { getEstadisticasPorCarta } from "../services/valoracionServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { obtenerPorCarta } from "../services/imagenesService";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const VistaContenidoCarta = () => {
  const { id } = useParams();
  const [carta, setCarta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const valoracionesRef = useRef(null);
  const navigate = useNavigate();

  const scrollToValoraciones = () => {
    valoracionesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleVolver = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/"); // o cualquier página por defecto
    }
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

    obtenerPorCarta(id)
      .then((res) => {
        setImagenes(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar imágenes:", err);
      });
  }, [id]);

  if (cargando) return <p className="mensaje-cargando">Cargando carta...</p>;
  if (error) return <p className="mensaje-error">{error}</p>;
  if (!carta) return null;

  return (
    <>
      <div className="contenedor-carta">
        <button className="boton-volver" onClick={handleVolver}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver
        </button>

        <h1 className="titulo-restaurante">{carta.restaurante?.nombre}</h1>
        <h3 className="subtitulo-carta">{carta.nombre}</h3>

        {estadisticas && estadisticas.total > 0 && (
          <p
            className="media-valoracion"
            onClick={scrollToValoraciones}
            style={{ cursor: "pointer" }}
          >
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
        {imagenes.length === 1 ? (
          <>
            <h2 className="nombre-categoria">Imagen de la carta</h2>
            <div className="galeria-imagenes-carta">
              <img
                src={imagenes[0].url}
                alt="Imagen carta"
                className="imagen-carta"
              />
            </div>
          </>
        ) : imagenes.length > 1 ? (
          <>
            <h2 className="nombre-categoria">Imagenes de la carta</h2>
            <div className="galeria-imagenes-carta">
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
              >
                {imagenes.map((img, i) => (
                  <div key={i}>
                    <img
                      src={img.url}
                      alt={`Imagen carta ${i}`}
                      className="imagen-carta"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </>
        ) : null}
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

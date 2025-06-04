import React, { useEffect, useState } from "react";
import { getFavoritosPorUsuario } from "../services/favoritosService";
import { getUsuarioActual } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Carta } from "../components/Carta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const VistaFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const usuario = getUsuarioActual();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    getFavoritosPorUsuario(usuario.sub)
      .then((res) => {
        setFavoritos(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar favoritos:", err);
      })
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <div className="volver-wrapper">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver a inicio
        </button>
      </div>

      <div className="vista-favoritos">
        <h2 className="titulo-favoritos">
          Mis cartas favoritas{" "}
          <FontAwesomeIcon icon={faHeart} className="icono-corazon" />
        </h2>

        {cargando ? (
          <span className="loader"></span>
        ) : favoritos.length === 0 ? (
          <p>No has marcado ninguna carta como favorita.</p>
        ) : (
          <main>
            {favoritos.map((favorito) => (
              <Carta key={favorito.id} carta={favorito.carta} />
            ))}
          </main>
        )}
      </div>
    </>
  );
};

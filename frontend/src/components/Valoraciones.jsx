import React, { useEffect, useState } from "react";
import {
  getValoracionesPorCarta,
  enviarValoracion,
} from "../services/valoracionServices";
import { getUsuarioActual } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const Valoraciones = ({ idCarta, onValoracionRealizada }) => {
  const [valoraciones, setValoraciones] = useState([]);
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);
  const [yaValorado, setYaValorado] = useState(false);

  const user = getUsuarioActual();
  const navigate = useNavigate();

  useEffect(() => {
    getValoracionesPorCarta(idCarta).then((res) => {
      setValoraciones(res.data);

      if (user?.sub && user.rol === "USUARIO" || user.rol === "DUENO") {
        const yaExiste = res.data.some((v) => v.id_usuario?.id === user.sub);
        setYaValorado(yaExiste);
      }
    });
  }, [idCarta, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await enviarValoracion({
      puntuacion,
      comentario,
      id_usuario: user.sub,
      id_carta: idCarta,
    });
    setComentario("");
    setPuntuacion(5);
    setYaValorado(true);
    const nuevas = await getValoracionesPorCarta(idCarta);
    setValoraciones(nuevas.data);

    if (typeof onValoracionRealizada === "function") {
      onValoracionRealizada();
    }
  };

  return (
    <>
      <div className="valoraciones-container">
        <h2 className="valoraciones-titulo">Valoraciones</h2>
        {valoraciones.length === 0 && <p>No hay valoraciones aún.</p>}

        <ul className="lista-valoraciones">
          {valoraciones
            .filter((v) => v.id_usuario)
            .map((val) => (
              <li key={val.id} className="valoracion-item">
                <div className="valoracion-cabecera">
                  <span className="valoracion-usuario">
                    {val.id_usuario.nombre}
                  </span>
                  <span className="valoracion-email">
                    ({val.id_usuario.email})
                  </span>
                </div>
                <div className="valoracion-estrellas">
                  {"★".repeat(val.puntuacion)}
                  {"☆".repeat(5 - val.puntuacion)}
                </div>
                <p className="valoracion-comentario">{val.comentario}</p>
              </li>
            ))}
        </ul>

        {/* Solo podran valorar los que tengan el rol Usuarios */}
        {user?.rol === "USUARIO" || user?.rol === "DUENO" && !yaValorado && (
          <form onSubmit={handleSubmit}>
            <h3>Deja tu valoración</h3>
            <label>
              Puntuación:
              <p className="clasificacion">
                {[5, 4, 3, 2, 1].map((value) => (
                  <React.Fragment key={value}>
                    <input
                      id={`radio${value}`}
                      type="radio"
                      name="estrellas"
                      value={value}
                      checked={puntuacion === value}
                      onChange={() => setPuntuacion(value)}
                    />
                    <label htmlFor={`radio${value}`}>★</label>
                  </React.Fragment>
                ))}
              </p>
            </label>
            <br />
            <label>
              Comentario:
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Enviar valoración</button>
          </form>
        )}
        {/* Mensaje si ya valoró */}
        {user?.rol === "USUARIO" || user?.rol === "DUENO" && yaValorado && (
          <p className="mensaje-info">
            Ya has valorado esta carta. ¡Gracias por tu opinión!
          </p>
        )}

        {/* Si el usuario no tiene rol USUARIO */}
        {user === null && (
          <div className="mensaje-info">
            <p>
              Solo los usuarios que esten registrados pueden dejar valoraciones.
            </p>
            <button
              className="botonAuth"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
};

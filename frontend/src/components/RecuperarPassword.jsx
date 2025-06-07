import React, { useState } from "react";
import { solicitarRecuperacionPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      await solicitarRecuperacionPassword(email);
      setMensaje(
        "✅ Revisa tu correo electrónico para continuar con la recuperación de tu contraseña."
      );
    } catch (err) {
      console.error(err);
      setError("❌ Error al solicitar recuperación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="volver-wrapper">
        <button className="boton-volver" onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver al login
        </button>
      </div>
    <div className="perfil-formulario">
      <h2 className="form-title">Recuperar Contraseña</h2>

      {mensaje && <p className="form-success">{mensaje}</p>}
      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          placeholder="Introduce tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
          maxLength={50}
        />

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>
    </div>
    </>
    
  );
};

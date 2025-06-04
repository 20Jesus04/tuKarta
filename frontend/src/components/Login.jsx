import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });

      if (user.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <>
      <div className="volver-wrapper">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver al inicio
        </button>
      </div>

      <form className="loginform" onSubmit={handleSubmit}>
        <h2 className="form-title">Iniciar sesión</h2>

        <input
          className="form-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
        />

        <div className="input-password-group">
          <input
            className="form-input"
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setMostrarPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={mostrarPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <button className="form-button" type="submit">
          Entrar
        </button>

        {error && <p className="form-error">{error}</p>}

        <p className="form-link-text">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="form-link">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const NuevaPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    const { password, confirmPassword } = formData;
    const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password !== confirmPassword) {
      setMensaje("❌ Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    if (!regexSegura.test(password)) {
      setMensaje("❌ La contraseña no cumple con los requisitos de seguridad.");
      setLoading(false);
      return;
    }

    try {
      await resetPassword(token, password);
      setMensaje("✅ Contraseña actualizada correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al restablecer la contraseña. El token podría ser inválido o haber expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="perfil-formulario">
      <h2 className="form-title">Restablecer Contraseña</h2>

      {mensaje && (
        <p
          className={mensaje.startsWith("✅") ? "form-success" : "form-error"}
        >
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-password-wrapper">
          <input
            className="form-input"
            type={mostrarPassword ? "text" : "password"}
            name="password"
            placeholder="Nueva contraseña"
            onChange={handleChange}
            required
            maxLength={50}
          />
          <button
            type="button"
            onClick={() => setMostrarPassword((prev) => !prev)}
            className="btn-ver-password"
          >
            <FontAwesomeIcon icon={mostrarPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <p className="password-hint">
          La contraseña debe tener al menos 8 caracteres, una mayúscula, una
          minúscula y un número.
        </p>

        <input
          className="form-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirmar nueva contraseña"
          onChange={handleChange}
          required
        />

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Restableciendo..." : "Restablecer contraseña"}
        </button>
      </form>
    </div>
    </>
    
  );
};

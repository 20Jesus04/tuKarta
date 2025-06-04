import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { crearRestauranteConImagen } from "../services/restauranteService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "USUARIO",
  });

  const [restauranteData, setRestauranteData] = useState({
    nombre_restaurante: "",
    direccion: "",
    telefono: "",
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRestauranteChange = (e) => {
    const { name, value } = e.target;
    setRestauranteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { password, confirmPassword } = formData;
    const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regexSegura.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const nuevoUsuario = await register(formData);
      if (formData.rol === "DUENO") {
        await crearRestauranteConImagen({
          nombre: restauranteData.nombre_restaurante,
          direccion: restauranteData.direccion,
          telefono: restauranteData.telefono,
          imagen,
          id_dueno: nuevoUsuario.id,
        });
      }

      setSuccess("¡Registro exitoso! Es momento de iniciar sesión.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar. ¿El email ya está en uso?");
    }
  };

  return (
    <>
      <div className="volver-wrapper">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver al inicio
        </button>
      </div>

      <form className="registerform" onSubmit={handleSubmit}>
        <h2 className="form-title">Registro</h2>

        <input
          className="form-input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
          maxLength={30}
        />

        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value.toLowerCase(),
            }))
          }
          required
          maxLength={50}
        />

        <div className="input-password-group">
          <input
            className="form-input"
            type={mostrarPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            maxLength={50}
          />
          <button
            type="button"
            onClick={() => setMostrarPassword((prev) => !prev)}
            className="toggle-password"
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
          placeholder="Confirmar contraseña"
          onChange={handleChange}
          required
        />

        <select
          className="form-input"
          name="rol"
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione cómo se quiere registrar--</option>
          <option value="USUARIO">Como Usuario</option>
          <option value="DUENO">Como Dueño</option>
        </select>

        {formData.rol === "DUENO" && (
          <>
            <h3 className="form-subtitle">Información del Restaurante</h3>

            <input
              className="form-input"
              type="text"
              name="nombre_restaurante"
              placeholder="Nombre del restaurante"
              onChange={handleRestauranteChange}
              required
              maxLength={50}
            />

            <input
              className="form-input"
              type="text"
              name="direccion"
              placeholder="Dirección"
              onChange={handleRestauranteChange}
              required
              maxLength={100}
            />

            <input
              className="form-input"
              type="text"
              name="telefono"
              placeholder="Teléfono"
              onChange={handleRestauranteChange}
              required
              maxLength={15}
              pattern="^[0-9]{9,15}$"
              title="Introduce un número de teléfono válido (solo dígitos, entre 9 y 15)"
            />

            <input
              className="form-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </>
        )}

        <button className="form-button" type="submit">
          Registrarse
        </button>

        {success && <p className="form-success">{success}</p>}
        {error && <p className="form-error">{error}</p>}
      </form>
    </>
  );
}

export default Register;

import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { crearRestauranteConImagen } from "../services/restauranteService";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "USUARIO",
  });

  const [restauranteData, setRestauranteData] = useState({
    nombre_restaurante: "",
    direccion: "",
    telefono: "",
  });

  const [imagen, setImagen] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // 1. Registrar el usuario
      const nuevoUsuario = await register(formData);
      console.log("ID del dueño enviado:", nuevoUsuario.id);

      // 2. Si es DUENO, crear el restaurante
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
  const handleRestauranteChange = (e) => {
    const { name, value } = e.target;
    setRestauranteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
          maxLength={30}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          maxLength={50}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          maxLength={50}
        />
        <select name="rol" onChange={handleChange} required>
          <option value="">--Seleccione como se quiere registrar--</option>
          <option value="USUARIO">Como Usuario</option>
          <option value="DUENO">Como Dueño</option>
        </select>
        {formData.rol === "DUENO" && (
          <>
            <h3>Información del Restaurante</h3>
            <input
              type="text"
              name="nombre_restaurante"
              placeholder="Nombre del restaurante"
              onChange={handleRestauranteChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              onChange={handleRestauranteChange}
              required
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              onChange={handleRestauranteChange}
              required
            />
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </>
        )}
        <button type="submit">Registrarse</button>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}

export default Register;

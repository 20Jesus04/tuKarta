import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "USUARIO", // Valor por defecto
  });

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
      await register(formData);
      setSuccess("¡Registro exitoso! es momento de iniciar sesión")
      setTimeout(() => {
        navigate('/login');
      },2000)
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar. ¿El email ya está en uso?");
    }
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
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <select name="rol" onChange={handleChange} required>
          <option value="">--Selecciona rol--</option>
          <option value="USUARIO">Usuario</option>
          <option value="DUENO">Dueño</option>
        </select>
        <button type="submit">Registrarse</button>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}

export default Register;

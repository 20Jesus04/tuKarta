import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    try {
      const user = await login({ email, password }); 
      // console.log("Usuario logueado:", user);
      
      
      if (user.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      window.location.reload();
     
      
    } catch (err) {
      console.error("Error al hacer login:", err);
      setError("Credenciales incorrectas");
    }

  };
    


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}

export default Login;

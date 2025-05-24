import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import logo from "./assets/LOGO_TUKARTAsintitulo.png";
import {getUsuarioActual} from "./utils/auth.js"
import { CartaForm } from "./components/CartaForm.jsx";
import { VistaContenidoCarta } from "./components/VistaContenidoCarta";

export const App = () => {

  const usuario = getUsuarioActual();

  return (
    <>
      <Router>
        <header className="appHeader">
         <Link to="/">
          <div className="logoSeccion">
            <img src={logo} alt="Logo" className="logo" />
            <span className="nombreApp">tuKarta</span>
          </div>
        </Link>

          <div className="buscadorSeccion">
            <input
              type="text"
              className="barraBusqueda"
              placeholder="Buscar cartas"
              disabled
            />
          </div>

          <div className="authSeccion">
            {!usuario ? (
              <>
                <Link to="/login">
                  <button className="botonAuth">Login</button>
                </Link>
                <Link to="/register">
                  <button className="botonAuth">Sign up</button>
                </Link>
              </>
            ) : (
              <>
              {/* <span className="bienvenidaUsuario">Hola, {usuario.email}</span> */}
              <button
                className="botonAuth"
                onClick={() => {
                  localStorage.removeItem('token')
                  window.location.href = "/";
                }}>
                  Cerrar Sesión
              </button>
              </>
            )}
            
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/CrearCarta" element={<CartaForm modo="Crear"/>} />
          <Route path="/EditarCarta" element={<CartaForm modo="Editar"/>} />
          <Route path="/Carta/:id" element={<VistaContenidoCarta />} />
        </Routes>
      </Router>
    </>
  );
};

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import logo from "./assets/LOGO_TUKARTAsintitulo.png";
import { getUsuarioActual } from "./utils/auth.js";
import { CartaForm } from "./components/CartaForm.jsx";
import { VistaContenidoCarta } from "./components/VistaContenidoCarta";
import { AdminDashboard } from "./components/AdminDashboard.jsx";
import { ListaUsuarios } from "./components/ListaUsuarios";
import { ListaCartasAdmin } from "./components/ListaCartasAdmin.jsx";
import { ListaCategorias } from "./components/ListaCategorias.jsx";
import { ListaPlatos } from "./components/ListaPlatos.jsx";
import { ListaValoraciones } from "./components/ListaValoraciones.jsx";
import { SidebarMenu } from "./components/SidebarMenu.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VerPerfil from "./components/VerPerfil.jsx";
import EditarPerfil from "./components/EditarPerfil.jsx";
import { VistaFavoritos } from "./components/VistaFavoritos.jsx";

export const App = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
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
            <div className="input-contenedor">
              <Link to="/">
              <input
                type="text"
                className="barraBusqueda"
                placeholder="Buscar cartas"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
              </Link>
              {terminoBusqueda && (
                <button
                  type="button"
                  className="boton-clear"
                  onClick={() => setTerminoBusqueda("")}
                >
                  &times;
                </button>
              )}
            </div>
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
                <SidebarMenu />
              </>
            )}
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={<Home terminoBusqueda={terminoBusqueda} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/CrearCarta" element={<CartaForm modo="Crear" />} />
          <Route path="/EditarCarta" element={<CartaForm modo="Editar" />} />
          <Route path="/Carta/:id" element={<VistaContenidoCarta />} />
          <Route path="/PerfilUsuario" element={<VerPerfil />} />
          <Route
            path="/EditarPerfil"
            element={<EditarPerfil usuario={usuario} />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/usuarios" element={<ListaUsuarios />} />
          <Route path="/admin/cartas" element={<ListaCartasAdmin />} />
          <Route path="/admin/categorias" element={<ListaCategorias />} />
          <Route path="/admin/platos" element={<ListaPlatos />} />
          <Route path="/admin/valoraciones" element={<ListaValoraciones />} />
          <Route path="/favoritos" element={<VistaFavoritos />} />
        </Routes>
      </Router>
    </>
  );
};

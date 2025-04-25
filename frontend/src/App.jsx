import { useEffect, useState } from 'react';
import { getCartas } from './services/cartasService';
import { CartaList } from './components/CartaList';
import "./App.css";
import logo from './assets/LOGO_TUKARTAsintitulo.png';


export const App = () => {
  const [cartas, setCartas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getCartas()
      .then(res => {
        setCartas(res.data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al cargar cartas:', err);
        setError('No se pudieron cargar las cartas');
        setCargando(false);
      });
  }, []);

  
  return (
    <>
        <header className="appHeader">
      <div className="logoSeccion">
        <img src={logo} alt="Logo" className="logo" />
        <span className="nombreApp">tuKarta</span>
      </div>

      <div className="buscadorSeccion">
        <input
          type="text"
          className="barraBusqueda"
          placeholder="Buscar cartas"
          disabled
        />
      </div>

      <div className="authSeccion">
        <button className="botonAuth">Login</button>
        <button className="botonAuth">Sign up</button>
      </div>
    </header>
       <div className="App">
      {cargando && <p>Cargando cartas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && !error && <CartaList cartas={cartas} />}
    </div>
    </>
  )
}



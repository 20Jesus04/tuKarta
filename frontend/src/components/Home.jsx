import React, { useEffect, useState } from 'react';
import { getCartas } from '../services/cartasService';
import { CartaList } from './CartaList';

export const Home = () => {
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
    <div className="App">
      {cargando && <p>Cargando cartas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && !error && <CartaList cartas={cartas} />}
    </div>
  );
};

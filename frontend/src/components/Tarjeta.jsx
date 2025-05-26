
import { useNavigate } from "react-router-dom";

export const Tarjeta = ({ titulo, cantidad, ruta }) => {
  const navigate = useNavigate();
  return (
    <div className="tarjetaResumen" onClick={() => navigate(ruta)} style={{ cursor: "pointer" }}>
      <h3>{titulo}</h3>
      <p className="cantidad">{cantidad}</p>
    </div>
  );
};


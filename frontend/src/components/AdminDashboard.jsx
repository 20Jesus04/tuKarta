import React, { useEffect, useState } from "react";
import { getResumenAdmin } from "../services/adminService";
import { Tarjeta } from "./Tarjeta";

export const AdminDashboard = () => {
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    getResumenAdmin()
      .then((res) => setResumen(res.data))
      .catch((err) => {
        console.error("Error al cargar resumen admin:", err);
        setError("No se pudo cargar el panel.");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!resumen) return <p>Cargando panel de administrador...</p>;

  return (
    <>
    <div className="admin-dashboard">
      <h2>Panel de Control</h2>
      <div className="tarjetas-grid">
        <Tarjeta titulo="Usuarios" cantidad={resumen.totalUsuarios} ruta="/admin/usuarios" />
        <Tarjeta titulo="Cartas" cantidad={resumen.totalCarta} ruta="/admin/cartas" />
        <Tarjeta titulo="Categorías" cantidad={resumen.totalCategorias} ruta="/admin/categorias" />
        <Tarjeta titulo="Platos" cantidad={resumen.totalPlatos} ruta="/admin/platos" />
        <Tarjeta titulo="Valoraciones" cantidad={resumen.totalValoraciones} ruta="/admin/valoraciones" />
      </div>
    </div>
    </>
    
  );
};



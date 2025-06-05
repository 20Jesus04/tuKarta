import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../services/authService";
import {
  getRestaurantePorDueno,
  actualizarRestaurante,
} from "../services/restauranteService";
import { ConfirmModal } from "./ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const EditarRestaurante = () => {
  const navigate = useNavigate();
  const usuario = getUsuario();

  const [restauranteId, setRestauranteId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_restaurante: "",
    direccion: "",
    telefono: "",
    imagen: null,
  });
  const [mensaje, setMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await getRestaurantePorDueno(usuario.id);
        setRestauranteId(res.data.id);
        setFormData({
          nombre_restaurante: res.data.nombre,
          direccion: res.data.direccion,
          telefono: res.data.telefono,
          imagen: null,
        });
      } catch (err) {
        console.error(err);
        setMensaje("No se pudo cargar el restaurante.");
      }
    };

    cargarDatos();
  }, [usuario.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, imagen: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    setMostrarModal(true);
  };

  const confirmarEdicion = async () => {
    setMostrarModal(false);
    try {
      const datos = new FormData();
      datos.append("nombre", formData.nombre_restaurante);
      datos.append("direccion", formData.direccion);
      datos.append("telefono", formData.telefono);
      if (formData.imagen) datos.append("imagen", formData.imagen);

      await actualizarRestaurante(restauranteId, datos);
      setMensaje(" Datos del restaurante actualizados correctamente.");
      navigate("/ver-restaurante");
    } catch (err) {
      console.error(err);
      setMensaje(" Error al actualizar los datos del restaurante.");
    }
  };

  const handleVolver = () => {
    setMostrarModalSalir(true);
  };

  const confirmarSalida = () => {
    setMostrarModalSalir(false);
    navigate("/ver-restaurante");
  };

  return (
    <>
     <div className="volver-wrapper">
        <button className="boton-volver" onClick={handleVolver}>
          <FontAwesomeIcon icon={faChevronLeft} /> Volver
        </button>
      </div>

      <div className="perfil-formulario">
        <h2 className="form-title">Editar Restaurante</h2>
        <p className="form-description">
          Puedes editar los campos por separado. La imagen es opcional.
        </p>

        {mensaje && (
          <p className={mensaje.startsWith("✅") ? "form-success" : "form-error"}>
            {mensaje}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            name="nombre_restaurante"
            placeholder="Nombre del restaurante"
            value={formData.nombre_restaurante}
            onChange={handleChange}
            required
            maxLength={50}
          />

          <input
            className="form-input"
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
            maxLength={100}
          />

          <input
            className="form-input"
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
            maxLength={15}
            pattern="^[0-9]{9,15}$"
            title="Introduce un número de teléfono válido"
          />

          <input
            className="form-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button className="form-button" type="submit">
            Guardar cambios
          </button>
        </form>
      </div>

      {/* Modal para guardar cambios */}
      <ConfirmModal
        texto="¿Seguro que quieres actualizar los datos del restaurante?"
        modo="actualizar"
        visible={mostrarModal}
        onConfirm={confirmarEdicion}
        onCancel={() => setMostrarModal(false)}
      />

      {/* Modal para salir sin guardar */}
      <ConfirmModal
        texto="¿Seguro que quieres salir? Se perderán los cambios no guardados."
        modo="salir"
        visible={mostrarModalSalir}
        onConfirm={confirmarSalida}
        onCancel={() => setMostrarModalSalir(false)}
      />
    </>
  );
};

export default EditarRestaurante;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUsuario } from "../services/usuariosService";
import { getUsuario, getToken } from "../services/authService";
import { ConfirmModal } from "../components/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditarPerfil = () => {
  const usuarioActual = getUsuario();
  const token = getToken();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    passwordAntigua: "",
    password: "",
  });

  const [verPassword, setVerPassword] = useState(false);
  const [verPasswordAntigua, setVerPasswordAntigua] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosParaActualizar, setDatosParaActualizar] = useState({});
  const [tipoMensaje, setTipoMensaje] = useState("");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    if (usuarioActual) {
      setForm((prev) => ({
        ...prev,
        nombre: usuarioActual.nombre,
        email: usuarioActual.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    if (form.password) {
      const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!regexSegura.test(form.password)) {
        setMensaje(
          "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
        );
        setTipoMensaje("error");
        return;
      }
      if (!form.passwordAntigua) {
        setMensaje("Introduce la contraseña actual para poder cambiarla.");
        setTipoMensaje("error");
        return;
      }
    }

    const datos = {
      ...(form.nombre !== usuarioActual.nombre && { nombre: form.nombre }),
      ...(form.email !== usuarioActual.email && { email: form.email }),
      ...(form.password && {
        passwordAntigua: form.passwordAntigua,
        password: form.password,
      }),
    };

    if (Object.keys(datos).length === 0) {
      setMensaje("No hay cambios para guardar.");
      return;
    }

    setDatosParaActualizar(datos);
    setMostrarModal(true);
  };

  const confirmarActualizacion = async () => {
    try {
      await updateUsuario(usuarioActual.id, datosParaActualizar, token);
      setMensaje("Perfil actualizado correctamente.");
      setTipoMensaje("success");
      cerrarSesion();
    } catch (err) {
      setMostrarModal(false);
      if (err.response?.data?.message) {
        const mensaje = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(" ")
          : err.response.data.message;
        setMensaje(mensaje);
        setTipoMensaje("error");
      } else {
        setMensaje("Error al actualizar perfil.");
        setTipoMensaje("error");
      }
    }
  };

  return (
    <>
      <form className="perfil-formulario" onSubmit={handleSubmit}>
        <h2 className="form-title">Editar Perfil</h2>
        <p className="form-description">
          Puedes editar solo el nombre, el correo o la contraseña por separado.
          Si deseas cambiar tu contraseña, introduce la actual y la nueva.
        </p>

        <label>
          Nombre:
          <input
            className="form-input"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña actual:
          <div className="input-password-wrapper">
            <input
              className="form-input"
              type={verPasswordAntigua ? "text" : "password"}
              name="passwordAntigua"
              placeholder="Obligatoria si vas a cambiar"
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn-ver-password"
              onClick={() => setVerPasswordAntigua(!verPasswordAntigua)}
            >
              <FontAwesomeIcon icon={verPasswordAntigua ? faEyeSlash : faEye} />
            </button>
          </div>
        </label>

        <label>
          Nueva contraseña:
          <div className="input-password-wrapper">
            <input
              className="form-input"
              type={verPassword ? "text" : "password"}
              name="password"
              placeholder="Dejar en blanco si no cambia"
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn-ver-password"
              onClick={() => setVerPassword(!verPassword)}
            >
              <FontAwesomeIcon icon={verPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <p className="password-hint">
            Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un
            número.
          </p>
        </label>

        <button className="form-button" type="submit">
          Guardar cambios
        </button>

        {mensaje && (
          <p
            className={tipoMensaje === "error" ? "form-error" : "form-success"}
          >
            {mensaje}
          </p>
        )}
      </form>

      <ConfirmModal
        texto="¿Estás seguro de que quieres actualizar tu perfil? Se cerrará la sesión para aplicar los cambios."
        modo="guardar cambios"
        visible={mostrarModal}
        onConfirm={confirmarActualizacion}
        onCancel={() => setMostrarModal(false)}
      />
    </>
  );
};

export default EditarPerfil;

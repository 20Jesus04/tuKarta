import React, { useEffect, useState } from "react";
import { getRestaurantePorDueno } from "../services/restauranteService";
import { getUsuarioActual } from "../utils/auth";
import {
  actualizarCartaCompleta,
  crearCartaCompleta,
  getCartaPorRestaurante,
} from "../services/cartasService";
import { ConfirmModal } from "./ConfirmModal";
import { useNavigate } from "react-router-dom";

export const CartaForm = ({ modo }) => {
  const [nombreCarta, setNombreCarta] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [idRestaurante, setIdRestaurante] = useState(null);
  const [idCarta, setIdCarta] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = getUsuarioActual();
    if (!usuario || !usuario.sub) return;

    // Obtener el restaurante
    getRestaurantePorDueno(usuario.sub)
      .then((res) => {
        const idRestaurante = res.data.id;
        setIdRestaurante(idRestaurante);

        if (modo === "Editar") {
          return getCartaPorRestaurante(idRestaurante)
            .then((res) => {
              const carta = res.data;
              setNombreCarta(carta.nombre);
              setCategorias(carta.categorias);
              setIdCarta(carta.id);
            })
            .catch((err) =>
              console.error("Error al cargar carta para edición:", err)
            );
        }
      })
      .catch((err) => {
        console.error("Error al obtener restaurante del dueño:", err);
        setMensaje("No se pudo obtener el restaurante del usuario");
      });
  }, [modo]);

  const handleAddCategoria = () => {
    setCategorias([...categorias, { nombre: "", platos: [] }]);
  };

  const handleRemoveCategoria = (index) => {
    const nuevas = [...categorias];
    nuevas.splice(index, 1);
    setCategorias(nuevas);
  };

  const handleRemovePlato = (catIndex, platoIndex) => {
    const nuevas = [...categorias];
    nuevas[catIndex].platos.splice(platoIndex, 1);
    setCategorias(nuevas);
  };

  const handleCrearCarta = async () => {
    if (procesando) return;

    if (!nombreCarta.trim()) {
      setMensaje("La carta debe tener un nombre");
      return;
    }

    if (!idRestaurante) {
      setMensaje("No se pudo obtener el restaurante del usuario");
      return;
    }

    for (let cat of categorias) {
      if (!cat.nombre.trim()) {
        setMensaje("Todas las categorías deben tener nombre");
        return;
      }
      if (cat.platos.length === 0) {
        setMensaje("Cada categoría debe tener al menos un plato");
        return;
      }
      for (let plato of cat.platos) {
        if (
          !plato.nombre.trim() ||
          !plato.descripcion.trim() ||
          !plato.precio
        ) {
          setMensaje(
            "Todos los platos deben tener nombre, descripción y precio"
          );
          return;
        }
      }
    }

    setMensaje("");
    setMostrarModal(true);
  };

  const crearCartaEnBackend = async () => {
    if (procesando) return;
    setProcesando(true);
    try {
      await crearCartaCompleta(nombreCarta, idRestaurante, categorias);
      setMensaje("Carta creada correctamente");
      setNombreCarta("");
      setCategorias([]);
      navigate("/");
    } catch (err) {
      console.error(err);
      setMensaje("Error al crear la carta");
    }finally {
      setProcesando(false);
      setMostrarModal(false);
    }
  };

  const actualizarCartaEnBackend = async () => {
    if (procesando) return;
    setProcesando(true);
    try {
      await actualizarCartaCompleta(idCarta, {
        nombre: nombreCarta,
        categorias,
      });

      setMostrarModal(false);
      setMensaje("Carta actualizada correctamente");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMensaje("Error al actualizar la carta");
      setMostrarModal(false);
    } finally {
      setProcesando(false);
      setMostrarModal(false);
    }
  };

  return (
    <>
      <div className="carta-form">
        <h2 className="form-title">{modo} carta</h2>
        <div className="form-group">
          <label className="nombre-carta">Nombre de la carta:</label>
          <input
            id="nombre-carta"
            type="text"
            value={nombreCarta}
            onChange={(e) => setNombreCarta(e.target.value)}
            placeholder="Ej: Carta de verano"
            required
          />
        </div>

        {categorias.map((cat, catIndex) => (
          <div key={catIndex} className="categoria-temporal">
            <h4>Categoría {catIndex + 1}</h4>

            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={cat.nombre}
                onChange={(e) => {
                  const nuevas = [...categorias];
                  nuevas[catIndex].nombre = e.target.value;
                  setCategorias(nuevas);
                }}
              />
            </div>

            {cat.platos.map((plato, platoIndex) => (
              <div key={platoIndex} className="plato-formulario">
                <h5>Plato {platoIndex + 1}</h5>
                <div className="form-group">
                  <label>Nombre del plato:</label>
                  <input
                    type="text"
                    value={plato.nombre}
                    onChange={(e) => {
                      const nuevas = [...categorias];
                      nuevas[catIndex].platos[platoIndex].nombre =
                        e.target.value;
                      setCategorias(nuevas);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Descripción:</label>
                  <input
                    type="text"
                    value={plato.descripcion}
                    onChange={(e) => {
                      const nuevas = [...categorias];
                      nuevas[catIndex].platos[platoIndex].descripcion =
                        e.target.value;
                      setCategorias(nuevas);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Precio:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={plato.precio ?? ""}
                    onChange={(e) => {
                      const valor = e.target.value;

                      const numero = parseFloat(valor.replace(",", "."));
                      if (!isNaN(numero)) {
                        const nuevas = [...categorias];
                        nuevas[catIndex].platos[platoIndex].precio = parseFloat(
                          e.target.value
                        );
                        setCategorias(nuevas);
                      }
                    }}
                  />
                </div>
                <button
                  className="btn-eliminar-plato"
                  onClick={() => handleRemovePlato(catIndex, platoIndex)}
                >
                  Eliminar plato
                </button>
              </div>
            ))}

            <button
              className="btn-agregar-plato"
              onClick={() => {
                const nuevas = [...categorias];
                nuevas[catIndex].platos.push({
                  nombre: "",
                  descripcion: "",
                  precio: 0,
                });
                setCategorias(nuevas);
              }}
            >
              Añadir plato
            </button>

            <button
              className="btn-eliminar-categoria"
              onClick={() => handleRemoveCategoria(catIndex)}
            >
              Eliminar categoría
            </button>
          </div>
        ))}
        <button className="btn-agregar-categoria" onClick={handleAddCategoria}>
          Añadir categoría
        </button>
        <button className="btn-crear-carta" onClick={handleCrearCarta}>
          {modo} carta
        </button>
        {mensaje && <p className="mensaje-error">{mensaje}</p>}
        <ConfirmModal
          visible={mostrarModal}
          modo={modo}
          texto={`¿Deseas ${modo} la carta con los datos actuales?`}
          onConfirm={
            modo === "Editar" ? actualizarCartaEnBackend : crearCartaEnBackend
          }
          onCancel={() => setMostrarModal(false)}
        />
      </div>
    </>
  );
};

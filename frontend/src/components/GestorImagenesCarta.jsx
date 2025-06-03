import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { subir, obtenerPorCarta, eliminar } from "../services/imagenesService";

export const GestorImagenesCarta = ({ idCarta }) => {
  const [imagenesSubidas, setImagenesSubidas] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]);

  useEffect(() => {
    if (idCarta) {
      cargarImagenes();
    }
  }, [idCarta]);

  const cargarImagenes = async () => {
    try {
      const res = await obtenerPorCarta(idCarta);
      setImagenesSubidas(res.data);
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    }
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenesNuevas([...imagenesNuevas, ...files]);
  };

  const handleEliminar = async (img) => {
    if (img.tipo === "subida") {
      try {
        await eliminar(img.id);
        setImagenesSubidas(imagenesSubidas.filter((i) => i.id !== img.id));
      } catch (error) {
        console.error("Error al eliminar imagen:", error);
      }
    } else {
      setImagenesNuevas(imagenesNuevas.filter((_, i) => i !== img.index));
    }
  };

  const handleSubir = async () => {
    try {
      for (const img of imagenesNuevas) {
        const formData = new FormData();
        formData.append("imagen", img);
        formData.append("idCarta", idCarta);
        await subir(formData);
      }
      setImagenesNuevas([]);
      cargarImagenes();
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    }
  };

  const todasLasImagenes = [
    ...imagenesSubidas.map((img) => ({ tipo: "subida", src: img.url, id: img.id })),
    ...imagenesNuevas.map((file, index) => ({
      tipo: "nueva",
      src: URL.createObjectURL(file),
      index,
    })),
  ];

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: Math.min(3, todasLasImagenes.length),
  slidesToScroll: 1,
};



  return (
    <div className="gestor-imagenes-carta">
      <h3>Gestión de Imágenes</h3>

      <input type="file" accept="image/*" multiple onChange={handleInputChange} />

      {imagenesNuevas.length > 0 && (
        <button onClick={handleSubir} className="btn-subir">
          Subir {imagenesNuevas.length} imagen(es)
        </button>
      )}

      {todasLasImagenes.length > 0 ? (
        <Slider {...sliderSettings}>
          {todasLasImagenes.map((img, i) => (
            <div key={i} className="imagen-carta-preview">
              <img
                src={img.src}
                alt={`Imagen ${i}`}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
              <button onClick={() => handleEliminar(img)} className="btn-eliminar-imagen">
                Eliminar
              </button>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No hay imágenes aún</p>
      )}
    </div>
  );
};

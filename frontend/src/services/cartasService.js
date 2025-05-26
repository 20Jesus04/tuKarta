import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-production-94753.up.railway.app",
});

// Obtencion de todas las cartas
export const getCartas = () => API.get("/carta");

export const getCartaPorRestaurante = (id_restaurante) => {
  return API.get(`/carta/restaurante/${id_restaurante}`);
};

export const buscarCartas = (termino, orden) => {
  const params = new URLSearchParams();

  if (termino) params.append("q", termino);
  if (orden) params.append("orden", orden);

  return API.get(`/carta/buscar?${params.toString()}`);
};

export const getCartaPorId = (id) => {
  return API.get(`/carta/${id}/completa`);
};

// Crear carta + categorías + platos
export const crearCartaCompleta = async (
  nombre,
  id_restaurante,
  categorias
) => {
  // 1. Crear la carta
  const { data: cartaCreada } = await API.post("/carta", {
    nombre,
    id_restaurante,
  });

  const idCarta = cartaCreada.id;

  // 2. Crear categorías y platos
  for (const categoria of categorias) {
    const { data: categoriaCreada } = await API.post("/categoria", {
      nombre: categoria.nombre,
      id_carta: idCarta,
    });

    const idCategoria = categoriaCreada.id;

    for (const plato of categoria.platos) {
      await API.post("/plato", {
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precio: plato.precio,
        id_categoria: idCategoria,
      });
    }
  }

  return cartaCreada;
};

export const actualizarCartaCompleta = (idCarta, datos) => {
  return API.put(`/carta/${idCarta}/completa`, datos);
};

export const eliminarCarta = (id) => {
  return API.delete(`/carta/${id}`);
};

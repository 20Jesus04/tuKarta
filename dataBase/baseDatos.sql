-- TIPO ENUM PARA ROL DE USUARIO
CREATE TYPE ROL_USUARIO AS ENUM ('USUARIO', 'DUENO', 'ADMIN');

-- TABLA USUARIOS
CREATE TABLE USUARIOS (
  ID SERIAL PRIMARY KEY,
  NOMBRE VARCHAR(100) NOT NULL,
  EMAIL VARCHAR(100) UNIQUE NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL,
  ROL ROL_USUARIO NOT NULL
);

-- TABLA RESTAURANTES
CREATE TABLE RESTAURANTES (
  ID SERIAL PRIMARY KEY,
  NOMBRE VARCHAR(100) NOT NULL,
  DIRECCION VARCHAR(255),
  TELEFONO VARCHAR(15),
  IMAGEN_URL VARCHAR(255),
  ID_DUENO INT NOT NULL,
  FOREIGN KEY (ID_DUENO) REFERENCES USUARIOS(ID) ON DELETE CASCADE
);

-- TABLA CARTAS
CREATE TABLE CARTAS (
  ID SERIAL PRIMARY KEY,
  NOMBRE VARCHAR(100) NOT NULL,
  FECHA_CREACION DATE DEFAULT CURRENT_DATE,
  IMAGEN_URL VARCHAR(255),
  ID_RESTAURANTE INT NOT NULL,
  FOREIGN KEY (ID_RESTAURANTE) REFERENCES RESTAURANTES(ID) ON DELETE CASCADE
);

-- TABLA PLATOS
CREATE TABLE PLATOS (
  ID SERIAL PRIMARY KEY,
  NOMBRE VARCHAR(100) NOT NULL,
  DESCRIPCION TEXT,
  PRECIO DECIMAL(6,2) NOT NULL,
  CATEGORIA VARCHAR(50),
  ID_CARTA INT NOT NULL,
  FOREIGN KEY (ID_CARTA) REFERENCES CARTAS(ID) ON DELETE CASCADE
);

-- TABLA VALORACIONES
CREATE TABLE VALORACIONES (
  ID SERIAL PRIMARY KEY,
  PUNTUACION INT NOT NULL CHECK (PUNTUACION BETWEEN 1 AND 5),
  COMENTARIO TEXT,
  FECHA DATE DEFAULT CURRENT_DATE,
  ID_USUARIO INT NOT NULL,
  ID_RESTAURANTE INT NOT NULL,
  FOREIGN KEY (ID_USUARIO) REFERENCES USUARIOS(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_RESTAURANTE) REFERENCES RESTAURANTES(ID) ON DELETE CASCADE
);

CREATE TABLE FAVORITOS (
  ID SERIAL PRIMARY KEY,
  ID_USUARIO INT NOT NULL,
  ID_RESTAURANTE INT,
  ID_CARTA INT,
  ID_PLATO INT,
  FECHA_AGREGADO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_USUARIO) REFERENCES USUARIOS(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_RESTAURANTE) REFERENCES RESTAURANTES(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_CARTA) REFERENCES CARTAS(ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_PLATO) REFERENCES PLATOS(ID) ON DELETE CASCADE,
  CHECK (
    (ID_RESTAURANTE IS NOT NULL)::INT +
    (ID_CARTA IS NOT NULL)::INT +
    (ID_PLATO IS NOT NULL)::INT = 1
  )
);


CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_carta INT NOT NULL REFERENCES cartas(id) ON DELETE CASCADE
);

ALTER TABLE platos DROP COLUMN categoria;

ALTER TABLE platos ADD COLUMN id_categoria INT REFERENCES categorias(id) ON DELETE CASCADE;

CREATE TABLE imagenes_carta (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  id_carta INT NOT NULL REFERENCES cartas(id) ON DELETE CASCADE
);

ALTER TABLE cartas DROP COLUMN imagen_url;

-- Si ya existe y lo quieres eliminar:
ALTER TABLE platos DROP COLUMN id_carta;


INSERT INTO "public".usuarios (nombre,email,"password",rol)
VALUES ('USUARIOPRUEBA', 'ejemplo@gmail.com', '1234','DUENO');

INSERT INTO "public".restaurantes (nombre,imagen_url,id_dueno)
VALUES ('RestaurantePrueba', 'https://ejemplo.com/img/carta-tapas.jpg', 1);

INSERT INTO "public".cartas (nombre,imagen_url,id_restaurante)
VALUES ('Carta de prueba', 'https://ejemplo.com/img/carta-tapas.jpg', 1);


-- Insertar 10 usuarios adicionales (del 2 al 11), todos con rol 'dueno'
INSERT INTO public.usuarios (nombre, email, "password", rol) VALUES
('Ana Torres', 'ana@example.com', 'pass123', 'DUENO'),
('Pedro López', 'pedro@example.com', 'pass123', 'DUENO'),
('Lucía Morales', 'lucia@example.com', 'pass123', 'DUENO'),
('Sergio Díaz', 'sergio@example.com', 'pass123', 'DUENO'),
('Isabel Romero', 'isabel@example.com', 'pass123', 'DUENO'),
('Carlos Martín', 'carlos@example.com', 'pass123', 'DUENO'),
('Elena Gómez', 'elena@example.com', 'pass123', 'DUENO'),
('Miguel Sánchez', 'miguel@example.com', 'pass123', 'DUENO'),
('Sara Ruiz', 'sara@example.com', 'pass123', 'DUENO'),
('Luis Navarro', 'luis@example.com', 'pass123', 'DUENO');

-- Insertar 10 restaurantes (del 2 al 11), cada uno asociado a los usuarios 2-11
INSERT INTO public.restaurantes (nombre, direccion, telefono, imagen_url, id_dueno) VALUES
('Restaurante Ana', 'Calle Luna 1', '600111111', 'https://via.placeholder.com/100', 2),
('Delicias de Pedro', 'Avenida Sol 22', '600222222', 'https://via.placeholder.com/100', 3),
('Casa Lucía', 'Plaza Mayor 5', '600333333', 'https://via.placeholder.com/100', 4),
('Fogón de Sergio', 'Calle del Río 8', '600444444', 'https://via.placeholder.com/100', 5),
('La Cueva de Isabel', 'Paseo del Bosque 10', '600555555', 'https://via.placeholder.com/100', 6),
('Sabores de Carlos', 'Calle Olivo 12', '600666666', 'https://via.placeholder.com/100', 7),
('El Rincón de Elena', 'Calle Romero 14', '600777777', 'https://via.placeholder.com/100', 8),
('Parrilla Miguel', 'Avenida Naranja 9', '600888888', 'https://via.placeholder.com/100', 9),
('Bistro Sara', 'Calle Trébol 3', '600999999', 'https://via.placeholder.com/100', 10),
('Mesón Luis', 'Camino Real 20', '601000000', 'https://via.placeholder.com/100', 11);

-- Insertar 10 cartas (del 2 al 11), cada una para los restaurantes 2-11
INSERT INTO public.cartas (nombre, fecha_creacion, imagen_url, id_restaurante) VALUES
('Carta Ana', '2025-01-01', 'https://via.placeholder.com/150', 2),
('Carta Pedro', '2025-01-02', 'https://via.placeholder.com/150', 3),
('Carta Lucía', '2025-01-03', 'https://via.placeholder.com/150', 4),
('Carta Sergio', '2025-01-04', 'https://via.placeholder.com/150', 5),
('Carta Isabel', '2025-01-05', 'https://via.placeholder.com/150', 6),
('Carta Carlos', '2025-01-06', 'https://via.placeholder.com/150', 7),
('Carta Elena', '2025-01-07', 'https://via.placeholder.com/150', 8),
('Carta Miguel', '2025-01-08', 'https://via.placeholder.com/150', 9),
('Carta Sara', '2025-01-09', 'https://via.placeholder.com/150', 10),
('Carta Luis', '2025-01-10', 'https://via.placeholder.com/150', 11);




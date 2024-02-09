CREATE TABLE estudiante (
  codigo VARCHAR(255) PRIMARY KEY,
  nombre VARCHAR(255),
  apellido_pat VARCHAR(255),
  apellido_mat VARCHAR(255),
  telefono VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  contra VARCHAR(255),
  is_delegado BOOLEAN
);

CREATE TABLE curso (
  id_curso SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  dni_profesor VARCHAR(255) REFERENCES profesor(dni)
);

CREATE TABLE profesor (
  dni VARCHAR(255) PRIMARY KEY,
  nombre VARCHAR(255),
  apellido_pat VARCHAR(255),
  apellido_mat VARCHAR(255),
  telefono VARCHAR(255),
  email VARCHAR(255),
  contra VARCHAR(255)
);

CREATE TABLE estudiante_curso (
  id_est_curso int PRIMARY KEY,
  estudiante_codigo VARCHAR(255) REFERENCES estudiante(codigo),
  curso_id INT REFERENCES curso(id_curso),
  nota_ec int,
  nota_ep int,
  nota_ef int,
  promedio int,
  PRIMARY KEY (id_est_curso)
);
CREATE TABLE reclamo (
  id_reclamo SERIAL PRIMARY KEY,
  estudiante_codigo VARCHAR(255) REFERENCES estudiante(codigo),
  descripcion VARCHAR(255),
  isResuelto BOOLEAN,
  respuesta VARCHAR(255),
  dni_profesor VARCHAR(255) REFERENCES profesor(dni)
);
INSERT INTO estudiante (codigo, nombre, apellido_pat, apellido_mat, telefono, email, is_delegado)
VALUES
('21200264', 'WILFREDO', 'GUIA', 'MUÑOZ', '941246135', 'wilfredo.guia@unmsm.edu.pe', false),
('18200114', 'KELER', 'MODESTO', 'CALIXTO', '989893902', 'keler.modesto@unmsm.edu.pe', true)
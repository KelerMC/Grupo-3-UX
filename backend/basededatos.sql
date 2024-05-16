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


CREATE TABLE profesor (
  dni VARCHAR(255) PRIMARY KEY,
  nombre VARCHAR(255),
  apellido_pat VARCHAR(255),
  apellido_mat VARCHAR(255),
  telefono VARCHAR(255),
  email VARCHAR(255),
  contra VARCHAR(255)
);
CREATE TABLE curso (
  id_curso SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  dni_profesor VARCHAR(255) REFERENCES profesor(dni)
);

CREATE TABLE estudiante_curso (
  id_est_curso SERIAL PRIMARY KEY,
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
  is_resuelto BOOLEAN,
  respuesta VARCHAR(255),
  dni_profesor VARCHAR(255) REFERENCES profesor(dni),
  fecha_ejecucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_respuesta TIMESTAMP,
  archivado BOOLEAN DEFAULT FALSE
);


INSERT INTO estudiante_curso (estudiante_codigo, curso_id)
VALUES 
('13200051', 1),
('15200213', 1),
('15200226', 1),
('16200056', 1),
('16200237', 1),
('16200250', 1),
('17200301', 1),
('18200037', 1),
('18200114', 1),
('19200273', 1),
('20200108', 1),
('20200169', 1),
('20200289', 1),
('21200025', 1),
('21200030', 1),
('21200044', 1),
('21200107', 1),
('21200121', 1),
('21200203', 1),
('21200220', 1),
('21200223', 1),
('21200234', 1),
('21200254', 1),
('21200255', 1),
('21200264', 1),
('21200281', 1),
('21200300', 1),
('22200078', 1);

-- Insert para la tabla profesor
INSERT INTO profesor (dni, nombre, apellido_pat, apellido_mat, telefono, email, contra)
VALUES ('06147737', 'HUGO FROILAN', 'VEGA', 'HUERTA', '951841321', 'hvegah@unmsm.edu.pe', '06147737');

-- Insert para la tabla curso
INSERT INTO curso (nombre, descripcion, dni_profesor)
VALUES ('UX', 'Experiencia de usuario', '06147737');
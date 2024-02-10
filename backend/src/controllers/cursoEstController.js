//cursoEstController.js

const db = require('../config/db');

module.exports.cursoEstController = {
  getNotasPorEstudianteYCurso: (req, res) => {
    try {const { estudiante_codigo, curso_id } = req.params;
      db.query(
        'SELECT nota_ec, nota_ep, nota_ef, promedio FROM estudiante_curso WHERE estudiante_codigo = $1 AND curso_id = $2',
        [estudiante_codigo, curso_id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la consulta' });
            return;
          }
          if (result.rows.length > 0) {
            const notas = result.rows[0];
            res.json(notas);
          } else {
            res.json({ error: 'No se encontraron notas para el estudiante y curso especificados' });
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el controlador' });
    }
  },
  calificarEstudiante: (req, res) => {
    try {
      const { estudiante_codigo, curso_id } = req.params;
      const { nota_ec, nota_ep, nota_ef } = req.body;
  
      // Calcular el promedio utilizando las ponderaciones (30% EP, 30% EF, 40% EC)
      const promedio = module.exports.cursoEstController.calcularPromedio(nota_ep, nota_ef, nota_ec);
  
      // Insertar las notas del estudiante para el curso especificado
       db.query(
        'INSERT INTO estudiante_curso (estudiante_codigo, curso_id, nota_ec, nota_ep, nota_ef, promedio) VALUES ($1, $2, $3, $4, $5, $6)',
        [estudiante_codigo, curso_id, nota_ec, nota_ep, nota_ef, promedio]
      );
  
      res.json({ message: 'Estudiante calificado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al calificar al estudiante' });
    }
  },

  editarNotasEstudiante: (req, res) => {
    try {
      const { estudiante_codigo, curso_id } = req.params;
      const { nota_ec, nota_ep, nota_ef } = req.body;
  
      // Calcular el nuevo promedio utilizando las ponderaciones (30% EP, 30% EF, 40% EC)
      const promedio = module.exports.cursoEstController.calcularPromedio(nota_ep, nota_ef, nota_ec);
  
      // Actualizar las notas del estudiante para el curso especificado
      db.query(
        'UPDATE estudiante_curso SET nota_ec = $1, nota_ep = $2, nota_ef = $3, promedio = $4 WHERE estudiante_codigo = $5 AND curso_id = $6',
        [nota_ec, nota_ep, nota_ef, promedio, estudiante_codigo, curso_id]
      );
  
      res.json({ message: 'Notas del estudiante actualizadas exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al editar las notas del estudiante' });
    }
  },
    // Función para calcular el promedio con ponderaciones
  calcularPromedio: (nota_ep, nota_ef, nota_ec) => {
    const promedio = (nota_ep * 0.3) + (nota_ef * 0.3) + (nota_ec * 0.4);
    return Math.round(promedio);
  } 
};

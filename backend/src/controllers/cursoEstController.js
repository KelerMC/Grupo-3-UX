const db = require('../config/config');

module.exports.cursoEstController = {
  getNotasPorEstudianteYCurso: async (req, res) => {
    try {
      const { estudiante_codigo, curso_id } = req.params;

      const result = await db.pool.query(
        'SELECT nota_ec, nota_ep, nota_ef, promedio FROM estudiante_curso WHERE estudiante_codigo = $1 AND curso_id = $2',
        [estudiante_codigo, curso_id]
      );

      if (result.rows.length > 0) {
        const notas = result.rows[0];
        res.json(notas);
      } else {
        res.json({ error: 'No se encontraron notas para el estudiante y curso especificados' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el controlador' });
    }
  },
};

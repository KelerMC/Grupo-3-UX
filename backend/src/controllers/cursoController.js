const db = require('../config/db');

module.exports.cursoController = {
  getAllCursos: (req, res) => {
    db.query('SELECT * FROM curso', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
      }

      res.json(result.rows);
    });
  },
};

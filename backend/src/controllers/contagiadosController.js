const db = require('../config/db');
module.exports.contagiadosController = {
  getAllContagiados: (req, res) => {
    db.query('SELECT * FROM Contagiados', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows);
      }
    });
  },

  updateCantidadContagiado: (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;
    db.query(
      'UPDATE Contagiados SET cantidad = $1 WHERE id = $2',
      [cantidad, id],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json({ msg: 'Cantidad de contagiados actualizada correctamente' });
        }
      }
    );
  },

  getContagiadosByDepartamento: (req, res) => {
    const { departamento } = req.params;
    db.query(
      'SELECT COUNT(*) AS total_contagiados FROM Contagiados WHERE departamento = $1',
      [departamento],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json(result.rows[0]);
        }
      }
    );
  },

  getContagiadosByDepartamentoAndAnio: (req, res) => {
    const { departamento, anio } = req.params;
    db.query(
      'SELECT COUNT(*) AS total_contagiados FROM Contagiados WHERE departamento = $1 AND anio = $2',
      [departamento, anio],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json(result.rows[0]);
        }
      }
    );
  },
  updateCantidadContagiadosByDepartamento: (req, res) => {
    const { departamento } = req.params;
    const { cantidad } = req.body;
    db.query(
      'UPDATE Contagiados SET cantidad = $1 WHERE departamento = $2',
      [cantidad, departamento],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json({ msg: 'Número de contagiados actualizado correctamente para el departamento: ' + departamento });
        }
      }
    );
  }
};

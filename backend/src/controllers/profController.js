const db = require('../config/db');

module.exports.profController = {
  login: (req, res) => {
    const { email, contra } = req.body;
    db.query('SELECT * FROM profesor WHERE email = $1 AND contra = $2', [email, contra], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
      }

      if (result.rows.length > 0) {
        res.json({ success: true, msg: 'Inicio de sesión exitoso' });
      } else {
        res.json({ success: false, msg: 'Credenciales incorrectas' });
      }
    });
  },
  getProfesor: (req, res) => {
    const { email } = req.params;
    db.query('SELECT * FROM profesor WHERE email = $1', [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
      }

      if (result.rows.length > 0) {
        const user = result.rows[0];
        delete user.contra;
        res.json(user);
      } else {
        res.json({ error: 'Profesor no encontrado' });
      }
    });
  },
  
  getAllProfesores: (req, res) => {
    db.query('SELECT * FROM profesor', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
      }

      res.json(result.rows);
    });
  },
};

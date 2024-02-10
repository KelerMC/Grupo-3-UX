const db = require('../config/db'); // adjust the path accordingly

module.exports.estController = {
  getEstudiante: (req, res) => {
    const { email } = req.params;
    db.query('SELECT * FROM estudiante WHERE email = $1', [email], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows[0]);
      }
    });
  },
  getAll: (req, res) => {
    db.query('SELECT * FROM estudiante', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows);
      }
    });
  },

  createEstudiante: (req, res) => {
    const {
      codigo,
      nombre,
      apellido_pat,
      apellido_mat,
      telefono,
      email,
      contra,
      isDelegado,
    } = req.body;

    db.query(
      'INSERT INTO estudiante (codigo, nombre, apellido_pat, apellido_mat, telefono, email, contra, is_delegado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [codigo, nombre, apellido_pat, apellido_mat, telefono, email, contra, isDelegado],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json({ msg: 'Estudiante registrado correctamente' });
        }
      }
    );
  },

  updateEstudiante: (req, res) => {
    const { email } = req.params;
    const {
      codigo,
      nombre,
      apellido_pat,
      apellido_mat,
      telefono,
      nuevoEmail,
      contra,
      isDelegado,
    } = req.body;

    db.query(
      'UPDATE estudiante SET codigo = $1, nombre = $2, apellido_pat = $3, apellido_mat = $4, telefono = $5, email = $6, contra = $7, is_delegado = $8 WHERE email = $9',
      [codigo, nombre, apellido_pat, apellido_mat, telefono, nuevoEmail, contra, isDelegado, email],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json({ msg: 'Datos modificados correctamente' });
        }
      }
    );
  },

  updateTelefono: (req, res) => {
    const { email } = req.params;
    const { nuevoTelefono } = req.body;

    db.query(
      'UPDATE estudiante SET telefono = $1 WHERE email = $2',
      [nuevoTelefono, email],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          res.json({ msg: 'Teléfono modificado correctamente' });
        }
      }
    );
  },

  deleteEstudiante: (req, res) => {
    const { email } = req.params;
    db.query('DELETE FROM estudiante WHERE email = $1', [email], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json({ msg: 'Estudiante eliminado correctamente' });
      }
    });
  },

  login: (req, res) => {
    const { email, contra } = req.body;
    db.query(
      'SELECT * FROM estudiante WHERE email = $1 AND contra = $2',
      [email, contra],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          if (result.rows.length > 0) {
            res.json({ success: true, msg: 'Inicio de sesión exitoso' });
          } else {
            res.json({ success: false, msg: 'Credenciales incorrectas' });
          }
        }
      }
    );
  },
  
  getEstudianteByCodigo: (req, res) => {
    const { codigo } = req.params;
    db.query('SELECT * FROM estudiante WHERE codigo = $1', [codigo], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows[0]);
      }
    });
  },
};
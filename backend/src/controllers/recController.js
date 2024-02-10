const db = require('../config/db');

module.exports.recController = {
  getAll: (req, res) => {
    db.query('SELECT * FROM reclamo', (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows);
      }
    });
  },

  getSinResolver: (req, res) => {
    db.query('SELECT * FROM reclamo WHERE is_resuelto = false', (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows);
      }
    });
  },

  getUnReclamo: (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM reclamo WHERE id_reclamo = $1', [id], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        if (result.rows.length > 0) {
          const reclamo = result.rows[0];
          res.json(reclamo);
        } else {
          res.json({ error: 'Reclamo no encontrado' });
        }
      }
    });
  },

  getReclamos: (req, res) => {
    const { estudiante_codigo } = req.params;    
    db.query('SELECT * FROM reclamo WHERE estudiante_codigo = $1', [estudiante_codigo], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el controlador' });
      } else {
        res.json(result.rows);
      }
    });
  },

  createReclamo: (req, res) => {
    const { estudiante_codigo, descripcion, dni_profesor } = req.body;
    const fecha_ejecucion = new Date(); // Obtener la fecha actual    
    db.query(
      'INSERT INTO reclamo (estudiante_codigo, descripcion, is_resuelto, dni_profesor, fecha_ejecucion) VALUES ($1, $2, false, $3, $4) RETURNING *',
      [estudiante_codigo, descripcion, dni_profesor, fecha_ejecucion],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          const reclamoCreado = result.rows[0];
          res.json({ msg: 'Reclamo creado correctamente', reclamo: reclamoCreado });
        }
      }
    );
  }, 

  resolverReclamo: (req, res) => {
    const { id } = req.params;
    const { respuesta } = req.body;
    const fecha_respuesta = new Date(); // Obtener la fecha actual
    
    db.query(
      'UPDATE reclamo SET respuesta = $1, is_resuelto = true, fecha_respuesta = $2 WHERE id_reclamo = $3 RETURNING *',
      [respuesta, fecha_respuesta, id],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          const reclamoResuelto = result.rows[0];
          res.json({ msg: 'Reclamo resuelto', reclamo: reclamoResuelto });
        }
      }
    );
  },
  
  actualizarReclamo: (req, res) => {
    const { id } = req.params;
    const { respuesta } = req.body;
    const fecha_respuesta = new Date(); // Obtener la fecha actual
  
    db.query(
      'UPDATE reclamo SET respuesta = $1, fecha_respuesta = $2 WHERE id_reclamo = $3 RETURNING *',
      [respuesta, fecha_respuesta, id],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          const reclamoActualizado = result.rows[0];
          res.json({ msg: 'Reclamo actualizado correctamente', reclamo: reclamoActualizado });
        }
      }
    );
  },
  archivarReclamo: (req, res) => {
    const { id } = req.params;
    db.query(
      'UPDATE reclamo SET archivado = true WHERE id_reclamo = $1 RETURNING *',
      [id],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error en el controlador' });
        } else {
          const reclamoArchivado = result.rows[0];
          res.json({ msg: 'Reclamo archivado correctamente', reclamo: reclamoArchivado });
        }
      }
    );
  },
};

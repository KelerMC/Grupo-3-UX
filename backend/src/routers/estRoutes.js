let EstModel = require("../models/estudiante");
const express = require("express");

const router = express.Router();

// Ver datos de los estudiantes
router.get("/", (req, res) => {
  EstModel.find()
    .select({ _id: 0, __v: 0, password: 0, isDelegado: 0 })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

// Registrar estudiante
router.post("/", (req, res) => {
  const {
    dni,
    nombre,
    apellido_pat,
    apellido_mat,
    telefono,
    email,
    password,
    isDelegado,
  } = req.body;
  const newEstudiante = new EstModel({
    dni: dni,
    nombre: nombre,
    apellido_pat: apellido_pat,
    apellido_mat: apellido_mat,
    telefono: telefono,
    email: email,
    password: password,
    isDelegado: isDelegado,
  });
  newEstudiante
    .save()
    .then((doc) => {
      res.json({ msg: "Estudiante registrado correctamente" });
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

// Modificar datos de los estudiantes
router.put("/:dni", (req, res) => {
  const { dni } = req.params;
  const { nuevoDni, nombre, apellido_pat, apellido_mat, telefono, isDelegado } =
    req.body;
  EstModel.updateOne(
    { dni: dni },
    {
      $set: {
        dni: nuevoDni,
        nombre: nombre,
        apellido_pat: apellido_pat,
        apellido_mat: apellido_mat,
        telefono: telefono,
        isDelegado: isDelegado,
      },
    }
  )
    .then(() => {
      res.json({ msg: "Datos modificados correctamente" });
    })
    .catch(() => {
      res.json({ error: "Database connection error" });
    });
});

// Modificar telefono
router.patch("/modTelefono", (req, res) => {
  const { telefono, nuevoTelefono } = req.body;
  EstModel.updateOne(
    { telefono: telefono },
    { $set: { telefono: nuevoTelefono } }
  )
    .then((result) => {
      res.json({ msg: "Telefono modificado correctamente" });
    })
    .catch((err) => {
      res.json({ msg: "Database connection error" });
    });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  EstModel.findOne({ email: email, password: password })
    .then((usuarioEncontrado) => {
      if (usuarioEncontrado) {
        res.json({ succes: true, msg: "Inicio de sesion exitoso" });
      } else {
        res.json({ succes: false, msg: "Credenciales incorrectas" });
      }
    })
    .catch((error) => {
      res.json({ msg: "Database connection error" });
    });
});

module.exports = router;

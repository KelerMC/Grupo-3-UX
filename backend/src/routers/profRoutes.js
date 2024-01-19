let ProfModel = require("../models/profesor");
const express = require("express");

const router = express.Router();

// Ver datos de los profesores
router.get("/", (req, res) => {
  ProfModel.find()
    .select({ _id: 0, __v: 0, password: 0 })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

// Registrar profesor
router.post("/", (req, res) => {
  const { dni, nombre, apellido_pat, apellido_mat, telefono, email, password } =
    req.body;
  const newProfesor = new ProfModel({
    dni: dni,
    nombre: nombre,
    apellido_pat: apellido_pat,
    apellido_mat: apellido_mat,
    telefono: telefono,
    email: email,
    password: password,
  });
  newProfesor
    .save()
    .then((doc) => {
      res.json({ msg: "Profesor registrado correctamente" });
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

// Modificar datos de los profesores
router.put("/:dni", (req, res) => {
  const { dni } = req.params;
  const { nuevoDni, nombre, apellido_pat, apellido_mat, telefono } = req.body;
  ProfModel.updateOne(
    { dni: dni },
    {
      $set: {
        dni: nuevoDni,
        nombre: nombre,
        apellido_pat: apellido_pat,
        apellido_mat: apellido_mat,
        telefono: telefono,
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

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  ProfModel.findOne({ email: email, password: password })
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

let EstModel = require("../models/estudiante");
const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const { dni, nombre, apellido_pat, apellido_mat, telefono } = req.body;
  const newEstudiante = new EstModel({
    dni: dni,
    nombre: nombre,
    apellido_pat: apellido_pat,
    apellido_mat: apellido_mat,
    telefono: telefono,
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

router.get("/", (req, res) => {
  EstModel.find()
    .select({ _id: 0, __v: 0 })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

module.exports = router;

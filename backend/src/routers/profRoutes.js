let ProfModel = require("../models/profesor");
const express = require("express");

const router = express.Router();

// Ver datos de un profesor
router.get("/:email", (req, res) => {
  const { email } = req.params;
  ProfModel.findOne({ email: email })
    .select({ _id: 0, __v: 0, password: 0 })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
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

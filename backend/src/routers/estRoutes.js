let EstModel = require("../models/estudiante");
const express = require("express");

const router = express.Router();

// Ver datos de todos los estudiantes
router.get("/", (req, res) => {
  EstModel.find()
    .select({ _id: 0, __v: 0, password: 0 })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

// Ver datos de un estudiante
router.get("/:email", (req, res) => {
  const { email } = req.params;
  EstModel.findOne({ email: email })
    .select({ _id: 0, __v: 0, password: 0 })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ error: "Database connection error" });
    });
});

// Registrar un nuevo estudiante
router.post("/", (req, res) => {
  const {
    codigo,
    nombre,
    apellido_pat,
    apellido_mat,
    telefono,
    email,
    password,
    isDelegado,
  } = req.body;
  const newEstudiante = new EstModel({
    codigo: codigo,
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

// Ingresar notas de un estudiante
router.post("/notas/:email", (req, res) => {
  const { email } = req.params;
  const { nota_ec, nota_ep, nota_ef } = req.body;
  promedio = (nota_ec + nota_ep + nota_ef) / 3;
  promedio = Math.round(promedio);

  EstModel.updateOne(
    { email: email },
    {
      $set: {
        nota_ec: nota_ec,
        nota_ep: nota_ep,
        nota_ef: nota_ef,
        promedio: promedio,
      },
    }
  )
    .then(() => {
      res.json({ msg: "Notas ingresadas correctamente" });
    })
    .catch(() => {
      res.json({ error: "Database connection error" });
    });
});

// Modificar datos de un estudiante
router.put("/:email", (req, res) => {
  const { email } = req.params;
  const { codigo, nombre, apellido_pat, apellido_mat, telefono, isDelegado } =
    req.body;
  EstModel.updateOne(
    { email: email },
    {
      $set: {
        codigo: codigo,
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

// Modificar telefono de un estudiante
router.patch("/modTelefono", (req, res) => {
  const { email, nuevoTelefono } = req.body;
  EstModel.updateOne({ email: email }, { $set: { telefono: nuevoTelefono } })
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

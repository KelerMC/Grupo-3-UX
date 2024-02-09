const express = require("express");
const { cursoEstController } = require("../controllers/cursoEstController");
const router = express.Router();

router.get("/:estudiante_codigo/:curso_id", cursoEstController.getNotasPorEstudianteYCurso);

module.exports = router;

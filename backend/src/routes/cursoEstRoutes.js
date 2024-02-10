//cursoEstRoutes.js
const express = require("express");
const { cursoEstController } = require("../controllers/cursoEstController");
const router = express.Router();

//obtener notas segun estudiante y curso
router.get("/:estudiante_codigo/:curso_id", cursoEstController.getNotasPorEstudianteYCurso);

// Ruta para calificar a un estudiante
router.post("/:estudiante_codigo/:curso_id/calificar", cursoEstController.calificarEstudiante);

// Ruta para editar las notas de un estudiante
router.put("/:estudiante_codigo/:curso_id/editar-notas", cursoEstController.editarNotasEstudiante);

module.exports = router;

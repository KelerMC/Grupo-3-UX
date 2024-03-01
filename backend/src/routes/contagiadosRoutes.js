const express = require("express");
const { contagiadosController } = require('../controllers/contagiadosController');
const router = express.Router();

// Endpoint para obtener todos los contagiados
router.get('/contagiados', contagiadosController.getAllContagiados);

// Endpoint para actualizar la cantidad de contagiados por ID
router.put('/contagiados/:id', contagiadosController.updateCantidadContagiado);

// Endpoint para obtener el número de contagiados por departamento
router.get('/contagiados/departamento/:departamento', contagiadosController.getContagiadosByDepartamento);

// Endpoint para obtener el número de contagiados por departamento y fecha
router.get('/contagiados/departamento/:departamento/anio/:anio', contagiadosController.getContagiadosByDepartamentoAndAnio);

router.put('/contagiados/:departamento', contagiadosController.updateCantidadContagiadosByDepartamento);

module.exports = router;

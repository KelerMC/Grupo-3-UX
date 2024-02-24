const express = require('express');
const router = express.Router();
const {estController} = require ('../controllers/estController')


router.get('/', estController.getAll);
router.get('/getFive', estController.getFive);
router.get("/:email", estController.getEstudiante);
router.post("/", estController.createEstudiante);
router.put("/:email", estController.updateEstudiante);
router.patch("/modTelefono", estController.updateTelefono);
router.delete("/:email", estController.deleteEstudiante);
router.post("/login", estController.login);
router.get('/codigo/:codigo', estController.getEstudianteByCodigo); // Nueva ruta

module.exports = router;
const express = require("express");
const { recController } = require("../controllers/recController");
const router = express.Router();

router.get("/", recController.getAll);
router.get("/sinResolver", recController.getSinResolver);
router.get("/:id", recController.getUnReclamo);
router.get("/codigo/:estudiante_codigo", recController.getReclamos);
router.post("/", recController.createReclamo);
router.patch("/resolver/:id", recController.resolverReclamo);
router.put("/actualizar/:id",recController.actualizarReclamo);
module.exports = router;

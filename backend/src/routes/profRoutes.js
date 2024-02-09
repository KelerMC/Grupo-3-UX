const express = require("express");
const { profController } = require("../controllers/profController");
const router = express.Router();

router.get("/", profController.getAllProfesores);
router.get("/:email", profController.getProfesor);
router.post("/login", profController.login);

module.exports = router;

const express = require("express");
const { profController } = require("../controllers/profController");

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Profesores
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Profesor:
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *         nombre:
 *           type: string
 *         apellido_pat:
 *           type: string
 *         apellido_mat:
 *           type: string
 *         telefono:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *           writeOnly: true
 */

/**
 * @openapi
 * /profesores/{email}:
 *   get:
 *     summary: Obtener información de un profesor
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del profesor.
 *         schema:
 *           type: string
 *     tags:
 *       - Profesores
 *     responses:
 *       200:
 *         description: Información del profesor obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profesor'
 */
router.get("/:email", profController.getProfesor);

/**
 * @openapi
 * /profesores/login:
 *   post:
 *     summary: Iniciar sesión como profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     tags:
 *       - Profesores
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succes:
 *                   type: boolean
 */
router.post("/login", profController.login);

module.exports = router;

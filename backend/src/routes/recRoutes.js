const express = require("express");
const { recController } = require("../controllers/recController");

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Reclamos
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Reclamo:
 *       type: object
 *       properties:
 *         email_asociado:
 *           type: string
 *         descripcion:
 *           type: string
 *         respuesta:
 *           type: string
 *         isResuelto:
 *           type: boolean
 */

/**
 * @openapi
 * /reclamos:
 *   get:
 *     summary: Obtener la lista de todos los reclamos
 *     tags:
 *       - Reclamos
 *     responses:
 *       200:
 *         description: Lista de reclamos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reclamo'
 */

router.get("/", recController.getAll);

/**
 * @openapi
 * /reclamos/sinResolver:
 *   get:
 *     summary: Obtener la lista de los reclamos sin resolver
 *     tags:
 *       - Reclamos
 *     responses:
 *       200:
 *         description: Lista de reclamos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reclamo'
 */
router.get("/sinResolver", recController.getSinResolver);

/**
 * @openapi
 * /reclamos/{id}:
 *   get:
 *     summary: Obtener información de un reclamo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del reclamo.
 *         schema:
 *           type: string
 *     tags:
 *       - Reclamos
 *     responses:
 *       200:
 *         description: Información del reclamo obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reclamo'
 */
router.get("/:id", recController.getReclamo);

/**
 * @openapi
 * /reclamos/email/{email}:
 *   get:
 *     summary: Obtener los reclamos asociados a un email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: email del estudiante
 *         schema:
 *           type: string
 *     tags:
 *       - Reclamos
 *     responses:
 *       200:
 *         description: Reclamos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reclamo'
 */
router.get("/email/:email", recController.getReclamos);

/**
 * @openapi
 * /reclamos:
 *   post:
 *     summary: Registrar un nuevo reclamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_asociado:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     tags:
 *       - Reclamos
 *     responses:
 *       201:
 *         description: Reclamo registrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Reclamo registrado correctamente
 */
router.post("/", recController.createReclamo);

/**
 * @openapi
 * /reclamos/resolver/{id}:
 *   patch:
 *     summary: Resolver un reclamo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del reclamo.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respuesta:
 *                 type: string
 *     tags:
 *       - Reclamos
 *     responses:
 *       200:
 *         description: Reclamo resuelto correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Reclamo resuelto correctamente
 */
router.patch("/resolver/:id", recController.resolverReclamo);

module.exports = router;

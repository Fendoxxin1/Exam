const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const professionController = require("../controller/profession.controller");
const { route } = require("./resources.routes");

/**
 * @swagger
 * /professions:
 *   get:
 *     summary: Get all professions
 *     tags: [Professions]
 *     responses:
 *       200:
 *         description: Professions list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profession'
 */
router.get("/professions", professionController.getProfessions);

/**
 * @swagger
 * /professions:
 *   post:
 *     summary: Create a new profession
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Profession created successfully
 */
router.post(
  "/professions",
  authenticate,
  authorize(["admin"]),
  professionController.createProfession
);

/**
 * @swagger
 * /professions/{id}:
 *   put:
 *     summary: Update a profession by ID
 *     tags: [Professions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profession ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Profession updated successfully
 */
router.put(
  "/professions/:id",
  authenticate,
  authorize(["admin", "super-admin"]),
  professionController.updateProfession
);

/**
 * @swagger
 * /professions/{id}:
 *   delete:
 *     summary: Delete a profession by ID
 *     tags: [Professions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profession ID
 *     responses:
 *       204:
 *         description: Profession deleted successfully
 */
router.delete(
  "/professions/:id",
  authenticate,
  authorize(["admin"]),
  professionController.deleteProfession
);

module.exports = router;

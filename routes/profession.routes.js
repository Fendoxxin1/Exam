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
 *     summary: Get a list of professions
 *     tags: [Professions]
 *     description: Retrieve a list of professions with optional filtering, pagination, and sorting.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Column to sort by.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sorting order (ascending or descending).
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter professions by name (case-insensitive, partial match).
 *     responses:
 *       200:
 *         description: A list of professions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Software Engineer"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Profession not found.
 *       500:
 *         description: Internal server error.
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
 *               image:
 *                 type: string
 *                 nullable: false
 *     responses:
 *       201:
 *         description: Profession created successfully
 */
router.post(
  "/professions",
  // authenticate,
  // authorize(["admin"]),
  professionController.createProfession
);
/**
 * @swagger
 * /professions/{id}:
 *   get:
 *     summary: Get a profession by ID
 *     tags: [Professions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profession ID
 *     responses:
 *       200:
 *         description: A profession
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profession'
 */
router.get("/professions/:id", professionController.getProfessionById);

/**
 * @swagger
 * /professions/{id}:
 *   patch:
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
 *               image:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Profession updated successfully
 */
router.patch(
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

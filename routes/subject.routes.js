const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const subjectController = require("../controller/subject.controller");

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Search subjects
 *     tags: [Subjects]
 *     description: Retrieve a list of subjects with optional filtering, pagination, and sorting.
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
 *         description: Filter subjects by name (case-insensitive, partial match).
 *     responses:
 *       200:
 *         description: A list of subjects.
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
 *                     example: "Mathematics"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Subject not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/subjects", subjectController.getSubjects);

/**
 * @swagger
 * /subject/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found
 */
router.get("/subject/:id", subjectController.getSubjectById);

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
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
 *       201:
 *         description: Subject created successfully
 */
router.post(
  "/subjects",
  // authenticate,
  // authorize(["admin"]),
  subjectController.createSubject
);

/**
 * @swagger
 * /subjects/{id}:
 *   patch:
 *     summary: Update a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
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
 *         description: Subject updated successfully
 */
router.patch(
  "/subjects/:id",
  authenticate,
  authorize(["admin", "super-admin"]),
  subjectController.updateSubject
);

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 */
router.delete(
  "/subjects/:id",
  authenticate,
  authorize(["admin"]),
  subjectController.deleteSubject
);

module.exports = router;

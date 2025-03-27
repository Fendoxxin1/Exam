const router = require("express").Router();
const controller = require("../controller/learningCenter.controller");

/**
 * @swagger
 * tags:
 *   name: LearningCenters
 *   description: API endpoints for managing learning centers
 */

/**
 * @swagger
 * /api/learningcenters:
 *   get:
 *     summary: Get all educational centers
 *     tags: [LearningCenters]
 *     description: Retrieve a list of educational centers with optional filters.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by learning center name
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         description: Filter by region ID
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: integer
 *         description: Filter by creator
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: A list of educational centers
 */
router.get("/learningcenters", controller.getAllEducationalCenters);

/**
 * @swagger
 * /api/learningcenter:
 *   post:
 *     summary: Create a new educational center
 *     tags: [LearningCenters]
 *     description: Adds a new educational center to the database.
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
 *               region:
 *                 type: integer
 *               address:
 *                 type: string
 *               filialNumber:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Educational center created successfully
 */
router.post("/learningcenter", controller.createEducationalCenter);

/**
 * @swagger
 * /api/learningcenter/{id}:
 *   get:
 *     summary: Get a single educational center by ID
 *     tags: [LearningCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The educational center ID
 *     responses:
 *       200:
 *         description: Educational center details
 */
router.get("/learningcenter/:id", controller.getEducationalCenterById);

/**
 * @swagger
 * /api/learningcenter/{id}:
 *   patch:
 *     summary: Update an educational center
 *     tags: [LearningCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The educational center ID
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
 *               region:
 *                 type: integer
 *               address:
 *                 type: string
 *               filialNumber:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Educational center updated successfully
 */
router.patch("/learningcenter/:id", controller.updateEducationalCenter);

/**
 * @swagger
 * /api/learningcenter/{id}:
 *   delete:
 *     summary: Delete an educational center
 *     tags: [LearningCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The educational center ID
 *     responses:
 *       200:
 *         description: Educational center deleted successfully
 */
router.delete("/learningcenter/:id", controller.deleteEducationalCenter);

module.exports = router;

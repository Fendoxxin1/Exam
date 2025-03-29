const router = require("express").Router();
const authenticate=require("../middleware/auth")
const {authorize} = require("../middleware/role")
const controller = require("../controller/educationalCenter.controller");

/**
 * @swagger
 * tags:
 *   name: EduCenters
 *   description: API endpoints for managing educational centers
 */

/**
 * @swagger
 * /educationalcenter:
 *   get:
 *     summary: Get all educational centers
 *     tags: [EduCenters]
 *     description: Retrieve a list of educational centers with optional filters.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by educational center name
 *       - in: query
 *         name: region
 *         schema:
 *           type: integer
 *         description: Filter by region 
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
router.get("/educationalcenter", controller.getAllEducationalCenters);

/**
 * @swagger
 * /educationalcenter:
 *   post:
 *     summary: Create a new educational center
 *     tags: [EduCenters]
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
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Educational center created successfully
 */
router.post("/educationalcenter",authenticate,authorize(["admin","ceo",]), controller.createEducationalCenter);

/**
 * @swagger
 * /educationalcenter/{id}:
 *   get:
 *     summary: Get a single educational center by ID
 *     tags: [EduCenters]
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
router.get("/educationalcenter/:id", controller.getEducationalCenterById);

/**
 * @swagger
 * /educationalcenter/{id}:
 *   patch:
 *     summary: Update an educational center
 *     tags: [EduCenters]
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
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Educational center updated successfully
 */
router.patch("/educationalcenter/:id",authenticate,authorize(["admin","ceo","super admin"]), controller.updateEducationalCenter);

/**
 * @swagger
 * /educationalcenter/{id}:
 *   delete:
 *     summary: Delete an educational center
 *     tags: [EduCenters]
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
router.delete("/educationalcenter/:id",authenticate,authorize(["admin","ceo"]), controller.deleteEducationalCenter);

module.exports = router;

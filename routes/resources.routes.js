const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controller/resource.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: API endpoints for managing resources
 */


const resourceValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("media").notEmpty().withMessage("Media is required"),
  body("description").optional(),
  body("createdBy").isInt().withMessage("createdBy must be an integer"),
  body("categoryid").isInt().withMessage("categoryid must be an integer"),
];

const idValidation = [
  param("id").isInt().withMessage("Invalid ID format"),
];

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources with pagination, filtering, and sorting
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of resources per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., "name")
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by resource name
 *       - in: query
 *         name: categoryid
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: integer
 *         description: Filter by creator ID
 *     responses:
 *       200:
 *         description: A list of resources
 */
router.get(
  "/",
  [
    query("page").optional().isInt(),
    query("limit").optional().isInt(),
    query("sortBy").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("name").optional().isString(),
    query("categoryid").optional().isInt(),
    query("createdBy").optional().isInt(),
  ],
  getResources
);

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               media:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               createdBy:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Resource created successfully
 */
router.post("/", resourceValidation, createResource);

/**
 * @swagger
 * /resources/{id}:
 *   patch:
 *     summary: Update a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               media:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               createdBy:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Resource updated successfully
 */
router.patch("/:id", idValidation.concat(resourceValidation), updateResource);

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource ID
 *     responses:
 *       204:
 *         description: Resource deleted successfully
 */
router.delete("/:id", idValidation, deleteResource);

module.exports = router;

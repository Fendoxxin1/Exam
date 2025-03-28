const express = require("express");
const { body, query, param } = require("express-validator");
const { getCategories, getCategoryById, createCategory, deleteCategory } = require("../controller/resourceCategory.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ResourceCategories
 *   description: API endpoints for managing resource categories
 */


const categoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("image").optional(),
];

const idValidation = [
  param("id").isInt().withMessage("Invalid ID format"),
];

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories with pagination, filtering, and sorting
 *     tags: [ResourceCategories]
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
 *         description: Number of categories per page
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
 *         description: Filter by category name
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get(
  "/",
  [
    query("page").optional().isInt(),
    query("limit").optional().isInt(),
    query("sortBy").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("name").optional().isString(),
  ],
  getCategories
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [ResourceCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */
router.get("/:id", idValidation, getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [ResourceCategories]
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
 *         description: Category created successfully
 */
router.post("/", categoryValidation, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [ResourceCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 */
router.delete("/:id", idValidation, deleteCategory);

module.exports = router;

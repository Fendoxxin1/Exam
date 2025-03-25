const express = require("express");
const { body, query, param } = require("express-validator");
const { getRegions, createRegion, updateRegion, deleteRegion } = require("../controller/regions.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: API endpoints for managing regions
 */

// **VALIDATION RULES**
const regionValidation = [
  body("name").notEmpty().withMessage("Name is required"),
];

const idValidation = [
  param("id").isInt().withMessage("Invalid ID format"),
];

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Get all regions with pagination, filtering, and sorting
 *     tags: [Regions]
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
 *         description: Number of regions per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., "name", "createdAt")
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
 *         description: Filter by name
 *     responses:
 *       200:
 *         description: A list of filtered and sorted regions
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
  getRegions
);

/**
 * @swagger
 * /regions:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Region created successfully
 */
router.post("/", regionValidation, createRegion);

/**
 * @swagger
 * /regions/{id}:
 *   patch:
 *     summary: Update a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Region updated successfully
 */
router.patch("/:id", idValidation.concat(regionValidation), updateRegion);

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: Delete a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     responses:
 *       204:
 *         description: Region deleted successfully
 */
router.delete("/:id", idValidation, deleteRegion);

module.exports = router;

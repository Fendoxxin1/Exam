const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getLcMajors,
  createLcMajor,
  deleteLcMajor,
} = require("../controller/lcmajors.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: LcMajors
 *   description: API endpoints for managing LC Majors
 */

const lcMajorValidation = [
  body("majorId").isInt().withMessage("majorId must be an integer"),
  body("learningcId").isInt().withMessage("learningcId must be an integer"),
];

const idValidation = [param("id").isInt().withMessage("Invalid ID format")];

/**
 * @swagger
 * /lcmajors:
 *   get:
 *     summary: Get all LC Majors with filter, sorting, and pagination
 *     tags: [LcMajors]
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
 *         description: Number of records per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [id, majorId, learningcId]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sorting order
 *       - in: query
 *         name: majorId
 *         schema:
 *           type: integer
 *         description: Filter by majorId
 *     responses:
 *       200:
 *         description: A list of LC Majors
 */
router.get(
  "/",
  [
    query("page").optional().isInt(),
    query("limit").optional().isInt(),
    query("sort").optional().isString(),
    query("order").optional().isString(),
    query("majorId").optional().isInt(),
  ],
  getLcMajors
);

router.post("/", lcMajorValidation, createLcMajor);
router.delete("/:id", idValidation, deleteLcMajor);

module.exports = router;

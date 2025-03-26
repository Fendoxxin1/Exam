const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getUserEnrollments,
  createUserEnrollment,
  deleteUserEnrollment,
} = require("../controller/userenrolment.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserEnrollments
 *   description: API endpoints for managing user enrollments
 */

// **VALIDATION RULES**
const userEnrollmentValidation = [
  body("userId").isInt().withMessage("userId must be an integer"),
  body("learningcId").isInt().withMessage("learningcId must be an integer"),
  body("filialId").isInt().withMessage("filialId must be an integer"),
];

const idValidation = [param("id").isInt().withMessage("Invalid ID format")];

/**
 * @swagger
 * /userenrolment:
 *   get:
 *     summary: Get all user enrollments with filter, sorting, and pagination
 *     tags: [UserEnrollments]
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
 *           enum: [id, userId, learningcId, filialId]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sorting order
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by userId
 *     responses:
 *       200:
 *         description: A list of user enrollments
 */
router.get(
  "/",
  [
    query("page").optional().isInt(),
    query("limit").optional().isInt(),
    query("sort").optional().isString(),
    query("order").optional().isString(),
    query("userId").optional().isInt(),
  ],
  getUserEnrollments
);

router.post("/", userEnrollmentValidation, createUserEnrollment);
router.delete("/:id", idValidation, deleteUserEnrollment);

module.exports = router;

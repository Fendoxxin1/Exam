const express = require("express");
const { body, query, param } = require("express-validator");
const { getLikes, createLike, deleteLike } = require("../controller/like.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API endpoints for managing likes
 */


const likeValidation = [
  body("userId").isInt().withMessage("userId must be an integer"),
  body("educationalcenterId").isInt().withMessage("educationalcenterId must be an integer"), 
];

const idValidation = [
  param("id").isInt().withMessage("Invalid ID format"),
];

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get all likes with pagination, filtering, and sorting
 *     tags: [Likes]
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
 *         description: Number of likes per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., "userId", "educationalcenterId")
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by userId
 *       - in: query
 *         name: educationalcenterId
 *         schema:
 *           type: integer
 *         description: Filter by educationalcenterId
 *     responses:
 *       200:
 *         description: A list of filtered and sorted likes
 */
router.get(
  "/",
  [
    query("page").optional().isInt(),
    query("limit").optional().isInt(),
    query("sortBy").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("userId").optional().isInt(),
    query("educationalcenterId").optional().isInt(), 
  ],
  getLikes
);

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               educationalcenterId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Like created successfully
 */
router.post("/", likeValidation, createLike);

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Delete a like by ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Like ID
 *     responses:
 *       204:
 *         description: Like deleted successfully
 */
router.delete("/:id", idValidation, deleteLike);

module.exports = router;

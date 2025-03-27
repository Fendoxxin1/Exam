const express = require("express");
const { body, query, param } = require("express-validator");
const { getComments, getCommentById, createComment, deleteComment } = require("../controller/comment.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

const commentValidation = [
  body("comment").notEmpty().withMessage("Comment is required"),
  body("star").isFloat().withMessage("Star rating must be a number"),
  body("userId").isInt().withMessage("userId must be an integer"),
  body("learningcId").isInt().withMessage("learningcId must be an integer"),
];

const idValidation = [
  param("id").isInt().withMessage("Invalid ID format"),
];

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments with pagination, filtering, and sorting
 *     tags: [Comments]
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
 *         description: Number of comments per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., "star", "createdAt")
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
 *         description: A list of filtered and sorted comments
 */
router.get(
  "/",
  [
    query("page").optional().isInt(),
    query("limit").optional().isInt(),
    query("sortBy").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("userId").optional().isInt(),
    query("learningcId").optional().isInt(),
  ],
  getComments
);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       404:
 *         description: Comment not found
 */
router.get("/:id", idValidation, getCommentById);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               star:
 *                 type: number
 *               userId:
 *                 type: integer
 *               educationalcenterId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post("/", commentValidation, createComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 */
router.delete("/:id", idValidation, deleteComment);

module.exports = router;

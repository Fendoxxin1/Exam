const express = require("express");
const { body, param } = require("express-validator");
const { createLike, deleteLike } = require("../controller/like.controller");
const authenticate = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API endpoints for managing likes
 */

const likeValidation = [
  body("userId").isInt().withMessage("userId must be an integer"),
  body("educationalCenterId")
    .isInt()
    .withMessage("educationalCenterId must be an integer"),
];

const idValidation = [param("id").isInt().withMessage("Invalid ID format")];

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
router.post("/", authenticate, likeValidation, createLike);

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
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  idValidation,
  deleteLike
);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getSessions,
  deleteSession,
} = require("../controller/session.controller");

const authenticate = require("../middleware/auth");

/**
 * @swagger
 * /my-sessions:
 *   get:
 *     summary: Get all sessions of the authenticated user
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No sessions found
 */
router.get("/my-sessions", authenticate, getSessions);

/**
 * @swagger
 * /my-sessions/{id}:
 *   delete:
 *     summary: Delete a specific session by ID
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The session ID to delete
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 */
router.delete("/my-sessions/:id", authenticate, deleteSession);

module.exports = router;

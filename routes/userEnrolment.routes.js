const express = require("express");
const { body } = require("express-validator");
const userEnrolmentController = require("../controller/userEnrolment.controller");

const router = express.Router();

/** 
 * @swagger 
 * tags:
 *   - name: User Enrolments
 *     description: Operations related to user enrolments
 * 
 * /api/userenrolments:
 *   post:
 *     tags:
 *       - User Enrolments
 *     summary: Create a new user enrolment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               learningId:
 *                 type: integer
 *               filialId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User enrolment created
 */
router.post(
    "/",
    [
        body("userId").isInt().withMessage("UserId must be an integer"),
        body("learningId").isInt().withMessage("LearningId must be an integer"),
        body("filialId").isInt().withMessage("FilialId must be an integer"),
    ],
    userEnrolmentController.createUserEnrolment
);

/** 
 * @swagger 
 * /api/userenrolments/{id}:
 *   delete:
 *     tags:
 *       - User Enrolments
 *     summary: Delete a user enrolment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user enrolment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User enrolment deleted
 */
router.delete(
    "/:id",
    userEnrolmentController.deleteUserEnrolment
);

module.exports = router;

const express = require("express");
const router = express.Router();
const studyProgramController = require("../controller/studyprogram.controller");

/**
 * @swagger
 * /studyprograms:
 *   get:
 *     summary: Get all study programs
 *     description: Retrieve a list of all study programs with optional pagination and sorting.
 *     tags:
 *       - Study Programs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Column to sort by.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sorting order (ascending or descending).
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter study programs by name (partial match).
 *     responses:
 *       200:
 *         description: A list of study programs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Computer Science
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No study programs found.
 *       500:
 *         description: Internal server error.
 */
router.get("/studyprograms", studyProgramController.getAllStudyPrograms);

/**
 * @swagger
 * /studyprograms/{id}:
 *   get:
 *     summary: Get a study program by ID
 *     description: Retrieve details of a specific study program by its ID.
 *     tags:
 *       - Study Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the study program to retrieve.
 *     responses:
 *       200:
 *         description: Study program details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Computer Science
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Study program not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/studyprograms/:id", studyProgramController.getStudyProgramById);

/**
 * @swagger
 * /studyprograms:
 *   post:
 *     summary: Create a new study program
 *     description: Add a new study program to the system.
 *     tags:
 *       - Study Programs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - professionId
 *               - subjectId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Data Science
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               professionId:
 *                 type: integer
 *                 example: 2
 *               subjectId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Study program successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Data Science
 *                 image:
 *                   type: string
 *                   example: "https://example.com/image.jpg"
 *                 professionId:
 *                   type: integer
 *                   example: 2
 *                 subjectId:
 *                   type: integer
 *                   example: 5
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input, missing required fields.
 *       500:
 *         description: Internal server error.
 */

router.post("/studyprograms", studyProgramController.createStudyProgram);

/**
 * @swagger
 * /studyprograms/{id}:
 *   patch:
 *     summary: Update an existing study program
 *     description: Modify the details of an existing study program by ID.
 *     tags:
 *       - Study Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the study program to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Data Science Program
 *               image:
 *                 type: string
 *                 example: "https://example.com/new-image.jpg"
 *               professionId:
 *                 type: integer
 *                 example: 3
 *               subjectId:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: Study program successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Updated Data Science Program
 *                 image:
 *                   type: string
 *                   example: "https://example.com/new-image.jpg"
 *                 professionId:
 *                   type: integer
 *                   example: 3
 *                 subjectId:
 *                   type: integer
 *                   example: 7
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input or missing required fields.
 *       404:
 *         description: Study program not found.
 *       500:
 *         description: Internal server error.
 */

router.patch("/studyprograms/:id", studyProgramController.updateStudyProgram);

/**
 * @swagger
 * /studyprograms/{id}:
 *   delete:
 *     summary: Delete a study program
 *     description: Remove a study program by its ID.
 *     tags:
 *       - Study Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the study program to delete
 *     responses:
 *       200:
 *         description: Study program successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Study program deleted successfully.
 *       404:
 *         description: Study program not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/studyprograms/:id", studyProgramController.deleteStudyProgram);

module.exports = router;

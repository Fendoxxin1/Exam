const express = require("express");
const { body, query } = require("express-validator");
const {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../controller/filial.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Filials
 *   description: Filial CRUD API
 */

/**
 * @swagger
 * /filials:
 *   get:
 *     summary: Barcha filiallarni olish
 *     tags: [Filials]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Saralash maydoni
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Saralash tartibi
 *       - in: query
 *         name: region
 *         schema:
 *           type: integer
 *         description: Region ID
 *       - in: query
 *         name: educationalcenter
 *         schema:
 *           type: integer
 *         description: Ta'lim markazi ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Sahifadagi elementlar soni
 *     responses:
 *       200:
 *         description: Filiallar ro‘yxati
 */
router.get(
  "/filials",
  [
    query("sort").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("region").optional().isInt(),
    query("educationalcenter").optional().isInt(),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1 }),
  ],
  getBranches
);

/**
 * @swagger
 * /filials/{id}:
 *   get:
 *     summary: Bitta filialni olish
 *     tags: [Filials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filial ID
 *     responses:
 *       200:
 *         description: Bitta filial
 */
router.get("/filials/:id", getBranchById);

/**
 * @swagger
 * /filials:
 *   post:
 *     summary: Yangi filial yaratish
 *     tags: [Filials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: integer
 *               educationalcenterid:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filial yaratildi
 */
router.post(
  "/filials",
  [
    body("name").notEmpty().isString(),
    body("region").isInt(),
    body("educationalcenter").isInt(),
    body("phoneNumber").optional().isString(),
    body("address").optional().isString(),
  ],
  createBranch
);

/**
 * @swagger
 * /filials/{id}:
 *   patch:
 *     summary: Filialni yangilash
 *     tags: [Filials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filial ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: integer
 *               educationalcenterid:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filial yangilandi
 */
router.patch(
  "/filials/:id",
  [
    body("name").optional().isString(),
    body("region").optional().isInt(),
    body("educationalcenter").optional().isInt(),
    body("phoneNumber").optional().isString(),
    body("address").optional().isString(),
  ],
  updateBranch
);

/**
 * @swagger
 * /filials/{id}:
 *   delete:
 *     summary: Filialni o‘chirish
 *     tags: [Filials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filial ID
 *     responses:
 *       200:
 *         description: Filial o‘chirildi
 */
router.delete("/filials/:id", deleteBranch);

module.exports = router;

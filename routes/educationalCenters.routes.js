const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getEducationCenters,
  getEducationCenterById,
  createEducationCenter,
  updateEducationCenter,
  deleteEducationCenter
} = require("../controller/educationalCenters.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Educational Centers
 *   description: Ta’lim markazlarini boshqarish
 */

/**
 * @swagger
 * /educational-centers:
 *   get:
 *     summary: Barcha ta’lim markazlarini olish
 *     tags: [Educational Centers]
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
 *         description: Hudud ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Sahifadagi elementlar soni
 *     responses:
 *       200:
 *         description: Barcha ta’lim markazlari
 */
router.get(
  "/educational-centers",
  [
    query("sort").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("region").optional().isInt(),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1 }),
  ],
  getEducationCenters
);

/**
 * @swagger
 * /educational-centers/{id}:
 *   get:
 *     summary: Bitta ta’lim markazining ma’lumotlarini olish
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Markaz ID raqami
 *     responses:
 *       200:
 *         description: Markaz topildi
 *       404:
 *         description: Markaz topilmadi
 */
router.get("/educational-centers/:id", param("id").isInt(), getEducationCenterById);

/**
 * @swagger
 * /educational-centers:
 *   post:
 *     summary: Yangi ta’lim markazi qo‘shish
 *     tags: [Educational Centers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - region
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Markaz yaratildi
 *       400:
 *         description: Xatolik
 */
router.post(
  "/educational-centers",
  [
    body("name").notEmpty().isString(),
    body("region").isInt(),
    body("phoneNumber").optional().isString(),
    body("address").optional().isString(),
  ],
  createEducationCenter
);

/**
 * @swagger
 * /educational-centers/{id}:
 *   patch:
 *     summary: Markaz ma'lumotlarini qisman yangilash
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Markaz ID raqami
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
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Markaz qisman yangilandi
 *       400:
 *         description: Xatolik
 */
router.patch(
  "/educational-centers/:id",
  [
    param("id").isInt(),
    body("name").optional().isString(),
    body("region").optional().isInt(),
    body("phoneNumber").optional().isString(),
    body("address").optional().isString(),
  ],
  updateEducationCenter
);

/**
 * @swagger
 * /educational-centers/{id}:
 *   delete:
 *     summary: Markazni o‘chirish
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Markaz ID raqami
 *     responses:
 *       200:
 *         description: Markaz o‘chirildi
 *       404:
 *         description: Markaz topilmadi
 */
router.delete("/educational-centers/:id", param("id").isInt(), deleteEducationCenter);

module.exports = router;

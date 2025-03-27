const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const EducationalCenter = require("../models/educationalCenter.model");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Educational Centers
 *   description: O'quv markazlari CRUD API
 */

/**
 * @swagger
 * /api/educationalcenters:
 *   get:
 *     summary: Barcha o'quv markazlarini olish
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort qilish (name, region, branchNumber)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: O'sish yoki kamayish tartibida
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Har bir sahifadagi elementlar soni
 *     responses:
 *       200:
 *         description: Barcha o'quv markazlari
 */
router.get("/", async (req, res) => {
  try {
    const { sort = "id", order = "asc", page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const centers = await EducationalCenter.findAll({
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/educationalcenters/{id}:
 *   get:
 *     summary: Bitta o'quv markazini olish
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'quv markazi ID si
 *     responses:
 *       200:
 *         description: O'quv markazi ma'lumoti
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID butun son bo'lishi kerak"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const center = await EducationalCenter.findByPk(req.params.id);
      if (!center) return res.status(404).json({ message: "Markaz topilmadi" });
      res.json(center);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /educationalcenters:
 *   post:
 *     summary: Yangi o'quv markazi qo'shish
 *     tags: [Educational Centers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               region:
 *                 type: integer
 *               address:
 *                 type: string
 *               filialNumber:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yangi o'quv markazi yaratildi
 */
router.post(
  "/",
  body("name").notEmpty().withMessage("Nomi kerak"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const center = await EducationalCenter.create(req.body);
      res.status(201).json(center);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /api/educationalcenters/{id}:
 *   patch:
 *     summary: O'quv markazini yangilash
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'quv markazi ID si
 *     responses:
 *       200:
 *         description: O'quv markazi yangilandi
 */
router.patch("/:id", async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Markaz topilmadi" });

    await center.update(req.body);
    res.json(center);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/educationalcenters/{id}:
 *   delete:
 *     summary: O'quv markazini o'chirish
 *     tags: [Educational Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'quv markazi ID si
 *     responses:
 *       200:
 *         description: O'quv markazi o'chirildi
 */
router.delete("/:id", async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Markaz topilmadi" });

    await center.destroy();
    res.json({ message: "Markaz o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

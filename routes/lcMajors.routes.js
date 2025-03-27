const express = require("express");
const LcMajors = require("../models/lcmajors.model");
const { Op } = require("sequelize");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: LcMajors
 *     description: LcMajors'lar bilan ishlash uchun API
 */

/**
 * @swagger
 * /lcMajors:
 *   get:
 *     summary: Barcha LcMajors'larni olish (filter, sort, pagination bilan)
 *     tags: [LcMajors]
 *     parameters:
 *       - in: query
 *         name: programId
 *         schema:
 *           type: integer
 *         description: Muayyan `programId` bo‘yicha filterlash
 *       - in: query
 *         name: educationalCenterId
 *         schema:
 *           type: integer
 *         description: Muayyan `educationalCenterId` bo‘yicha filterlash
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Saralash maydoni (masalan, `id`)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Saralash tartibi (`ASC` yoki `DESC`)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Sahifada nechta natija bo‘lishi kerak
 *     responses:
 *       200:
 *         description: Barcha LcMajors'lar
 */
router.get("/lcMajors", async (req, res) => {
  try {
    const { programId, educationalcenterId, sortBy = "id", order = "ASC", page = 1, limit = 10 } = req.query;
    const whereClause = {};
    if (programId) whereClause.programId = programId;
    if (educationalcenterId) whereClause.educationalcenterId = educationalcenterId;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const lcMajors = await LcMajors.findAll({
      where: whereClause,
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset,
    });
    res.json(lcMajors);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /lcMajors/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta LcMajor olish
 *     tags: [LcMajors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: LcMajor topildi
 *       404:
 *         description: LcMajor topilmadi
 */
router.get("/lcMajors/:id", async (req, res) => {
  try {
    const lcMajor = await LcMajors.findByPk(req.params.id);
    if (!lcMajor) return res.status(404).json({ error: "LcMajor topilmadi" });
    res.json(lcMajor);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /lcMajors:
 *   post:
 *     summary: Yangi LcMajor qo‘shish
 *     tags: [LcMajors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programId:
 *                 type: integer
 *               educationalcenterId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Yangi LcMajor yaratildi
 */
router.post("/lcMajors", async (req, res) => {
  try {
    const { programId, educationalcenterId } = req.body;
    const newLcMajor = await LcMajors.create({ programId, educationalcenterId });
    res.status(201).json(newLcMajor);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /lcMajors/{id}:
 *   delete:
 *     summary: ID bo‘yicha LcMajor o‘chirish
 *     tags: [LcMajors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: LcMajor o‘chirildi
 *       404:
 *         description: LcMajor topilmadi
 */
router.delete("/lcMajors/:id", async (req, res) => {
  try {
    const lcMajor = await LcMajors.findByPk(req.params.id);
    if (!lcMajor) return res.status(404).json({ error: "LcMajor topilmadi" });
    await lcMajor.destroy();
    res.json({ message: "LcMajor o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

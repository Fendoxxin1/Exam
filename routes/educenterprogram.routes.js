const express = require("express");
const EducenterProgram = require("../models/educenterprogram.model");
const EducationalCenter = require("../models/educationalcenter.model"); // Foreign key tekshiruvi uchun
const StudyProgram = require("../models/studyprogram.model"); // Agar Program modeli bo‘lsa
const { Op } = require("sequelize");
const { createEducenterProgramSchema } = require("../validation/educenterprogram.validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: EducenterProgram
 *     description: EducenterProgram'lar bilan ishlash uchun API
 */

/**
 * @swagger
 * /educenterprogram:
 *   get:
 *     summary: Barcha EducenterProgram'larni olish (filter, sort, pagination bilan)
 *     tags: [EducenterProgram]
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
 *         description: Barcha EducenterProgram'lar
 */
router.get("/educenterprogram", async (req, res) => {
  try {
    const {
      programId,
      educationalcenterId,
      sortBy = "id",
      order = "ASC",
      page = 1,
      limit = 10,
    } = req.query;
    const whereClause = {};
    if (programId) whereClause.programId = programId;
    if (educationalcenterId) whereClause.educationalcenterId = educationalcenterId;

    const limitNum = parseInt(limit);
    const offset = (parseInt(page) - 1) * limitNum;

    const { count, rows } = await EducenterProgram.findAndCountAll({
      where: whereClause,
      order: [[sortBy, order]],
      limit: limitNum,
      offset,
    });

    res.json({
      total: count,
      page: parseInt(page),
      limit: limitNum,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching EducenterPrograms:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /educenterprogram/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta EducenterProgram olish
 *     tags: [EducenterProgram]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: EducenterProgram topildi
 *       404:
 *         description: EducenterProgram topilmadi
 */
router.get("/educenterprogram/:id", async (req, res) => {
  try {
    const educenterprogram = await EducenterProgram.findByPk(req.params.id);
    if (!educenterprogram)
      return res.status(404).json({ error: "EducenterProgram topilmadi" });
    res.json(educenterprogram);
  } catch (error) {
    console.error("Error fetching EducenterProgram:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /educenterprogram:
 *   post:
 *     summary: Yangi EducenterProgram qo‘shish
 *     tags: [EducenterProgram]
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
 *             required:
 *               - programId
 *               - educationalcenterId
 *     responses:
 *       201:
 *         description: Yangi EducenterProgram yaratildi
 *       400:
 *         description: Noto‘g‘ri ma’lumotlar
 *       500:
 *         description: Server xatosi
 */
router.post("/educenterprogram", async (req, res) => {
  try {
    // Joi validatsiyasi
    const { error } = createEducenterProgramSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { programId, educationalcenterId } = req.body;

    // Foreign key tekshiruvi
    const center = await EducationalCenter.findByPk(educationalcenterId);
    if (!center) {
      return res.status(400).json({ error: "Educational Center not found" });
    }
    const program = await Program.findByPk(programId); // Program modeli bo‘lsa
    if (!program) {
      return res.status(400).json({ error: "Program not found" });
    }

    const newEducenterProgram = await EducenterProgram.create({
      programId,
      educationalcenterId,
    });
    res.status(201).json(newEducenterProgram);
  } catch (error) {
    console.error("Error creating EducenterProgram:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /educenterprogram/{id}:
 *   delete:
 *     summary: ID bo‘yicha EducenterProgram o‘chirish
 *     tags: [EducenterProgram]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: EducenterProgram o‘chirildi
 *       404:
 *         description: EducenterProgram topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/educenterprogram/:id", async (req, res) => {
  try {
    const educenterprogram = await EducenterProgram.findByPk(req.params.id);
    if (!educenterprogram)
      return res.status(404).json({ error: "EducenterProgram topilmadi" });
    await educenterprogram.destroy();
    res.json({ message: "EducenterProgram o'chirildi" });
  } catch (error) {
    console.error("Error deleting EducenterProgram:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
const express = require("express");
const { Op } = require("sequelize");
const Filial = require("../models/filial.model");
const EducationalCenter = require("../models/educationalcenter.model"); 
const {
  createFilialSchema,
  updateFilialSchema,
} = require("../validation/filial.validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Filial
 *   description: Filiallar bo'yicha CRUD API
 */

/**
 * @swagger
 * /filials:
 *   get:
 *     summary: Barcha filiallarni olish (filter, sort, pagination)
 *     tags: [Filial]
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filialning mintaqasi
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filial nomi bo‘yicha filterlash
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Saralash maydoni (name, region va h.k)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Saralash tartibi (asc yoki desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Har bir sahifada nechta natija bo‘lishi
 *     responses:
 *       200:
 *         description: Filiallar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/filials", async (req, res) => {
  try {
    const { region, name, sort = "id", order = "asc", page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (region) where.region = { [Op.iLike]: `%${region}%` };
    if (name) where.name = { [Op.iLike]: `%${name}%` };

    const options = {
      where,
      order: [[sort, order.toLowerCase() === "desc" ? "DESC" : "ASC"]],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    };

    const filials = await Filial.findAll(options);
    res.json(filials);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /filials/{id}:
 *   get:
 *     summary: ID bo'yicha bitta filialni olish
 *     tags: [Filial]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filial IDsi
 *     responses:
 *       200:
 *         description: Filial topildi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/filials/:id", async (req, res) => {
  try {
    const filial = await Filial.findByPk(req.params.id);
    if (!filial) return res.status(404).json({ error: "Filial topilmadi" });
    res.json(filial);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /filials:
 *   post:
 *     summary: Yangi filial qo'shish
 *     tags: [Filial]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, region, phoneNumber, address, educationalcenterId]
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               educationalcenterId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Filial yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumotlar
 *       500:
 *         description: Server xatosi
 */
router.post("/filials", async (req, res) => {
  try {
    const { error } = createFilialSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, region, phoneNumber, address, educationalcenterId } = req.body;

    const center = await EducationalCenter.findByPk(educationalcenterId);
    if (!center) {
      return res.status(400).json({ error: "Educational Center not found" });
    }

    const lastFilial = await Filial.findOne({
      where: { educationalcenterId },
      order: [['filialNumber', 'DESC']], 
    });


    const newFilialNumber = lastFilial ? lastFilial.filialNumber + 1 : 1;

    
    const newFilial = await Filial.create({
      name,
      region,
      phoneNumber,
      address,
      educationalcenterId,
      filialNumber: newFilialNumber,
    });

    res.status(201).json(newFilial);
  } catch (error) {
    console.error("Error creating filial:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /filials/{id}:
 *   patch:
 *     summary: Filialni yangilash
 *     tags: [Filial]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               educationalcenterId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Filial yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumotlar
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Server xatosi
 */
router.patch("/filials/:id", async (req, res) => {
  try {
    // Joi validatsiyasi
    const { error } = updateFilialSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filial = await Filial.findByPk(req.params.id);
    if (!filial) return res.status(404).json({ error: "Filial topilmadi" });

    if (req.body.educationalcenterId) {
      const center = await EducationalCenter.findByPk(req.body.educationalcenterId);
      if (!center) {
        return res.status(400).json({ error: "Educational Center not found" });
      }
    }

    await filial.update(req.body);
    res.json(filial);
  } catch (error) {
    console.error("Error updating filial:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/**
 * @swagger
 * /filials/{id}:
 *   delete:
 *     summary: Filialni o'chirish
 *     tags: [Filial]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filial o'chirildi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/filials/:id", async (req, res) => {
  try {
    const filial = await Filial.findByPk(req.params.id);
    if (!filial) return res.status(404).json({ error: "Filial topilmadi" });

    await filial.destroy();
    res.json({ message: "Filial o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
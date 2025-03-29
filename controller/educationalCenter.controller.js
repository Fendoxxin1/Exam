
const EducationalCenter = require("../models/educationalcenter.model");
const { Op } = require("sequelize");
const {
  createEducationalCenterSchema,
  updateEducationalCenterSchema,
} = require("../validation/educationalcenter.validation");
const StudyProgram = require("../models/studyprogram.model");
const Filial = require("../models/filial.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

const getAllEducationalCenters = async (req, res) => {
  try {
    const { name, region, createdBy, page = 1, take = 10 } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (region) filters.region = region;
    if (createdBy) filters.createdBy = createdBy;

    const limit = parseInt(take);
    const offset = (parseInt(page) - 1) * limit;

    const centers = await EducationalCenter.findAndCountAll({
      where: filters,
      limit,
      offset,
    });

    const result = await Promise.all(
      centers.rows.map(async (center) => {
        const filial = await Filial.findAll({
          where: { educationalCenterId: center.id },
        });
        const studyPrograms = await StudyProgram.findAll({
          include: {
            model: EducationalCenter,
            where: { id: center.id },
            through: { attributes: [] },
          },
        });
        const comments = await Comment.findAll({
          where: { educationalCenterId: center.id },
        });
        const users = await User.findAll({
          include: {
            model: EducationalCenter,
            where: { id: center.id },
            through: { attributes: [] },
          },
        });

        return {
          ...center.toJSON(),
          filial,
          studyPrograms,
          comments,
          users,
        };
      })
    );

    res.json({
      total: centers.count,
      page: parseInt(page),
      take: limit,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEducationalCenterById = async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Not found" });

    const filial = await Filial.findAll({
      where: { educationalCenterId: center.id },
    });
    const studyPrograms = await StudyProgram.findAll({
      include: {
        model: EducationalCenter,
        where: { id: center.id },
        through: { attributes: [] },
      },
    });
    const comments = await Comment.findAll({
      where: { educationalCenterId: center.id },
    });
    const users = await User.findAll({
      include: {
        model: EducationalCenter,
        where: { id: center.id },
        through: { attributes: [] },
      },
    });

    const result = {
      ...center.toJSON(),
      filial,
      studyPrograms,
      comments,
      users,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEducationalCenter = async (req, res) => {
  try {
    const { error } = createEducationalCenterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, image, region, address, phoneNumber } = req.body;

    const center = await EducationalCenter.create({
      name,
      image,
      region,
      address,
      phoneNumber,
    });
    res.status(201).json(center);
  } catch (error) {
    console.error("Error creating EducationalCenter:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateEducationalCenter = async (req, res) => {
  try {
    const { error } = updateEducationalCenterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Not found" });

    await center.update(req.body);
    res.json(center);
  } catch (error) {
    console.error("Error updating EducationalCenter:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteEducationalCenter = async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Not found" });

    await center.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEducationalCenters,
  getEducationalCenterById,
  createEducationalCenter,
  updateEducationalCenter,
  deleteEducationalCenter,
};
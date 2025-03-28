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
    const { name, regionId, createdBy, page = 1, take = 10 } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (regionId) filters.regionId = regionId;
    if (createdBy) filters.createdBy = createdBy;

    const limit = parseInt(take);
    const offset = (parseInt(page) - 1) * limit;

    const centers = await EducationalCenter.findAndCountAll({
      where: filters,
      limit,
      offset,
      include: [
        { model: Filial },
        {
          model: StudyProgram,
          as: "StudyPrograms",
          through: { attributes: [] },
        },
        { model: Comment, as: "Comments" },
        { model: User, as: "Users", through: { attributes: [] } },
      ],
    });

    res.json({
      total: centers.count,
      page: parseInt(page),
      take: limit,
      data: centers.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEducationalCenterById = async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id, {
      include: [
        { model: Filial},
        {
          model: StudyProgram,
          as: "StudyPrograms",
          through: { attributes: [] },
        },
        { model: Comment, as: "Comments" },
        { model: User, as: "Users", through: { attributes: [] } },
      ],
    });
    if (!center) return res.status(404).json({ message: "Not found" });
    res.json(center);
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

    const { name, image, regionId, address, phoneNumber } = req.body;

    const center = await EducationalCenter.create({
      name,
      image,
      regionId,
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

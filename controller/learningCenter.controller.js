const EducationalCenter = require("../models/learningcenter.model");
const { Op } = require("sequelize");

const getAllEducationalCenters = async (req, res) => {
  try {
    const { name, regionId, createdBy, page = 1, take = 10 } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (regionId) filters.region = regionId;
    if (createdBy) filters.createdBy = createdBy;

    const limit = parseInt(take);
    const offset = (parseInt(page) - 1) * limit;

    const centers = await EducationalCenter.findAndCountAll({
      where: filters,
      limit,
      offset,
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

module.exports = { getAllEducationalCenters };

const getEducationalCenterById = async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Not found" });
    res.json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEducationalCenter = async (req, res) => {
  try {
    const center = await EducationalCenter.create(req.body);
    res.status(201).json(center);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEducationalCenter = async (req, res) => {
  try {
    const center = await EducationalCenter.findByPk(req.params.id);
    if (!center) return res.status(404).json({ message: "Not found" });

    await center.update(req.body);
    res.json(center);
  } catch (error) {
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

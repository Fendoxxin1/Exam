const { Op } = require("sequelize");
const { Profession, StudyProgram } = require("../models/association.model");

const getProfessions = async (req, res) => {
  try {
    const professions = await Profession.findAll({
      include: [
        {
          model: StudyProgram,
          as: "StudyPrograms",
        },
      ],
    });
    res.json(professions);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createProfession = async (req, res) => {
  try {
    const profession = await Profession.create(req.body);
    res.json(profession);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getProfessionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort || "id";
    const order = req.query.order || "ASC";

    const profession = await Profession.findOne({
      where: { id: id },
      include: [
        {
          model: StudyProgram,
        },
      ],
    });

    if (!profession) {
      return res.status(404).json({ message: "Profession not found" });
    }

    res.json(profession);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const updateProfession = async (req, res) => {
  try {
    const profession = await Profession.findByPk(req.params.id);
    if (!profession) {
      return res.status(404).json({
        error: "Profession not found",
      });
    }
    await profession.update(req.body);
    res.json(profession);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteProfession = async (req, res) => {
  try {
    const profession = await Profession.findByPk(req.params.id);
    if (!profession) {
      return res.status(404).json({
        error: "Profession not found",
      });
    }
    await profession.destroy();
    res.json({
      message: "Profession deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getProfessions,
  createProfession,
  getProfessionById,
  updateProfession,
  deleteProfession,
};

const { Subject } = require("../models/association.model");

const getSubjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
      name,
    } = req.query;
    const whereCondition = {};
    if (name) {
      whereCondition.name = { [Op.like]: `%${name}%` };
    }
    const subjects = await Subject.findAll({
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [[sort, order]],
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.json(subject);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject) {
      return res.status(404).json({
        error: "Subject not found",
      });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject) {
      return res.status(404).json({
        error: "Subject not found",
      });
    }
    await subject.update(req.body);
    res.json(subject);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject) {
      return res.status(404).json({
        error: "Subject not found",
      });
    }
    await subject.destroy();
    res.json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getSubjects,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
};

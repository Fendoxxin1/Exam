const { Op } = require("sequelize");
const Subject = require("../models/subject.model");

const getSubjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
      name,
    } = req.query;
    const offset = (page - 1) * limit;

    const where = name ? { name: { [Op.iLike]: `%${name}%` } } : {};

    const subjects = await Subject.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]],
    });

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a subject by ID
const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const subject = await Subject.create({ name, image });
    res.status(201).json(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing subject
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.update({ name, image });
    res.status(200).json(subject);
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.destroy();
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};

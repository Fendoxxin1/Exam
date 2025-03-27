const { StudyProgram } = require("../models/association.model");

const getAllStudyPrograms = async (req, res) => {
  try {
    const studyPrograms = await StudyProgram.findAll();
    res.status(200).json(studyPrograms);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getStudyProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const studyProgram = await StudyProgram.findByPk(id);
    if (!studyProgram) {
      return res.status(404).json({ message: "Study program not found" });
    }
    res.status(200).json(studyProgram);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const createStudyProgram = async (req, res) => {
  try {
    const { name } = req.body;
    const newProgram = await StudyProgram.create({ name });
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: "Bad request", error });
  }
};

const updateStudyProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const studyProgram = await StudyProgram.findByPk(id);
    if (!studyProgram) {
      return res.status(404).json({ message: "Study program not found" });
    }
    studyProgram.name = name;
    await studyProgram.save();
    res.status(200).json(studyProgram);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteStudyProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const studyProgram = await StudyProgram.findByPk(id);
    if (!studyProgram) {
      return res.status(404).json({ message: "Study program not found" });
    }
    await studyProgram.destroy();
    res.status(200).json({ message: "Study program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  getAllStudyPrograms,
  getStudyProgramById,
  createStudyProgram,
  updateStudyProgram,
  deleteStudyProgram,
};

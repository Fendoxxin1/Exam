const { StudyProgram, Profession } = require("../models/association.model");
const EducationalCenter = require("../models/educationalcenter.model");
const Subject = require("../models/subject.model");
const {
  createStudyProgramSchema,
  updateStudyProgramSchema,
} = require("../validation/studyprogram.validation");

const getAllStudyPrograms = async (req, res) => {
  try {
    const studyPrograms = await StudyProgram.findAll({
      include: [
        { model: Profession, as: "Profession" },
        { model: Subject, as: "Subject" },
        {
          model: EducationalCenter,
          as: "EducationalCenters",
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(studyPrograms);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getStudyProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const studyProgram = await StudyProgram.findByPk(id, {
      include: [
        { model: Profession, as: "Profession" },
        { model: Subject, as: "Subject" },
        {
          model: EducationalCenter,
          as: "EducationalCenters",
          through: { attributes: [] },
        },
      ],
    });
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
    const { error } = createStudyProgramSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation error", error });
    }
    const { name, image, professionId, subjectId } = req.body;
    const newProgram = await StudyProgram.create({
      name,
      image,
      professionId,
      subjectId,
    });
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: "Bad request", error });
  }
};

const updateStudyProgram = async (req, res) => {
  try {
    const { error } = updateStudyProgramSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation error", error });
    }
    const { id } = req.params;
    const { name, image, professionId, subjectId } = req.body;
    const studyProgram = await StudyProgram.findByPk(id);
    if (!studyProgram) {
      return res.status(404).json({ message: "Study program not found" });
    }
    await studyProgram.update({ name, image, professionId, subjectId });
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

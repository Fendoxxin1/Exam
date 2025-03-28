const { validationResult } = require("express-validator");
const db = require("../models/association.model");
const UserEnrolment = db.UserEnrollment;

exports.createUserEnrolment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, educationalId, filialId } = req.body;
    const newEnrolment = await UserEnrolment.create({
      userId,
      educationalId,
      filialId,
    });
    res.status(201).json(newEnrolment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteUserEnrolment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrolment = await UserEnrolment.findByPk(id);
    if (!enrolment) {
      return res.status(404).json({ message: "User enrolment not found" });
    }

    await enrolment.destroy();
    res.status(200).json({ message: "User enrolment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

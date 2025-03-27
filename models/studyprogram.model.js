const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const StudyProgram = db.define("StudyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  professionId: { type: DataTypes.INTEGER },
  subjectId: { type: DataTypes.INTEGER },
});

module.exports = StudyProgram;

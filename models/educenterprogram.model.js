const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const EducenterProgram = db.define("EducenterProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  programId: { type: DataTypes.INTEGER },
  educationalcenterId: { type: DataTypes.INTEGER },
});

module.exports = EducenterProgram;

const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const ProgramAssignment = db.define("ProgramAssignment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  programId: { type: DataTypes.INTEGER },
  educationalCenterId: { type: DataTypes.INTEGER },
});


module.exports = ProgramAssignment
const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const EducationalCenter = db.define("EducationalCenter", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
  region: { type: DataTypes.INTEGER },
  address: { type: DataTypes.STRING },
  branchNumber: { type: DataTypes.INTEGER },
  phoneNumber: { type: DataTypes.STRING },
});

module.exports = EducationalCenter
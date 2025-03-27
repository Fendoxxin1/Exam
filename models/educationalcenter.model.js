const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const EducationalCenter = db.define(
  "EducationalCenter",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    region: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    filialNumber: { type: DataTypes.INTEGER },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "educational_center", timestamps: false }
);

module.exports = EducationalCenter;

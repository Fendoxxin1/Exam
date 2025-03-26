const { DataTypes } = require("sequelize");
  const {db} = require("../config/db");

const IcMajors = db.define(
  "IcMajors",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "icmajors",
    timestamps: false,
  }
);

module.exports = IcMajors;

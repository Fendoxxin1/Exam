const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Resource = db.define(
  "Resource",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    media: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    createdBy: { type: DataTypes.INTEGER },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false } 
);

module.exports = Resource;

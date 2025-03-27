const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Resource = db.define(
  "Resource",
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
    media: {
      type: DataTypes.STRING,
      allowNull:false

    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
}, {
    tableName: "resources",
    timestamps: false,
  }
);

module.exports = Resource;

const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Region = db.define(
  "Region",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Region;

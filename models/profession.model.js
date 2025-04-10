const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const Profession = db.define("Profession", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Profession;

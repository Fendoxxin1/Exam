const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const Profession = db.define("Profession", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
});

module.exports = Profession;

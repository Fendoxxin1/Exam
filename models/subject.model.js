const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const Subject = db.define("Subject", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
});

module.exports = Subject
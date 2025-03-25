const { DataTypes } = require("sequelize");

const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const Like = db.define("Like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  educationalCenterId: { type: DataTypes.INTEGER },
});

module.exports = Like;

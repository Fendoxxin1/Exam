const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const UserEnrollment = db.define("UserEnrollment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userID: { type: DataTypes.INTEGER, allowNull: false },
  learningid: { type: DataTypes.INTEGER, allowNull: false },
  branchid: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = UserEnrollment;

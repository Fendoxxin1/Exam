const { DataTypes } = require("sequelize");
const { db } = require("../config/db");
const UserEnrollment = db.define("UserEnrollment", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  learningid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  branchid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = UserEnrollment;
